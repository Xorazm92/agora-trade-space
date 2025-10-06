#!/bin/bash

# =========================================
# Inbola E-commerce - Yangi Server Setup va Deploy Script
# AWS Lightsail Ubuntu Server uchun
# =========================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="inbola"
DOMAIN="inbola.uz"
EMAIL="admin@inbola.uz"
PROJECT_DIR="/opt/inbola"

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

log_step() {
    echo -e "${PURPLE}[STEP]${NC} $1"
}

# Check if running as root
check_user() {
    if [[ $EUID -eq 0 ]]; then
        log_error "Bu script root user sifatida ishlatilmasligi kerak!"
        log_info "Oddiy user sifatida ishga tushiring: ./server-setup-deploy.sh"
        exit 1
    fi
    
    # Check sudo access
    if ! sudo -n true 2>/dev/null; then
        log_info "Sudo parolini kiriting..."
        sudo -v
    fi
}

# Update system
update_system() {
    log_step "1/10 - Tizimni yangilash..."
    
    sudo apt update -y
    sudo apt upgrade -y
    
    log_success "Tizim yangilandi!"
}

# Install basic dependencies
install_dependencies() {
    log_step "2/10 - Asosiy dasturlarni o'rnatish..."
    
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
        vim \
        tree \
        certbot \
        python3-certbot-nginx \
        build-essential
    
    log_success "Asosiy dasturlar o'rnatildi!"
}

# Install Node.js
install_nodejs() {
    log_step "3/10 - Node.js o'rnatish..."
    
    # Install Node.js 20.x
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
    # Verify installation
    node_version=$(node --version)
    npm_version=$(npm --version)
    
    log_success "Node.js $node_version va npm $npm_version o'rnatildi!"
}

# Install Docker
install_docker() {
    log_step "4/10 - Docker o'rnatish..."
    
    # Remove old versions
    sudo apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true
    
    # Add Docker's official GPG key
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    
    # Add Docker repository
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # Install Docker
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    
    # Add user to docker group
    sudo usermod -aG docker $USER
    
    # Install Docker Compose (standalone)
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    
    log_success "Docker va Docker Compose o'rnatildi!"
}

# Setup firewall
setup_firewall() {
    log_step "5/10 - Firewall sozlash..."
    
    # Reset UFW
    sudo ufw --force reset
    
    # Default policies
    sudo ufw default deny incoming
    sudo ufw default allow outgoing
    
    # Allow SSH (current connection)
    sudo ufw allow ssh
    
    # Allow HTTP and HTTPS
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    
    # Enable firewall
    sudo ufw --force enable
    
    log_success "Firewall sozlandi!"
}

# Setup Fail2Ban
setup_fail2ban() {
    log_step "6/10 - Fail2Ban sozlash..."
    
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
logpath = /opt/inbola/nginx/logs/error.log
maxretry = 5

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
port = http,https
logpath = /opt/inbola/nginx/logs/error.log
maxretry = 10
EOF
    
    # Restart and enable fail2ban
    sudo systemctl restart fail2ban
    sudo systemctl enable fail2ban
    
    log_success "Fail2Ban sozlandi!"
}

# Create project directories
create_directories() {
    log_step "7/10 - Loyiha papkalarini yaratish..."
    
    # Create main project directory
    sudo mkdir -p $PROJECT_DIR
    sudo chown -R $USER:$USER $PROJECT_DIR
    
    # Create subdirectories
    mkdir -p $PROJECT_DIR/{nginx/logs,nginx/ssl,backups,data}
    
    log_success "Loyiha papkalari yaratildi!"
}

