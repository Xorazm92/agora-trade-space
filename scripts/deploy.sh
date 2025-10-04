#!/bin/bash

# Inbola E-commerce Production Deploy Script
# Usage: ./scripts/deploy.sh

set -e  # Exit on any error

echo "🚀 Starting Inbola E-commerce Production Deploy..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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
if [ "$EUID" -eq 0 ]; then
    print_error "Please don't run this script as root"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version)
print_status "Node.js version: $NODE_VERSION"

if ! node -e "process.exit(process.version.slice(1).split('.')[0] < 18)"; then
    print_error "Node.js 18+ is required"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Load environment variables
if [ -f ".env.production" ]; then
    print_status "Loading production environment variables..."
    export $(cat .env.production | grep -v '^#' | xargs)
else
    print_warning "No .env.production file found"
fi

# Install root dependencies
print_status "Installing root dependencies..."
npm install

# Install server dependencies
print_status "Installing server dependencies..."
cd src/server
npm install
cd ../..

# Install client dependencies
print_status "Installing client dependencies..."
cd src/client
npm install
cd ../..

# Run database migrations
print_status "Running database migrations..."
cd src/server
npx prisma generate
npx prisma migrate deploy
cd ../..

# Seed database (optional)
read -p "Do you want to seed the database? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Seeding database..."
    cd src/server
    npm run seed
    cd ../..
fi

# Build the application
print_status "Building server..."
cd src/server
npm run build
cd ../..

print_status "Building client..."
cd src/client
npm run build
cd ../..

# Create production directories
print_status "Creating production directories..."
mkdir -p /var/log/inbola
mkdir -p /var/lib/inbola/uploads

# Set up PM2 ecosystem
print_status "Setting up PM2 configuration..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'inbola-server',
      script: './src/server/dist/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      error_file: '/var/log/inbola/server-error.log',
      out_file: '/var/log/inbola/server-out.log',
      log_file: '/var/log/inbola/server-combined.log',
      time: true,
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024'
    },
    {
      name: 'inbola-client',
      script: 'npm',
      args: 'start',
      cwd: './src/client',
      instances: 1,
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/inbola/client-error.log',
      out_file: '/var/log/inbola/client-out.log',
      log_file: '/var/log/inbola/client-combined.log',
      time: true
    }
  ]
};
EOF

# Install PM2 if not installed
if ! command -v pm2 &> /dev/null; then
    print_status "Installing PM2..."
    npm install -g pm2
fi

# Stop existing processes
print_status "Stopping existing processes..."
pm2 stop ecosystem.config.js || true
pm2 delete ecosystem.config.js || true

# Start the application
print_status "Starting Inbola application..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save
pm2 startup

# Set up Nginx configuration
print_status "Setting up Nginx configuration..."
sudo tee /etc/nginx/sites-available/inbola.uz << EOF
# Inbola E-commerce Nginx Configuration
server {
    listen 80;
    server_name inbola.uz www.inbola.uz;
    
    # Redirect HTTP to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.inbola.uz;
    
    # SSL Configuration (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/www.inbola.uz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.inbola.uz/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Client (Next.js)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }
    
    # API (GraphQL Server)
    location /graphql {
        proxy_pass http://localhost:5000/graphql;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
    
    # Static files
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    
    # Uploads
    location /uploads {
        alias /var/lib/inbola/uploads;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Favicon and robots
    location = /favicon.ico {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location = /robots.txt {
        proxy_pass http://localhost:3000;
        expires 1d;
    }
}

# Redirect non-www to www
server {
    listen 443 ssl http2;
    server_name inbola.uz;
    
    ssl_certificate /etc/letsencrypt/live/www.inbola.uz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.inbola.uz/privkey.pem;
    
    return 301 https://www.inbola.uz\$request_uri;
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/inbola.uz /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

print_success "🎉 Inbola E-commerce deployed successfully!"
print_status "Application is running on:"
print_status "  - Frontend: http://localhost:3000"
print_status "  - Backend: http://localhost:5000"
print_status "  - Production: https://www.inbola.uz"
print_status ""
print_status "Useful commands:"
print_status "  - View logs: pm2 logs"
print_status "  - Restart: pm2 restart ecosystem.config.js"
print_status "  - Stop: pm2 stop ecosystem.config.js"
print_status "  - Monitor: pm2 monit"
print_status ""
print_warning "Don't forget to:"
print_status "  1. Set up SSL certificates with Let's Encrypt"
print_status "  2. Configure your AWS services (RDS, S3, SES)"
print_status "  3. Update DNS records to point to your server"
print_status "  4. Set up monitoring and backups"

echo ""
print_success "Deploy completed! 🚀"
