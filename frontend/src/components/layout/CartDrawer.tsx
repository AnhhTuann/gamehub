import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { Link } from 'react-router-dom';

export const CartDrawer = () => {
  const cart = useCartStore((state) => state.cart);
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cartTotal = useCartStore((state) => state.cartTotal)();

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isDrawerOpen]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Dark blurred overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 bottom-0 h-full w-full max-w-md bg-[#282a36] border-l-2 border-[#bd93f9]/50 z-50 flex flex-col shadow-[-10px_0_30px_rgba(189,147,249,0.15)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#bd93f9]/30 relative">
              <h2 className="font-pixel text-lg text-[#bd93f9] tracking-wider uppercase">
                YOUR INVENTORY
              </h2>
              <button
                onClick={closeCart}
                className="p-2 text-[#6272a4] hover:text-[#ff5555] hover:bg-[#ff5555]/10 rounded-md transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
              {/* Glowing bottom border indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#bd93f9]/50 to-transparent shadow-[0_1px_10px_#bd93f9]" />
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center py-12">
                  {/* Glowing SVG Space Invader */}
                  <svg viewBox="0 0 11 8" className="w-16 h-16 text-[#ff79c6] animate-bounce fill-current mb-6 drop-shadow-[0_0_8px_#ff79c6]">
                    <path d="M3 0h1v1H3zm5 0h1v1H8zM4 1h3v1H4zm-2 1h7v1H2zm-2 1h11v1H0zm0 1h2v1H0zm3 0h5v1H3zm6 0h2v1H9zm-9 1h1v1H0zm2 0h1v1H2zm5 0h1v1H7zm3 0h1v1H10zm2 1h2v1H2zm5 0h2v1H7z" />
                  </svg>
                  <p className="font-pixel text-xs text-[#bd93f9] tracking-widest mb-2 uppercase">CART IS EMPTY</p>
                  <p className="text-[#6272a4] text-sm font-medium">Your inventory is looking a little light.</p>
                  <button
                    onClick={closeCart}
                    className="mt-6 text-sm font-bold text-[#ff79c6] hover:text-[#bd93f9] transition-colors flex items-center gap-2"
                  >
                    GO EXPLORE <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex gap-4 p-2.5 rounded-lg border border-transparent hover:border-[#6272a4]/30 hover:bg-[#44475a]/30 transition-all duration-200"
                  >
                    {/* Cover image */}
                    <div className="w-16 h-20 shrink-0 bg-black/40 overflow-hidden rounded border border-[#6272a4]/40">
                      <img
                        src={item.coverImage || item.image || 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80'}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Game Details */}
                    <div className="flex flex-col flex-grow min-w-0 justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-[#f8f8f2] leading-snug line-clamp-2">
                          {item.title}
                        </h3>
                        <span className="text-[10px] font-bold text-[#ff79c6] tracking-wider uppercase">PC / STEAM</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-sm font-bold text-[#50fa7b]">
                          ${item.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-[#6272a4] hover:text-[#ff5555] hover:bg-[#ff5555]/10 rounded transition-all duration-200"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#bd93f9]/30 bg-[#282a36] relative shrink-0">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-pixel text-xs text-[#f8f8f2] tracking-widest uppercase">SUBTOTAL</span>
                  <span className="text-xl font-bold text-[#50fa7b] drop-shadow-[0_0_5px_rgba(80,250,123,0.3)]">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-[10px] text-[#6272a4] text-center mb-4 font-medium">Digital licenses are delivered instantly.</p>
                <Link to="/checkout" onClick={closeCart} className="w-full block">
                  <button 
                    className="w-full py-3.5 text-sm font-bold font-sans bg-[#bd93f9] text-[#282a36] tracking-widest uppercase rounded hover:-translate-y-0.5 hover:bg-[#ff79c6] active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
                    style={{ boxShadow: '0 4px 15px rgba(189,147,249,0.3)' }}
                  >
                    PROCEED TO CHECKOUT
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
