"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import MainLayout from '@/app/components/templates/MainLayout';
import { 
  Ruler, 
  User, 
  Baby, 
  Shirt, 
  ShoppingBag,
  Info,
  Calculator,
  ArrowRight
} from 'lucide-react';

const SizeGuidePage = () => {
  const t = useTranslations('size_guide');
  const tCommon = useTranslations('common');
  const [activeCategory, setActiveCategory] = useState('clothing');
  const [selectedAge, setSelectedAge] = useState('');

  const categories = [
    { id: 'clothing', name: 'Kiyimlar', icon: <Shirt className="w-5 h-5" /> },
    { id: 'shoes', name: 'Poyabzallar', icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'accessories', name: 'Aksessuarlar', icon: <User className="w-5 h-5" /> }
  ];

  const clothingSizes = [
    { age: '0-3 oy', height: '50-62 sm', chest: '40-44 sm', waist: '40-44 sm', size: '56-62' },
    { age: '3-6 oy', height: '62-68 sm', chest: '44-48 sm', waist: '44-48 sm', size: '62-68' },
    { age: '6-9 oy', height: '68-74 sm', chest: '48-50 sm', waist: '46-48 sm', size: '68-74' },
    { age: '9-12 oy', height: '74-80 sm', chest: '50-52 sm', waist: '48-50 sm', size: '74-80' },
    { age: '1-1.5 yosh', height: '80-86 sm', chest: '52-54 sm', waist: '50-51 sm', size: '80-86' },
    { age: '1.5-2 yosh', height: '86-92 sm', chest: '54-56 sm', waist: '51-52 sm', size: '86-92' },
    { age: '2-3 yosh', height: '92-98 sm', chest: '56-58 sm', waist: '52-53 sm', size: '92-98' },
    { age: '3-4 yosh', height: '98-104 sm', chest: '58-60 sm', waist: '53-54 sm', size: '98-104' },
    { age: '4-5 yosh', height: '104-110 sm', chest: '60-62 sm', waist: '54-55 sm', size: '104-110' },
    { age: '5-6 yosh', height: '110-116 sm', chest: '62-64 sm', waist: '55-56 sm', size: '110-116' },
    { age: '6-7 yosh', height: '116-122 sm', chest: '64-66 sm', waist: '56-57 sm', size: '116-122' },
    { age: '7-8 yosh', height: '122-128 sm', chest: '66-68 sm', waist: '57-58 sm', size: '122-128' },
    { age: '8-9 yosh', height: '128-134 sm', chest: '68-70 sm', waist: '58-60 sm', size: '128-134' },
    { age: '9-10 yosh', height: '134-140 sm', chest: '70-72 sm', waist: '60-62 sm', size: '134-140' },
    { age: '10-11 yosh', height: '140-146 sm', chest: '72-76 sm', waist: '62-64 sm', size: '140-146' },
    { age: '11-12 yosh', height: '146-152 sm', chest: '76-80 sm', waist: '64-66 sm', size: '146-152' }
  ];

  const shoeSizes = [
    { age: '0-6 oy', footLength: '8-10 sm', euSize: '16-17', usSize: '1-2' },
    { age: '6-12 oy', footLength: '10-12 sm', euSize: '18-19', usSize: '3-4' },
    { age: '1-1.5 yosh', footLength: '12-13 sm', euSize: '20-21', usSize: '4-5' },
    { age: '1.5-2 yosh', footLength: '13-14 sm', euSize: '22-23', usSize: '6-7' },
    { age: '2-2.5 yosh', footLength: '14-15 sm', euSize: '24-25', usSize: '7-8' },
    { age: '2.5-3 yosh', footLength: '15-16 sm', euSize: '26-27', usSize: '9-10' },
    { age: '3-4 yosh', footLength: '16-17 sm', euSize: '28-29', usSize: '10-11' },
    { age: '4-5 yosh', footLength: '17-18 sm', euSize: '30-31', usSize: '12-13' },
    { age: '5-6 yosh', footLength: '18-19 sm', euSize: '32-33', usSize: '1-2' },
    { age: '6-7 yosh', footLength: '19-20 sm', euSize: '34-35', usSize: '2-3' },
    { age: '7-8 yosh', footLength: '20-21 sm', euSize: '36-37', usSize: '4-5' },
    { age: '8-10 yosh', footLength: '21-22 sm', euSize: '38-39', usSize: '5-6' },
    { age: '10-12 yosh', footLength: '22-24 sm', euSize: '40-41', usSize: '7-8' }
  ];

  const measurementTips = [
    {
      title: "Bo'yni o'lchash",
      description: "Bolani devorga suyantirib, boshidan oyoq tagigacha o'lchang",
      icon: <Ruler className="w-6 h-6" />
    },
    {
      title: "Ko'krak hajmini o'lchash",
      description: "Ko'krakning eng keng qismini o'lchang, nafas olgan holatda",
      icon: <User className="w-6 h-6" />
    },
    {
      title: "Bel hajmini o'lchash",
      description: "Belning eng tor qismini o'lchang, tabiiy holatda",
      icon: <Calculator className="w-6 h-6" />
    },
    {
      title: "Oyoq uzunligini o'lchash",
      description: "Oyoqni qog'ozga qo'yib, bosh barmoqdan tovongacha o'lchang",
      icon: <Baby className="w-6 h-6" />
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('title') || 'O\'lcham bo\'yicha yo\'riqnoma'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subtitle') || 'Bolangiz uchun to\'g\'ri o\'lchamni tanlash uchun quyidagi jadvallardan foydalaning.'}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg p-1 shadow-lg">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Measurement Tips */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {t('measurement_tips') || 'O\'lchash bo\'yicha maslahatlar'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {measurementTips.map((tip, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-center">
                  <div className="text-indigo-600 mb-4 flex justify-center">
                    {tip.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Size Tables */}
          {activeCategory === 'clothing' && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Kiyim o'lchamlari jadvali
              </h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-indigo-600 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Yosh</th>
                        <th className="px-6 py-4 text-left font-semibold">Bo'y (sm)</th>
                        <th className="px-6 py-4 text-left font-semibold">Ko'krak (sm)</th>
                        <th className="px-6 py-4 text-left font-semibold">Bel (sm)</th>
                        <th className="px-6 py-4 text-left font-semibold">O'lcham</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clothingSizes.map((size, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-6 py-4 font-medium text-gray-900">{size.age}</td>
                          <td className="px-6 py-4 text-gray-600">{size.height}</td>
                          <td className="px-6 py-4 text-gray-600">{size.chest}</td>
                          <td className="px-6 py-4 text-gray-600">{size.waist}</td>
                          <td className="px-6 py-4 font-semibold text-indigo-600">{size.size}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeCategory === 'shoes' && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Poyabzal o'lchamlari jadvali
              </h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-indigo-600 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Yosh</th>
                        <th className="px-6 py-4 text-left font-semibold">Oyoq uzunligi</th>
                        <th className="px-6 py-4 text-left font-semibold">EU o'lcham</th>
                        <th className="px-6 py-4 text-left font-semibold">US o'lcham</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shoeSizes.map((size, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-6 py-4 font-medium text-gray-900">{size.age}</td>
                          <td className="px-6 py-4 text-gray-600">{size.footLength}</td>
                          <td className="px-6 py-4 font-semibold text-indigo-600">{size.euSize}</td>
                          <td className="px-6 py-4 text-gray-600">{size.usSize}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeCategory === 'accessories' && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Aksessuarlar o'lchamlari
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Bosh kiyimlari</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>0-6 oy:</span>
                      <span className="font-medium">35-40 sm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>6-12 oy:</span>
                      <span className="font-medium">40-44 sm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1-2 yosh:</span>
                      <span className="font-medium">44-48 sm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2-4 yosh:</span>
                      <span className="font-medium">48-50 sm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>4-8 yosh:</span>
                      <span className="font-medium">50-52 sm</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Qo'lqoplar</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>1-2 yosh:</span>
                      <span className="font-medium">10-11 sm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2-4 yosh:</span>
                      <span className="font-medium">11-12 sm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>4-6 yosh:</span>
                      <span className="font-medium">12-13 sm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>6-8 yosh:</span>
                      <span className="font-medium">13-14 sm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>8-12 yosh:</span>
                      <span className="font-medium">14-15 sm</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Kamarlar</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>2-3 yosh:</span>
                      <span className="font-medium">50-55 sm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>4-5 yosh:</span>
                      <span className="font-medium">55-60 sm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>6-7 yosh:</span>
                      <span className="font-medium">60-65 sm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>8-10 yosh:</span>
                      <span className="font-medium">65-70 sm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>10-12 yosh:</span>
                      <span className="font-medium">70-75 sm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Important Notes */}
          <div className="mb-16">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Info className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Muhim eslatmalar</h3>
                  <ul className="text-amber-700 text-sm space-y-1">
                    <li>• Har bir bola individual, shuning uchun o'lchamlar taxminiy</li>
                    <li>• Ikki o'lcham orasida bo'lsa, kattaroq o'lchamni tanlang</li>
                    <li>• Kiyim turi va brend bo'yicha o'lchamlar farq qilishi mumkin</li>
                    <li>• Shubhangiz bo'lsa, mahsulot tavsifidagi o'lchamlar jadvaliga qarang</li>
                    <li>• Qaytarish va almashtirish 14 kun ichida mumkin</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-indigo-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              {t('need_help') || 'O\'lcham tanlashda yordam kerakmi?'}
            </h2>
            <p className="text-indigo-100 mb-6">
              {t('help_description') || 'Mutaxassislarimiz sizga to\'g\'ri o\'lchamni tanlashda yordam berishadi'}
            </p>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 mx-auto">
              Maslahat olish
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SizeGuidePage;
