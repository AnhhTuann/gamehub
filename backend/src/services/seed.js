const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('Bắt đầu quy trình seeding dữ liệu từ DummyJSON...');

  try {
    const jsonPath = path.join(__dirname, 'products_seed.json');
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`Không tìm thấy file metadata tại: ${jsonPath}`);
    }

    const productsData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    console.log(`Đã đọc ${productsData.length} sản phẩm mẫu từ file JSON.`);

    // 1. Dọn dẹp dữ liệu cũ để tránh trùng lặp hoặc xung đột khóa ngoại
    console.log('Đang dọn dẹp dữ liệu cũ trong CSDL...');
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.brand.deleteMany();

    // 2. Khởi tạo maps để lưu trữ categories và brands
    const categoriesMap = {};
    const brandsMap = {};
    let count = 0;

    for (const item of productsData) {
      // Đảm bảo danh mục tồn tại
      const catName = item.category;
      const catSlug = catName.toLowerCase();
      
      if (!categoriesMap[catName]) {
        let category = await prisma.category.findUnique({
          where: { slug: catSlug }
        });
        if (!category) {
          category = await prisma.category.create({
            data: { name: catName, slug: catSlug }
          });
        }
        categoriesMap[catName] = category.id;
      }

      // Đảm bảo brand tồn tại
      const brandName = item.brand || 'Generic';
      if (!brandsMap[brandName]) {
        let brand = await prisma.brand.findFirst({
          where: { name: brandName }
        });
        if (!brand) {
          brand = await prisma.brand.create({
            data: { name: brandName }
          });
        }
        brandsMap[brandName] = brand.id;
      }

      // Tạo sản phẩm
      const createdProduct = await prisma.product.create({
        data: {
          title: item.title,
          description: item.description,
          image: (item.images && item.images.length > 0) ? item.images[0] : item.image,
          categoryId: categoriesMap[catName],
          brandId: brandsMap[brandName]
        }
      });

      // Tạo ProductVariant mặc định cho sản phẩm
      // Random tồn kho từ 15 đến 60
      const inventory = Math.floor(Math.random() * 46) + 15;
      await prisma.productVariant.create({
        data: {
          productId: createdProduct.id,
          sku: `OW-${createdProduct.id.slice(0, 8).toUpperCase()}-M`,
          color: item.color || 'Black',
          size: 'M',
          price: parseFloat(item.price),
          inventory: inventory
        }
      });

      count++;
      console.log(`[${catName}] Đã chèn sản phẩm: "${item.title}"`);
    }

    console.log(`\nSeeding thành công! Đã chèn ${count} sản phẩm mới từ DummyJSON vào CSDL PostgreSQL!`);
  } catch (error) {
    console.error('Lỗi khi seeding dữ liệu:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
