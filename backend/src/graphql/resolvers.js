const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    products: async () => {
      return await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
      });
    },
    product: async (_, { id }) => {
      return await prisma.product.findUnique({
        where: { id }
      });
    },
    orders: async () => {
      return await prisma.order.findMany({
        include: {
          items: {
            include: { product: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
    }
  },
  Mutation: {
    updateInventory: async (_, { id, newInventory }) => {
      return await prisma.product.update({
        where: { id },
        data: { inventory: newInventory }
      });
    },
    createOrder: async (_, { customerName, customerPhone, items }) => {
      // Bắt đầu một transaction để đảm bảo tính nhất quán
      return await prisma.$transaction(async (prismaTx) => {
        let totalAmount = 0;
        
        // 1. Kiểm tra tồn kho và tính tổng tiền
        for (const item of items) {
          const product = await prismaTx.product.findUnique({
            where: { id: item.productId }
          });
          
          if (!product) {
            throw new Error(`Product with ID ${item.productId} not found`);
          }
          
          if (product.inventory < item.quantity) {
            throw new Error(`Not enough inventory for ${product.title}. Available: ${product.inventory}`);
          }
          
          totalAmount += item.quantity * item.price;
        }

        // 2. Tạo đơn hàng
        const order = await prismaTx.order.create({
          data: {
            customerName,
            customerPhone,
            totalAmount,
            status: "COMPLETED",
            items: {
              create: items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
              }))
            }
          },
          include: {
            items: {
              include: { product: true }
            }
          }
        });

        // 3. Trừ tồn kho
        for (const item of items) {
          await prismaTx.product.update({
            where: { id: item.productId },
            data: {
              inventory: { decrement: item.quantity }
            }
          });
        }

        return order;
      });
    }
  }
};

module.exports = resolvers;
