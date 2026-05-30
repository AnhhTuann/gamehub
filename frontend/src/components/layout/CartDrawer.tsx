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
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[var(--bg-primary)] border-l-2 border-[var(--accent)] z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-[var(--border-primary)]">
              <h2 className="font-pixel text-xs text-[var(--accent)] tracking-wider flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[var(--neon-pink)]" />
                YOUR CART
              </h2>
              <button
                onClick={closeCart}
                className="p-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors rounded-md hover:bg-[var(--accent-subtle)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <span className="text-5xl mb-4">🎮</span>
                  <p className="font-pixel text-[10px] text-[var(--text-muted)] tracking-wider mb-2">CART IS EMPTY</p>
                  <p className="text-[var(--text-muted)] text-sm mb-4">Add some games to get started!</p>
                  <button
                    onClick={closeCart}
                    className="text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
                  >
                    → Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex gap-3 bg-[var(--bg-card)] border border-[var(--border-primary)] p-3 rounded-lg"
                  >
                    <div className="w-16 shrink-0 aspect-square bg-black overflow-hidden rounded-md border border-[var(--border-primary)]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-grow min-w-0">
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] leading-snug line-clamp-1">
                        {item.title}
                      </h3>
                      <span className="text-xs text-[var(--neon-pink)] mt-0.5">{item.category}</span>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[var(--border-primary)] rounded-md overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-[var(--text-primary)]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-[var(--text-muted)] hover:text-[var(--neon-green)] hover:bg-[rgba(80,250,123,0.1)] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-sm font-bold text-[var(--neon-green)]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors"
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
              <div className="p-5 border-t border-[var(--border-primary)] bg-[var(--bg-primary)]">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-[var(--text-secondary)]">Subtotal</span>
                  <span className="text-lg font-bold text-[var(--neon-green)]">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] text-center mb-4">Shipping calculated at checkout</p>
                <Link to="/checkout" onClick={closeCart} className="w-full block">
                  <button 
                    className="w-full py-3 text-sm font-bold bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] tracking-wide rounded-md border-2 border-[var(--accent-hover)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                    style={{ boxShadow: '4px 4px 0 0 var(--card-shadow), 0 0 15px var(--accent-glow)' }}
                  >
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
