const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const categories = [
  // Rasmda ko'rsatilgan kategoriyalar - aniq bir xil tartibda
  { name: "Aksessuarlar", slug: "aksessuarlar", description: "Aksessuar mahsulotlari", icon: "🎯" },
  { name: "Mebel", slug: "mebel", description: "Mebel mahsulotlari", icon: "🪑" },
  { name: "Poyabzal", slug: "poyabzal", description: "Poyabzal mahsulotlari", icon: "👟" },
  { name: "Kiyim", slug: "kiyim", description: "Kiyim-kechak", icon: "👕" },
  { name: "Elektronika", slug: "elektronika", description: "Elektronika mahsulotlari", icon: "📱" },
  
  // Yosh guruhlari
  { name: "9-12 yosh", slug: "9-12-yosh", description: "O'rta maktab yoshidagi bolalar uchun", icon: "🎓" },
  { name: "6-8 yosh", slug: "6-8-yosh", description: "Boshlang'ich maktab yoshidagi bolalar uchun", icon: "📚" },
  { name: "3-5 yosh", slug: "3-5-yosh", description: "Maktabgacha yoshdagi bolalar uchun", icon: "🎨" },
  { name: "0-2 yosh", slug: "0-2-yosh", description: "Chaqaloq va kichik bolalar uchun", icon: "🍼" },
  
  // Poyabzal turlari
  { name: "Maktab poyabzallari", slug: "maktab-poyabzallari", description: "Maktab uchun rasmiy poyabzallar", icon: "🎒" },
  { name: "Yoz sandallari", slug: "yoz-sandallari", description: "Yoz mavsumi uchun ochiq poyabzallar", icon: "🩴" },
  { name: "Qish poyabzallari", slug: "qish-poyabzallari", description: "Qish mavsumi uchun issiq poyabzallar", icon: "🥾" },
  { name: "Sport poyabzallari", slug: "sport-poyabzallari", description: "Sport va faol o'yin uchun", icon: "👟" },
  { name: "Kundalik poyabzallar", slug: "kundalik-poyabzallar", description: "Har kungi foydalanish uchun", icon: "👞" },
  { name: "Birinchi qadam poyabzallari", slug: "birinchi-qadam-poyabzallari", description: "Yurish o'rganayotgan bolalar uchun", icon: "👶" },
  
  // Kiyim turlari
  { name: "Bayramona kiyimlar", slug: "bayramona-kiyimlar", description: "Maxsus tadbirlar uchun kiyimlar", icon: "🎩" },
  
  // Asosiy kategoriyalar (mavjudlarni saqlash uchun)
  { name: "Oyinchoqlar", slug: "oyinchoqlar", description: "Har xil yoshdagi bolalar uchun oyinchoqlar", icon: "🧸" },
  { name: "Bolalar kiyimlari", slug: "bolalar-kiyimlari", description: "0-12 yosh bolalar uchun kiyimlar", icon: "👕" },
  { name: "Bolalar poyabzallari", slug: "bolalar-poyabzallari", description: "Har xil olchamdagi bolalar poyabzallari", icon: "👟" },
  { name: "Bolalar kitoblari", slug: "bolalar-kitoblari", description: "Talim va oyin kitoblari", icon: "📚" },
  { name: "Chaqaloq mahsulotlari", slug: "chaqaloq-mahsulotlari", description: "Chaqaloqlar uchun zarur mahsulotlar", icon: "🍼" },
  { name: "Sport va faollik", slug: "sport-va-faollik", description: "Bolalar sporti va faol oyinlar", icon: "⚽" },
  { name: "Talim va rivojlantirish", slug: "talim-va-rivojlantirish", description: "Bolalarni rivojlantiruvchi mahsulotlar", icon: "📖" },
  { name: "Sanat va ijodkorlik", slug: "sanat-va-ijodkorlik", description: "Ijodiy rivojlanish uchun materiallar", icon: "🎨" },
  { name: "Ochiq havo oyinlari", slug: "ochiq-havo-oyinlari", description: "Ochiq havoda oynash uchun", icon: "🏃" },
  { name: "Bolalar elektronikasi", slug: "bolalar-elektronikasi", description: "Xavfsiz bolalar elektronikasi", icon: "📱" }
];

async function seedCategoriesWithIcon() {
  console.log("🌱 Icon bilan kategoriyalar seed qilinmoqda...");
  
  // Mavjud kategoriyalarni o'chirish
  await prisma.category.deleteMany({});
  console.log("🗑️ Mavjud kategoriyalar ochirildi");

  for (const categoryData of categories) {
    try {
      const category = await prisma.category.create({
        data: {
          name: categoryData.name,
          slug: categoryData.slug,
          description: categoryData.description,
          icon: categoryData.icon,
        },
      });

      console.log(`✅ Kategoriya yaratildi: ${category.name} ${category.icon}`);
    } catch (error) {
      console.log(`⚠️ Kategoriya mavjud: ${categoryData.name}`);
    }
  }

  console.log("🎉 Barcha kategoriyalar icon bilan muvaffaqiyatli seed qilindi!");
}

seedCategoriesWithIcon()
  .catch((e) => {
    console.error("❌ Kategoriyalar seed qilishda xatolik:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
