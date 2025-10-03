"use client";
import { useTranslations } from 'next-intl';
import MainLayout from '@/app/components/templates/MainLayout';
import { 
  Truck, 
  Clock, 
  MapPin, 
  Package, 
  Shield, 
  CreditCard,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const ShippingPage = () => {
  const t = useTranslations('shipping');
  const tCommon = useTranslations('common');

  const shippingOptions = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Standart yetkazib berish",
      description: "Toshkent shahri bo'ylab",
      time: "1-2 ish kuni",
      price: "Bepul (100,000 so'mdan yuqori)",
      minPrice: "15,000 so'm (100,000 so'mdan kam)"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Viloyatlarga yetkazib berish",
      description: "O'zbekiston bo'ylab barcha viloyatlar",
      time: "3-5 ish kuni",
      price: "20,000-35,000 so'm",
      minPrice: "Masofa bo'yicha"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Tezkor yetkazib berish",
      description: "Toshkent shahri bo'ylab",
      time: "24 soat ichida",
      price: "25,000 so'm",
      minPrice: "Har qanday summa uchun"
    }
  ];

  const deliveryZones = [
    {
      zone: "Toshkent shahri",
      areas: ["Chilonzor, Mirobod, Yunusobod, Shayxontohur, Bektemir, Uchtepa, Sergeli, Olmazar, Yashnobod, Yakkasaroy, Mirzo Ulug'bek"],
      time: "1-2 ish kuni",
      price: "15,000 so'm (100,000 so'mdan kam buyurtmalar uchun)"
    },
    {
      zone: "Toshkent viloyati",
      areas: ["Angren, Bekobod, Bo'ka, Bo'stonliq, Chinoz, Qibray, Oqqo'rg'on, Ohangaron, Parkent, Piskent, Quyi Chirchiq, Yuqori Chirchiq, Yangiyo'l, Zangiota"],
      time: "2-3 ish kuni",
      price: "20,000 so'm"
    },
    {
      zone: "Yaqin viloyatlar",
      areas: ["Samarqand, Jizzax, Sirdaryo, Qashqadaryo"],
      time: "3-4 ish kuni",
      price: "25,000 so'm"
    },
    {
      zone: "Uzoq viloyatlar",
      areas: ["Andijon, Farg'ona, Namangan, Buxoro, Navoiy, Xorazm, Qoraqalpog'iston"],
      time: "4-5 ish kuni",
      price: "30,000-35,000 so'm"
    }
  ];

  const deliveryProcess = [
    {
      step: 1,
      title: "Buyurtma tasdiqlash",
      description: "Buyurtmangiz qabul qilingandan so'ng, 1 soat ichida tasdiqlash uchun qo'ng'iroq qilamiz",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      step: 2,
      title: "Tayyorlash",
      description: "Mahsulotlar ombordan yig'ilib, sifatli qadoqlanadi",
      icon: <Package className="w-6 h-6" />
    },
    {
      step: 3,
      title: "Yo'lga chiqarish",
      description: "Buyurtma kuryer yoki pochta xizmatiga topshiriladi",
      icon: <Truck className="w-6 h-6" />
    },
    {
      step: 4,
      title: "Yetkazib berish",
      description: "Kuryer sizga qo'ng'iroq qilib, mahsulotni yetkazib beradi",
      icon: <MapPin className="w-6 h-6" />
    }
  ];

  const importantNotes = [
    {
      icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
      title: "Manzil to'g'riligi",
      description: "Yetkazib berish manzilini to'g'ri va to'liq kiriting. Noto'g'ri manzil tufayli kechikishlar uchun javobgar emasmiz."
    },
    {
      icon: <Info className="w-5 h-5 text-blue-500" />,
      title: "Qabul qiluvchi",
      description: "Mahsulotni qabul qilish uchun 18 yoshdan katta shaxs bo'lishi kerak. Shaxsni tasdiqlovchi hujjat talab qilinishi mumkin."
    },
    {
      icon: <Clock className="w-5 h-5 text-green-500" />,
      title: "Ish vaqti",
      description: "Yetkazib berish dushanba-shanba kunlari 9:00-19:00 oralig'ida amalga oshiriladi."
    },
    {
      icon: <CreditCard className="w-5 h-5 text-purple-500" />,
      title: "To'lov",
      description: "Yetkazib berganda naqd pul yoki terminal orqali to'lov qilishingiz mumkin."
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('title') || 'Yetkazib berish'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subtitle') || 'O\'zbekiston bo\'ylab tez va ishonchli yetkazib berish xizmati. Buyurtmangizni eng qisqa vaqtda oling.'}
            </p>
          </div>

          {/* Shipping Options */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('shipping_options') || 'Yetkazib berish turlari'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {shippingOptions.map((option, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="text-indigo-600 mb-4 flex justify-center">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    {option.description}
                  </p>
                  <div className="space-y-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{option.time}</span>
                    </div>
                    <div className="text-lg font-semibold text-indigo-600">
                      {option.price}
                    </div>
                    <div className="text-sm text-gray-500">
                      {option.minPrice}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Zones */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('delivery_zones') || 'Yetkazib berish hududlari'}
            </h2>
            <div className="space-y-6">
              {deliveryZones.map((zone, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {zone.zone}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {zone.areas}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {zone.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <CreditCard className="w-4 h-4" />
                          {zone.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('delivery_process') || 'Yetkazib berish jarayoni'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {deliveryProcess.map((process, index) => (
                <div key={index} className="text-center">
                  <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {process.step}
                  </div>
                  <div className="text-indigo-600 mb-3 flex justify-center">
                    {process.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {process.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {process.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('important_notes') || 'Muhim eslatmalar'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {importantNotes.map((note, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {note.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {note.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {note.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact for Shipping */}
          <div className="bg-indigo-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              {t('shipping_questions') || 'Yetkazib berish bo\'yicha savollar?'}
            </h2>
            <p className="text-indigo-100 mb-6">
              {t('shipping_contact_description') || 'Yetkazib berish bo\'yicha qo\'shimcha ma\'lumot olish uchun biz bilan bog\'laning'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                +998 71 123 45 67
              </button>
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                shipping@inbola.uz
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ShippingPage;
