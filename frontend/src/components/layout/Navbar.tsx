import React, { useState } from 'react';
import { ShoppingBag, Menu, X, User, Search, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { SearchModal } from './SearchModal';
import { BrandLogo } from '../common/BrandLogo';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount, openCart } = useCart();
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'New In', path: '/shop' },
    { label: 'Collections', path: '/shop' },
  ];

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-accent text-white text-center text-xs py-2 font-medium tracking-wider">
        FREE SHIPPING ON ORDERS OVER $150 — LIMITED TIME ONLY
      </div>

      <nav className="sticky top-0 z-50 bg-theme-elevated backdrop-blur-xl border-b border-theme-primary transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: Mobile menu + Logo */}
          <div className="flex items-center gap-6">
            <button
              className="lg:hidden p-1 text-theme-secondary hover:text-theme-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/">
              <BrandLogo />
            </Link>
          </div>

          {/* Center: Nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 relative py-1 ${
                  location.pathname === link.path
                    ? 'text-accent'
                    : 'text-theme-secondary hover:text-theme-primary'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-accent rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-theme-secondary hover:text-theme-primary transition-colors rounded-lg hover:bg-theme-secondary/50"
            >
              <Search className="w-5 h-5" />
            </button>

            <button 
              onClick={toggleTheme}
              className="p-2 text-theme-secondary hover:text-theme-primary transition-colors rounded-lg hover:bg-theme-secondary/50"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link 
              to="/portal" 
              className="hidden sm:flex p-2 text-theme-secondary hover:text-theme-primary transition-colors rounded-lg hover:bg-theme-secondary/50"
            >
              <User className="w-5 h-5" />
            </Link>

            <button 
              onClick={openCart}
              className="relative p-2 text-theme-secondary hover:text-theme-primary transition-colors rounded-lg hover:bg-theme-secondary/50"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    key={cartCount}
                    className="absolute top-0.5 right-0.5 bg-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
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
              className="fixed inset-0 z-50 lg:hidden"
              style={{ backgroundColor: 'var(--overlay)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-theme-primary border-r border-theme-primary z-50 flex flex-col p-6 lg:hidden shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <BrandLogo />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-theme-muted hover:text-theme-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      location.pathname === link.path 
                        ? 'bg-accent-subtle text-accent' 
                        : 'text-theme-secondary hover:bg-theme-secondary'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto border-t border-theme-primary pt-6 flex flex-col gap-2">
                <Link to="/portal" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-theme-secondary hover:bg-theme-secondary transition-colors">
                  <User className="w-5 h-5" />
                  <span className="font-medium">Account</span>
                </Link>
                <button onClick={() => { setIsMobileMenuOpen(false); openCart(); }} className="flex items-center gap-3 px-4 py-3 rounded-lg text-theme-secondary hover:bg-theme-secondary transition-colors w-full text-left">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="font-medium">Cart ({cartCount})</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
