const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'omniwear_super_secret_key';

const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
    user: async (_, { id }) => await prisma.user.findUnique({ where: { id } }),
    
    categories: async () => await prisma.category.findMany(),
    brands: async () => await prisma.brand.findMany(),

    products: async (_, { categoryId, brandId, search }) => {
      let where = {};
      if (categoryId) where.categoryId = categoryId;
      if (brandId) where.brandId = brandId;
      if (search) where.title = { contains: search, mode: 'insensitive' };
      
      return await prisma.product.findMany({
        where,
        include: { variants: true, category: true, brand: true },
        orderBy: { createdAt: 'desc' }
      });
    },
    product: async (_, { id }) => {
      return await prisma.product.findUnique({
        where: { id },
        include: { variants: true, category: true, brand: true }
      });
    },

    cart: async (_, { id }) => {
      return await prisma.cart.findUnique({
        where: { id },
        include: { items: { include: { productVariant: { include: { product: true } } } } }
      });
    },

    orders: async () => {
      return await prisma.order.findMany({
        include: { items: { include: { productVariant: { include: { product: true } } } } },
        orderBy: { createdAt: 'desc' }
      });
    },
    order: async (_, { id }) => {
      return await prisma.order.findUnique({
        where: { id },
        include: { items: { include: { productVariant: { include: { product: true } } } } }
      });
    },
    
    coupons: async () => await prisma.coupon.findMany()
  },

  Mutation: {
    register: async (_, { email, password, name, phone, address }) => {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) throw new Error("Email already in use");

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name, phone, address }
      });

      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error("Invalid credentials");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid credentials");
      
      if (!user.isActive) throw new Error("Account is disabled");

      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      return { token, user };
    },

    createCategory: async (_, data) => await prisma.category.create({ data }),
    createBrand: async (_, data) => await prisma.brand.create({ data }),

    createProduct: async (_, data) => await prisma.product.create({ data }),
    updateProduct: async (_, { id, ...data }) => await prisma.product.update({ where: { id }, data }),
    deleteProduct: async (_, { id }) => {
      await prisma.product.delete({ where: { id } });
      return true;
    },

    createProductVariant: async (_, data) => await prisma.productVariant.create({ data }),
    updateProductVariant: async (_, { id, ...data }) => await prisma.productVariant.update({ where: { id }, data }),

    addToCart: async (_, { cartId, productVariantId, quantity }) => {
      let cart;
      const variant = await prisma.productVariant.findUnique({ where: { id: productVariantId } });
      if (!variant) throw new Error("Variant not found");

      if (cartId) {
        cart = await prisma.cart.findUnique({ where: { id: cartId } });
      }
      
      if (!cart) {
        cart = await prisma.cart.create({ data: { totalAmount: 0 } });
      }

      const existingItem = await prisma.cartItem.findFirst({
        where: { cartId: cart.id, productVariantId }
      });

      if (existingItem) {
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity }
        });
      } else {
        await prisma.cartItem.create({
          data: { cartId: cart.id, productVariantId, quantity }
        });
      }

      // Recalculate total
      const items = await prisma.cartItem.findMany({
        where: { cartId: cart.id },
        include: { productVariant: true }
      });
      
      const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.productVariant.price), 0);
      
      return await prisma.cart.update({
        where: { id: cart.id },
        data: { totalAmount },
        include: { items: { include: { productVariant: { include: { product: true } } } } }
      });
    },

    removeFromCart: async (_, { cartId, cartItemId }) => {
      await prisma.cartItem.delete({ where: { id: cartItemId } });
      
      // Recalculate total
      const items = await prisma.cartItem.findMany({
        where: { cartId },
        include: { productVariant: true }
      });
      
      const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.productVariant.price), 0);
      
      return await prisma.cart.update({
        where: { id: cartId },
        data: { totalAmount },
        include: { items: { include: { productVariant: { include: { product: true } } } } }
      });
    },

    createOrder: async (_, { cartId, customerName, customerPhone, customerAddress, couponCode }) => {
      return await prisma.$transaction(async (tx) => {
        const cart = await tx.cart.findUnique({
          where: { id: cartId },
          include: { items: { include: { productVariant: true } } }
        });

        if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

        let discount = 0;
        if (couponCode) {
          const coupon = await tx.coupon.findUnique({ where: { code: couponCode } });
          if (coupon && coupon.isActive && (!coupon.usageLimit || coupon.usedCount < coupon.usageLimit)) {
             if (coupon.type === 'FIXED') {
                discount = coupon.value;
             } else if (coupon.type === 'PERCENTAGE') {
                discount = cart.totalAmount * (coupon.value / 100);
             }
             await tx.coupon.update({
               where: { id: coupon.id },
               data: { usedCount: { increment: 1 } }
             });
          }
        }

        const totalAmount = cart.totalAmount - discount;

        // Check inventory and deduct
        for (const item of cart.items) {
          if (item.productVariant.inventory < item.quantity) {
             throw new Error(`Not enough inventory for SKU ${item.productVariant.sku}`);
          }
        }

        const order = await tx.order.create({
          data: {
            customerName,
            customerPhone,
            customerAddress,
            totalAmount: Math.max(totalAmount, 0),
            discount,
            items: {
              create: cart.items.map(item => ({
                productVariantId: item.productVariant.id,
                quantity: item.quantity,
                price: item.productVariant.price
              }))
            }
          },
          include: { items: { include: { productVariant: { include: { product: true } } } } }
        });

        // Deduct inventory
        for (const item of cart.items) {
           await tx.productVariant.update({
             where: { id: item.productVariant.id },
             data: { inventory: { decrement: item.quantity } }
           });
        }

        // Clear cart
        await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
        await tx.cart.update({ where: { id: cart.id }, data: { totalAmount: 0 } });

        return order;
      });
    },

    updateOrderStatus: async (_, { id, status }) => {
      return await prisma.order.update({
        where: { id },
        data: { status }
      });
    },

    createCoupon: async (_, data) => await prisma.coupon.create({ data })
  }
};

module.exports = resolvers;
