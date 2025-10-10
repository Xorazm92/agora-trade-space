const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// To'g'ri kategoriya va subkategoriyalar
const categories = [
  {
    name: "Elektron qurilmalar",
    slug: "elektron-qurilmalar", 
    description: "Elektron qurilmalar va gadjetlar",
    icon: "📱",
    subcategories: [
      { name: "Telefon", slug: "telefon", description: "Smartfonlar va oddiy telefonlar", icon: "📱" },
      { name: "Planshet", slug: "planshet", description: "Planşetlar va elektron kitob o'qish qurilmalari", icon: "📱" },
      { name: "Bolalar telefoni", slug: "bolalar-telefoni", description: "Bolalar uchun xavfsiz telefonlar", icon: "📞" },
      { name: "Elektron o'yinchoqlar", slug: "elektron-oyinchoqlar", description: "Interaktiv elektron o'yinchoqlar", icon: "🎮" },
      { name: "Musiqa asboblari", slug: "musiqa-asboblari", description: "Bolalar uchun musiqa asboblari", icon: "🎵" }
    ]
  },
  {
    name: "O'yinchoqlar",
    slug: "oyinchoqlar",
    description: "Har xil yoshdagi bolalar uchun o'yinchoqlar", 
    icon: "🧸",
    subcategories: [
      { name: "Chaqlarlar", slug: "chaqlarlar", description: "Chaqaloqlar uchun yumshoq o'yinchoqlar", icon: "🧸" },
      { name: "Rivojlantiruvchi", slug: "rivojlantiruvchi", description: "Bolalarni rivojlantiruvchi o'yinchoqlar", icon: "🎯" },
      { name: "Konstruksiyalar (konstruktor)", slug: "konstruksiyalar", description: "Konstruktor va qurish o'yinchoqlari", icon: "🧩" },
      { name: "Qo'g'irchoqlar", slug: "qogirchoqlar", description: "Qo'g'irchoqlar va peluş o'yinchoqlar", icon: "🪆" }
    ]
  },
  {
    name: "Kiyimlar",
    slug: "kiyimlar",
    description: "Bolalar va chaqaloqlar uchun kiyimlar",
    icon: "👕", 
    subcategories: [
      { name: "Bolalar kiyimi", slug: "bolalar-kiyimi", description: "1-12 yosh bolalar uchun kiyimlar", icon: "👕" },
      { name: "Chaqaloq kiyimi", slug: "chaqaloq-kiyimi", description: "0-12 oy chaqaloqlar uchun kiyimlar", icon: "👶" },
      { name: "Mavsumiy kiyim", slug: "mavsumiy-kiyim", description: "Qish va yoz mavsumi uchun kiyimlar", icon: "🧥" },
      { name: "Ichki kiyimlar", slug: "ichki-kiyimlar", description: "Ichki kiyimlar va paypoqlar", icon: "🩲" }
    ]
  },
  {
    name: "Poyabzal",
    slug: "poyabzal",
    description: "Bolalar uchun turli xil poyabzallar",
    icon: "👟",
    subcategories: [
      { name: "Birinchi qadam poyabzali", slug: "birinchi-qadam-poyabzali", description: "Yurish o'rganayotgan bolalar uchun", icon: "👶" },
      { name: "Sport poyabzali", slug: "sport-poyabzali", description: "Sport va faol o'yin uchun poyabzallar", icon: "👟" },
      { name: "Kundalik poyabzal", slug: "kundalik-poyabzal", description: "Har kungi foydalanish uchun poyabzallar", icon: "👞" },
      { name: "Qishki poyabzal", slug: "qishki-poyabzal", description: "Qish mavsumi uchun issiq poyabzallar", icon: "🥾" }
    ]
  },
  {
    name: "Kitoblar", 
    slug: "kitoblar",
    description: "Bolalar uchun kitoblar va o'quv materiallari",
    icon: "📚",
    subcategories: [
      { name: "Chaqaloq kitoblari", slug: "chaqaloq-kitoblari", description: "Yumshoq va xavfsiz birinchi kitoblar", icon: "📖" },
      { name: "Ertak va qissalar", slug: "ertak-va-qissalar", description: "Klassik va zamonaviy ertaklar", icon: "📚" },
      { name: "Ta'limiy kitoblar", slug: "talimiy-kitoblar", description: "O'qish va yozishni o'rgatuvchi kitoblar", icon: "📝" },
      { name: "Rang berish kitoblari", slug: "rang-berish-kitoblari", description: "Ijodkorlikni rivojlantiruvchi kitoblar", icon: "🎨" }
    ]
  }
];

async function seedCorrectCategories() {
  console.log("🌱 To'g'ri kategoriyalar seed qilinmoqda...");
  
  // Barcha mavjud kategoriyalarni o'chirish
  await prisma.category.deleteMany({});
  console.log("🗑️ Barcha mavjud kategoriyalar o'chirildi");

  for (const categoryData of categories) {
    try {
      // Asosiy kategoriyani yaratish
      const category = await prisma.category.create({
        data: {
          name: categoryData.name,
          slug: categoryData.slug,
          description: categoryData.description,
          icon: categoryData.icon,
        },
      });

      console.log(`✅ Asosiy kategoriya yaratildi: ${category.name} ${category.icon}`);

      // Subkategoriyalarni yaratish
      for (const subData of categoryData.subcategories) {
        const subcategory = await prisma.category.create({
          data: {
            name: subData.name,
            slug: subData.slug,
            description: subData.description,
            icon: subData.icon,
            parentId: category.id, // Parent kategoriya ID'si
          },
        });

        console.log(`  ➡️ Subkategoriya yaratildi: ${subcategory.name} ${subcategory.icon}`);
      }
    } catch (error) {
      console.log(`⚠️ Kategoriya yaratishda xatolik: ${categoryData.name}`, error.message);
    }
  }

  console.log("🎉 Barcha to'g'ri kategoriyalar muvaffaqiyatli seed qilindi!");
}

seedCorrectCategories()
  .catch((e) => {
    console.error("❌ Kategoriyalar seed qilishda xatolik:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
