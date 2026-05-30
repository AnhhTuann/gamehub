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
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-theme-primary border-l-4 border-[var(--accent)] z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b-4 border-theme-secondary">
              <h2 className="font-pixel text-[10px] text-[var(--neon-cyan)] tracking-wider flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[var(--accent)]" />
                YOUR CART
              </h2>
              <button
                onClick={closeCart}
                className="p-2 text-theme-muted hover:text-[var(--accent)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <span className="text-5xl mb-4">🎮</span>
                  <p className="font-pixel text-[9px] text-theme-muted tracking-wider mb-2">CART IS EMPTY</p>
                  <p className="text-theme-muted text-xs mb-4">Add some games!</p>
                  <button
                    onClick={closeCart}
                    className="font-pixel text-[8px] text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors tracking-wider"
                  >
                    {'> '}CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex gap-3 bg-theme-secondary border-2 border-theme-primary p-3"
                  >
                    <div className="w-16 shrink-0 aspect-square bg-black overflow-hidden border-2 border-theme-primary">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-grow min-w-0">
                      <h3 className="font-pixel text-[7px] text-white leading-relaxed line-clamp-1 tracking-wider">
                        {item.title}
                      </h3>
                      <span className="font-pixel text-[6px] text-[var(--neon-cyan)] mt-0.5">{item.category}</span>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center border-2 border-theme-primary">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-theme-muted hover:text-[var(--accent)] hover:bg-theme-tertiary transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-pixel text-[7px] font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-theme-muted hover:text-[var(--neon-green)] hover:bg-theme-tertiary transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="font-pixel text-[8px] text-[var(--neon-green)]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="font-pixel text-[6px] text-theme-muted hover:text-red-500 transition-colors tracking-wider"
                          >
                            REMOVE
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t-4 border-theme-secondary bg-theme-primary">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-pixel text-[8px] text-theme-secondary tracking-wider">SUBTOTAL</span>
                  <span className="font-pixel text-sm text-[var(--neon-green)]">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="font-pixel text-[6px] text-theme-muted text-center mb-3 tracking-wider">SHIPPING CALCULATED AT CHECKOUT</p>
                <Link to="/checkout" onClick={closeCart} className="w-full block">
                  <button className="w-full py-3 font-pixel text-[9px] bg-[var(--accent)] text-white tracking-wider border-4 border-[var(--accent-hover)] retro-shadow-dark hover:translate-y-1 hover:shadow-none active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2">
                    CHECKOUT
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
