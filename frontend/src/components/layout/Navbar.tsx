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
    { label: 'CATALOG', path: '/shop' },
    { label: 'SPECIALS', path: '/shop' },
    { label: 'NEWS', path: '/shop' },
  ];

  return (
    <>
      {/* Announcement bar — retro ticker */}
      <div className="bg-[var(--accent)] text-black text-center font-pixel text-[8px] md:text-[9px] py-2 tracking-wider">
        ⚡ FREE SHIPPING ON ORDERS OVER $50 — USE CODE: RETRO2025 ⚡
      </div>

      <nav className="sticky top-0 z-50 bg-theme-elevated border-b-4 border-[var(--accent)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Left: Mobile menu + Logo */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              className="lg:hidden p-1 text-theme-secondary hover:text-[var(--accent)] transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/">
              <BrandLogo />
            </Link>
          </div>

          {/* Center: Nav links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`font-pixel text-[9px] tracking-wider transition-all duration-200 relative py-1 border-b-2 ${
                  location.pathname === link.path
                    ? 'text-[var(--accent)] border-[var(--accent)]'
                    : 'text-theme-secondary border-transparent hover:text-[var(--neon-cyan)] hover:border-[var(--neon-cyan)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Search bar (desktop) */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="SEARCH..." 
                  onClick={() => setIsSearchOpen(true)}
                  readOnly
                  className="font-pixel text-[8px] bg-theme-secondary border-2 border-theme-secondary text-theme-primary placeholder:text-theme-muted px-3 py-2 w-36 focus:outline-none focus:border-[var(--neon-cyan)] transition-colors cursor-pointer"
                />
                <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-theme-muted" />
              </div>
            </div>

            {/* Search icon (mobile) */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 text-theme-secondary hover:text-[var(--neon-cyan)] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <button 
              onClick={toggleTheme}
              className="p-2 text-theme-secondary hover:text-[var(--neon-yellow)] transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link 
              to="/portal" 
              className="hidden sm:flex p-2 text-theme-secondary hover:text-[var(--neon-cyan)] transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart button with retro badge */}
            <button 
              onClick={openCart}
              className="relative p-2 text-theme-secondary hover:text-[var(--accent)] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    key={cartCount}
                    className="absolute -top-0.5 -right-0.5 bg-red-500 text-white font-pixel text-[6px] w-4 h-4 flex items-center justify-center border-2 border-[var(--bg-primary)]"
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
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-theme-primary border-r-4 border-[var(--accent)] z-50 flex flex-col p-6 lg:hidden"
            >
              <div className="flex justify-between items-center mb-10">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <BrandLogo />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-theme-muted hover:text-[var(--accent)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 font-pixel text-[9px] tracking-wider transition-colors border-l-4 ${
                      location.pathname === link.path
                        ? 'bg-[var(--accent-subtle)] text-[var(--accent)] border-[var(--accent)]'
                        : 'text-theme-secondary hover:text-[var(--neon-cyan)] border-transparent hover:border-[var(--neon-cyan)]'
                    }`}
                  >
                    {'> '}{link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto border-t-2 border-theme-primary pt-6 flex flex-col gap-1">
                <Link to="/portal" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 font-pixel text-[8px] text-theme-secondary hover:text-[var(--neon-cyan)] transition-colors">
                  <User className="w-4 h-4" />
                  ACCOUNT
                </Link>
                <button onClick={() => { setIsMobileMenuOpen(false); openCart(); }} className="flex items-center gap-3 px-4 py-3 font-pixel text-[8px] text-theme-secondary hover:text-[var(--accent)] transition-colors w-full text-left">
                  <ShoppingBag className="w-4 h-4" />
                  CART ({cartCount})
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
