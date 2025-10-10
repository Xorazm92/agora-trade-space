const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function linkAttributesToCategories() {
  console.log("🔗 Attributes'larni kategoriyalarga bog'lash...");
  
  // Barcha kategoriyalar va attributes'larni olish
  const categories = await prisma.category.findMany({
    where: { parentId: null } // Faqat asosiy kategoriyalar
  });
  
  const attributes = await prisma.attribute.findMany();
  
  console.log(`📂 ${categories.length} ta kategoriya topildi`);
  console.log(`🏷️ ${attributes.length} ta attribute topildi`);

  // Har bir kategoriyaga attributes bog'lash
  for (const category of categories) {
    console.log(`\n📂 ${category.name} kategoriyasi uchun:`);
    
    for (const attribute of attributes) {
      try {
        // Allaqachon bog'langanligini tekshirish
        const existing = await prisma.categoryAttribute.findFirst({
          where: {
            categoryId: category.id,
            attributeId: attribute.id
          }
        });

        if (!existing) {
          // Qaysi attributes majburiy ekanligini aniqlash
          const isRequired = 
            attribute.name === "Rang" || 
            attribute.name === "O'lcham" || 
            attribute.slug === "color" || 
            attribute.slug === "size";

          await prisma.categoryAttribute.create({
            data: {
              categoryId: category.id,
              attributeId: attribute.id,
              isRequired: isRequired
            }
          });

          console.log(`  ✅ ${attribute.name} bog'landi (required: ${isRequired})`);
        } else {
          console.log(`  ⏭️ ${attribute.name} allaqachon bog'langan`);
        }
      } catch (error) {
        console.log(`  ⚠️ ${attribute.name} bog'lashda xatolik:`, error.message);
      }
    }
  }

  console.log("\n🎉 Barcha attributes kategoriyalarga bog'landi!");
}

linkAttributesToCategories()
  .catch((e) => {
    console.error("❌ Xatolik:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
