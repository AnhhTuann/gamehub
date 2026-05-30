import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export const CartDrawer = () => {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart, cartTotal } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 cursor-pointer"
            style={{ backgroundColor: 'var(--overlay)' }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-theme-primary border-l border-theme-primary z-50 flex flex-col shadow-2xl transition-colors"
          >
            <div className="flex items-center justify-between p-6 border-b border-theme-primary">
              <h2 className="font-serif text-xl font-bold text-theme-primary tracking-wide flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-accent" />
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                className="p-2 text-theme-muted hover:text-theme-primary transition-colors rounded-lg hover:bg-theme-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-theme-secondary rounded-2xl flex items-center justify-center mb-6">
                    <ShoppingBag className="w-8 h-8 text-theme-muted" />
                  </div>
                  <p className="text-theme-secondary text-lg font-medium mb-2">Your cart is empty</p>
                  <p className="text-theme-muted text-sm mb-6">Add some items to get started!</p>
                  <button
                    onClick={closeCart}
                    className="text-accent font-semibold text-sm hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex gap-4 group"
                  >
                    <div className="w-20 shrink-0 aspect-square bg-theme-secondary overflow-hidden rounded-xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-grow min-w-0">
                      <h3 className="font-sans text-sm text-theme-primary font-medium leading-snug line-clamp-1">
                        {item.title}
                      </h3>
                      <span className="text-theme-muted text-xs mt-1">{item.category}</span>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center border border-theme-primary rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 text-theme-muted hover:text-theme-primary hover:bg-theme-secondary transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-theme-primary">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-theme-muted hover:text-theme-primary hover:bg-theme-secondary transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-accent font-bold text-sm">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-theme-muted hover:text-red-500 transition-colors text-[10px] font-semibold uppercase tracking-wider"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-theme-primary bg-theme-primary">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-theme-secondary text-sm">Subtotal</span>
                  <span className="text-xl font-bold text-theme-primary">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-theme-muted text-xs text-center mb-4">Shipping & taxes calculated at checkout</p>
                <Link to="/checkout" onClick={closeCart} className="w-full block">
                  <button className="w-full py-4 bg-accent text-white font-bold tracking-wider uppercase text-sm rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
