# 🚀 Yangi Server'da Inbola Deploy Qilish

Bu yo'riqnoma yangi AWS Lightsail server'da Inbola e-commerce loyihasini deploy qilish uchun.

## 📋 Serveringizda Qilish Kerak Bo'lgan Ishlar

### 1. **Server'ga Ulanish**
```bash
ssh ubuntu@YOUR_SERVER_IP
```

### 2. **Loyihani Clone Qilish**
```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-main.git
cd ecommerce-main
```

### 3. **Deploy Script'ni Ishga Tushirish**
```bash
./server-setup-deploy.sh
```

**Bu script quyidagilarni avtomatik bajaradi:**
- ✅ Tizimni yangilaydi
- ✅ Node.js, Docker, va boshqa kerakli dasturlarni o'rnatadi
- ✅ Firewall va xavfsizlik sozlamalarini o'rnatadi
- ✅ Loyihani `/opt/inbola` papkasiga ko'chiradi
- ✅ Environment variables yaratadi
- ✅ Docker container'larni build qiladi va ishga tushiradi
- ✅ Database migration va seed qiladi
- ✅ Boshqaruv script'larini yaratadi
- ✅ Avtomatik backup sozlaydi

## ⏱️ Kutish Vaqti

Script taxminan **10-15 daqiqa** davom etadi:
- Tizim yangilanishi: 2-3 daqiqa
- Dastur o'rnatish: 3-5 daqiqa
- Docker build: 5-7 daqiqa

## 🌐 Deploy Tugagandan Keyin

Saytingiz quyidagi URL'larda ishlaydi:
- **Frontend**: http://YOUR_SERVER_IP
- **API**: http://YOUR_SERVER_IP/api
- **Admin**: http://YOUR_SERVER_IP/dashboard

## 🛠️ Boshqaruv Komandlari

Deploy tugagandan keyin quyidagi komandalar mavjud bo'ladi:

```bash
# Status ko'rish
/opt/inbola/status.sh

# Loglarni ko'rish
/opt/inbola/logs.sh

# To'xtatish
/opt/inbola/stop.sh

# Ishga tushirish
/opt/inbola/start.sh

# Qayta ishga tushirish
/opt/inbola/restart.sh
```

## 🔑 Keyingi Qadamlar

1. **Domain DNS Sozlash**
   - Domain provider'da A record yarating
   - `inbola.uz` → `YOUR_SERVER_IP`
   - `www.inbola.uz` → `YOUR_SERVER_IP`

2. **SSL Sertifikat Olish**
   ```bash
   cd /opt/inbola
   ./deploy-lightsail.sh
   ```

3. **To'lov Tizimlari Sozlash**
   - `/opt/inbola/src/server/.env.production` faylini tahrirlang
   - Click, Payme, Uzum merchant ID'larini kiriting

4. **Email Sozlash**
   - SMTP sozlamalarini kiriting

## 🆘 Muammo Bo'lsa

Agar script xatolik bersa:

```bash
# Loglarni ko'ring
sudo journalctl -f

# Docker loglarni ko'ring
cd /opt/inbola
docker-compose -f docker-compose.production.yml logs

# Script'ni qayta ishga tushiring
./server-setup-deploy.sh
```

## 📞 Yordam

Muammolar yuzaga kelsa:
- GitHub Issues'da savol bering
- Email: admin@inbola.uz

---

**Muvaffaqiyatli deploy!** 🎉
