const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const prisma = new PrismaClient();

async function main() {
  console.log('Bắt đầu quy trình seeding dữ liệu...');

  try {
    // 1. Fetch dữ liệu từ FakeStore API
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;

    // Lọc chỉ lấy quần áo nam và nữ
    const clothingProducts = products.filter(
      p => p.category === "men's clothing" || p.category === "women's clothing"
    );

    console.log(`Đã tải ${clothingProducts.length} sản phẩm quần áo từ FakeStoreAPI.`);

    // 2. Chèn vào CSDL
    let count = 0;
    for (const product of clothingProducts) {
      // Bỏ qua nếu đã tồn tại title (để tránh trùng lặp khi chạy lại)
      const existingProduct = await prisma.product.findFirst({
        where: { title: product.title }
      });

      if (!existingProduct) {
        await prisma.product.create({
          data: {
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            // Random tồn kho từ 10 đến 50
            inventory: Math.floor(Math.random() * 41) + 10,
          }
        });
        count++;
      }
    }

    console.log(`Seeding thành công! Đã chèn ${count} sản phẩm mới vào CSDL.`);
  } catch (error) {
    console.error('Lỗi khi seeding dữ liệu:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
