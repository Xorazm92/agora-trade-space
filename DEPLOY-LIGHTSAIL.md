# 🚀 Inbola E-commerce AWS Lightsail Deploy Guide

Bu yo'riqnoma Inbola e-commerce loyihasini AWS Lightsail serveriga deploy qilish uchun mo'ljallangan.

## 📋 Talablar

### AWS Lightsail Server
- **OS**: Ubuntu 20.04 LTS yoki undan yangi
- **RAM**: Minimum 2GB (4GB tavsiya etiladi)
- **Storage**: Minimum 40GB SSD
- **Network**: Static IP manzil

### Domain Setup
- `inbola.uz` domeni AWS Lightsail IP manziliga yo'naltirilgan bo'lishi kerak
- DNS A record: `inbola.uz` → `YOUR_LIGHTSAIL_IP`
- DNS A record: `www.inbola.uz` → `YOUR_LIGHTSAIL_IP`

## 🛠️ Tezkor Deploy (Test uchun)

```bash
# 1. Loyihani clone qiling
git clone <your-repo-url>
cd ecommerce-main

# 2. Script'ni executable qiling
chmod +x quick-deploy-lightsail.sh

# 3. Tezkor deploy
./quick-deploy-lightsail.sh
```

Bu script quyidagilarni amalga oshiradi:
- Docker va Docker Compose o'rnatadi
- Environment variables sozlaydi
- Barcha servislarni build qiladi va ishga tushiradi
- Database migration va seed qiladi

## 🔒 To'liq Production Deploy (SSL bilan)

```bash
# 1. To'liq deploy script'ni ishga tushiring
chmod +x deploy-lightsail.sh
./deploy-lightsail.sh
```

Bu script quyidagilarni amalga oshiradi:
- Sistem dependencies o'rnatadi
- Firewall (UFW) sozlaydi
- Fail2Ban xavfsizlik tizimini o'rnatadi
- Let's Encrypt SSL sertifikatlarini oladi
- Production environment sozlaydi
- Monitoring va backup tizimini o'rnatadi

## 📁 Loyiha Tuzilishi

```
ecommerce-main/
├── docker-compose.production.yml    # Production Docker konfiguratsiyasi
├── nginx/
│   ├── nginx.production.conf        # Nginx reverse proxy konfiguratsiyasi
│   ├── ssl/                         # SSL sertifikatlar
│   └── logs/                        # Nginx loglar
├── src/
│   ├── client/                      # Next.js frontend
│   │   ├── Dockerfile
│   │   └── .env.production
│   └── server/                      # Node.js backend
│       ├── Dockerfile
│       └── .env.production
├── .env.production                  # Docker Compose environment
├── deploy-lightsail.sh             # To'liq production deploy
├── quick-deploy-lightsail.sh       # Tezkor test deploy
└── DEPLOY-LIGHTSAIL.md             # Bu fayl
```

## 🔧 Konfiguratsiya

### 1. Environment Variables

`.env.production` faylini tahrirlang:
```bash
# Domain va email
DOMAIN=inbola.uz
EMAIL=admin@inbola.uz

# Database parollari (avtomatik generate qilinadi)
POSTGRES_PASSWORD=your_secure_password
REDIS_PASSWORD=your_secure_password
```

### 2. Server Environment

`src/server/.env.production` faylini tahrirlang:
```bash
# To'lov tizimlari
CLICK_MERCHANT_ID=your_click_merchant_id
PAYME_MERCHANT_ID=your_payme_merchant_id
UZUM_MERCHANT_ID=your_uzum_merchant_id

# Email SMTP
EMAIL_USER=noreply@inbola.uz
EMAIL_PASS=your_email_password

# Google OAuth (ixtiyoriy)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Client Environment

`src/client/.env.production` faylini tahrirlang:
```bash
# API endpoints (avtomatik sozlanadi)
NEXT_PUBLIC_API_URL=https://inbola.uz/api/v1
NEXT_PUBLIC_GRAPHQL_URL=https://inbola.uz/graphql

