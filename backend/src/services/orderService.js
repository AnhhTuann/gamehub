const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cartService = require('./cartService');

class OrderService {
  async checkout(userId, shippingAddress) {
    const cart = await cartService.getOrCreateCart(userId);
    if (!cart.items || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    let subtotal = 0;
    cart.items.forEach(item => {
      subtotal += (item.variant.price * item.quantity);
    });

    const total = subtotal; // add tax/shipping here if needed

    // Start a transaction
    return await prisma.$transaction(async (tx) => {
      // Create order
      const order = await tx.order.create({
        data: {
          userId,
          status: 'PENDING',
          totalAmount: total,
          shippingAddress,
          items: {
            create: cart.items.map(item => ({
              variantId: item.variantId,
              quantity: item.quantity,
              price: item.variant.price
            }))
          }
        },
        include: { items: true }
      });

      // Deduct inventory
      for (const item of cart.items) {
        if (item.variant.stock < item.quantity) {
          throw new Error(`Insufficient stock for variant ${item.variantId}`);
        }
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      // Empty cart
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id }
      });

      return order;
    });
  }
}

module.exports = new OrderService();
