const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProductService {
  async getAllProducts(categoryId, brandId, search) {
    let where = {};
    if (categoryId) where.categoryId = categoryId;
    if (brandId) where.brandId = brandId;
    if (search) where.title = { contains: search, mode: 'insensitive' };
    
    return await prisma.product.findMany({
      where,
      include: { variants: true, category: true, brand: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getProductById(id) {
    return await prisma.product.findUnique({
      where: { id },
      include: { variants: true, category: true, brand: true }
    });
  }

  async createProduct(data) {
    return await prisma.product.create({ data });
  }

  async updateProduct(id, data) {
    return await prisma.product.update({ where: { id }, data });
  }

  async deleteProduct(id) {
    await prisma.product.delete({ where: { id } });
    return true;
  }

  async createProductVariant(data) {
    return await prisma.productVariant.create({ data });
  }

  async updateProductVariant(id, data) {
    return await prisma.productVariant.update({ where: { id }, data });
  }
}

module.exports = new ProductService();
