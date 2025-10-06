#!/bin/bash

# =========================================
# Inbola E-commerce AWS Lightsail Deploy Script
# =========================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="inbola"
DOMAIN="inbola.uz"
EMAIL="admin@inbola.uz"
BACKUP_DIR="/opt/inbola/backups"
LOG_DIR="/opt/inbola/logs"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_requirements() {
    log_info "Checking system requirements..."
    
    # Check if running as root or with sudo
    if [[ $EUID -eq 0 ]]; then
        log_error "This script should not be run as root. Please run as a regular user with sudo privileges."
        exit 1
    fi
    
    # Check sudo access
    if ! sudo -n true 2>/dev/null; then
        log_error "This script requires sudo privileges. Please run with a user that has sudo access."
        exit 1
    fi
    
    # Check required commands
    local required_commands=("docker" "docker-compose" "git" "curl" "openssl")
    for cmd in "${required_commands[@]}"; do
        if ! command -v $cmd &> /dev/null; then
            log_error "$cmd is not installed. Please install it first."
            exit 1
        fi
    done
    
    log_success "All requirements met!"
}

install_dependencies() {
    log_info "Installing system dependencies..."
    
    # Update system
    sudo apt update && sudo apt upgrade -y
    
    # Install required packages
    sudo apt install -y \
        curl \
        wget \
        git \
        unzip \
        software-properties-common \
        apt-transport-https \
        ca-certificates \
        gnupg \
        lsb-release \
        ufw \
        fail2ban \
        htop \
        nano \
        certbot \
        python3-certbot-nginx
    
    # Install Docker if not present
    if ! command -v docker &> /dev/null; then
        log_info "Installing Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo usermod -aG docker $USER
        rm get-docker.sh
    fi
    
    # Install Docker Compose if not present
    if ! command -v docker-compose &> /dev/null; then
        log_info "Installing Docker Compose..."
        sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    fi
    
    log_success "Dependencies installed!"
}

setup_firewall() {
    log_info "Configuring firewall..."
    
    # Reset UFW to default
    sudo ufw --force reset
    
    # Default policies
    sudo ufw default deny incoming
    sudo ufw default allow outgoing
    
    # Allow SSH (be careful!)
    sudo ufw allow ssh
    
    # Allow HTTP and HTTPS
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    
    # Enable firewall
    sudo ufw --force enable
    
    log_success "Firewall configured!"
}

setup_fail2ban() {
    log_info "Configuring Fail2Ban..."
    
    # Create custom jail configuration
    sudo tee /etc/fail2ban/jail.local > /dev/null <<EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5
backend = systemd

[sshd]
enabled = true
port = ssh
logpath = %(sshd_log)s
backend = %(sshd_backend)s

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /opt/inbola/logs/nginx/error.log

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
port = http,https
logpath = /opt/inbola/logs/nginx/error.log
maxretry = 10
EOF
    
    # Restart fail2ban
    sudo systemctl restart fail2ban
    sudo systemctl enable fail2ban
    
    log_success "Fail2Ban configured!"
}

create_directories() {
    log_info "Creating project directories..."
    
    # Create main directories
    sudo mkdir -p /opt/inbola/{backups,logs/nginx,ssl,data}
    
    # Set permissions
    sudo chown -R $USER:$USER /opt/inbola
    chmod -R 755 /opt/inbola
    
    log_success "Directories created!"
}

