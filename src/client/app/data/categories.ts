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
  // To'g'ri kategoriyalar - sizning so'rovingiz bo'yicha
  {
    id: '1',
    name: 'Elektron qurilmalar',
    slug: 'elektron-qurilmalar',
    description: 'Elektron qurilmalar va gadjetlar',
    icon: '📱',
    subcategories: [
      {
        id: '1-1',
        name: 'Telefon',
        slug: 'telefon',
        description: 'Smartfonlar va oddiy telefonlar',
        ageRange: 'Barcha yoshlar'
      },
      {
        id: '1-2',
        name: 'Planshet',
        slug: 'planshet',
        description: 'Planşetlar va elektron kitob o\'qish qurilmalari',
        ageRange: '3+ yosh'
      },
      {
        id: '1-3',
        name: 'Bolalar telefoni',
        slug: 'bolalar-telefoni',
        description: 'Bolalar uchun xavfsiz telefonlar',
        ageRange: '5+ yosh'
      },
      {
        id: '1-4',
        name: 'Elektron o\'yinchoqlar',
        slug: 'elektron-oyinchoqlar',
        description: 'Interaktiv elektron o\'yinchoqlar',
        ageRange: '2+ yosh'
      },
      {
        id: '1-5',
        name: 'Musiqa asboblari',
        slug: 'musiqa-asboblari',
        description: 'Bolalar uchun musiqa asboblari',
        ageRange: '1+ yosh'
      }
    ]
  },
  {
    id: '2',
    name: 'O\'yinchoqlar',
    slug: 'oyinchoqlar',
    description: 'Har xil yoshdagi bolalar uchun o\'yinchoqlar',
    icon: '🧸',
    subcategories: [
      {
        id: '2-1',
        name: 'Chaqlarlar',
        slug: 'chaqlarlar',
        description: 'Chaqaloqlar uchun yumshoq o\'yinchoqlar',
        ageRange: '0-12 oy'
      },
      {
        id: '2-2',
        name: 'Rivojlantiruvchi',
        slug: 'rivojlantiruvchi',
        description: 'Bolalarni rivojlantiruvchi o\'yinchoqlar',
        ageRange: '1+ yosh'
      },
      {
        id: '2-3',
        name: 'Konstruksiyalar (konstruktor)',
        slug: 'konstruksiyalar',
        description: 'Konstruktor va qurish o\'yinchoqlari',
        ageRange: '3+ yosh'
      },
      {
        id: '2-4',
        name: 'Qo\'g\'irchoqlar',
        slug: 'qogirchoqlar',
        description: 'Qo\'g\'irchoqlar va peluş o\'yinchoqlar',
        ageRange: 'Barcha yoshlar'
      }
    ]
  },
  {
    id: '3',
    name: 'Kiyimlar',
    slug: 'kiyimlar',
    description: 'Bolalar va chaqaloqlar uchun kiyimlar',
    icon: '👕',
    subcategories: [
      {
        id: '3-1',
        name: 'Bolalar kiyimi',
        slug: 'bolalar-kiyimi',
        description: '1-12 yosh bolalar uchun kiyimlar',
        ageRange: '1-12 yosh'
      },
      {
        id: '3-2',
        name: 'Chaqaloq kiyimi',
        slug: 'chaqaloq-kiyimi',
        description: '0-12 oy chaqaloqlar uchun kiyimlar',
        ageRange: '0-12 oy'
      },
      {
        id: '3-3',
        name: 'Mavsumiy kiyim',
        slug: 'mavsumiy-kiyim',
        description: 'Qish va yoz mavsumi uchun kiyimlar',
        ageRange: 'Barcha yoshlar'
      },
      {
        id: '3-4',
        name: 'Ichki kiyimlar',
        slug: 'ichki-kiyimlar',
        description: 'Ichki kiyimlar va paypoqlar',
        ageRange: 'Barcha yoshlar'
      }
    ]
  },
  {
    id: '4',
    name: 'Poyabzal',
    slug: 'poyabzal',
    description: 'Bolalar uchun turli xil poyabzallar',
    icon: '👟',
    subcategories: [
      {
        id: '4-1',
        name: 'Birinchi qadam poyabzali',
        slug: 'birinchi-qadam-poyabzali',
        description: 'Yurish o\'rganayotgan bolalar uchun',
        ageRange: '6-18 oy'
      },
      {
        id: '4-2',
        name: 'Sport poyabzali',
        slug: 'sport-poyabzali',
        description: 'Sport va faol o\'yin uchun poyabzallar',
        ageRange: '2+ yosh'
      },
      {
        id: '4-3',
        name: 'Kundalik poyabzal',
        slug: 'kundalik-poyabzal',
        description: 'Har kungi foydalanish uchun poyabzallar',
        ageRange: '1+ yosh'
      },
      {
        id: '4-4',
        name: 'Qishki poyabzal',
        slug: 'qishki-poyabzal',
        description: 'Qish mavsumi uchun issiq poyabzallar',
        ageRange: 'Barcha yoshlar'
      }
    ]
  },
  {
    id: '5',
    name: 'Kitoblar',
    slug: 'kitoblar',
    description: 'Bolalar uchun kitoblar va o\'quv materiallari',
    icon: '📚',
    subcategories: [
      {
        id: '5-1',
        name: 'Chaqaloq kitoblari',
        slug: 'chaqaloq-kitoblari',
        description: 'Yumshoq va xavfsiz birinchi kitoblar',
        ageRange: '0-12 oy'
      },
      {
        id: '5-2',
        name: 'Ertak va qissalar',
        slug: 'ertak-va-qissalar',
        description: 'Klassik va zamonaviy ertaklar',
        ageRange: '2+ yosh'
      },
      {
        id: '5-3',
        name: 'Ta\'limiy kitoblar',
        slug: 'talimiy-kitoblar',
        description: 'O\'qish va yozishni o\'rgatuvchi kitoblar',
        ageRange: '3+ yosh'
      },
      {
        id: '5-4',
        name: 'Rang berish kitoblari',
        slug: 'rang-berish-kitoblari',
        description: 'Ijodkorlikni rivojlantiruvchi kitoblar',
        ageRange: '2+ yosh'
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
