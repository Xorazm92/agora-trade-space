"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import MainLayout from '@/app/components/templates/MainLayout';
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock,
  ShoppingBag,
  Truck,
  RefreshCw,
  CreditCard,
  Shield,
  User,
  HelpCircle
} from 'lucide-react';

const HelpCenterPage = () => {
  const t = useTranslations('help');
  const tCommon = useTranslations('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const categories = [
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Buyurtma berish",
      description: "Qanday buyurtma berish, to'lov qilish",
      count: 8
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Yetkazib berish",
      description: "Yetkazib berish shartlari va vaqtlari",
      count: 12
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Qaytarish va almashtirish",
      description: "Mahsulotni qaytarish va almashtirish",
      count: 6
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "To'lov usullari",
      description: "Qabul qilinadigan to'lov usullari",
      count: 5
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Xavfsizlik",
      description: "Shaxsiy ma'lumotlar va xavfsizlik",
      count: 4
    },
    {
      icon: <User className="w-6 h-6" />,
      title: "Hisob qaydnomalari",
      description: "Profil va hisob boshqaruvi",
      count: 7
    }
  ];

  const faqs = [
    {
      question: "Buyurtmani qanday berish mumkin?",
      answer: "Buyurtma berish uchun: 1) Kerakli mahsulotni tanlang, 2) Savatchaga qo'shing, 3) Rasmiylashtirish sahifasiga o'ting, 4) Yetkazib berish manzilini kiriting, 5) To'lov usulini tanlang va buyurtmani tasdiqlang."
    },
    {
      question: "Yetkazib berish qancha vaqt oladi?",
      answer: "Toshkent shahri bo'ylab 1-2 ish kuni, viloyatlarga 3-5 ish kuni. Tezkor yetkazib berish xizmati ham mavjud (24 soat ichida)."
    },
    {
      question: "Qanday to'lov usullari qabul qilinadi?",
      answer: "Naqd pul (yetkazib berganda), bank kartalari (Visa, MasterCard, UzCard), Click, Payme, va bank o'tkazmasi orqali to'lov qilishingiz mumkin."
    },
    {
      question: "Mahsulotni qaytarish mumkinmi?",
      answer: "Ha, 14 kun ichida mahsulotni qaytarish mumkin. Mahsulot ishlatilmagan va asl qadoqda bo'lishi kerak. Qaytarish uchun bizga murojaat qiling."
    },
    {
      question: "Buyurtmani qanday kuzatish mumkin?",
      answer: "Buyurtma raqami bilan saytda 'Buyurtmani kuzatish' bo'limida yoki SMS orqali yuborilgan havoladan kuzatishingiz mumkin."
    },
    {
      question: "Yetkazib berish bepulmi?",
      answer: "100,000 so'mdan yuqori buyurtmalar uchun Toshkent bo'ylab bepul yetkazib berish. Boshqa hududlar uchun yetkazib berish narxi 15,000-25,000 so'm."
    }
  ];

  const contactOptions = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telefon qo'ng'irog'i",
      description: "+998 71 123 45 67",
      availability: "Dush-Juma: 9:00-18:00",
      action: "Qo'ng'iroq qilish"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Onlayn chat",
      description: "Tezkor javob olish",
      availability: "24/7 mavjud",
      action: "Chatni boshlash"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      description: "support@inbola.uz",
      availability: "24 soat ichida javob",
      action: "Email yuborish"
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('title') || 'Yordam Markazi'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('subtitle') || 'Sizga qanday yordam bera olamiz? Quyidagi bo\'limlardan kerakli ma\'lumotni toping yoki biz bilan bog\'laning.'}
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Savolingizni yozing..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="text-indigo-600 mt-1">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {category.count} ta maqola
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Popular FAQs */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('popular_questions') || 'Tez-tez so\'raladigan savollar'}
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Options */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('contact_us') || 'Biz bilan bog\'laning'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactOptions.map((option, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-center">
                  <div className="text-indigo-600 mb-4 flex justify-center">
                    {option.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-900 font-medium mb-1">
                    {option.description}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    {option.availability}
                  </p>
                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    {option.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-indigo-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              {t('quick_help') || 'Tezkor yordam'}
            </h2>
            <p className="text-indigo-100 mb-6">
              {t('quick_help_description') || 'Eng ko\'p so\'raladigan savollar va masalalar uchun tezkor yechimlar'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Buyurtmani kuzatish
              </button>
              <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Qaytarish
              </button>
              <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                O'lcham jadvali
              </button>
              <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                To'lov masalalari
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HelpCenterPage;
