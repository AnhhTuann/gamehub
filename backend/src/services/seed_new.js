const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('Bắt đầu thêm dữ liệu mới...');
  
  try {
    const jsonPath = path.join(__dirname, '../../../new_data.json');
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`Không tìm thấy file metadata tại: ${jsonPath}`);
    }

    const dataObj = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const productsData = dataObj.products || dataObj;
    console.log(`Đã đọc ${productsData.length} sản phẩm mới từ file JSON.`);

    const categoriesMap = {};
    const brandsMap = {};
    let count = 0;

    for (const item of productsData) {
      let prefix = '';
      if (item.category === 'Men') prefix = 'mens-';
      else if (item.category === 'Women') prefix = 'womens-';
      
      const catName = prefix + (item.subcategory || 'accessories').toLowerCase().replace(/\s+/g, '-');
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

      const createdProduct = await prisma.product.create({
        data: {
          title: item.name || item.title,
          description: item.description,
          image: (item.images && item.images.length > 0) ? item.images[0] : null,
          categoryId: categoriesMap[catName],
          brandId: brandsMap[brandName]
        }
      });

      const inventory = Math.floor(Math.random() * 46) + 15;
      await prisma.productVariant.create({
        data: {
          productId: createdProduct.id,
          sku: `OW-${createdProduct.id.slice(0, 8).toUpperCase()}-M`,
          color: (item.color && item.color.length > 0) ? item.color[0] : 'Black',
          size: 'M',
          price: parseFloat(item.price),
          inventory: inventory
        }
      });

      count++;
      console.log(`[${catName}] Đã chèn sản phẩm: "${item.name || item.title}"`);
    }

    console.log(`\nThành công! Đã thêm ${count} sản phẩm.`);
  } catch (error) {
    console.error('Lỗi:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
