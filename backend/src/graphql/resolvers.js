const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authService = require('../services/authService');
const cartService = require('../services/cartService'); // We will update this

const resolvers = {
  Game: {
    genre: async (game) => {
      if (game.genre) return game.genre;
      if (!game.genreId) return null;
      return await prisma.genre.findUnique({ where: { id: game.genreId } });
    },
    addedBy: async (game) => {
      if (!game.addedById) return null;
      return await prisma.user.findUnique({ where: { id: game.addedById } });
    }
  },

  OrderItem: {
    game: async (item) => {
      if (item.game) return item.game;
      return await prisma.game.findUnique({ where: { id: item.gameId } });
    }
  },

  CartItem: {
    game: async (item) => {
      if (item.game) return item.game;
      return await prisma.game.findUnique({ where: { id: item.gameId } });
    }
  },

  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await prisma.user.findUnique({ where: { id: user.userId } });
    },
    
    games: async () => await prisma.game.findMany({ orderBy: { createdAt: 'desc' } }),
    game: async (_, { id }) => await prisma.game.findUnique({ where: { id } }),
    gameByRawgId: async (_, { rawgId }) => await prisma.game.findUnique({ where: { rawgId } }),
    
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

    orders: async () => await prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: 'desc' } }),
    users: async () => await prisma.user.findMany(),
  },

  Mutation: {
    register: async (_, { email, password, name, phone, address }) => {
      return await authService.register(email, password, name, phone, address);
    },
    
    login: async (_, { email, password }) => {
      return await authService.login(email, password);
    },

    addToCart: async (_, { rawgId, title, price, image, quantity }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await cartService.addToCart(user.userId, rawgId, title, price, image, quantity);
    },

    removeFromCart: async (_, { cartItemId }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await cartService.removeFromCart(user.userId, cartItemId);
    },

    createOrder: async (_, { customerName, customerPhone, items }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await prisma.$transaction(async (tx) => {
        let totalAmount = 0;
        
        const orderItemsData = await Promise.all(items.map(async item => {
          let game = await tx.game.findUnique({ where: { rawgId: item.rawgId } });
          if (!game) {
            throw new Error(`Game ${item.title} not found in inventory.`);
          }
          if (game.stockQuantity < item.quantity) {
            throw new Error(`Rất tiếc, sản phẩm này vừa hết hàng!`);
          }
          
          await tx.game.update({
            where: { id: game.id },
            data: { stockQuantity: game.stockQuantity - item.quantity }
          });

          totalAmount += item.quantity * item.price;
          return {
            gameId: game.id,
            quantity: item.quantity,
            price: item.price
          };
        }));

        const order = await tx.order.create({
          data: {
            userId: user.userId,
            customerName,
            customerPhone,
            totalAmount,
            status: "SUCCESS",
            items: { create: orderItemsData }
          },
          include: { items: true }
        });

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

    addGame: async (_, { rawgId, title, price, image, stockQuantity }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      if (user.role !== 'STAFF' && user.role !== 'ADMIN') {
        throw new Error("Unauthorized. Only STAFF or ADMIN can add games.");
      }
      return await prisma.game.create({
        data: {
          rawgId,
          title,
          price,
          image,
          stockQuantity,
          addedById: user.userId
        }
      });
    }
  }
};

module.exports = resolvers;