setup_ssl() {
    log_info "Setting up SSL certificates..."
    
    # Stop any running nginx
    sudo systemctl stop nginx 2>/dev/null || true
    docker-compose -f docker-compose.production.yml down 2>/dev/null || true
    
    # Get SSL certificate
    sudo certbot certonly --standalone \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        -d $DOMAIN \
        -d www.$DOMAIN
    
    # Copy certificates to project directory
    sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem /opt/inbola/ssl/
    sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem /opt/inbola/ssl/
    
    # Set permissions
    sudo chown -R $USER:$USER /opt/inbola/ssl
    chmod 600 /opt/inbola/ssl/*
    
    # Setup auto-renewal
    sudo crontab -l 2>/dev/null | { cat; echo "0 12 * * * /usr/bin/certbot renew --quiet --deploy-hook 'docker-compose -f /opt/inbola/docker-compose.production.yml restart nginx'"; } | sudo crontab -
    
    log_success "SSL certificates configured!"
}

setup_environment() {
    log_info "Setting up environment variables..."
    
    # Copy environment files
    cp .env.production.example .env.production
    
    # Generate secure passwords
    POSTGRES_PASSWORD=$(openssl rand -base64 32)
    REDIS_PASSWORD=$(openssl rand -base64 32)
    
    # Update .env.production
    sed -i "s/your_secure_postgres_password_here/$POSTGRES_PASSWORD/g" .env.production
    sed -i "s/your_secure_redis_password_here/$REDIS_PASSWORD/g" .env.production
    sed -i "s/inbola.uz/$DOMAIN/g" .env.production
    sed -i "s/admin@inbola.uz/$EMAIL/g" .env.production
    
    # Update server environment
    sed -i "s/localhost:5432/postgres:5432/g" src/server/.env.production
    sed -i "s/localhost:6379/redis:6379/g" src/server/.env.production
    sed -i "s/inbola_password/$POSTGRES_PASSWORD/g" src/server/.env.production
    
    log_success "Environment configured!"
}

build_and_deploy() {
    log_info "Building and deploying application..."
    
    # Copy SSL certificates to nginx directory
    mkdir -p nginx/ssl
    cp /opt/inbola/ssl/* nginx/ssl/
    
    # Create logs directory
    mkdir -p nginx/logs
    
    # Build and start services
    docker-compose -f docker-compose.production.yml build --no-cache
    docker-compose -f docker-compose.production.yml up -d
    
    # Wait for services to start
    log_info "Waiting for services to start..."
    sleep 30
    
    # Run database migrations
    log_info "Running database migrations..."
    docker-compose -f docker-compose.production.yml exec -T server npm run prisma:migrate
    
    # Seed database
    log_info "Seeding database..."
    docker-compose -f docker-compose.production.yml exec -T server npm run seed
    
    log_success "Application deployed!"
}

setup_monitoring() {
    log_info "Setting up monitoring and logging..."
    
    # Create log rotation configuration
    sudo tee /etc/logrotate.d/inbola > /dev/null <<EOF
/opt/inbola/logs/nginx/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
    postrotate
        docker-compose -f /opt/inbola/docker-compose.production.yml exec nginx nginx -s reload
    endscript
}
EOF
    
    # Create backup script
    sudo tee /opt/inbola/backup.sh > /dev/null <<'EOF'
#!/bin/bash
BACKUP_DIR="/opt/inbola/backups"
DATE=$(date +%Y%m%d_%H%M%S)
POSTGRES_PASSWORD=$(grep POSTGRES_PASSWORD /opt/inbola/.env.production | cut -d'=' -f2)

# Create backup
docker exec inbola_postgres pg_dump -U inbola_user -d inbola_db > "$BACKUP_DIR/backup_$DATE.sql"

# Compress backup
gzip "$BACKUP_DIR/backup_$DATE.sql"

# Remove old backups (keep 30 days)
find "$BACKUP_DIR" -name "backup_*.sql.gz" -mtime +30 -delete

echo "Backup completed: backup_$DATE.sql.gz"
EOF
    
    chmod +x /opt/inbola/backup.sh
    
    # Setup daily backup cron
    (crontab -l 2>/dev/null; echo "0 2 * * * /opt/inbola/backup.sh") | crontab -
    
    # Create health check script
    sudo tee /opt/inbola/health-check.sh > /dev/null <<'EOF'
#!/bin/bash
cd /opt/inbola

# Check if all services are running
if ! docker-compose -f docker-compose.production.yml ps | grep -q "Up"; then
    echo "Some services are down. Restarting..."
    docker-compose -f docker-compose.production.yml restart
fi

# Check website availability
if ! curl -f -s https://inbola.uz/health > /dev/null; then
    echo "Website is not responding. Restarting nginx..."
    docker-compose -f docker-compose.production.yml restart nginx
fi
EOF
    
    chmod +x /opt/inbola/health-check.sh
    
    # Setup health check cron (every 5 minutes)
    (crontab -l 2>/dev/null; echo "*/5 * * * * /opt/inbola/health-check.sh") | crontab -
    
    log_success "Monitoring configured!"
}

