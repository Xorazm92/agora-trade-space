"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import MainLayout from '@/app/components/templates/MainLayout';
import { 
  RefreshCw, 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  FileText,
  CreditCard,
  Truck,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';

const ReturnsPage = () => {
  const t = useTranslations('returns');
  const tCommon = useTranslations('common');
  const [activeTab, setActiveTab] = useState('return');

  const returnReasons = [
    "Mahsulot buzilgan holda keldi",
    "Noto'g'ri mahsulot yuborilgan",
    "O'lcham mos kelmadi",
    "Sifat kutilgandek emas",
    "Mahsulot tavsifga mos kelmaydi",
    "Boshqa sabab"
  ];

  const returnProcess = [
    {
      step: 1,
      title: "Qaytarish so'rovi",
      description: "Saytda yoki telefon orqali qaytarish so'rovini yuboring",
      icon: <FileText className="w-6 h-6" />
    },
    {
      step: 2,
      title: "Tasdiqlash",
      description: "24 soat ichida so'rovingiz ko'rib chiqiladi va tasdiqlanadi",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      step: 3,
      title: "Qadoqlash",
      description: "Mahsulotni asl qadoqida yoki boshqa mos qadoqda tayyorlang",
      icon: <Package className="w-6 h-6" />
    },
    {
      step: 4,
      title: "Olib ketish",
      description: "Kuryer mahsulotni sizdan bepul olib ketadi",
      icon: <Truck className="w-6 h-6" />
    },
    {
      step: 5,
      title: "Tekshirish",
      description: "Mahsulot omborga kelgach, holati tekshiriladi",
      icon: <AlertTriangle className="w-6 h-6" />
    },
    {
      step: 6,
      title: "Pul qaytarish",
      description: "3-5 ish kuni ichida pulingiz qaytariladi",
      icon: <CreditCard className="w-6 h-6" />
    }
  ];

  const returnConditions = [
    {
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: "Qaytarish mumkin",
      items: [
        "14 kun ichida qaytarish",
        "Mahsulot ishlatilmagan",
        "Asl qadoq va yorliqlar saqlangan",
        "Chek yoki buyurtma raqami mavjud",
        "Mahsulot buzilmagan"
      ]
    },
    {
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      title: "Qaytarish mumkin emas",
      items: [
        "Shaxsiy gigiena mahsulotlari",
        "Ichki kiyimlar",
        "Maxsus buyurtma bo'yicha tayyorlangan mahsulotlar",
        "14 kundan ortiq vaqt o'tgan",
        "Mahsulot ishlatilgan yoki buzilgan"
      ]
    }
  ];

  const refundMethods = [
    {
      method: "Bank kartasi",
      time: "3-5 ish kuni",
      description: "To'lov qilingan kartaga qaytariladi",
      fee: "Bepul"
    },
    {
      method: "Click/Payme",
      time: "1-3 ish kuni", 
      description: "To'lov qilingan hisobga qaytariladi",
      fee: "Bepul"
    },
    {
      method: "Naqd pul",
      time: "Darhol",
      description: "Ofisimizdan naqd olishingiz mumkin",
      fee: "Bepul"
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('title') || 'Qaytarish va almashtirish'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subtitle') || '14 kun ichida mahsulotni qaytarish yoki almashtirish imkoniyati. Bizning maqsadimiz - sizning mamnunligingiz.'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg p-1 shadow-lg">
              <button
                onClick={() => setActiveTab('return')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'return'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Qaytarish
              </button>
              <button
                onClick={() => setActiveTab('exchange')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'exchange'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Almashtirish
              </button>
            </div>
          </div>

          {/* Return Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {activeTab === 'return' ? 'Qaytarish jarayoni' : 'Almashtirish jarayoni'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {returnProcess.map((process, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-center">
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

          {/* Return Conditions */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('return_conditions') || 'Qaytarish shartlari'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {returnConditions.map((condition, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    {condition.icon}
                    <h3 className="text-xl font-semibold text-gray-900">
                      {condition.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {condition.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Refund Methods */}
          {activeTab === 'return' && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                {t('refund_methods') || 'Pul qaytarish usullari'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {refundMethods.map((method, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {method.method}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {method.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Vaqt:</span>
                        <span className="text-sm font-medium">{method.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Komissiya:</span>
                        <span className="text-sm font-medium text-green-600">{method.fee}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Return Request Form */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {activeTab === 'return' ? 'Qaytarish so\'rovi' : 'Almashtirish so\'rovi'}
            </h2>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buyurtma raqami *
                  </label>
                  <input
                    type="text"
                    placeholder="Masalan: INB-2024-001234"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email manzil *
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon raqami *
                  </label>
                  <input
                    type="tel"
                    placeholder="+998 90 123 45 67"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {activeTab === 'return' ? 'Qaytarish sababi' : 'Almashtirish sababi'} *
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Sababni tanlang</option>
                    {returnReasons.map((reason, index) => (
                      <option key={index} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qo'shimcha ma'lumot
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Muammo haqida batafsil yozing..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  So'rov yuborish
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-indigo-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              {t('need_help') || 'Yordam kerakmi?'}
            </h2>
            <p className="text-indigo-100 mb-6">
              {t('contact_description') || 'Qaytarish yoki almashtirish bo\'yicha savollaringiz bo\'lsa, biz bilan bog\'laning'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold">
                <Phone className="w-5 h-5" />
                +998 71 123 45 67
              </div>
              <div className="flex items-center justify-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold">
                <Mail className="w-5 h-5" />
                returns@inbola.uz
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReturnsPage;
