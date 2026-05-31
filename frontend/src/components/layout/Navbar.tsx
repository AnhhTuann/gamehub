import React, { useState } from 'react';
import { ShoppingBag, Menu, X, User, Search, Sun, Moon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { SearchModal } from './SearchModal';
import { BrandLogo } from '../common/BrandLogo';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount, openCart } = useCart();
  const { toggleTheme, isDark } = useTheme();
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { label: 'Catalog', path: '/shop' },
    { label: 'Specials', path: '/shop' },
    { label: 'News', path: '/shop' },
  ];

  return (
    <>
      {/* Announcement bar — dark with glowing pink text */}
      <div className="bg-[#191a21] text-center text-xs font-medium py-2.5 tracking-wide border-b border-[var(--border-primary)]">
        <span className="text-[var(--neon-pink)]" style={{ textShadow: '0 0 10px rgba(255,121,198,0.5)' }}>
          ⚡ FREE SHIPPING ON ORDERS OVER $50 — USE CODE: <span className="font-bold">DRACULA25</span> ⚡
        </span>
      </div>

      <nav className="sticky top-0 z-50 bg-theme-elevated border-b border-[var(--border-primary)] backdrop-blur-md transition-colors duration-300">
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

          {/* Center: Nav links - SANS-SERIF font */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-all duration-200 relative py-1 border-b-2 ${
                  location.pathname === link.path
                    ? 'text-[var(--accent)] border-[var(--accent)]'
                    : 'text-[var(--text-secondary)] border-transparent hover:text-[var(--accent)] hover:border-[var(--accent)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Search bar (desktop) - SANS-SERIF */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search games..." 
                  onClick={() => setIsSearchOpen(true)}
                  readOnly
                  className="text-sm bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] px-4 py-2 w-44 rounded-md focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent-glow)] transition-all cursor-pointer"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              </div>
            </div>

            {/* Search icon (mobile) */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <button 
              onClick={toggleTheme}
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--neon-yellow)] transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-3 ml-2 border-l border-[var(--border-primary)] pl-4">
                <Link to="/portal" className="text-sm font-bold text-[var(--accent)] hover:text-[var(--neon-pink)] transition-colors">
                  Hi, {user?.username}
                </Link>
                <button 
                  onClick={logout}
                  className="p-1.5 text-[var(--text-muted)] hover:text-[var(--danger)] hover:bg-[var(--bg-tertiary)] rounded transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="hidden sm:flex p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
            )}

            {/* Cart button with Dracula badge */}
            <button 
              onClick={openCart}
              className="relative p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    key={cartCount}
                    className="absolute -top-0.5 -right-0.5 bg-[var(--danger)] text-white text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full border-2 border-[var(--bg-primary)]"
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
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-[var(--bg-primary)] border-r-2 border-[var(--accent)] z-50 flex flex-col p-6 lg:hidden"
            >
              <div className="flex justify-between items-center mb-10">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <BrandLogo />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
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
                    className={`px-4 py-3 text-sm font-medium tracking-wide transition-colors rounded-md border-l-3 ${
                      location.pathname === link.path
                        ? 'bg-[var(--accent-subtle)] text-[var(--accent)] border-[var(--accent)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--accent)] border-transparent hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto border-t border-[var(--border-primary)] pt-6 flex flex-col gap-1">
                <Link to="/portal" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors rounded-md">
                  <User className="w-4 h-4" />
                  Account
                </Link>
                <button onClick={() => { setIsMobileMenuOpen(false); openCart(); }} className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors w-full text-left rounded-md">
                  <ShoppingBag className="w-4 h-4" />
                  Cart ({cartCount})
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
