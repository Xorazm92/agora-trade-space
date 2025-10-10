const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Rang, o'lcham va tarkib attributes yaratish
const attributes = [
  {
    name: "Rang",
    slug: "rang",
    type: "SELECT",
    isRequired: true,
    values: [
      { value: "Qizil", slug: "qizil" },
      { value: "Ko'k", slug: "kok" },
      { value: "Yashil", slug: "yashil" },
      { value: "Sariq", slug: "sariq" },
      { value: "Qora", slug: "qora" },
      { value: "Oq", slug: "oq" },
      { value: "Pushti", slug: "pushti" },
      { value: "Binafsha", slug: "binafsha" },
      { value: "Jigarrang", slug: "jigarrang" },
      { value: "Kulrang", slug: "kulrang" },
    ]
  },
  {
    name: "O'lcham",
    slug: "olcham",
    type: "SELECT",
    isRequired: true,
    values: [
      { value: "XS", slug: "xs" },
      { value: "S", slug: "s" },
      { value: "M", slug: "m" },
      { value: "L", slug: "l" },
      { value: "XL", slug: "xl" },
      { value: "XXL", slug: "xxl" },
      { value: "XXXL", slug: "xxxl" },
      { value: "0-3 oy", slug: "0-3-oy" },
      { value: "3-6 oy", slug: "3-6-oy" },
      { value: "6-12 oy", slug: "6-12-oy" },
      { value: "1-2 yosh", slug: "1-2-yosh" },
      { value: "2-3 yosh", slug: "2-3-yosh" },
      { value: "3-4 yosh", slug: "3-4-yosh" },
      { value: "4-5 yosh", slug: "4-5-yosh" },
      { value: "5-6 yosh", slug: "5-6-yosh" },
      { value: "6-7 yosh", slug: "6-7-yosh" },
      { value: "7-8 yosh", slug: "7-8-yosh" },
      { value: "8-9 yosh", slug: "8-9-yosh" },
      { value: "9-10 yosh", slug: "9-10-yosh" },
      { value: "10-11 yosh", slug: "10-11-yosh" },
      { value: "11-12 yosh", slug: "11-12-yosh" },
    ]
  },
  {
    name: "Tarkib",
    slug: "tarkib",
    type: "SELECT",
    isRequired: false,
    values: [
      { value: "100% Paxta", slug: "100-paxta" },
      { value: "100% Polyester", slug: "100-polyester" },
      { value: "Paxta/Polyester", slug: "paxta-polyester" },
      { value: "100% Jun", slug: "100-jun" },
      { value: "100% Ipak", slug: "100-ipak" },
      { value: "Plastik", slug: "plastik" },
      { value: "Yog'och", slug: "yogoch" },
      { value: "Metal", slug: "metal" },
      { value: "Teri", slug: "teri" },
      { value: "Sun'iy teri", slug: "suniy-teri" },
      { value: "Kauchuk", slug: "kauchuk" },
      { value: "Silikon", slug: "silikon" },
      { value: "Bambuk", slug: "bambuk" },
      { value: "Organik paxta", slug: "organik-paxta" },
    ]
  },
  {
    name: "Brend",
    slug: "brend",
    type: "SELECT",
    isRequired: false,
    values: [
      { value: "Nike", slug: "nike" },
      { value: "Adidas", slug: "adidas" },
      { value: "Zara Kids", slug: "zara-kids" },
      { value: "H&M Kids", slug: "hm-kids" },
      { value: "Carter's", slug: "carters" },
      { value: "Gap Kids", slug: "gap-kids" },
      { value: "LEGO", slug: "lego" },
      { value: "Fisher-Price", slug: "fisher-price" },
      { value: "Barbie", slug: "barbie" },
      { value: "Hot Wheels", slug: "hot-wheels" },
      { value: "Inbola", slug: "inbola" },
    ]
  }
];

async function seedAttributes() {
  console.log("🎨 Attributes seed qilinmoqda...");
  
  // Barcha kategoriyalarni olish
  const categories = await prisma.category.findMany({
    where: { parentId: null } // Faqat asosiy kategoriyalar
  });

  for (const attributeData of attributes) {
    try {
      // Attribute yaratish
      const attribute = await prisma.attribute.create({
        data: {
          name: attributeData.name,
          slug: attributeData.slug,
        },
      });

      console.log(`✅ Attribute yaratildi: ${attribute.name}`);

      // Attribute values yaratish
      for (const valueData of attributeData.values) {
        const attributeValue = await prisma.attributeValue.create({
          data: {
            value: valueData.value,
            slug: valueData.slug,
            attributeId: attribute.id,
          },
        });

        console.log(`  ➡️ Value yaratildi: ${attributeValue.value}`);
      }

      // Barcha kategoriyalarga attribute bog'lash
      for (const category of categories) {
        await prisma.categoryAttribute.create({
          data: {
            categoryId: category.id,
            attributeId: attribute.id,
            isRequired: attributeData.isRequired,
          },
        });

        console.log(`  🔗 ${category.name} kategoriyasiga bog'landi`);
      }
    } catch (error) {
      console.log(`⚠️ Attribute yaratishda xatolik: ${attributeData.name}`, error.message);
    }
  }

  console.log("🎉 Barcha attributes muvaffaqiyatli seed qilindi!");
}

seedAttributes()
  .catch((e) => {
    console.error("❌ Attributes seed qilishda xatolik:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
