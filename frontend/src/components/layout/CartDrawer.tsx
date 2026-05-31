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
            className="fixed inset-0 z-50 cursor-pointer bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[400px] bg-[#282a36] border-l-2 border-[#bd93f9] z-50 flex flex-col shadow-[-10px_0_20px_rgba(189,147,249,0.15)]"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#bd93f9]/30">
              <h2 className="font-pixel text-lg text-[#bd93f9] tracking-wider flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#ff79c6]" />
                YOUR CART
              </h2>
              <button
                onClick={closeCart}
                className="p-2 text-[#6272a4] hover:text-[#ff79c6] hover:bg-[#ff79c6]/10 transition-colors rounded-md"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <span className="text-6xl mb-6 opacity-50 grayscale">👾</span>
                  <p className="font-pixel text-xs text-[#6272a4] tracking-widest mb-3 uppercase">CART IS EMPTY</p>
                  <p className="text-[#f8f8f2] text-sm mb-6 opacity-80">Your inventory is looking a little light.</p>
                  <button
                    onClick={closeCart}
                    className="text-sm font-bold text-[#ff79c6] hover:text-[#bd93f9] transition-colors flex items-center gap-2"
                  >
                    GO EXPLORE <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex gap-4 bg-[#44475a]/30 border border-[#6272a4]/50 p-4 rounded-lg"
                  >
                    <div className="w-20 shrink-0 aspect-[3/4] bg-black overflow-hidden rounded border border-[#6272a4]/50">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80'}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-grow min-w-0">
                      <h3 className="text-base font-sans font-bold text-[#f8f8f2] leading-snug line-clamp-2 mb-1">
                        {item.title}
                      </h3>
                      <span className="text-xs font-bold text-[#ff79c6] tracking-widest uppercase">PC / STEAM</span>
                      
                      <div className="mt-auto flex items-end justify-between pt-3">
                        <div className="flex flex-col gap-2">
                          <span className="text-lg font-bold text-[#50fa7b]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <div className="flex items-center border border-[#6272a4] rounded overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 bg-[#282a36] text-[#f8f8f2] hover:bg-[#ff79c6] hover:text-black transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-[#f8f8f2] bg-[#282a36] py-1.5 border-x border-[#6272a4]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 bg-[#282a36] text-[#f8f8f2] hover:bg-[#50fa7b] hover:text-black transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-[#6272a4] hover:text-[#ff5555] hover:bg-[#ff5555]/10 rounded transition-colors"
                          title="Remove item"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-[#bd93f9]/30 bg-[#282a36]">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-pixel text-xs text-[#f8f8f2] tracking-widest uppercase">SUBTOTAL</span>
                  <span className="text-2xl font-bold text-[#50fa7b]">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-[#6272a4] text-center mb-5 font-medium">Digital licenses are delivered instantly.</p>
                <Link to="/checkout" onClick={closeCart} className="w-full block">
                  <button 
                    className="w-full py-4 text-base font-bold font-sans bg-[#bd93f9] text-black tracking-widest uppercase rounded hover:-translate-y-1 hover:bg-[#ff79c6] transition-all flex items-center justify-center gap-2"
                    style={{ boxShadow: '0 5px 15px rgba(189,147,249,0.4)' }}
                  >
                    PROCEED TO CHECKOUT
                    <ArrowRight className="w-5 h-5" />
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