# Analytics (ixtiyoriy)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_YANDEX_METRICA_ID=XXXXXXXX
```

## 🐳 Docker Services

### Servislar
- **nginx**: Reverse proxy va SSL termination
- **client**: Next.js frontend (port 3000)
- **server**: Node.js backend (port 5000)
- **postgres**: PostgreSQL database (port 5432)
- **redis**: Redis cache (port 6379)
- **backup**: Database backup service

### Portlar
- **80**: HTTP (HTTPS ga redirect)
- **443**: HTTPS (asosiy sayt)

## 📊 Boshqaruv Komandlari

```bash
# Servislar holatini ko'rish
docker-compose -f docker-compose.production.yml ps

# Loglarni ko'rish
docker-compose -f docker-compose.production.yml logs -f

# Servislarni qayta ishga tushirish
docker-compose -f docker-compose.production.yml restart

# Servislarni to'xtatish
docker-compose -f docker-compose.production.yml down

# Database backup
docker-compose -f docker-compose.production.yml exec postgres pg_dump -U inbola_user inbola_db > backup.sql
```

## 🔍 Monitoring va Logs

### Log Fayllar
- Nginx logs: `nginx/logs/`
- Application logs: `docker-compose logs`
- System logs: `/var/log/`

### Health Checks
- Website: `https://inbola.uz/health`
- API: `https://inbola.uz/api/health`
- Database: Avtomatik Docker health check

### Backup
- Avtomatik daily backup: `0 2 * * *` (har kuni soat 02:00)
- Backup joylashuvi: `/opt/inbola/backups/`
- 30 kunlik backup saqlanadi

## 🛡️ Xavfsizlik

### Firewall (UFW)
```bash
# Ochiq portlar
22/tcp    # SSH
80/tcp    # HTTP
443/tcp   # HTTPS
```

### Fail2Ban
- SSH brute force himoyasi
- Nginx rate limiting
- Avtomatik IP ban (1 soat)

### SSL/TLS
- Let's Encrypt sertifikatlar
- Avtomatik yangilanish
- A+ SSL rating

## 🚨 Muammolarni Hal Qilish

### 1. Servislar ishlamayapti
```bash
# Loglarni tekshiring
docker-compose -f docker-compose.production.yml logs

# Servislarni qayta ishga tushiring
docker-compose -f docker-compose.production.yml restart
```

### 2. Database ulanish xatoligi
```bash
# Database holatini tekshiring
docker-compose -f docker-compose.production.yml exec postgres pg_isready

# Migration qayta ishga tushiring
docker-compose -f docker-compose.production.yml exec server npx prisma migrate deploy
```

### 3. SSL sertifikat muammosi
```bash
# Sertifikatni qayta oling
sudo certbot renew --force-renewal

# Nginx'ni qayta ishga tushiring
docker-compose -f docker-compose.production.yml restart nginx
```

### 4. Disk joy tugagan
```bash
# Eski loglarni tozalash
docker system prune -a

# Eski backup'larni o'chirish
find /opt/inbola/backups -name "*.sql.gz" -mtime +30 -delete
```

## 📞 Yordam

Muammolar yuzaga kelsa:
1. Loglarni tekshiring
2. Health check'larni sinab ko'ring
3. GitHub Issues'da savol bering
4. Email: admin@inbola.uz

## 🎯 Production Checklist

- [ ] Domain DNS sozlangan
- [ ] SSL sertifikat o'rnatilgan
- [ ] Firewall sozlangan
- [ ] Backup tizimi ishlayapti
- [ ] Monitoring o'rnatilgan
- [ ] To'lov tizimlari sozlangan
- [ ] Email SMTP sozlangan
- [ ] Performance test o'tkazilgan
- [ ] Security audit o'tkazilgan

---

**Muvaffaqiyatli deploy!** 🎉

Sayt: https://inbola.uz
Admin: https://inbola.uz/dashboard
