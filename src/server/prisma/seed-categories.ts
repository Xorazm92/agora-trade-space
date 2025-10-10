import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  {
    name: "O'yinchoqlar",
    slug: "oyinchoqlar",
    description: "Har xil yoshdagi bolalar uchun o'yinchoqlar",
    icon: "🧸",
    subcategories: [
      {
        name: "Chaqaloq o'yinchoqlari",
        slug: "baby-toys",
        description: "Chaqaloqlar uchun xavfsiz o'yinchoqlar",
      },
      {
        name: "Rivojlantiruvchi o'yinchoqlar",
        slug: "educational-toys",
        description: "Bolalarning rivojlanishiga yordam beruvchi o'yinchoqlar",
      },
      {
        name: "Konstruktorlar",
        slug: "building-blocks",
        description: "Lego va boshqa konstruktor o'yinchoqlar",
      },
      {
        name: "Qo'g'irchoqlar",
        slug: "dolls-plush",
        description: "Qo'g'irchoqlar va peluş o'yinchoqlar",
      },
      {
        name: "Transport o'yinchoqlari",
        slug: "vehicles",
        description: "Mashina, samolyot va boshqa transport o'yinchoqlari",
      },
      {
        name: "Puzzle va mantiqiy o'yinlar",
        slug: "puzzles-games",
        description: "Mantiqni rivojlantiruvchi o'yinlar",
      }
    ]
  },
  {
    name: "Bolalar kiyimlari",
    slug: "bolalar-kiyimlari",
    description: "0-12 yosh bolalar uchun kiyimlar",
    icon: "👕",
    subcategories: [
      {
        name: "Chaqaloq kiyimlari",
        slug: "baby-clothes",
        description: "Chaqaloqlar uchun yumshoq kiyimlar",
      },
      {
        name: "Bolalar kiyimlari",
        slug: "kids-clothes",
        description: "Kundalik bolalar kiyimlari",
      },
      {
        name: "Mavsumiy kiyimlar",
        slug: "seasonal-clothes",
        description: "Qish va yoz kiyimlari",
      },
      {
        name: "Ichki kiyimlar",
        slug: "underwear",
        description: "Ichki kiyimlar va paypoqlar",
      },
      {
        name: "Sport kiyimlari",
        slug: "sportswear",
        description: "Sport va faol o'yin uchun kiyimlar",
      },
      {
        name: "Bayramona kiyimlar",
        slug: "formal-clothes",
        description: "Maxsus tadbirlar uchun kiyimlar",
      }
    ]
  },
  {
    name: "Bolalar poyabzallari",
    slug: "bolalar-poyabzallari",
    description: "Har xil o'lchamdagi bolalar poyabzallari",
    icon: "👟",
    subcategories: [
      {
        name: "Birinchi qadam poyabzallari",
        slug: "first-step-shoes",
        description: "Yurish o'rganayotgan bolalar uchun",
      },
      {
        name: "Kundalik poyabzallar",
        slug: "casual-shoes",
        description: "Har kungi foydalanish uchun",
      },
      {
        name: "Sport poyabzallari",
        slug: "sports-shoes",
        description: "Sport va faol o'yin uchun",
      },
      {
        name: "Qish poyabzallari",
        slug: "winter-shoes",
        description: "Qish mavsumi uchun issiq poyabzallar",
      },
      {
        name: "Yoz sandallari",
        slug: "summer-sandals",
        description: "Yoz mavsumi uchun ochiq poyabzallar",
      },
      {
        name: "Maktab poyabzallari",
        slug: "school-shoes",
        description: "Maktab uchun rasmiy poyabzallar",
      }
    ]
  },
  {
    name: "Bolalar kitoblari",
    slug: "bolalar-kitoblari",
    description: "Ta'lim va o'yin kitoblari",
    icon: "📚",
    subcategories: [
      {
        name: "Chaqaloq kitoblari",
        slug: "baby-books",
        description: "Yumshoq va xavfsiz birinchi kitoblar",
      },
      {
        name: "Ertaklar va qissalar",
        slug: "fairy-tales",
        description: "Klassik va zamonaviy ertaklar",
      },
      {
        name: "Ta'limiy kitoblar",
        slug: "educational-books",
        description: "O'qish va yozishni o'rgatuvchi kitoblar",
      },
      {
        name: "Rang berish kitoblari",
        slug: "coloring-books",
        description: "Ijodkorlikni rivojlantiruvchi kitoblar",
      },
      {
        name: "Audio kitoblar",
        slug: "audio-books",
        description: "Ovozli kitoblar va ertaklar",
      },
      {
        name: "Maktabgacha ta'lim",
        slug: "preschool-books",
        description: "Maktabga tayyorgarlik kitoblari",
      }
    ]
  },
  {
    name: "Bolalar elektronikasi",
    slug: "bolalar-elektronikasi",
    description: "Xavfsiz bolalar elektronikasi",
    icon: "📱",
    subcategories: [
      {
        name: "Ta'limiy planşetlar",
        slug: "educational-tablets",
        description: "Bolalar uchun maxsus planşetlar",
      },
      {
        name: "Bolalar telefonlari",
        slug: "kids-phones",
        description: "Xavfsiz bolalar telefonlari",
      },
      {
        name: "Elektron o'yinchoqlar",
        slug: "electronic-toys",
        description: "Interaktiv elektron o'yinchoqlar",
      },
      {
        name: "Musiqa asboblari",
        slug: "musical-instruments",
        description: "Bolalar uchun musiqa asboblari",
      },
      {
        name: "Kamera va video",
        slug: "cameras-video",
        description: "Bolalar uchun kameralar",
      },
      {
        name: "Robotlar",
        slug: "robots",
        description: "Dasturlash va robotika o'yinchoqlari",
      }
    ]
  }
];

async function seedCategories() {
  console.log('🌱 Kategoriyalar seed qilinmoqda...');

  for (const categoryData of categories) {
    // Asosiy kategoriyani yaratish
    const category = await prisma.category.create({
      data: {
        name: categoryData.name,
        slug: categoryData.slug,
        description: categoryData.description,
        icon: categoryData.icon,
      },
    });

    console.log(`✅ Kategoriya yaratildi: ${category.name}`);

    // Subkategoriyalarni yaratish
    for (const subData of categoryData.subcategories) {
      const subcategory = await prisma.category.create({
        data: {
          name: subData.name,
          slug: subData.slug,
          description: subData.description,
          parentId: category.id,
        },
      });

      console.log(`  ✅ Subkategoriya yaratildi: ${subcategory.name}`);
    }
  }

  console.log('🎉 Kategoriyalar muvaffaqiyatli seed qilindi!');
}

seedCategories()
  .catch((e) => {
    console.error('❌ Kategoriyalar seed qilishda xatolik:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
