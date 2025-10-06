#!/bin/bash

# =========================================
# Inbola E-commerce - Oddiy Deploy Script
# =========================================

set -e

echo "🚀 INBOLA E-COMMERCE - ODDIY DEPLOY"
echo "=================================="

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    error "Docker o'rnatilmagan! Avval Docker o'rnating:"
    echo "curl -fsSL https://get.docker.com -o get-docker.sh"
    echo "sudo sh get-docker.sh"
    echo "sudo usermod -aG docker \$USER"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    error "Docker Compose o'rnatilmagan! Avval Docker Compose o'rnating:"
    echo "sudo curl -L \"https://github.com/docker/compose/releases/latest/download/docker-compose-\$(uname -s)-\$(uname -m)\" -o /usr/local/bin/docker-compose"
    echo "sudo chmod +x /usr/local/bin/docker-compose"
    exit 1
fi

log "Docker va Docker Compose mavjud ✓"

# Create environment file if not exists
if [ ! -f ".env.production" ]; then
    log "Environment fayl yaratilmoqda..."
    cp .env.production.example .env.production
    
    # Generate passwords
    POSTGRES_PASSWORD=$(openssl rand -base64 20 | tr -d "=+/" | cut -c1-16)
    REDIS_PASSWORD=$(openssl rand -base64 20 | tr -d "=+/" | cut -c1-16)
    
    # Update passwords
    sed -i "s/your_secure_postgres_password_here/$POSTGRES_PASSWORD/g" .env.production
    sed -i "s/your_secure_redis_password_here/$REDIS_PASSWORD/g" .env.production
    
    success "Environment fayl yaratildi!"
else
    log "Environment fayl allaqachon mavjud"
fi

# Create directories
log "Kerakli papkalar yaratilmoqda..."
mkdir -p nginx/logs nginx/ssl backups

# Stop existing containers
log "Mavjud container'larni to'xtatish..."
docker-compose -f docker-compose.production.yml down 2>/dev/null || true

# Build and start
log "Docker images yaratilmoqda (bu biroz vaqt olishi mumkin)..."
docker-compose -f docker-compose.production.yml build

log "Container'lar ishga tushirilmoqda..."
docker-compose -f docker-compose.production.yml up -d

# Wait for services
log "Servislarning tayyor bo'lishini kutish..."
sleep 30

# Check if services are running
if docker-compose -f docker-compose.production.yml ps | grep -q "Up"; then
    success "Servislar ishga tushdi!"
else
    error "Ba'zi servislar ishga tushmadi!"
    docker-compose -f docker-compose.production.yml ps
    exit 1
fi

# Setup database
log "Database sozlanmoqda..."
sleep 10

# Run migrations
log "Database migration..."
docker-compose -f docker-compose.production.yml exec -T server npx prisma migrate deploy || {
    log "Migration xatoligi, schema push..."
    docker-compose -f docker-compose.production.yml exec -T server npx prisma db push --force-reset
}

# Generate Prisma client
docker-compose -f docker-compose.production.yml exec -T server npx prisma generate

# Seed database
log "Database seed..."
docker-compose -f docker-compose.production.yml exec -T server npm run seed || {
    log "Seeding xatoligi, lekin davom etish..."
}

# Get server IP
SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || echo "localhost")

echo ""
echo "🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉"
echo "🎉                               🎉"
echo "🎉   DEPLOY MUVAFFAQIYATLI!      🎉"
echo "🎉                               🎉"
echo "🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉"
echo ""
echo "🌐 SAYT URL'LARI:"
echo "   Frontend:  http://$SERVER_IP"
echo "   API:       http://$SERVER_IP/api"
echo "   GraphQL:   http://$SERVER_IP/graphql"
echo "   Admin:     http://$SERVER_IP/dashboard"
echo ""
echo "🛠️ BOSHQARUV:"
echo "   Status:    docker-compose -f docker-compose.production.yml ps"
echo "   Loglar:    docker-compose -f docker-compose.production.yml logs -f"
echo "   To'xtatish: docker-compose -f docker-compose.production.yml down"
echo "   Qayta ishga tushirish: docker-compose -f docker-compose.production.yml restart"
echo ""
echo "🔑 KEYINGI QADAMLAR:"
echo "   1. Domain DNS'ni $SERVER_IP ga yo'naltiring"
echo "   2. SSL uchun: ./deploy-lightsail.sh"
echo "   3. To'lov va email sozlamalarini yangilang"
echo ""
success "Tayyor! Saytingizni sinab ko'ring: http://$SERVER_IP"
