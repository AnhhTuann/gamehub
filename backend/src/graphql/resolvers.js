const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authService = require('../services/authService');
const productService = require('../services/productService');
const cartService = require('../services/cartService');

const resolvers = {
  Product: {
    price: async (product) => {
      if (product.variants && product.variants.length > 0) {
        return product.variants[0].price;
      }
      const variant = await prisma.productVariant.findFirst({
        where: { productId: product.id }
      });
      return variant ? variant.price : 0.0;
    },
    inventory: async (product) => {
      if (product.variants && product.variants.length > 0) {
        return product.variants[0].inventory;
      }
      const variant = await prisma.productVariant.findFirst({
        where: { productId: product.id }
      });
      return variant ? variant.inventory : 0;
    },
    category: async (product) => {
      if (product.category) return product.category.name;
      const cat = await prisma.category.findUnique({
        where: { id: product.categoryId }
      });
      return cat ? cat.name : "Uncategorized";
    },
    variants: async (product) => {
      if (product.variants) return product.variants;
      return await prisma.productVariant.findMany({
        where: { productId: product.id }
      });
    }
  },

  ProductVariant: {
    product: async (variant) => {
      if (variant.product) return variant.product;
      return await prisma.product.findUnique({
        where: { id: variant.productId }
      });
    }
  },

  OrderItem: {
    productVariant: async (item) => {
      if (item.productVariant) return item.productVariant;
      return await prisma.productVariant.findUnique({
        where: { id: item.productVariantId }
      });
    }
  },

  CartItem: {
    productVariant: async (item) => {
      if (item.productVariant) return item.productVariant;
      return await prisma.productVariant.findUnique({
        where: { id: item.productVariantId }
      });
    }
  },

  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await prisma.user.findUnique({ where: { id: user.userId } });
    },
    
    products: async (_, { categoryId, brandId, search }) => {
      return await productService.getAllProducts(categoryId, brandId, search);
    },
    
    product: async (_, { id }) => {
      return await productService.getProductById(id);
    },
    
    myCart: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await cartService.getOrCreateCart(user.userId);
    },

    myOrders: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await prisma.order.findMany({
        where: { userId: user.userId },
        include: { items: true },
        orderBy: { createdAt: 'desc' }
      });
    },

    orders: async () => {
      return await prisma.order.findMany({
        include: { items: true },
        orderBy: { createdAt: 'desc' }
      });
    },
    
    categories: async () => await prisma.category.findMany(),
    brands: async () => await prisma.brand.findMany(),
    users: async () => await prisma.user.findMany(),
    coupons: async () => await prisma.coupon.findMany()
  },

  Mutation: {
    register: async (_, { email, password, name, phone, address }) => {
      return await authService.register(email, password, name, phone, address);
    },
    
    login: async (_, { email, password }) => {
      return await authService.login(email, password);
    },

    createCategory: async (_, { name, slug }) => {
      return await prisma.category.create({ data: { name, slug } });
    },

    createBrand: async (_, { name }) => {
      return await prisma.brand.create({ data: { name } });
    },

    createProduct: async (_, { title, description, image, categoryId, brandId }) => {
      return await prisma.product.create({
        data: { title, description, image, categoryId, brandId }
      });
    },
    
    createProductVariant: async (_, { productId, sku, color, size, price, inventory }) => {
      return await prisma.productVariant.create({
        data: { productId, sku, color, size, price, inventory }
      });
    },

    addToCart: async (_, { variantId, quantity }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await cartService.addToCart(user.userId, variantId, quantity);
    },

    removeFromCart: async (_, { cartItemId }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await cartService.removeFromCart(user.userId, cartItemId);
    },

    createOrder: async (_, { customerName, customerPhone, items }) => {
      return await prisma.$transaction(async (tx) => {
        let totalAmount = 0;
        
        // 1. Verify inventory
        for (const item of items) {
          const variant = await tx.productVariant.findFirst({
            where: { productId: item.productId }
          });
          if (!variant) {
            throw new Error(`Product variant for product ID ${item.productId} not found`);
          }
          if (variant.inventory < item.quantity) {
            throw new Error(`Not enough inventory. Available: ${variant.inventory}`);
          }
          totalAmount += item.quantity * item.price;
        }

        // 2. Create order
        const order = await tx.order.create({
          data: {
            customerName,
            customerPhone,
            totalAmount,
            status: "COMPLETED",
            items: {
              create: await Promise.all(items.map(async item => {
                const variant = await tx.productVariant.findFirst({
                  where: { productId: item.productId }
                });
                return {
                  productVariantId: variant.id,
                  quantity: item.quantity,
                  price: item.price
                };
              }))
            }
          },
          include: { items: true }
        });

        // 3. Deduct inventory
        for (const item of items) {
          const variant = await tx.productVariant.findFirst({
            where: { productId: item.productId }
          });
          await tx.productVariant.update({
            where: { id: variant.id },
            data: {
              inventory: { decrement: item.quantity }
            }
          });
        }

        return order;
      });
    },

    updateOrderStatus: async (_, { id, status }) => {
      return await prisma.order.update({
        where: { id },
        data: { status },
        include: { items: true }
      });
    },

    updateInventory: async (_, { id, newInventory }) => {
      const variant = await prisma.productVariant.findFirst({
        where: { productId: id }
      });
      if (!variant) {
        throw new Error(`No variant found for product ID ${id}`);
      }
      await prisma.productVariant.update({
        where: { id: variant.id },
        data: { inventory: newInventory }
      });
      return await prisma.product.findUnique({
        where: { id }
      });
    }
  }
};

module.exports = resolvers;
