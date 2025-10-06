#!/bin/bash

# =========================================
# Inbola E-commerce Quick Deploy Script for AWS Lightsail
# =========================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# Check if running on AWS Lightsail
check_environment() {
    log_info "Checking environment..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    log_success "Environment check passed!"
}

# Setup environment variables
setup_env() {
    log_info "Setting up environment variables..."
    
    if [ ! -f ".env.production" ]; then
        cp .env.production.example .env.production
        
        # Generate secure passwords
        POSTGRES_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
        REDIS_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
        
        # Update .env.production
        sed -i "s/your_secure_postgres_password_here/$POSTGRES_PASSWORD/g" .env.production
        sed -i "s/your_secure_redis_password_here/$REDIS_PASSWORD/g" .env.production
        
        log_success "Environment variables configured!"
        log_warning "Please update .env.production with your actual domain and API keys!"
    else
        log_info "Environment file already exists, skipping..."
    fi
}

# Create necessary directories
create_directories() {
    log_info "Creating directories..."
    
    mkdir -p nginx/logs
    mkdir -p nginx/ssl
    mkdir -p backups
    
    log_success "Directories created!"
}

# Build and start services
deploy() {
    log_info "Building and deploying services..."
    
    # Stop any running services
    docker-compose -f docker-compose.production.yml down 2>/dev/null || true
    
    # Build services
    log_info "Building Docker images..."
    docker-compose -f docker-compose.production.yml build --no-cache
    
    # Start services
    log_info "Starting services..."
    docker-compose -f docker-compose.production.yml up -d
    
    # Wait for services to be ready
    log_info "Waiting for services to start..."
    sleep 30
    
    # Check if services are running
    if docker-compose -f docker-compose.production.yml ps | grep -q "Up"; then
        log_success "Services started successfully!"
    else
        log_error "Some services failed to start!"
        docker-compose -f docker-compose.production.yml logs
        exit 1
    fi
}

# Run database migrations and seed
setup_database() {
    log_info "Setting up database..."
    
    # Wait for database to be ready
    log_info "Waiting for database to be ready..."
    sleep 10
    
    # Run migrations
    log_info "Running database migrations..."
    docker-compose -f docker-compose.production.yml exec -T server npx prisma migrate deploy || {
        log_warning "Migration failed, trying to push schema..."
        docker-compose -f docker-compose.production.yml exec -T server npx prisma db push --force-reset
    }
    
    # Generate Prisma client
    log_info "Generating Prisma client..."
    docker-compose -f docker-compose.production.yml exec -T server npx prisma generate
    
    # Seed database
    log_info "Seeding database..."
    docker-compose -f docker-compose.production.yml exec -T server npm run seed || {
        log_warning "Seeding failed, but continuing..."
    }
    
    log_success "Database setup completed!"
}

# Show deployment info
show_info() {
    log_success "🎉 Inbola E-commerce deployed successfully!"
    echo ""
    echo "=== DEPLOYMENT INFORMATION ==="
    echo "Local URL: http://localhost (redirects to http://localhost/uz)"
    echo "API: http://localhost/api"
    echo "GraphQL: http://localhost/graphql"
    echo ""
    echo "=== MANAGEMENT COMMANDS ==="
    echo "View logs:    docker-compose -f docker-compose.production.yml logs -f"
    echo "Stop:         docker-compose -f docker-compose.production.yml down"
    echo "Restart:      docker-compose -f docker-compose.production.yml restart"
    echo "Status:       docker-compose -f docker-compose.production.yml ps"
    echo ""
    echo "=== NEXT STEPS ==="
    echo "1. Point your domain to this server's IP address"
    echo "2. Update .env.production with your actual domain"
    echo "3. Run ./deploy-lightsail.sh for full production setup with SSL"
    echo "4. Configure payment gateways and email settings"
    echo ""
    log_warning "For production use, please run ./deploy-lightsail.sh to set up SSL certificates!"
}

# Main execution
main() {
    log_info "Starting Inbola E-commerce quick deployment..."
    
    check_environment
    setup_env
    create_directories
    deploy
    setup_database
    show_info
}

# Run main function
main "$@"
