const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Đang cập nhật hình ảnh...');
  const products = await prisma.product.findMany({ 
    orderBy: { createdAt: 'desc' }, 
    take: 20 
  });
  
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    // using random picsum seed with product id
    const newImage = `https://picsum.photos/seed/${p.id}/600/800`;
    await prisma.product.update({ 
      where: { id: p.id }, 
      data: { image: newImage } 
    });
  }
  
  console.log('Cập nhật hình ảnh thành công!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
