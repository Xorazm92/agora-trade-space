#!/bin/bash

# Inbola E-commerce Production Setup Script
# This script sets up the production environment on a fresh Ubuntu server

set -e

echo "🔧 Setting up Inbola E-commerce Production Environment..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run this script as root (use sudo)"
    exit 1
fi

# Update system
print_status "Updating system packages..."
apt update && apt upgrade -y

# Install essential packages
print_status "Installing essential packages..."
apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Install Node.js 18 LTS
print_status "Installing Node.js 18 LTS..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Verify Node.js installation
NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
print_success "Node.js $NODE_VERSION and npm $NPM_VERSION installed"

# Install Nginx
print_status "Installing Nginx..."
apt install -y nginx
systemctl enable nginx
systemctl start nginx

# Install PostgreSQL 15
print_status "Installing PostgreSQL 15..."
sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
apt update
apt install -y postgresql-15 postgresql-client-15

# Install Redis
print_status "Installing Redis..."
apt install -y redis-server
systemctl enable redis-server
systemctl start redis-server

# Install PM2 globally
print_status "Installing PM2..."
npm install -g pm2

# Install Certbot for SSL
print_status "Installing Certbot for SSL certificates..."
apt install -y certbot python3-certbot-nginx

# Create inbola user
print_status "Creating inbola user..."
if ! id "inbola" &>/dev/null; then
    useradd -m -s /bin/bash inbola
    usermod -aG sudo inbola
    print_success "User 'inbola' created"
else
    print_warning "User 'inbola' already exists"
fi

# Create application directories
print_status "Creating application directories..."
mkdir -p /var/www/inbola
mkdir -p /var/log/inbola
mkdir -p /var/lib/inbola/uploads
chown -R inbola:inbola /var/www/inbola
chown -R inbola:inbola /var/log/inbola
chown -R inbola:inbola /var/lib/inbola

# Configure PostgreSQL
print_status "Configuring PostgreSQL..."
sudo -u postgres psql -c "CREATE USER inbola_user WITH PASSWORD 'change_this_password';"
sudo -u postgres psql -c "CREATE DATABASE inbola_production OWNER inbola_user;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE inbola_production TO inbola_user;"

# Configure Redis
print_status "Configuring Redis..."
sed -i 's/# maxmemory <bytes>/maxmemory 256mb/' /etc/redis/redis.conf
sed -i 's/# maxmemory-policy noeviction/maxmemory-policy allkeys-lru/' /etc/redis/redis.conf
systemctl restart redis-server

# Configure firewall
print_status "Configuring UFW firewall..."
ufw --force enable
ufw allow ssh
ufw allow 80
ufw allow 443
ufw allow 5000  # API port
ufw allow 3000  # Next.js port

# Configure Nginx
print_status "Configuring Nginx..."
rm -f /etc/nginx/sites-enabled/default

# Create basic Nginx config
cat > /etc/nginx/sites-available/inbola-temp << 'EOF'
server {
    listen 80;
    server_name inbola.uz www.inbola.uz;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    location /graphql {
        proxy_pass http://localhost:5000/graphql;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

ln -sf /etc/nginx/sites-available/inbola-temp /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Set up log rotation
print_status "Setting up log rotation..."
cat > /etc/logrotate.d/inbola << 'EOF'
/var/log/inbola/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 inbola inbola
    postrotate
        pm2 reloadLogs
    endscript
}
EOF

# Create systemd service for PM2
print_status "Creating systemd service for PM2..."
cat > /etc/systemd/system/inbola.service << 'EOF'
[Unit]
Description=Inbola E-commerce Application
After=network.target

[Service]
Type=forking
User=inbola
WorkingDirectory=/var/www/inbola
ExecStart=/usr/bin/pm2 start ecosystem.config.js --env production
ExecReload=/usr/bin/pm2 reload ecosystem.config.js --env production
ExecStop=/usr/bin/pm2 stop ecosystem.config.js
PIDFile=/var/www/inbola/.pm2/pm2.pid
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable inbola

# Set up automatic security updates
print_status "Setting up automatic security updates..."
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades

# Install fail2ban for security
print_status "Installing fail2ban..."
apt install -y fail2ban

cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log

[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log

[nginx-limit-req]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 10
EOF

systemctl enable fail2ban
systemctl start fail2ban

# Create deployment script
print_status "Creating deployment helper script..."
cat > /usr/local/bin/inbola-deploy << 'EOF'
#!/bin/bash
cd /var/www/inbola
sudo -u inbola ./scripts/deploy.sh
EOF

chmod +x /usr/local/bin/inbola-deploy

# Create backup script
print_status "Creating backup script..."
cat > /usr/local/bin/inbola-backup << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/inbola"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup database
sudo -u postgres pg_dump inbola_production > $BACKUP_DIR/db_$DATE.sql

# Backup uploads
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz -C /var/lib/inbola uploads/

# Keep only last 7 days of backups
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /usr/local/bin/inbola-backup

# Set up daily backup cron
print_status "Setting up daily backup cron..."
echo "0 2 * * * root /usr/local/bin/inbola-backup" >> /etc/crontab

# Install monitoring tools
print_status "Installing monitoring tools..."
apt install -y htop iotop nethogs

# Create environment file template
print_status "Creating environment file template..."
cat > /var/www/inbola/.env.production.template << 'EOF'
# Copy this file to .env.production and fill in your actual values

# Database
DATABASE_URL="postgresql://inbola_user:CHANGE_THIS_PASSWORD@localhost:5432/inbola_production?schema=public"

# JWT Secrets (Generate strong random strings)
JWT_SECRET="GENERATE_STRONG_SECRET_HERE"
JWT_REFRESH_SECRET="GENERATE_STRONG_REFRESH_SECRET_HERE"

# AWS Configuration
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="inbola-assets"

# Email (AWS SES)
SMTP_HOST="email-smtp.us-east-1.amazonaws.com"
SMTP_PORT=587
SMTP_USER="your-ses-smtp-username"
SMTP_PASS="your-ses-smtp-password"
FROM_EMAIL="noreply@inbola.uz"

# Payment
STRIPE_SECRET_KEY="sk_live_your_stripe_secret_key"

# Domain
CORS_ORIGIN="https://www.inbola.uz,https://inbola.uz"
EOF

chown inbola:inbola /var/www/inbola/.env.production.template

print_success "🎉 Production environment setup completed!"
print_status ""
print_status "Next steps:"
print_status "1. Clone your repository to /var/www/inbola"
print_status "2. Copy .env.production.template to .env.production and fill in values"
print_status "3. Run: inbola-deploy"
print_status "4. Set up SSL: certbot --nginx -d inbola.uz -d www.inbola.uz"
print_status "5. Configure your domain DNS to point to this server"
print_status ""
print_status "Useful commands:"
print_status "- Deploy: inbola-deploy"
print_status "- Backup: inbola-backup"
print_status "- Logs: pm2 logs"
print_status "- Status: systemctl status inbola"
print_status ""
print_warning "Security reminders:"
print_status "- Change default PostgreSQL password"
print_status "- Generate strong JWT secrets"
print_status "- Configure AWS services"
print_status "- Set up monitoring and alerts"

echo ""
print_success "Setup completed! 🚀"
