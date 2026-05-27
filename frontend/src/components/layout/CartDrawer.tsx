import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
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
    return () => {
      document.body.style.overflow = 'unset';
    };
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: 'easeInOut' }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-zinc-950 border-l border-zinc-800 z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-zinc-800/60">
              <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                className="p-2 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-8 h-8 text-zinc-500" />
                  </div>
                  <p className="text-zinc-400 font-serif text-lg mb-6">Your cart is empty.</p>
                  <button
                    onClick={closeCart}
                    className="text-white underline underline-offset-4 hover:text-zinc-300 transition-colors"
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
                    <div className="w-24 shrink-0 aspect-square bg-zinc-900 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="font-sans text-sm text-zinc-300 leading-relaxed text-balance">
                        {item.name}
                      </h3>
                      <span className="text-zinc-500 text-xs mt-1 uppercase tracking-wider">{item.category} • M • Black</span>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center border border-zinc-800 rounded-none bg-zinc-900/50">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-zinc-400 hover:text-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-medium text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-zinc-400 hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                           <span className="text-white font-bold tracking-wider">
                            ${(item.price * item.quantity).toFixed(2)}
                           </span>
                           <button
                             onClick={() => removeFromCart(item.id)}
                             className="text-zinc-600 hover:text-white transition-colors text-xs font-medium uppercase tracking-wider flex items-center gap-1"
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
              <div className="p-6 border-t border-zinc-800/60 bg-zinc-950">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-zinc-400 font-sans tracking-wide">Subtotal</span>
                  <span className="text-2xl font-bold text-white tracking-wider">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-zinc-500 text-xs text-center mb-6 tracking-wide">Shipping & taxes calculated at checkout</p>
                <Link to="/checkout" onClick={closeCart} className="w-full">
                  <button className="w-full py-5 bg-white text-black font-semibold tracking-widest uppercase text-sm hover:bg-zinc-200 transition-colors duration-300">
                    Proceed to Checkout
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
