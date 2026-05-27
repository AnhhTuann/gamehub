const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CartService {
  async getOrCreateCart(userId) {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { variant: true } } }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: { items: { include: { variant: true } } }
      });
    }
    return cart;
  }

  async addToCart(userId, variantId, quantity) {
    const cart = await this.getOrCreateCart(userId);
    const existingItem = cart.items.find(item => item.variantId === variantId);

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      });
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, variantId, quantity }
      });
    }

    return await this.getOrCreateCart(userId);
  }

  async removeFromCart(userId, cartItemId) {
    const cart = await this.getOrCreateCart(userId);
    const item = cart.items.find(i => i.id === cartItemId);
    
    if (!item) throw new Error("CartItem not found in your cart");

    await prisma.cartItem.delete({ where: { id: cartItemId } });
    return await this.getOrCreateCart(userId);
  }
}

module.exports = new CartService();
