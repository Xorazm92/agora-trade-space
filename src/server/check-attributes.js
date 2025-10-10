const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function checkAttributes() {
  console.log("🔍 Database'dagi attributes'larni tekshirish...");
  
  const attributes = await prisma.attribute.findMany({
    include: {
      values: true,
      categories: {
        include: {
          category: true
        }
      }
    }
  });

  console.log(`📊 Jami attributes: ${attributes.length}`);
  
  attributes.forEach(attr => {
    console.log(`\n📂 ${attr.name} (${attr.slug})`);
    console.log(`   Values: ${attr.values.length}`);
    attr.values.forEach(value => {
      console.log(`     - ${value.value} (${value.slug})`);
    });
    console.log(`   Categories: ${attr.categories.length}`);
    attr.categories.forEach(catAttr => {
      console.log(`     - ${catAttr.category.name} (required: ${catAttr.isRequired})`);
    });
  });
}

checkAttributes()
  .catch((e) => {
    console.error("❌ Xatolik:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
