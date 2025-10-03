"use client";
import { useTranslations } from 'next-intl';
import MainLayout from '@/app/components/templates/MainLayout';
import { 
  Heart, 
  Shield, 
  Truck, 
  Award, 
  Users, 
  Target,
  CheckCircle,
  Star,
  MapPin,
  Calendar,
  TrendingUp
} from 'lucide-react';

const AboutPage = () => {
  const t = useTranslations('about');
  const tCommon = useTranslations('common');

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Bolalar uchun sevgi",
      description: "Har bir mahsulotni bolangizning xavfsizligi va qulayligi uchun tanlaymiz"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Sifat kafolati",
      description: "Faqat yuqori sifatli va xavfsiz mahsulotlarni taklif qilamiz"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Tez yetkazib berish",
      description: "O'zbekiston bo'ylab tez va ishonchli yetkazib berish xizmati"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Mijozlar mamnunligi",
      description: "Sizning mamnunligingiz - bizning asosiy maqsadimiz"
    }
  ];

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "50,000+",
      label: "Baxtli oilalar",
      description: "Bizning xizmatimizdan foydalanadi"
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "1,000+",
      label: "Sifatli mahsulotlar",
      description: "Turli kategoriyalarda"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: "99%",
      label: "Mijozlar mamnunligi",
      description: "Yuqori baholash"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      number: "14",
      label: "Viloyatlar",
      description: "Yetkazib berish xizmati"
    }
  ];

  const timeline = [
    {
      year: "2020",
      title: "Kompaniya tashkil etildi",
      description: "Toshkentda kichik onlayn do'kon sifatida faoliyatni boshladik"
    },
    {
      year: "2021",
      title: "Birinchi 1000 mijoz",
      description: "Mijozlar sonining tez o'sishi va ijobiy fikr-mulohazalar"
    },
    {
      year: "2022",
      title: "Viloyatlarga kengayish",
      description: "O'zbekistonning barcha viloyatlariga yetkazib berish xizmatini boshladik"
    },
    {
      year: "2023",
      title: "Mahalliy ishlab chiqaruvchilar",
      description: "O'zbek ishlab chiqaruvchilar bilan hamkorlik boshlandi"
    },
    {
      year: "2024",
      title: "50,000+ baxtli oila",
      description: "Katta oila a'zolariga aylandik va rivojlanishda davom etmoqdamiz"
    }
  ];

  const team = [
    {
      name: "Alisher Karimov",
      position: "Asoschisi va Bosh direktor",
      description: "10 yillik tajriba, ikki farzand otasi",
      image: "/team/ceo.jpg"
    },
    {
      name: "Malika Toshmatova",
      position: "Mahsulot menejeri",
      description: "Bolalar psixologiyasi bo'yicha mutaxassis",
      image: "/team/product-manager.jpg"
    },
    {
      name: "Bobur Rahimov",
      position: "Texnik direktor",
      description: "IT sohasida 8 yillik tajriba",
      image: "/team/cto.jpg"
    },
    {
      name: "Nigora Abdullayeva",
      position: "Mijozlar xizmati rahbari",
      description: "Mijozlar bilan ishlashda 6 yillik tajriba",
      image: "/team/customer-service.jpg"
    }
  ];

  const certifications = [
    "ISO 9001 - Sifat menejmenti tizimi",
    "CE belgisi - Yevropa xavfsizlik standarti",
    "O'zbekiston sifat belgisi",
    "Halol sertifikati"
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('title') || 'Biz haqimizda'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subtitle') || 'Inbola - O\'zbekistondagi eng ishonchli bolalar mahsulotlari do\'koni. Bizning maqsadimiz har bir bolaning baxtli va xavfsiz o\'sishiga hissa qo\'shish.'}
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-indigo-600 rounded-lg p-8 text-center text-white mb-16">
            <Target className="w-16 h-16 mx-auto mb-6 text-indigo-200" />
            <h2 className="text-3xl font-bold mb-4">Bizning missiyamiz</h2>
            <p className="text-xl text-indigo-100 max-w-4xl mx-auto">
              Har bir O'zbek oilasiga sifatli, xavfsiz va arzon bolalar mahsulotlarini yetkazib berish. 
              Bolalarning sog'lom rivojlanishi va ota-onalarning xotirjamligi uchun ishlaymiz.
            </p>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('our_values') || 'Bizning qadriyatlarimiz'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-center">
                  <div className="text-indigo-600 mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('our_achievements') || 'Bizning yutuqlarimiz'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-center">
                  <div className="text-indigo-600 mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    {stat.label}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('our_journey') || 'Bizning yo\'limiz'}
            </h2>
            <div className="max-w-4xl mx-auto">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-6 mb-8 last:mb-0">
                  <div className="flex-shrink-0">
                    <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg">
                      {item.year}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-lg flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('our_team') || 'Bizning jamoamiz'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-indigo-600 font-medium mb-2">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('certifications') || 'Sertifikatlar va litsenziyalar'}
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('customer_reviews') || 'Mijozlar fikri'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Gulnora Karimova",
                  location: "Toshkent",
                  review: "Ajoyib xizmat! Mahsulotlar sifatli, yetkazib berish tez. Bolalarim juda xursand.",
                  rating: 5
                },
                {
                  name: "Sardor Rahimov",
                  location: "Samarqand",
                  review: "Ishonchli do'kon. Har doim sifatli mahsulotlar va yaxshi narxlar. Tavsiya qilaman.",
                  rating: 5
                },
                {
                  name: "Feruza Toshmatova",
                  location: "Andijon",
                  review: "Mijozlar xizmati a'lo! Har qanday savolga tezda javob berishadi. Rahmat!",
                  rating: 5
                }
              ].map((review, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{review.review}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-indigo-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              {t('join_family') || 'Bizning oilamizga qo\'shiling'}
            </h2>
            <p className="text-indigo-100 mb-6">
              {t('join_description') || 'Minglab baxtli oilalar bizni tanladilar. Siz ham bizning ishonchli mijozlarimizdan bo\'ling.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Xarid qilishni boshlash
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
                Biz bilan bog'lanish
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
