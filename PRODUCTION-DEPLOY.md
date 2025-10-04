# Inbola E-commerce Production Deployment Guide

## 🚀 Quick Start

After cloning the repository, run this single command to deploy:

```bash
./quick-deploy.sh
```

## 📋 Prerequisites

- Ubuntu 20.04+ server
- Node.js 18+
- PostgreSQL 15+
- Nginx
- Domain: www.inbola.uz

## 🔧 Full Production Setup

### 1. Server Setup (Run once on new server)

```bash
# Run as root
sudo ./scripts/setup-production.sh
```

This script will:
- Install Node.js, PostgreSQL, Redis, Nginx
- Create inbola user and directories
- Configure firewall and security
- Set up monitoring and backups

### 2. Clone and Deploy

```bash
# Clone repository
cd /var/www
sudo git clone <your-repo-url> inbola
sudo chown -R inbola:inbola inbola
cd inbola

# Switch to inbola user
sudo su - inbola
cd /var/www/inbola

# Deploy
./quick-deploy.sh
```

### 3. Environment Configuration

Update these files with your production values:

```bash
# Server environment
src/server/.env.production

# Client environment  
src/client/.env.production

# Root environment
.env.production
```

### 4. SSL Setup

```bash
# Install SSL certificate
sudo certbot --nginx -d inbola.uz -d www.inbola.uz
```

### 5. DNS Configuration

Point your domain to the server:
```
A     inbola.uz        → YOUR_SERVER_IP
A     www.inbola.uz    → YOUR_SERVER_IP
```

## 🔐 Environment Variables

### Required Production Variables

```bash
# Database
DATABASE_URL="postgresql://inbola_user:PASSWORD@localhost:5432/inbola_production"

# JWT Secrets (Generate strong 32+ character strings)
JWT_SECRET="your-super-strong-jwt-secret"
JWT_REFRESH_SECRET="your-super-strong-refresh-secret"

# AWS S3 (for file storage)
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
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_your_stripe_publishable_key"

# Domain
NEXT_PUBLIC_DOMAIN="www.inbola.uz"
NEXT_PUBLIC_APP_URL="https://www.inbola.uz"
NEXT_PUBLIC_API_URL="https://api.inbola.uz/graphql"
CORS_ORIGIN="https://www.inbola.uz,https://inbola.uz"
```

## 🛠 Management Commands

```bash
# Deploy/Update
./quick-deploy.sh

# View application status
pm2 status

# View logs
pm2 logs

# Restart applications
pm2 restart ecosystem.config.js

# Stop applications
pm2 stop ecosystem.config.js

# Monitor applications
pm2 monit

# Database backup
sudo /usr/local/bin/inbola-backup

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 📊 Monitoring

### Application Monitoring
- PM2 Dashboard: `pm2 monit`
- Logs: `/var/log/inbola/`
- System: `htop`, `iotop`, `nethogs`

### Health Checks
```bash
# Check if services are running
curl http://localhost:3000  # Frontend
curl http://localhost:5000/graphql  # Backend

# Check SSL
curl -I https://www.inbola.uz
```

## 🔒 Security Features

- ✅ SSL/TLS encryption
- ✅ Security headers (HSTS, CSP, etc.)
- ✅ Fail2ban protection
- ✅ UFW firewall
- ✅ Rate limiting
- ✅ Input validation
- ✅ CORS protection

## 📈 Performance Optimizations

- ✅ Nginx gzip compression
- ✅ Static file caching
- ✅ Image optimization
- ✅ Database connection pooling
- ✅ Redis caching
- ✅ PM2 cluster mode

## 🗄 Database Management

```bash
# Connect to database
sudo -u postgres psql inbola_production

# Run migrations
cd src/server && npx prisma migrate deploy

# Seed database
cd src/server && npm run seed

# Backup database
sudo -u postgres pg_dump inbola_production > backup.sql

# Restore database
sudo -u postgres psql inbola_production < backup.sql
```

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   sudo lsof -i :3000  # Check what's using port 3000
   sudo lsof -i :5000  # Check what's using port 5000
   ```

2. **Permission errors**
   ```bash
   sudo chown -R inbola:inbola /var/www/inbola
   ```

3. **Database connection errors**
   ```bash
   sudo systemctl status postgresql
   sudo -u postgres psql -c "\l"  # List databases
   ```

4. **SSL certificate issues**
   ```bash
   sudo certbot certificates
   sudo certbot renew --dry-run
   ```

### Log Locations
- Application: `/var/log/inbola/`
- Nginx: `/var/log/nginx/`
- PostgreSQL: `/var/log/postgresql/`
- System: `/var/log/syslog`

## 📞 Support

For deployment issues:
1. Check logs: `pm2 logs`
2. Check system status: `systemctl status inbola`
3. Check Nginx: `sudo nginx -t`
4. Check database: `sudo systemctl status postgresql`

## 🔄 Updates

To update the application:

```bash
cd /var/www/inbola
git pull origin main
./quick-deploy.sh
```

## 📝 Notes

- The application runs on ports 3000 (frontend) and 5000 (backend)
- Nginx proxies requests from port 80/443 to the applications
- PM2 manages the application processes with auto-restart
- Daily backups are automatically created at 2 AM
- Log rotation is configured to keep 52 days of logs

---

**Inbola E-commerce** - Bolalar uchun eng yaxshi tanlov 🧸
