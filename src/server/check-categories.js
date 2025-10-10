const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function checkCategories() {
  console.log("🔍 Database'dagi kategoriyalarni tekshirish...");
  
  const allCategories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  console.log(`📊 Jami kategoriyalar: ${allCategories.length}`);
  
  const parentCategories = allCategories.filter(cat => !cat.parentId);
  console.log(`📂 Asosiy kategoriyalar: ${parentCategories.length}`);
  
  parentCategories.forEach(cat => {
    console.log(`  ✅ ${cat.name} ${cat.icon} (${cat.slug})`);
  });
  
  const subCategories = allCategories.filter(cat => cat.parentId);
  console.log(`📁 Subkategoriyalar: ${subCategories.length}`);
  
  subCategories.forEach(cat => {
    console.log(`    ➡️ ${cat.name} ${cat.icon} (parent: ${cat.parentId})`);
  });
}

checkCategories()
  .catch((e) => {
    console.error("❌ Xatolik:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
