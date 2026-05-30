import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

export const Footer = () => {
  return (
    <footer className="bg-theme-secondary border-t border-theme-primary transition-colors duration-300 mt-auto">
      {/* Newsletter Banner */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-accent rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">Stay in the Loop</h3>
            <p className="text-white/70 text-sm">Subscribe for exclusive drops, style tips, and early access.</p>
          </div>
          <div className="flex w-full md:w-auto max-w-md">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/50 px-5 py-3 rounded-l-xl text-sm focus:outline-none focus:border-white/60 transition-colors"
            />
            <button className="bg-white text-accent px-6 py-3 rounded-r-xl font-bold text-sm hover:bg-white/90 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
        <div className="col-span-2 md:col-span-4 lg:col-span-1 flex flex-col gap-4 mb-4 lg:mb-0">
          <Link to="/">
            <BrandLogo />
          </Link>
          <p className="text-theme-muted text-sm leading-relaxed max-w-xs">
            Premium fashion for those who dare to stand out. Curated collections for the modern lifestyle.
          </p>
          <div className="flex gap-3 mt-2">
            <a href="#" className="w-9 h-9 rounded-full bg-theme-tertiary flex items-center justify-center text-theme-muted hover:bg-accent hover:text-white transition-all duration-300">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-theme-tertiary flex items-center justify-center text-theme-muted hover:bg-accent hover:text-white transition-all duration-300">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-theme-tertiary flex items-center justify-center text-theme-muted hover:bg-accent hover:text-white transition-all duration-300">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-theme-primary text-sm uppercase tracking-wider mb-2">Shop</h4>
          <Link to="/shop" className="text-theme-muted hover:text-accent transition-colors text-sm">New In</Link>
          <Link to="/shop" className="text-theme-muted hover:text-accent transition-colors text-sm">Best Sellers</Link>
          <Link to="/shop" className="text-theme-muted hover:text-accent transition-colors text-sm">Men</Link>
          <Link to="/shop" className="text-theme-muted hover:text-accent transition-colors text-sm">Women</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-theme-primary text-sm uppercase tracking-wider mb-2">Help</h4>
          <a href="#" className="text-theme-muted hover:text-accent transition-colors text-sm">FAQ</a>
          <a href="#" className="text-theme-muted hover:text-accent transition-colors text-sm">Shipping</a>
          <a href="#" className="text-theme-muted hover:text-accent transition-colors text-sm">Returns</a>
          <a href="#" className="text-theme-muted hover:text-accent transition-colors text-sm">Contact</a>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-theme-primary text-sm uppercase tracking-wider mb-2">Company</h4>
          <a href="#" className="text-theme-muted hover:text-accent transition-colors text-sm">About</a>
          <a href="#" className="text-theme-muted hover:text-accent transition-colors text-sm">Careers</a>
          <a href="#" className="text-theme-muted hover:text-accent transition-colors text-sm">Sustainability</a>
          <Link to="/admin" className="text-accent hover:underline transition-colors text-sm flex items-center gap-1">Admin <ArrowUpRight className="w-3 h-3" /></Link>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-theme-primary">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-theme-muted text-xs">
            &copy; {new Date().getFullYear()} OmniWear. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-theme-muted hover:text-theme-primary transition-colors text-xs">Privacy</a>
            <a href="#" className="text-theme-muted hover:text-theme-primary transition-colors text-xs">Terms</a>
            <a href="#" className="text-theme-muted hover:text-theme-primary transition-colors text-xs">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
