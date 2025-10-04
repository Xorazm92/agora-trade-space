#!/bin/bash

# Inbola E-commerce Quick Deploy Script
# Usage: ./quick-deploy.sh

set -e

echo "🚀 Inbola E-commerce Quick Deploy"
echo "================================="

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_info() {
    echo -e "${YELLOW}[INFO]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Step 1: Install dependencies
print_step "1/6 Installing dependencies..."
npm install

print_step "Installing server dependencies..."
cd src/server && npm install && cd ../..

print_step "Installing client dependencies..."
cd src/client && npm install && cd ../..

# Step 2: Environment setup
print_step "2/6 Setting up environment..."
if [ ! -f ".env.production" ]; then
    cp .env.production.template .env.production 2>/dev/null || true
    print_info "Created .env.production - please update with your values"
fi

if [ ! -f "src/server/.env.production" ]; then
    print_info "Please ensure src/server/.env.production exists with production values"
fi

if [ ! -f "src/client/.env.production" ]; then
    print_info "Please ensure src/client/.env.production exists with production values"
fi

# Step 3: Database setup
print_step "3/6 Setting up database..."
cd src/server
npx prisma generate
npx prisma migrate deploy

# Ask about seeding
read -p "Do you want to seed the database with sample data? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run seed
    print_success "Database seeded"
fi
cd ../..

# Step 4: Build applications
print_step "4/6 Building applications..."
print_step "Building server..."
cd src/server && npm run build && cd ../..

print_step "Building client..."
cd src/client && npm run build && cd ../..

# Step 5: PM2 setup
print_step "5/6 Setting up PM2..."

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    print_info "Installing PM2..."
    npm install -g pm2
fi

# Create ecosystem file
cat > ecosystem.config.js << 'EOF'
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
      error_file: './logs/server-error.log',
      out_file: './logs/server-out.log',
      log_file: './logs/server-combined.log',
      time: true,
      max_memory_restart: '1G'
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
      error_file: './logs/client-error.log',
      out_file: './logs/client-out.log',
      log_file: './logs/client-combined.log',
      time: true
    }
  ]
};
EOF

# Create logs directory
mkdir -p logs

# Stop existing processes
pm2 stop ecosystem.config.js 2>/dev/null || true
pm2 delete ecosystem.config.js 2>/dev/null || true

# Start applications
pm2 start ecosystem.config.js --env production
pm2 save

# Step 6: Final setup
print_step "6/6 Final setup..."

print_success "🎉 Deploy completed successfully!"
echo ""
print_info "Application Status:"
pm2 status

echo ""
print_info "Application URLs:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"
echo "  GraphQL:  http://localhost:5000/graphql"

echo ""
print_info "Useful Commands:"
echo "  View logs:    pm2 logs"
echo "  Restart:      pm2 restart ecosystem.config.js"
echo "  Stop:         pm2 stop ecosystem.config.js"
echo "  Monitor:      pm2 monit"
echo "  Status:       pm2 status"

echo ""
print_info "Next Steps for Production:"
echo "  1. Configure your domain DNS"
echo "  2. Set up SSL certificates"
echo "  3. Configure Nginx reverse proxy"
echo "  4. Set up monitoring and backups"
echo "  5. Configure AWS services (RDS, S3, SES)"

echo ""
print_success "Inbola E-commerce is now running! 🚀"
