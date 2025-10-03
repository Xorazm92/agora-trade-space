export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  ageRange?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'O\'yinchoqlar',
    slug: 'toys',
    description: 'Bolalar uchun o\'yinchoqlar',
    icon: '🧸',
    subcategories: [
      {
        id: '1-1',
        name: 'Chaqaloq o\'yinchoqlari',
        slug: 'baby-toys',
        description: 'Chaqaloqlar uchun xavfsiz o\'yinchoqlar',
        ageRange: '0-12 oy'
      },
      {
        id: '1-2',
        name: 'Rivojlantiruvchi o\'yinchoqlar',
        slug: 'educational-toys',
        description: 'Bolalarning rivojlanishiga yordam beruvchi o\'yinchoqlar',
        ageRange: '1-3 yosh'
      },
      {
        id: '1-3',
        name: 'Konstruktorlar',
        slug: 'building-blocks',
        description: 'Lego va boshqa konstruktor o\'yinchoqlar',
        ageRange: '3+ yosh'
      },
      {
        id: '1-4',
        name: 'Qo\'g\'irchoqlar',
        slug: 'dolls-plush',
        description: 'Qo\'g\'irchoqlar va peluş o\'yinchoqlar',
        ageRange: 'Barcha yoshlar'
      },
      {
        id: '1-5',
        name: 'Transport o\'yinchoqlari',
        slug: 'vehicles',
        description: 'Mashina, samolyot va boshqa transport o\'yinchoqlari',
        ageRange: '2+ yosh'
      },
      {
        id: '1-6',
        name: 'Puzzle va mantiqiy o\'yinlar',
        slug: 'puzzles-games',
        description: 'Mantiqni rivojlantiruvchi o\'yinlar',
        ageRange: '3+ yosh'
      }
    ]
  },
  {
    id: '2',
    name: 'Kiyimlar',
    slug: 'clothes',
    description: 'Bolalar kiyimlari',
    icon: '👕',
    subcategories: [
      {
        id: '2-1',
        name: 'Chaqaloq kiyimlari',
        slug: 'baby-clothes',
        description: 'Chaqaloqlar uchun yumshoq kiyimlar',
        ageRange: '0-12 oy'
      },
      {
        id: '2-2',
        name: 'Bolalar kiyimlari',
        slug: 'kids-clothes',
        description: 'Kundalik bolalar kiyimlari',
        ageRange: '1-12 yosh'
      },
      {
        id: '2-3',
        name: 'Mavsumiy kiyimlar',
        slug: 'seasonal-clothes',
        description: 'Qish va yoz kiyimlari',
        ageRange: 'Barcha yoshlar'
      },
      {
        id: '2-4',
        name: 'Ichki kiyimlar',
        slug: 'underwear',
        description: 'Ichki kiyimlar va paypoqlar',
        ageRange: 'Barcha yoshlar'
      },
      {
        id: '2-5',
        name: 'Sport kiyimlari',
        slug: 'sportswear',
        description: 'Sport va faol o\'yin uchun kiyimlar',
        ageRange: '2+ yosh'
      },
      {
        id: '2-6',
        name: 'Bayramona kiyimlar',
        slug: 'formal-clothes',
        description: 'Maxsus tadbirlar uchun kiyimlar',
        ageRange: 'Barcha yoshlar'
      }
    ]
  },
  {
    id: '3',
    name: 'Poyabzallar',
    slug: 'shoes',
    description: 'Bolalar poyabzallari',
    icon: '👟',
    subcategories: [
      {
        id: '3-1',
        name: 'Birinchi qadam poyabzallari',
        slug: 'first-step-shoes',
        description: 'Yurish o\'rganayotgan bolalar uchun',
        ageRange: '6-18 oy'
      },
      {
        id: '3-2',
        name: 'Kundalik poyabzallar',
        slug: 'casual-shoes',
        description: 'Har kungi foydalanish uchun',
        ageRange: '1+ yosh'
      },
      {
        id: '3-3',
        name: 'Sport poyabzallari',
        slug: 'sports-shoes',
        description: 'Sport va faol o\'yin uchun',
        ageRange: '2+ yosh'
      },
      {
        id: '3-4',
        name: 'Qish poyabzallari',
        slug: 'winter-shoes',
        description: 'Qish mavsumi uchun issiq poyabzallar',
        ageRange: 'Barcha yoshlar'
      },
      {
        id: '3-5',
        name: 'Yoz sandallari',
        slug: 'summer-sandals',
        description: 'Yoz mavsumi uchun ochiq poyabzallar',
        ageRange: 'Barcha yoshlar'
      },
      {
        id: '3-6',
        name: 'Maktab poyabzallari',
        slug: 'school-shoes',
        description: 'Maktab uchun rasmiy poyabzallar',
        ageRange: '5+ yosh'
      }
    ]
  },
  {
    id: '4',
    name: 'Kitoblar',
    slug: 'books',
    description: 'Bolalar kitoblari',
    icon: '📚',
    subcategories: [
      {
        id: '4-1',
        name: 'Chaqaloq kitoblari',
        slug: 'baby-books',
        description: 'Yumshoq va xavfsiz birinchi kitoblar',
        ageRange: '0-12 oy'
      },
      {
        id: '4-2',
        name: 'Ertaklar va qissalar',
        slug: 'fairy-tales',
        description: 'Klassik va zamonaviy ertaklar',
        ageRange: '2+ yosh'
      },
      {
        id: '4-3',
        name: 'Ta\'limiy kitoblar',
        slug: 'educational-books',
        description: 'O\'qish va yozishni o\'rgatuvchi kitoblar',
        ageRange: '3+ yosh'
      },
      {
        id: '4-4',
        name: 'Rang berish kitoblari',
        slug: 'coloring-books',
        description: 'Ijodkorlikni rivojlantiruvchi kitoblar',
        ageRange: '2+ yosh'
      },
      {
        id: '4-5',
        name: 'Audio kitoblar',
        slug: 'audio-books',
        description: 'Ovozli kitoblar va ertaklar',
        ageRange: '1+ yosh'
      },
      {
        id: '4-6',
        name: 'Maktabgacha ta\'lim',
        slug: 'preschool-books',
        description: 'Maktabga tayyorgarlik kitoblari',
        ageRange: '4-6 yosh'
      }
    ]
  },
  {
    id: '5',
    name: 'Elektronika',
    slug: 'electronics',
    description: 'Bolalar elektronikasi',
    icon: '📱',
    subcategories: [
      {
        id: '5-1',
        name: 'Ta\'limiy planşetlar',
        slug: 'educational-tablets',
        description: 'Bolalar uchun maxsus planşetlar',
        ageRange: '3+ yosh'
      },
      {
        id: '5-2',
        name: 'Bolalar telefonlari',
        slug: 'kids-phones',
        description: 'Xavfsiz bolalar telefonlari',
        ageRange: '5+ yosh'
      },
      {
        id: '5-3',
        name: 'Elektron o\'yinchoqlar',
        slug: 'electronic-toys',
        description: 'Interaktiv elektron o\'yinchoqlar',
        ageRange: '2+ yosh'
      },
      {
        id: '5-4',
        name: 'Musiqa asboblari',
        slug: 'musical-instruments',
        description: 'Bolalar uchun musiqa asboblari',
        ageRange: '1+ yosh'
      },
      {
        id: '5-5',
        name: 'Kamera va video',
        slug: 'cameras-video',
        description: 'Bolalar uchun kameralar',
        ageRange: '4+ yosh'
      },
      {
        id: '5-6',
        name: 'Robotlar',
        slug: 'robots',
        description: 'Dasturlash va robotika o\'yinchoqlari',
        ageRange: '6+ yosh'
      }
    ]
  }
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};

export const getSubcategoryBySlug = (categorySlug: string, subcategorySlug: string): Subcategory | undefined => {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories.find(sub => sub.slug === subcategorySlug);
};

export const getAllSubcategories = (): Subcategory[] => {
  return categories.flatMap(category => category.subcategories);
};