create_management_scripts() {
    log_info "Creating management scripts..."
    
    # Create start script
    tee start.sh > /dev/null <<'EOF'
#!/bin/bash
cd /opt/inbola
docker-compose -f docker-compose.production.yml up -d
echo "Inbola started successfully!"
EOF
    
    # Create stop script
    tee stop.sh > /dev/null <<'EOF'
#!/bin/bash
cd /opt/inbola
docker-compose -f docker-compose.production.yml down
echo "Inbola stopped successfully!"
EOF
    
    # Create restart script
    tee restart.sh > /dev/null <<'EOF'
#!/bin/bash
cd /opt/inbola
docker-compose -f docker-compose.production.yml restart
echo "Inbola restarted successfully!"
EOF
    
    # Create logs script
    tee logs.sh > /dev/null <<'EOF'
#!/bin/bash
cd /opt/inbola
docker-compose -f docker-compose.production.yml logs -f
EOF
    
    # Create status script
    tee status.sh > /dev/null <<'EOF'
#!/bin/bash
cd /opt/inbola
echo "=== Docker Services ==="
docker-compose -f docker-compose.production.yml ps
echo ""
echo "=== System Resources ==="
df -h
echo ""
free -h
echo ""
echo "=== Recent Logs ==="
docker-compose -f docker-compose.production.yml logs --tail=10
EOF
    
    # Make scripts executable
    chmod +x *.sh
    
    # Copy to /opt/inbola
    sudo cp *.sh /opt/inbola/
    
    log_success "Management scripts created!"
}

show_completion_info() {
    log_success "🎉 Inbola E-commerce deployment completed successfully!"
    echo ""
    echo "=== DEPLOYMENT INFORMATION ==="
    echo "Domain: https://$DOMAIN"
    echo "Admin Panel: https://$DOMAIN/dashboard"
    echo "API: https://$DOMAIN/api"
    echo "GraphQL: https://$DOMAIN/graphql"
    echo ""
    echo "=== MANAGEMENT COMMANDS ==="
    echo "Start:   sudo /opt/inbola/start.sh"
    echo "Stop:    sudo /opt/inbola/stop.sh"
    echo "Restart: sudo /opt/inbola/restart.sh"
    echo "Logs:    sudo /opt/inbola/logs.sh"
    echo "Status:  sudo /opt/inbola/status.sh"
    echo ""
    echo "=== IMPORTANT FILES ==="
    echo "Project Directory: /opt/inbola"
    echo "Backups: /opt/inbola/backups"
    echo "Logs: /opt/inbola/logs"
    echo "SSL Certificates: /opt/inbola/ssl"
    echo ""
    echo "=== NEXT STEPS ==="
    echo "1. Update DNS records to point $DOMAIN to this server's IP"
    echo "2. Configure payment gateways in src/server/.env.production"
    echo "3. Set up email SMTP settings"
    echo "4. Test the application thoroughly"
    echo ""
    log_warning "Please save the generated passwords from .env.production file!"
}

# Main execution
main() {
    log_info "Starting Inbola E-commerce deployment on AWS Lightsail..."
    
    check_requirements
    install_dependencies
    setup_firewall
    setup_fail2ban
    create_directories
    
    # Copy project to /opt/inbola
    log_info "Copying project files..."
    sudo cp -r . /opt/inbola/
    sudo chown -R $USER:$USER /opt/inbola
    cd /opt/inbola
    
    setup_ssl
    setup_environment
    build_and_deploy
    setup_monitoring
    create_management_scripts
    
    show_completion_info
}

# Run main function
main "$@"
