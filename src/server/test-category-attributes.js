const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testCategoryAttributes() {
  console.log("🔍 Kategoriya attributes'larni to'g'ridan-to'g'ri tekshirish...");
  
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    include: {
      attributes: {
        include: {
          attribute: {
            include: {
              values: true
            }
          }
        }
      }
    }
  });

  console.log(`📂 ${categories.length} ta kategoriya topildi`);
  
  categories.forEach(category => {
    console.log(`\n📂 ${category.name}:`);
    console.log(`   Attributes: ${category.attributes.length}`);
    
    category.attributes.forEach(catAttr => {
      console.log(`     - ${catAttr.attribute.name} (required: ${catAttr.isRequired})`);
      console.log(`       Values: ${catAttr.attribute.values.length}`);
      catAttr.attribute.values.slice(0, 3).forEach(value => {
        console.log(`         • ${value.value}`);
      });
    });
  });
}

testCategoryAttributes()
  .catch((e) => {
    console.error("❌ Xatolik:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
