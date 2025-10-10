"use client";
import { useTranslations } from 'next-intl';
import MainLayout from '@/app/components/templates/MainLayout';
import { useGetAllCategoriesQuery } from '@/app/store/apis/CategoryApi';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

const CategoriesPage = () => {
  const t = useTranslations('categories');
  const tCommon = useTranslations('common');
  const { data, isLoading, error } = useGetAllCategoriesQuery({});

  const categories = data?.categories || [];

  // Kategoriya icon'lari
  const getCategoryIcon = (slug: string) => {
    const icons: { [key: string]: string } = {
      'oyinchoqlar': '🧸',
      'bolalar-kiyimlari': '👕',
      'bolalar-poyabzallari': '👟',
      'bolalar-kitoblari': '📚',
      'chaqaloq-mahsulotlari': '🍼',
      'sport-faollik': '⚽',
      'talim-rivojlantirish': '🎓',
      'sanat-ijodkorlik': '🎨',
      'ochiq-havo-oyinlari': '🏃‍♂️',
      'bolalar-elektronikasi': '📱'
    };
    return icons[slug] || '🎯';
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {tCommon('categories') || 'Kategoriyalar'}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Kategoriyalar yuklanmoqda...
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded"></div>
                      <div className="flex-1">
                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {tCommon('categories') || 'Kategoriyalar'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bolangiz uchun kerakli mahsulotni toping. Barcha kategoriyalar va subcategoriyalar bilan tanishing.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category: any) => (
              <div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{getCategoryIcon(category.slug)}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {category.name}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Subcategories */}
                  {category.children && category.children.length > 0 && (
                    <div className="space-y-3 mb-6">
                      <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                        Subcategoriyalar:
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {category.children.map((subcategory: any) => (
                          <Link
                            key={subcategory.id}
                            href={`/shop?category=${subcategory.slug}`}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors group"
                          >
                            <div>
                              <div className="font-medium text-sm">
                                {subcategory.name}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                <Clock className="w-3 h-3" />
                                Barcha yoshlar
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* View Category Button */}
                  <Link
                    href={`/shop?category=${category.slug}`}
                    className="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    {category.name} ko'rish
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Popular Age Groups */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Yosh guruhlari bo'yicha
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { age: '0-12 oy', title: 'Chaqaloqlar', description: 'Eng kichik farzandlar uchun' },
                { age: '1-3 yosh', title: 'Kichkintoylar', description: 'Rivojlanish davri' },
                { age: '3-6 yosh', title: 'Maktabgacha', description: 'O\'yin va o\'rganish' },
                { age: '6+ yosh', title: 'Maktab yoshi', description: 'Ta\'lim va sport' }
              ].map((group, index) => (
                <Link
                  key={index}
                  href={`/shop?age=${group.age}`}
                  className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
                >
                  <div className="text-2xl font-bold text-indigo-600 mb-2">
                    {group.age}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {group.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {group.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-16 bg-indigo-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              To'g'ri mahsulotni tanlashda yordam kerakmi?
            </h2>
            <p className="text-indigo-100 mb-6">
              Mutaxassislarimiz sizga bolangiz uchun eng mos mahsulotni tanlashda yordam berishadi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/help"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Yordam olish
              </Link>
              <Link
                href="/size-guide"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
              >
                O'lcham yo'riqnomasi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CategoriesPage;
