const authService = require('../services/authService');
const productService = require('../services/productService');
const cartService = require('../services/cartService');
const orderService = require('../services/orderService');

const resolvers = {
  Query: {
    me: async (_, __, { user, prisma }) => {
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

    myOrders: async (_, __, { user, prisma }) => {
      if (!user) throw new Error("Not authenticated");
      return await prisma.order.findMany({
        where: { userId: user.userId },
        include: { items: { include: { variant: { include: { product: true } } } } },
        orderBy: { createdAt: 'desc' }
      });
    },
    
    categories: async (_, __, { prisma }) => await prisma.category.findMany(),
    brands: async (_, __, { prisma }) => await prisma.brand.findMany(),
    users: async (_, __, { user, prisma }) => {
      if (!user || user.role !== 'ADMIN') throw new Error("Unauthorized");
      return await prisma.user.findMany();
    }
  },

  Mutation: {
    register: async (_, { email, password, name, phone, address }) => {
      return await authService.register(email, password, name, phone, address);
    },
    
    login: async (_, { email, password }) => {
      return await authService.login(email, password);
    },

    createProduct: async (_, { data }, { user }) => {
      if (!user || (user.role !== 'ADMIN' && user.role !== 'STAFF')) throw new Error("Unauthorized");
      return await productService.createProduct(data);
    },
    
    createProductVariant: async (_, { data }, { user }) => {
      if (!user || (user.role !== 'ADMIN' && user.role !== 'STAFF')) throw new Error("Unauthorized");
      return await productService.createProductVariant(data);
    },

    addToCart: async (_, { variantId, quantity }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await cartService.addToCart(user.userId, variantId, quantity);
    },

    removeFromCart: async (_, { cartItemId }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await cartService.removeFromCart(user.userId, cartItemId);
    },

    checkout: async (_, { shippingAddress }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await orderService.checkout(user.userId, shippingAddress);
    }
  }
};

module.exports = resolvers;
