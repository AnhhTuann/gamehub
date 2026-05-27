import React, { useState } from 'react';
import { ShoppingBag, Menu, X, User, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { SearchModal } from './SearchModal';
import { AIStylistModal } from './AIStylistModal';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAIStylistOpen, setIsAIStylistOpen] = useState(false);
  const { cartCount, openCart } = useCart();
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="font-serif text-2xl lg:text-3xl font-bold tracking-wide">
              OmniWear<span className="text-zinc-500">.</span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`uppercase transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-white border-b-2 border-white pb-1'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsAIStylistOpen(true)}
              className="p-2 text-zinc-400 hover:text-white transition-colors group cursor-pointer hidden md:block"
            >
              <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-zinc-400 hover:text-white transition-colors group cursor-pointer"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </button>
            <Link to="/portal" className="hidden sm:flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              <User className="w-5 h-5" />
              <span>Account</span>
            </Link>
            <button 
              onClick={openCart}
              className="relative p-2 text-zinc-400 hover:text-white transition-colors group cursor-pointer"
            >
              <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    key={cartCount}
                    className="absolute top-0 right-0 bg-white text-zinc-950 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center -mt-1 -mr-1"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-3/4 max-w-sm bg-zinc-900 border-r border-zinc-800 z-50 flex flex-col p-6 lg:hidden shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-serif text-2xl font-bold tracking-wide">
                  OmniWear<span className="text-zinc-500">.</span>
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col gap-6 text-lg font-medium tracking-wide">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-left uppercase transition-colors ${
                      location.pathname === link.path ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openCart();
                  }}
                  className={`text-left uppercase transition-colors text-zinc-400 hover:text-zinc-200`}
                >
                  Cart ({cartCount})
                </button>
              </div>
              <div className="mt-auto border-t border-zinc-800 pt-6">
                 <Link to="/portal" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-lg font-medium text-zinc-400 hover:text-white transition-colors w-full">
                  <User className="w-6 h-6" />
                  <span>Account</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AIStylistModal isOpen={isAIStylistOpen} onClose={() => setIsAIStylistOpen(false)} />
    </>
  );
};
