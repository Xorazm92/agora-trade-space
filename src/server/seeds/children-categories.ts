import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedChildrenCategories() {
  console.log('🌱 Seeding children categories...');

  // E-commerce uchun optimallashtirilgan asosiy kategoriyalar
  const categories = [
    {
      name: "O'yinchoqlar",
      slug: "oyinchoqlar",
      description: "Har xil yoshdagi bolalar uchun o'yinchoqlar",
      nameEn: "Toys",
      nameRu: "Игрушки",
      icon: "🧸",
      isActive: true,
      sortOrder: 1
    },
    {
      name: "Bolalar kiyimlari",
      slug: "bolalar-kiyimlari", 
      description: "0-12 yosh bolalar uchun kiyimlar",
      nameEn: "Children's Clothing",
      nameRu: "Детская одежда",
      icon: "👕",
      isActive: true,
      sortOrder: 2
    },
    {
      name: "Bolalar poyabzallari",
      slug: "bolalar-poyabzallari",
      description: "Har xil o'lchamdagi bolalar poyabzallari",
      nameEn: "Children's Shoes",
      nameRu: "Детская обувь",
      icon: "👟",
      isActive: true,
      sortOrder: 3
    },
    {
      name: "Bolalar kitoblari",
      slug: "bolalar-kitoblari",
      description: "Ta'lim va o'yin kitoblari",
      nameEn: "Children's Books",
      nameRu: "Детские книги",
      icon: "📚",
      isActive: true,
      sortOrder: 4
    },
    {
      name: "Chaqaloq mahsulotlari",
      slug: "chaqaloq-mahsulotlari",
      description: "0-2 yosh chaqaloqlar uchun",
      nameEn: "Baby Products",
      nameRu: "Товары для малышей",
      icon: "🍼",
      isActive: true,
      sortOrder: 5
    },
    {
      name: "Sport va faollik",
      slug: "sport-faollik",
      description: "Bolalar uchun sport buyumlari",
      nameEn: "Sports & Activity",
      nameRu: "Спорт и активность",
      icon: "⚽",
      isActive: true,
      sortOrder: 6
    },
    {
      name: "Ta'lim va rivojlantirish",
      slug: "talim-rivojlantirish",
      description: "Rivojlantiruvchi o'yinlar va materiallar",
      nameEn: "Education & Development",
      nameRu: "Образование и развитие",
      icon: "🎓",
      isActive: true,
      sortOrder: 7
    },
    {
      name: "San'at va ijodkorlik",
      slug: "sanat-ijodkorlik",
      description: "Chizish, bo'yash va ijodkorlik uchun",
      nameEn: "Arts & Crafts",
      nameRu: "Искусство и творчество",
      icon: "🎨",
      isActive: true,
      sortOrder: 8
    },
    {
      name: "Ochiq havo o'yinlari",
      slug: "ochiq-havo-oyinlari",
      description: "Tashqarida o'ynash uchun",
      nameEn: "Outdoor Play",
      nameRu: "Игры на открытом воздухе",
      icon: "🏃‍♂️",
      isActive: true,
      sortOrder: 9
    },
    {
      name: "Bolalar elektronikasi",
      slug: "bolalar-elektronikasi",
      description: "Xavfsiz bolalar elektronikasi",
      nameEn: "Kids Electronics",
      nameRu: "Детская электроника",
      icon: "📱",
      isActive: true,
      sortOrder: 10
    }
  ];

  // Kategoriyalarni yaratish
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
      },
      create: {
        name: category.name,
        slug: category.slug,
        description: category.description,
      },
    });
  }

  // Sub-kategoriyalarni yaratish
  const subcategories = [
    // O'yinchoqlar sub-kategoriyalari
    {
      name: "Chaqaloq o'yinchoqlari",
      slug: "chaqaloq-oyinchoqlari",
      description: "0-12 oy chaqaloqlar uchun xavfsiz o'yinchoqlar",
      parentSlug: "oyinchoqlar",
      ageRange: "0-12 oy"
    },
    {
      name: "Rivojlantiruvchi o'yinchoqlar",
      slug: "rivojlantiruvchi-oyinchoqlar",
      description: "Bolalarning rivojlanishiga yordam beruvchi o'yinchoqlar",
      parentSlug: "oyinchoqlar",
      ageRange: "1-3 yosh"
    },
    {
      name: "Konstruktorlar",
      slug: "konstruktorlar",
      description: "Lego va boshqa konstruktor o'yinchoqlar",
      parentSlug: "oyinchoqlar",
      ageRange: "3+ yosh"
    },
    {
      name: "Qo'g'irchoqlar",
      slug: "qogirchoqlar",
      description: "Qo'g'irchoqlar va peluş o'yinchoqlar",
      parentSlug: "oyinchoqlar",
      ageRange: "Barcha yoshlar"
    },
    {
      name: "Transport o'yinchoqlari",
      slug: "transport-oyinchoqlari",
      description: "Mashina, samolyot va boshqa transport o'yinchoqlari",
      parentSlug: "oyinchoqlar",
      ageRange: "2+ yosh"
    },
    {
      name: "Puzzle va mantiqiy o'yinlar",
      slug: "puzzle-mantiqiy-oyinlar",
      description: "Mantiqni rivojlantiruvchi o'yinlar",
      parentSlug: "oyinchoqlar",
      ageRange: "3+ yosh"
    },

    // Bolalar kiyimlari sub-kategoriyalari
    {
      name: "Chaqaloq kiyimlari",
      slug: "chaqaloq-kiyimlari",
      description: "0-12 oy chaqaloqlar uchun yumshoq kiyimlar",
      parentSlug: "bolalar-kiyimlari",
      ageRange: "0-12 oy"
    },
    {
      name: "1-3 yosh kiyimlari",
      slug: "1-3-yosh-kiyimlari",
      description: "Kichik bolalar uchun kiyimlar",
      parentSlug: "bolalar-kiyimlari",
      ageRange: "1-3 yosh"
    },
    {
      name: "4-6 yosh kiyimlari",
      slug: "4-6-yosh-kiyimlari",
      description: "Maktabgacha yoshdagi bolalar kiyimlari",
      parentSlug: "bolalar-kiyimlari",
      ageRange: "4-6 yosh"
    },
    {
      name: "7-12 yosh kiyimlari",
      slug: "7-12-yosh-kiyimlari",
      description: "Maktab yoshidagi bolalar kiyimlari",
      parentSlug: "bolalar-kiyimlari",
      ageRange: "7-12 yosh"
    },
    {
      name: "Sport kiyimlari",
      slug: "sport-kiyimlari",
      description: "Sport va faol o'yin uchun kiyimlar",
      parentSlug: "bolalar-kiyimlari",
      ageRange: "2+ yosh"
    },
    {
      name: "Bayramona kiyimlar",
      slug: "bayramona-kiyimlar",
      description: "Maxsus tadbirlar uchun kiyimlar",
      parentSlug: "bolalar-kiyimlari",
      ageRange: "Barcha yoshlar"
    },

    // Bolalar poyabzallari sub-kategoriyalari
    {
      name: "Birinchi qadam poyabzallari",
      slug: "birinchi-qadam-poyabzallari",
      description: "Yurish o'rganayotgan bolalar uchun",
      parentSlug: "bolalar-poyabzallari",
      ageRange: "6-18 oy"
    },
    {
      name: "Kundalik poyabzallar",
      slug: "kundalik-poyabzallar",
      description: "Har kungi foydalanish uchun",
      parentSlug: "bolalar-poyabzallari",
      ageRange: "1+ yosh"
    },
    {
      name: "Sport poyabzallari",
      slug: "sport-poyabzallari",
      description: "Sport va faol o'yin uchun",
      parentSlug: "bolalar-poyabzallari",
      ageRange: "2+ yosh"
    },
    {
      name: "Qish poyabzallari",
      slug: "qish-poyabzallari",
      description: "Qish mavsumi uchun issiq poyabzallar",
      parentSlug: "bolalar-poyabzallari",
      ageRange: "Barcha yoshlar"
    },
    {
      name: "Yoz sandallari",
      slug: "yoz-sandallari",
      description: "Yoz mavsumi uchun ochiq poyabzallar",
      parentSlug: "bolalar-poyabzallari",
      ageRange: "Barcha yoshlar"
    },
    {
      name: "Maktab poyabzallari",
      slug: "maktab-poyabzallari",
      description: "Maktab uchun rasmiy poyabzallar",
      parentSlug: "bolalar-poyabzallari",
      ageRange: "5+ yosh"
    }
  ];

  // Sub-kategoriyalarni yaratish
  for (const subcategory of subcategories) {
    const parentCategory = await prisma.category.findUnique({
      where: { slug: subcategory.parentSlug }
    });
    
    if (parentCategory) {
      await prisma.category.upsert({
        where: { slug: subcategory.slug },
        update: {
          name: subcategory.name,
          description: subcategory.description,
        },
        create: {
          name: subcategory.name,
          slug: subcategory.slug,
          description: subcategory.description,
          parentId: parentCategory.id,
        },
      });
    }
  }

  // Yosh guruhlari uchun sub-kategoriyalar
  const ageGroups = [
    {
      name: "0-2 yosh",
      slug: "0-2-yosh",
      description: "Chaqaloq va kichik bolalar uchun",
      nameEn: "0-2 years",
      nameRu: "0-2 года"
    },
    {
      name: "3-5 yosh", 
      slug: "3-5-yosh",
      description: "Maktabgacha yoshdagi bolalar uchun",
      nameEn: "3-5 years",
      nameRu: "3-5 лет"
    },
    {
      name: "6-8 yosh",
      slug: "6-8-yosh", 
      description: "Boshlang'ich maktab yoshidagi bolalar uchun",
      nameEn: "6-8 years",
      nameRu: "6-8 лет"
    },
    {
      name: "9-12 yosh",
      slug: "9-12-yosh",
      description: "O'rta maktab yoshidagi bolalar uchun", 
      nameEn: "9-12 years",
      nameRu: "9-12 лет"
    }
  ];

  for (const ageGroup of ageGroups) {
    await prisma.category.upsert({
      where: { slug: ageGroup.slug },
      update: {
        name: ageGroup.name,
        description: ageGroup.description,
      },
      create: {
        name: ageGroup.name,
        slug: ageGroup.slug,
        description: ageGroup.description,
      },
    });
  }

  console.log('✅ Children categories seeded successfully');
}

export default seedChildrenCategories;
