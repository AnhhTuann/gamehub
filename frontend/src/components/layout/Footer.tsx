import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';

export const Footer = () => {
  return (
    <footer className="bg-theme-secondary border-t-4 border-[var(--accent)] transition-colors duration-300 mt-auto">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo & description */}
          <div className="flex flex-col gap-3">
            <Link to="/">
              <BrandLogo />
            </Link>
            <p className="text-theme-muted text-xs leading-relaxed max-w-xs">
              Your retro-futuristic game store. Classic titles, indie gems, and modern masterpieces.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex gap-12 md:justify-center">
            <div className="flex flex-col gap-2">
              <h4 className="font-pixel text-[8px] text-[var(--neon-cyan)] tracking-wider mb-2">LINKS</h4>
              <a href="#" className="font-pixel text-[7px] text-theme-muted hover:text-[var(--accent)] transition-colors tracking-wider">TERMS</a>
              <a href="#" className="font-pixel text-[7px] text-theme-muted hover:text-[var(--accent)] transition-colors tracking-wider">PRIVACY</a>
              <a href="#" className="font-pixel text-[7px] text-theme-muted hover:text-[var(--accent)] transition-colors tracking-wider">SUPPORT</a>
              <a href="#" className="font-pixel text-[7px] text-theme-muted hover:text-[var(--accent)] transition-colors tracking-wider">CONTACT</a>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-pixel text-[8px] text-[var(--neon-cyan)] tracking-wider mb-2">BROWSE</h4>
              <Link to="/shop" className="font-pixel text-[7px] text-theme-muted hover:text-[var(--accent)] transition-colors tracking-wider">CATALOG</Link>
              <Link to="/shop" className="font-pixel text-[7px] text-theme-muted hover:text-[var(--accent)] transition-colors tracking-wider">SPECIALS</Link>
              <Link to="/shop" className="font-pixel text-[7px] text-theme-muted hover:text-[var(--accent)] transition-colors tracking-wider">NEWS</Link>
              <Link to="/shop" className="font-pixel text-[7px] text-theme-muted hover:text-[var(--accent)] transition-colors tracking-wider">FAQ</Link>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3 md:items-end">
            <h4 className="font-pixel text-[8px] text-[var(--neon-cyan)] tracking-wider mb-1">SOCIAL</h4>
            <div className="flex gap-3">
              {['📘', '📸', '🐦'].map((emoji, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 bg-theme-tertiary border-2 border-theme-secondary hover:border-[var(--accent)] flex items-center justify-center text-lg transition-colors retro-shadow-dark hover:translate-y-0.5 hover:shadow-none"
                >
                  {emoji}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-theme-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-pixel text-[7px] text-theme-muted tracking-wider">
            &copy; {new Date().getFullYear()} GAMEHUB. ALL RIGHTS RESERVED.
          </p>
          <p className="font-pixel text-[7px] text-theme-muted tracking-wider">
            POWERED BY PIXELS & PASSION
          </p>
        </div>
      </div>
    </footer>
  );
};