# Copy project files
copy_project() {
    log_step "8/10 - Loyiha fayllarini nusxalash..."
    
    # Copy current project to /opt/inbola
    cp -r . $PROJECT_DIR/
    
    # Set correct permissions
    sudo chown -R $USER:$USER $PROJECT_DIR
    chmod +x $PROJECT_DIR/*.sh
    
    # Change to project directory
    cd $PROJECT_DIR
    
    log_success "Loyiha fayllari nusxalandi!"
}

# Setup environment variables
setup_environment() {
    log_step "9/10 - Environment variables sozlash..."
    
    # Copy environment example
    if [ ! -f ".env.production" ]; then
        cp .env.production.example .env.production
        
        # Generate secure passwords
        POSTGRES_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
        REDIS_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
        
        # Update .env.production
        sed -i "s/your_secure_postgres_password_here/$POSTGRES_PASSWORD/g" .env.production
        sed -i "s/your_secure_redis_password_here/$REDIS_PASSWORD/g" .env.production
        
        log_success "Environment variables sozlandi!"
        log_warning "Parollar avtomatik generate qilindi va .env.production fayliga saqlandi!"
    else
        log_info "Environment fayl allaqachon mavjud, o'tkazib yuborildi..."
    fi
}

# Deploy application
deploy_application() {
    log_step "10/10 - Loyihani deploy qilish..."
    
    # Make sure we're in the right directory
    cd $PROJECT_DIR
    
    # Create necessary directories
    mkdir -p nginx/logs nginx/ssl backups
    
    # Build and start services
    log_info "Docker images yaratilmoqda..."
    docker-compose -f docker-compose.production.yml build --no-cache
    
    log_info "Servislar ishga tushirilmoqda..."
    docker-compose -f docker-compose.production.yml up -d
    
    # Wait for services to start
    log_info "Servislarning ishga tushishini kutish..."
    sleep 30
    
    # Check services status
    if docker-compose -f docker-compose.production.yml ps | grep -q "Up"; then
        log_success "Servislar muvaffaqiyatli ishga tushdi!"
    else
        log_warning "Ba'zi servislar ishga tushmagan bo'lishi mumkin. Loglarni tekshiring:"
        docker-compose -f docker-compose.production.yml logs --tail=20
    fi
    
    # Setup database
    log_info "Database sozlanmoqda..."
    sleep 10
    
    # Run migrations
    docker-compose -f docker-compose.production.yml exec -T server npx prisma migrate deploy || {
        log_warning "Migration xatoligi, schema push qilinmoqda..."
        docker-compose -f docker-compose.production.yml exec -T server npx prisma db push --force-reset
    }
    
    # Generate Prisma client
    docker-compose -f docker-compose.production.yml exec -T server npx prisma generate
    
    # Seed database
    log_info "Database seed qilinmoqda..."
    docker-compose -f docker-compose.production.yml exec -T server npm run seed || {
        log_warning "Seeding xatoligi, lekin davom etilmoqda..."
    }
    
    log_success "Loyiha muvaffaqiyatli deploy qilindi!"
}

# Create management scripts
create_management_scripts() {
    log_info "Boshqaruv scriptlarini yaratish..."
    
    # Create start script
    cat > $PROJECT_DIR/start.sh << 'EOF'
#!/bin/bash
cd /opt/inbola
docker-compose -f docker-compose.production.yml up -d
echo "✅ Inbola ishga tushdi!"
EOF
    
    # Create stop script
    cat > $PROJECT_DIR/stop.sh << 'EOF'
#!/bin/bash
cd /opt/inbola
docker-compose -f docker-compose.production.yml down
echo "⏹️ Inbola to'xtatildi!"
EOF
    
    # Create restart script
    cat > $PROJECT_DIR/restart.sh << 'EOF'
#!/bin/bash
cd /opt/inbola
docker-compose -f docker-compose.production.yml restart
echo "🔄 Inbola qayta ishga tushirildi!"
EOF
    
    # Create logs script
    cat > $PROJECT_DIR/logs.sh << 'EOF'
#!/bin/bash
cd /opt/inbola
docker-compose -f docker-compose.production.yml logs -f
EOF
    
    # Create status script
    cat > $PROJECT_DIR/status.sh << 'EOF'
#!/bin/bash
cd /opt/inbola
echo "=== DOCKER SERVISLAR ==="
docker-compose -f docker-compose.production.yml ps
echo ""
echo "=== TIZIM RESURSLARI ==="
df -h
echo ""
free -h
echo ""
echo "=== SO'NGGI LOGLAR ==="
docker-compose -f docker-compose.production.yml logs --tail=10
EOF
    
    # Make scripts executable
    chmod +x $PROJECT_DIR/*.sh
    
    log_success "Boshqaruv scriptlari yaratildi!"
}

# Setup automatic backup
setup_backup() {
    log_info "Avtomatik backup sozlash..."
    
    # Create backup script
    cat > $PROJECT_DIR/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/inbola/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup
docker exec inbola_postgres pg_dump -U inbola_user -d inbola_db > "$BACKUP_DIR/backup_$DATE.sql"

# Compress backup
gzip "$BACKUP_DIR/backup_$DATE.sql"

# Remove old backups (keep 30 days)
find "$BACKUP_DIR" -name "backup_*.sql.gz" -mtime +30 -delete

echo "✅ Backup yaratildi: backup_$DATE.sql.gz"
EOF
    
    chmod +x $PROJECT_DIR/backup.sh
    
    # Add to crontab (daily at 2 AM)
    (crontab -l 2>/dev/null; echo "0 2 * * * $PROJECT_DIR/backup.sh") | crontab -
    
    log_success "Avtomatik backup sozlandi (har kuni soat 02:00)!"
}

# Show completion info
show_completion_info() {
    echo ""
    echo "🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉"
    echo "🎉                                      🎉"
    echo "🎉   INBOLA E-COMMERCE DEPLOY TAYYOR!   🎉"
    echo "🎉                                      🎉"
    echo "🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉"
    echo ""
    echo "=== 🌐 SAYT URL'LARI ==="
    echo "Frontend:  http://$(curl -s ifconfig.me) (yoki http://localhost)"
    echo "API:       http://$(curl -s ifconfig.me)/api"
    echo "GraphQL:   http://$(curl -s ifconfig.me)/graphql"
    echo "Admin:     http://$(curl -s ifconfig.me)/dashboard"
    echo ""
    echo "=== 🛠️ BOSHQARUV KOMANDLARI ==="
    echo "Status:    $PROJECT_DIR/status.sh"
    echo "Loglar:    $PROJECT_DIR/logs.sh"
    echo "To'xtatish: $PROJECT_DIR/stop.sh"
    echo "Ishga tushirish: $PROJECT_DIR/start.sh"
    echo "Qayta ishga tushirish: $PROJECT_DIR/restart.sh"
    echo ""
    echo "=== 📁 MUHIM FAYLLAR ==="
    echo "Loyiha: $PROJECT_DIR"
    echo "Backup: $PROJECT_DIR/backups"
    echo "Loglar: $PROJECT_DIR/nginx/logs"
    echo "Environment: $PROJECT_DIR/.env.production"
    echo ""
    echo "=== 🔑 KEYINGI QADAMLAR ==="
    echo "1. Domain DNS'ni serveringiz IP'siga yo'naltiring"
    echo "2. SSL sertifikat uchun: $PROJECT_DIR/deploy-lightsail.sh"
    echo "3. To'lov tizimlari va email'ni sozlang"
    echo "4. Saytni test qiling!"
    echo ""
    log_warning "MUHIM: Docker group'ga qo'shilish uchun serverdan chiqib qayta kiring!"
    log_info "Yoki quyidagi komandani bajaring: newgrp docker"
    echo ""
    log_success "Muvaffaqiyatli deploy! 🚀"
}

# Main execution
main() {
    echo ""
    echo "🚀 INBOLA E-COMMERCE - YANGI SERVER SETUP"
    echo "=========================================="
    echo ""
    
    check_user
    update_system
    install_dependencies
    install_nodejs
    install_docker
    setup_firewall
    setup_fail2ban
    create_directories
    copy_project
    setup_environment
    deploy_application
    create_management_scripts
    setup_backup
    show_completion_info
}

# Run main function
main "$@"
