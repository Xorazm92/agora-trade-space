#!/bin/bash

# E-commerce Platform Deployment Script
set -e

echo "🚀 Starting E-commerce Platform Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Navigate to project directory
cd "$(dirname "$0")/src"

# Check if production environment files exist
if [ ! -f "./server/.env.production" ]; then
    print_error "Production environment file not found: ./server/.env.production"
    print_warning "Please copy and configure the production environment file:"
    print_warning "cp ./server/.env.production.example ./server/.env.production"
    exit 1
fi

if [ ! -f "./client/.env.production" ]; then
    print_error "Production environment file not found: ./client/.env.production"
    print_warning "Please copy and configure the production environment file:"
    print_warning "cp ./client/.env.production.example ./client/.env.production"
    exit 1
fi

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down

# Pull latest images
print_status "Pulling latest base images..."
docker-compose -f docker-compose.prod.yml pull

# Build and start services
print_status "Building and starting services..."
docker-compose -f docker-compose.prod.yml up --build -d

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 30

# Run database migrations
print_status "Running database migrations..."
docker-compose -f docker-compose.prod.yml exec server npx prisma migrate deploy

# Seed database (optional)
read -p "Do you want to seed the database with sample data? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Seeding database..."
    docker-compose -f docker-compose.prod.yml exec server npm run seed
fi

# Check service health
print_status "Checking service health..."
if curl -f http://localhost:5000/health > /dev/null 2>&1; then
    print_status "✅ Backend service is healthy"
else
    print_error "❌ Backend service health check failed"
fi

if curl -f http://localhost:3000 > /dev/null 2>&1; then
    print_status "✅ Frontend service is healthy"
else
    print_error "❌ Frontend service health check failed"
fi

print_status "🎉 Deployment completed!"
print_status "Frontend: http://localhost:3000"
print_status "Backend API: http://localhost:5000"
print_status "API Documentation: http://localhost:5000/api-docs"

print_warning "⚠️  Remember to:"
print_warning "1. Configure SSL certificates in nginx/ssl/"
print_warning "2. Update domain names in configuration files"
print_warning "3. Set up proper DNS records"
print_warning "4. Configure firewall rules"
print_warning "5. Set up monitoring and logging"
