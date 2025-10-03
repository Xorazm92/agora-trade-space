"use client";
import { useTranslations } from 'next-intl';
import MainLayout from '@/app/components/templates/MainLayout';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail,
  Clock,
  MapPin,
  Search,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const HelpPage = () => {
  const t = useTranslations('help');
  const tCommon = useTranslations('common');

  const quickHelp = [
    {
      question: "Buyurtma qanday beriladi?",
      answer: "Mahsulotni tanlang, savatchaga qo'shing va to'lov sahifasiga o'ting.",
      icon: <HelpCircle className="w-5 h-5" />
    },
    {
      question: "Yetkazib berish qancha vaqt oladi?",
      answer: "Toshkent bo'ylab 1-2 kun, boshqa viloyatlarga 3-5 kun.",
      icon: <Clock className="w-5 h-5" />
    },
    {
      question: "To'lov usullari qanday?",
      answer: "Naqd, plastik karta, Click, Payme va bank o'tkazmasi.",
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      question: "Mahsulotni qaytarish mumkinmi?",
      answer: "Ha, 14 kun ichida asl holatida qaytarish mumkin.",
      icon: <ArrowRight className="w-5 h-5" />
    }
  ];

  const contactMethods = [
    {
      title: "Telefon",
      info: "+998 71 123 45 67",
      description: "Dushanba-Shanba: 9:00-18:00",
      icon: <Phone className="w-6 h-6" />,
      action: "tel:+998711234567"
    },
    {
      title: "Email",
      info: "info@inbola.uz",
      description: "24 soat ichida javob beramiz",
      icon: <Mail className="w-6 h-6" />,
      action: "mailto:info@inbola.uz"
    },
    {
      title: "Chat",
      info: "Onlayn chat",
      description: "Tezkor yordam olish",
      icon: <MessageCircle className="w-6 h-6" />,
      action: "#chat"
    },
    {
      title: "Manzil",
      info: "Toshkent sh., Chilonzor tumani",
      description: "Do'konimizga tashrif buyuring",
      icon: <MapPin className="w-6 h-6" />,
      action: "#location"
    }
  ];

  const helpCategories = [
    {
      title: "Buyurtma berish",
      description: "Buyurtma jarayoni va to'lov",
      links: [
        { title: "Qanday buyurtma beraman?", href: "/help/ordering" },
        { title: "To'lov usullari", href: "/help/payment" },
        { title: "Buyurtmani bekor qilish", href: "/help/cancel-order" }
      ]
    },
    {
      title: "Yetkazib berish",
      description: "Yetkazib berish va qabul qilish",
      links: [
        { title: "Yetkazib berish shartlari", href: "/shipping" },
        { title: "Yetkazib berish narxi", href: "/help/delivery-cost" },
        { title: "Buyurtmani kuzatish", href: "/track-order" }
      ]
    },
    {
      title: "Qaytarish va almashtirish",
      description: "Mahsulot qaytarish qoidalari",
      links: [
        { title: "Qaytarish shartlari", href: "/returns" },
        { title: "Pul qaytarish", href: "/help/refund" },
        { title: "Mahsulot almashtirish", href: "/help/exchange" }
      ]
    },
    {
      title: "Hisob qaydnomalari",
      description: "Profil va hisob boshqaruvi",
      links: [
        { title: "Ro'yxatdan o'tish", href: "/help/registration" },
        { title: "Parolni tiklash", href: "/help/password-reset" },
        { title: "Profil sozlamalari", href: "/help/profile" }
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('title') || 'Yordam Markazi'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subtitle') || 'Sizga qanday yordam bera olamiz? Quyidagi bo\'limlardan kerakli ma\'lumotni toping yoki biz bilan bog\'laning.'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Savolingizni yozing..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
              />
            </div>
          </div>

          {/* Quick Help */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('quick_help') || 'Tezkor yordam'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickHelp.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="text-indigo-600 mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {item.question}
                      </h3>
                      <p className="text-gray-600">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Help Categories */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Yordam bo'limlari
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {helpCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="space-y-2">
                    {category.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.href}
                        className="block text-indigo-600 hover:text-indigo-800 text-sm transition-colors"
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Methods */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('contact_us') || 'Biz bilan bog\'laning'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.action}
                  className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
                >
                  <div className="text-indigo-600 mb-4 flex justify-center">
                    {method.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-indigo-600 font-medium mb-1">
                    {method.info}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {method.description}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* FAQ Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">
                  Javob topa olmadingizmi?
                </h3>
                <p className="text-blue-700 mb-4">
                  Bizning FAQ bo'limida ko'proq ma'lumot topishingiz yoki to'g'ridan-to'g'ri biz bilan bog'lanishingiz mumkin.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    FAQ ko'rish
                  </button>
                  <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                    Biz bilan bog'laning
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HelpPage;
