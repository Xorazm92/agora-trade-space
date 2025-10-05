import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedChildrenCategories() {
  console.log('🌱 Seeding children categories...');

  // Bolalar uchun asosiy kategoriyalar
  const categories = [
    {
      name: "O'yinchoqlar",
      slug: "oyinchoqlar",
      description: "Har xil yoshdagi bolalar uchun o'yinchoqlar",
      nameEn: "Toys",
      nameRu: "Игрушки"
    },
    {
      name: "Bolalar kiyimlari",
      slug: "bolalar-kiyimlari", 
      description: "0-12 yosh bolalar uchun kiyimlar",
      nameEn: "Children's Clothing",
      nameRu: "Детская одежда"
    },
    {
      name: "Bolalar poyabzallari",
      slug: "bolalar-poyabzallari",
      description: "Har xil o'lchamdagi bolalar poyabzallari",
      nameEn: "Children's Shoes",
      nameRu: "Детская обувь"
    },
    {
      name: "Bolalar kitoblari",
      slug: "bolalar-kitoblari",
      description: "Ta'lim va o'yin kitoblari",
      nameEn: "Children's Books",
      nameRu: "Детские книги"
    },
    {
      name: "Chaqaloq mahsulotlari",
      slug: "chaqaloq-mahsulotlari",
      description: "0-2 yosh chaqaloqlar uchun",
      nameEn: "Baby Products",
      nameRu: "Товары для малышей"
    },
    {
      name: "Sport va faollik",
      slug: "sport-faollik",
      description: "Bolalar uchun sport buyumlari",
      nameEn: "Sports & Activity",
      nameRu: "Спорт и активность"
    },
    {
      name: "Ta'lim va rivojlantirish",
      slug: "talim-rivojlantirish",
      description: "Rivojlantiruvchi o'yinlar va materiallar",
      nameEn: "Education & Development",
      nameRu: "Образование и развитие"
    },
    {
      name: "San'at va ijodkorlik",
      slug: "sanat-ijodkorlik",
      description: "Chizish, bo'yash va ijodkorlik uchun",
      nameEn: "Arts & Crafts",
      nameRu: "Искусство и творчество"
    },
    {
      name: "Ochiq havo o'yinlari",
      slug: "ochiq-havo-oyinlari",
      description: "Tashqarida o'ynash uchun",
      nameEn: "Outdoor Play",
      nameRu: "Игры на открытом воздухе"
    },
    {
      name: "Bolalar elektronikasi",
      slug: "bolalar-elektronikasi",
      description: "Xavfsiz bolalar elektronikasi",
      nameEn: "Kids Electronics",
      nameRu: "Детская электроника"
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
