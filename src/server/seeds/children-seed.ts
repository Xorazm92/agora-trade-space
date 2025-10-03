import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function cleanup() {
  console.log("🧹 Cleaning up existing data...");

  // Delete in reverse order of dependencies to respect foreign key constraints
  await prisma.chatMessage.deleteMany();
  await prisma.chat.deleteMany();
  await prisma.report.deleteMany();
  await prisma.interaction.deleteMany();
  await prisma.cartEvent.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.address.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.restock.deleteMany();
  await prisma.stockMovement.deleteMany();
  await prisma.productVariantAttribute.deleteMany();
  await prisma.attributeValue.deleteMany();
  await prisma.categoryAttribute.deleteMany();
  await prisma.attribute.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log("✅ Cleanup completed");
}

async function main() {
  console.log("🌱 Starting Inbola children database seeding...");

  // Clean up existing data first
  await cleanup();

  // 1. Create users
  const hashedPassword = await bcrypt.hash("password123", 12);

  const superadmin = await prisma.user.upsert({
    where: { email: "superadmin@inbola.uz" },
    update: {},
    create: {
      email: "superadmin@inbola.uz",
      password: hashedPassword,
      name: "Inbola Super Admin",
      role: "SUPERADMIN",
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@inbola.uz" },
    update: {},
    create: {
      email: "admin@inbola.uz",
      password: hashedPassword,
      name: "Inbola Admin",
      role: "ADMIN",
    },
  });

  // 2. Create children categories
  const toysCategory = await prisma.category.upsert({
    where: { slug: "oyinchoqlar" },
    update: {},
    create: {
      name: "O'yinchoqlar",
      slug: "oyinchoqlar",
      description: "Har xil yoshdagi bolalar uchun o'yinchoqlar",
      images: [],
    },
  });

  const childrenClothingCategory = await prisma.category.upsert({
    where: { slug: "bolalar-kiyimlari" },
    update: {},
    create: {
      name: "Bolalar kiyimlari",
      slug: "bolalar-kiyimlari",
      description: "0-12 yosh bolalar uchun kiyimlar",
      images: [],
    },
  });

  const childrenShoesCategory = await prisma.category.upsert({
    where: { slug: "bolalar-poyabzallari" },
    update: {},
    create: {
      name: "Bolalar poyabzallari",
      slug: "bolalar-poyabzallari",
      description: "Har xil o'lchamdagi bolalar poyabzallari",
      images: [],
    },
  });

  const babyProductsCategory = await prisma.category.upsert({
    where: { slug: "chaqaloq-mahsulotlari" },
    update: {},
    create: {
      name: "Chaqaloq mahsulotlari",
      slug: "chaqaloq-mahsulotlari",
      description: "0-2 yosh chaqaloqlar uchun",
      images: [],
    },
  });

  const childrenBooksCategory = await prisma.category.upsert({
    where: { slug: "bolalar-kitoblari" },
    update: {},
    create: {
      name: "Bolalar kitoblari",
      slug: "bolalar-kitoblari",
      description: "Ta'lim va o'yin kitoblari",
      images: [],
    },
  });

  const sportsCategory = await prisma.category.upsert({
    where: { slug: "sport-faollik" },
    update: {},
    create: {
      name: "Sport va faollik",
      slug: "sport-faollik",
      description: "Bolalar uchun sport buyumlari",
      images: [],
    },
  });

  // 3. Create attributes for children products
  const ageAttribute = await prisma.attribute.upsert({
    where: { slug: "age" },
    update: {},
    create: {
      name: "Yosh",
      slug: "age",
    },
  });

  const sizeAttribute = await prisma.attribute.upsert({
    where: { slug: "size" },
    update: {},
    create: {
      name: "O'lcham",
      slug: "size",
    },
  });

  const colorAttribute = await prisma.attribute.upsert({
    where: { slug: "color" },
    update: {},
    create: {
      name: "Rang",
      slug: "color",
    },
  });

  const materialAttribute = await prisma.attribute.upsert({
    where: { slug: "material" },
    update: {},
    create: {
      name: "Material",
      slug: "material",
    },
  });

  const brandAttribute = await prisma.attribute.upsert({
    where: { slug: "brand" },
    update: {},
    create: {
      name: "Brend",
      slug: "brand",
    },
  });

  const genderAttribute = await prisma.attribute.upsert({
    where: { slug: "gender" },
    update: {},
    create: {
      name: "Jins",
      slug: "gender",
    },
  });

  // 4. Create attribute values
  // Age values
  const age0to2 = await prisma.attributeValue.upsert({
    where: { slug: "0-2-yosh" },
    update: {},
    create: {
      attributeId: ageAttribute.id,
      value: "0-2 yosh",
      slug: "0-2-yosh",
    },
  });

  const age3to5 = await prisma.attributeValue.upsert({
    where: { slug: "3-5-yosh" },
    update: {},
    create: {
      attributeId: ageAttribute.id,
      value: "3-5 yosh",
      slug: "3-5-yosh",
    },
  });

  const age6to8 = await prisma.attributeValue.upsert({
    where: { slug: "6-8-yosh" },
    update: {},
    create: {
      attributeId: ageAttribute.id,
      value: "6-8 yosh",
      slug: "6-8-yosh",
    },
  });

  const age9to12 = await prisma.attributeValue.upsert({
    where: { slug: "9-12-yosh" },
    update: {},
    create: {
      attributeId: ageAttribute.id,
      value: "9-12 yosh",
      slug: "9-12-yosh",
    },
  });

  // Size values for children
  const size80 = await prisma.attributeValue.upsert({
    where: { slug: "80cm" },
    update: {},
    create: {
      attributeId: sizeAttribute.id,
      value: "80 sm",
      slug: "80cm",
    },
  });

  const size90 = await prisma.attributeValue.upsert({
    where: { slug: "90cm" },
    update: {},
    create: {
      attributeId: sizeAttribute.id,
      value: "90 sm",
      slug: "90cm",
    },
  });

  const size100 = await prisma.attributeValue.upsert({
    where: { slug: "100cm" },
    update: {},
    create: {
      attributeId: sizeAttribute.id,
      value: "100 sm",
      slug: "100cm",
    },
  });

  const size110 = await prisma.attributeValue.upsert({
    where: { slug: "110cm" },
    update: {},
    create: {
      attributeId: sizeAttribute.id,
      value: "110 sm",
      slug: "110cm",
    },
  });

  const size120 = await prisma.attributeValue.upsert({
    where: { slug: "120cm" },
    update: {},
    create: {
      attributeId: sizeAttribute.id,
      value: "120 sm",
      slug: "120cm",
    },
  });

  // Color values
  const colorRed = await prisma.attributeValue.upsert({
    where: { slug: "qizil" },
    update: {},
    create: {
      attributeId: colorAttribute.id,
      value: "Qizil",
      slug: "qizil",
    },
  });

  const colorBlue = await prisma.attributeValue.upsert({
    where: { slug: "ko'k" },
    update: {},
    create: {
      attributeId: colorAttribute.id,
      value: "Ko'k",
      slug: "ko'k",
    },
  });

  const colorPink = await prisma.attributeValue.upsert({
    where: { slug: "pushti" },
    update: {},
    create: {
      attributeId: colorAttribute.id,
      value: "Pushti",
      slug: "pushti",
    },
  });

  const colorYellow = await prisma.attributeValue.upsert({
    where: { slug: "sariq" },
    update: {},
    create: {
      attributeId: colorAttribute.id,
      value: "Sariq",
      slug: "sariq",
    },
  });

  const colorGreen = await prisma.attributeValue.upsert({
    where: { slug: "yashil" },
    update: {},
    create: {
      attributeId: colorAttribute.id,
      value: "Yashil",
      slug: "yashil",
    },
  });

  // Gender values
  const genderBoy = await prisma.attributeValue.upsert({
    where: { slug: "o'g'il-bola" },
    update: {},
    create: {
      attributeId: genderAttribute.id,
      value: "O'g'il bola",
      slug: "o'g'il-bola",
    },
  });

  const genderGirl = await prisma.attributeValue.upsert({
    where: { slug: "qiz-bola" },
    update: {},
    create: {
      attributeId: genderAttribute.id,
      value: "Qiz bola",
      slug: "qiz-bola",
    },
  });

  const genderUnisex = await prisma.attributeValue.upsert({
    where: { slug: "uniseks" },
    update: {},
    create: {
      attributeId: genderAttribute.id,
      value: "Uniseks",
      slug: "uniseks",
    },
  });

  // Material values
  const materialCotton = await prisma.attributeValue.upsert({
    where: { slug: "paxta" },
    update: {},
    create: {
      attributeId: materialAttribute.id,
      value: "Paxta",
      slug: "paxta",
    },
  });

  const materialPlastic = await prisma.attributeValue.upsert({
    where: { slug: "plastik" },
    update: {},
    create: {
      attributeId: materialAttribute.id,
      value: "Plastik",
      slug: "plastik",
    },
  });

  const materialWood = await prisma.attributeValue.upsert({
    where: { slug: "yog'och" },
    update: {},
    create: {
      attributeId: materialAttribute.id,
      value: "Yog'och",
      slug: "yog'och",
    },
  });

  // Brand values
  const brandInbola = await prisma.attributeValue.upsert({
    where: { slug: "inbola" },
    update: {},
    create: {
      attributeId: brandAttribute.id,
      value: "Inbola",
      slug: "inbola",
    },
  });

  const brandLego = await prisma.attributeValue.upsert({
    where: { slug: "lego" },
    update: {},
    create: {
      attributeId: brandAttribute.id,
      value: "LEGO",
      slug: "lego",
    },
  });

  const brandBarbie = await prisma.attributeValue.upsert({
    where: { slug: "barbie" },
    update: {},
    create: {
      attributeId: brandAttribute.id,
      value: "Barbie",
      slug: "barbie",
    },
  });

  // 5. Assign attributes to categories
  // Toys attributes
  await prisma.categoryAttribute.upsert({
    where: {
      categoryId_attributeId: {
        categoryId: toysCategory.id,
        attributeId: ageAttribute.id,
      },
    },
    update: {},
    create: {
      categoryId: toysCategory.id,
      attributeId: ageAttribute.id,
      isRequired: true,
    },
  });

  await prisma.categoryAttribute.upsert({
    where: {
      categoryId_attributeId: {
        categoryId: toysCategory.id,
        attributeId: colorAttribute.id,
      },
    },
    update: {},
    create: {
      categoryId: toysCategory.id,
      attributeId: colorAttribute.id,
      isRequired: false,
    },
  });

  await prisma.categoryAttribute.upsert({
    where: {
      categoryId_attributeId: {
        categoryId: toysCategory.id,
        attributeId: materialAttribute.id,
      },
    },
    update: {},
    create: {
      categoryId: toysCategory.id,
      attributeId: materialAttribute.id,
      isRequired: false,
    },
  });

  // Children clothing attributes
  await prisma.categoryAttribute.upsert({
    where: {
      categoryId_attributeId: {
        categoryId: childrenClothingCategory.id,
        attributeId: sizeAttribute.id,
      },
    },
    update: {},
    create: {
      categoryId: childrenClothingCategory.id,
      attributeId: sizeAttribute.id,
      isRequired: true,
    },
  });

  await prisma.categoryAttribute.upsert({
    where: {
      categoryId_attributeId: {
        categoryId: childrenClothingCategory.id,
        attributeId: colorAttribute.id,
      },
    },
    update: {},
    create: {
      categoryId: childrenClothingCategory.id,
      attributeId: colorAttribute.id,
      isRequired: true,
    },
  });

  await prisma.categoryAttribute.upsert({
    where: {
      categoryId_attributeId: {
        categoryId: childrenClothingCategory.id,
        attributeId: genderAttribute.id,
      },
    },
    update: {},
    create: {
      categoryId: childrenClothingCategory.id,
      attributeId: genderAttribute.id,
      isRequired: true,
    },
  });

  // Children shoes attributes
  await prisma.categoryAttribute.upsert({
    where: {
      categoryId_attributeId: {
        categoryId: childrenShoesCategory.id,
        attributeId: sizeAttribute.id,
      },
    },
    update: {},
    create: {
      categoryId: childrenShoesCategory.id,
      attributeId: sizeAttribute.id,
      isRequired: true,
    },
  });

  await prisma.categoryAttribute.upsert({
    where: {
      categoryId_attributeId: {
        categoryId: childrenShoesCategory.id,
        attributeId: colorAttribute.id,
      },
    },
    update: {},
    create: {
      categoryId: childrenShoesCategory.id,
      attributeId: colorAttribute.id,
      isRequired: true,
    },
  });

  // 6. Create children products with variants
  const products = [
    // Toys
    {
      name: "LEGO Classic Yaratuvchilik to'plami",
      slug: "lego-classic-yaratuvchilik",
      description: "Bolalar uchun LEGO klassik yaratuvchilik to'plami",
      categoryId: toysCategory.id,
      isNew: true,
      isFeatured: true,
      isTrending: false,
      isBestSeller: false,
      variants: [
        {
          sku: "LEGO-CLS-001",
          price: 150000,
          stock: 25,
          barcode: "1234567890001",
          warehouseLocation: "WH-TOY-1A",
          attributes: [
            { attributeId: ageAttribute.id, valueId: age6to8.id },
            { attributeId: colorAttribute.id, valueId: colorRed.id },
            { attributeId: materialAttribute.id, valueId: materialPlastic.id },
            { attributeId: brandAttribute.id, valueId: brandLego.id },
          ],
        },
      ],
    },
    {
      name: "Barbie Fashion qo'g'irchoq",
      slug: "barbie-fashion-qogirchog",
      description: "Qizlar uchun Barbie fashion qo'g'irchoq",
      categoryId: toysCategory.id,
      isNew: false,
      isFeatured: true,
      isTrending: true,
      isBestSeller: false,
      variants: [
        {
          sku: "BARBIE-FASH-001",
          price: 85000,
          stock: 30,
          barcode: "1234567890002",
          warehouseLocation: "WH-TOY-1B",
          attributes: [
            { attributeId: ageAttribute.id, valueId: age3to5.id },
            { attributeId: colorAttribute.id, valueId: colorPink.id },
            { attributeId: materialAttribute.id, valueId: materialPlastic.id },
            { attributeId: brandAttribute.id, valueId: brandBarbie.id },
          ],
        },
      ],
    },

    // Children Clothing
    {
      name: "Bolalar paxta futbolkasi",
      slug: "bolalar-paxta-futbolka",
      description: "Yumshoq paxta materialidan bolalar futbolkasi",
      categoryId: childrenClothingCategory.id,
      isNew: false,
      isFeatured: false,
      isTrending: true,
      isBestSeller: true,
      variants: [
        {
          sku: "TSHIRT-COT-90-BLUE",
          price: 45000,
          stock: 50,
          barcode: "1234567890003",
          warehouseLocation: "WH-CLO-1A",
          attributes: [
            { attributeId: sizeAttribute.id, valueId: size90.id },
            { attributeId: colorAttribute.id, valueId: colorBlue.id },
            { attributeId: materialAttribute.id, valueId: materialCotton.id },
            { attributeId: genderAttribute.id, valueId: genderBoy.id },
            { attributeId: brandAttribute.id, valueId: brandInbola.id },
          ],
        },
        {
          sku: "TSHIRT-COT-100-PINK",
          price: 45000,
          stock: 45,
          barcode: "1234567890004",
          warehouseLocation: "WH-CLO-1B",
          attributes: [
            { attributeId: sizeAttribute.id, valueId: size100.id },
            { attributeId: colorAttribute.id, valueId: colorPink.id },
            { attributeId: materialAttribute.id, valueId: materialCotton.id },
            { attributeId: genderAttribute.id, valueId: genderGirl.id },
            { attributeId: brandAttribute.id, valueId: brandInbola.id },
          ],
        },
      ],
    },
    {
      name: "Bolalar sport shimi",
      slug: "bolalar-sport-shim",
      description: "Faol bolalar uchun qulay sport shimi",
      categoryId: childrenClothingCategory.id,
      isNew: true,
      isFeatured: false,
      isTrending: false,
      isBestSeller: false,
      variants: [
        {
          sku: "PANTS-SPT-110-GREEN",
          price: 65000,
          stock: 35,
          barcode: "1234567890005",
          warehouseLocation: "WH-CLO-2A",
          attributes: [
            { attributeId: sizeAttribute.id, valueId: size110.id },
            { attributeId: colorAttribute.id, valueId: colorGreen.id },
            { attributeId: materialAttribute.id, valueId: materialCotton.id },
            { attributeId: genderAttribute.id, valueId: genderUnisex.id },
            { attributeId: brandAttribute.id, valueId: brandInbola.id },
          ],
        },
      ],
    },

    // Children Shoes
    {
      name: "Bolalar sport poyabzali",
      slug: "bolalar-sport-poyabzal",
      description: "Yugurish va sport uchun bolalar poyabzali",
      categoryId: childrenShoesCategory.id,
      isNew: true,
      isFeatured: true,
      isTrending: false,
      isBestSeller: false,
      variants: [
        {
          sku: "SHOES-SPT-25-WHITE",
          price: 120000,
          stock: 20,
          barcode: "1234567890006",
          warehouseLocation: "WH-SHO-1A",
          attributes: [
            { attributeId: sizeAttribute.id, valueId: size100.id },
            { attributeId: colorAttribute.id, valueId: colorYellow.id },
            { attributeId: genderAttribute.id, valueId: genderUnisex.id },
            { attributeId: brandAttribute.id, valueId: brandInbola.id },
          ],
        },
      ],
    },

    // Baby Products
    {
      name: "Chaqaloq yumshoq o'yinchoq",
      slug: "chaqaloq-yumshoq-oyinchog",
      description: "0-2 yosh chaqaloqlar uchun xavfsiz yumshoq o'yinchoq",
      categoryId: babyProductsCategory.id,
      isNew: false,
      isFeatured: true,
      isTrending: false,
      isBestSeller: true,
      variants: [
        {
          sku: "BABY-TOY-SOFT-001",
          price: 35000,
          stock: 40,
          barcode: "1234567890007",
          warehouseLocation: "WH-BABY-1A",
          attributes: [
            { attributeId: ageAttribute.id, valueId: age0to2.id },
            { attributeId: colorAttribute.id, valueId: colorPink.id },
            { attributeId: materialAttribute.id, valueId: materialCotton.id },
            { attributeId: brandAttribute.id, valueId: brandInbola.id },
          ],
        },
      ],
    },

    // Children Books
    {
      name: "Bolalar uchun rang-barang kitob",
      slug: "bolalar-rang-barang-kitob",
      description: "Bolalar uchun rang-barang rasmli kitob",
      categoryId: childrenBooksCategory.id,
      isNew: false,
      isFeatured: false,
      isTrending: true,
      isBestSeller: false,
      variants: [
        {
          sku: "BOOK-COL-001",
          price: 25000,
          stock: 60,
          barcode: "1234567890008",
          warehouseLocation: "WH-BOOK-1A",
          attributes: [
            { attributeId: ageAttribute.id, valueId: age3to5.id },
            { attributeId: brandAttribute.id, valueId: brandInbola.id },
          ],
        },
      ],
    },
  ];

  // Create products and variants
  const createdProducts: any[] = [];
  const createdVariants: any[] = [];

  for (const productData of products) {
    const product = await prisma.product.create({
      data: {
        name: productData.name,
        slug: productData.slug,
        description: productData.description,
        categoryId: productData.categoryId,
        isNew: productData.isNew,
        isFeatured: productData.isFeatured,
        isTrending: productData.isTrending,
        isBestSeller: productData.isBestSeller,
      },
    });

    createdProducts.push(product);

    for (const variantData of productData.variants) {
      const variant = await prisma.productVariant.create({
        data: {
          productId: product.id,
          sku: variantData.sku,
          price: variantData.price,
          stock: variantData.stock,
          lowStockThreshold: 10,
          barcode: variantData.barcode,
          warehouseLocation: variantData.warehouseLocation,
          images: [],
        },
      });

      // Create variant attributes
      for (const attr of variantData.attributes) {
        await prisma.productVariantAttribute.create({
          data: {
            variantId: variant.id,
            attributeId: attr.attributeId,
            valueId: attr.valueId,
          },
        });
      }

      createdVariants.push(variant);
    }
  }

  console.log("✅ Inbola children database seeded successfully!");
  console.log("\n📋 Created:");
  console.log(`- Users: Inbola Superadmin, Inbola Admin`);
  console.log(`- Categories: O'yinchoqlar, Bolalar kiyimlari, Bolalar poyabzallari, Chaqaloq mahsulotlari, Bolalar kitoblari, Sport va faollik`);
  console.log(`- Attributes: Yosh, O'lcham, Rang, Material, Brend, Jins`);
  console.log(`- Products: ${createdProducts.length} bolalar mahsulotlari`);
  console.log(`- Variants: ${createdVariants.length} variants with attributes`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding Inbola database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
