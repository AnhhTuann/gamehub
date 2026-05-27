import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="flex flex-col gap-6">
           <span className="font-serif text-3xl font-bold tracking-wide">
            OmniWear<span className="text-zinc-500">.</span>
          </span>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
            Defining the future of cinematic, deep dark luxury fashion. Designed for those who walk in the shadows but command the light.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-lg tracking-wider uppercase mb-2">Shop</h4>
          <Link to="/shop" className="text-zinc-500 hover:text-white transition-colors text-sm">New Arrivals</Link>
          <Link to="/shop" className="text-zinc-500 hover:text-white transition-colors text-sm">Best Sellers</Link>
          <Link to="/shop" className="text-zinc-500 hover:text-white transition-colors text-sm">Men's Collection</Link>
          <Link to="/shop" className="text-zinc-500 hover:text-white transition-colors text-sm">Women's Collection</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-lg tracking-wider uppercase mb-2">Support</h4>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">FAQ</a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Shipping & Returns</a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Size Guide</a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Contact Us</a>
          <Link to="/admin" className="text-emerald-500 hover:text-emerald-400 transition-colors text-sm mt-4">Admin Dashboard Area</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-lg tracking-wider uppercase mb-2">Newsletter</h4>
          <p className="text-zinc-500 text-sm mb-2">Subscribe to receive exclusive offers and early access to new drops.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-zinc-900 border border-zinc-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-white w-full transition-colors"
            />
            <button className="bg-white text-black px-6 font-semibold uppercase tracking-wider text-sm hover:bg-zinc-200 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-zinc-600 text-sm">
          &copy; {new Date().getFullYear()} OmniWear. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-zinc-600 hover:text-white transition-colors text-sm">Privacy Policy</a>
          <a href="#" className="text-zinc-600 hover:text-white transition-colors text-sm">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
