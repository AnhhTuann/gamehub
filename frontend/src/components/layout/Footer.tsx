import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { Github, Twitter, MessageCircle, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#1e1f29] border-t border-[var(--border-primary)] transition-colors duration-300 mt-auto">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          {/* Logo & description */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <Link to="/">
              <BrandLogo />
            </Link>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-xs">
              Your retro-futuristic game store. Classic titles, indie gems, and modern masterpieces — all at unbeatable prices.
            </p>
            {/* Pixel collectibles on the desk */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg" title="Pixel Sword">⚔️</span>
              <span className="text-lg" title="Pixel Potion">🧪</span>
              <span className="text-lg" title="Pixel Shield">🛡️</span>
              <span className="text-lg" title="Pixel Gem">💎</span>
              <span className="text-lg" title="Pixel Crown">👑</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-pixel text-[9px] text-[var(--accent)] tracking-wider mb-2">LINKS</h4>
            <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Support Center</a>
            <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Contact Us</a>
            <a href="#" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Refund Policy</a>
          </div>

          {/* Browse */}
          <div className="flex flex-col gap-3">
            <h4 className="font-pixel text-[9px] text-[var(--accent)] tracking-wider mb-2">BROWSE</h4>
            <Link to="/shop" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Game Catalog</Link>
            <Link to="/shop" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Weekly Specials</Link>
            <Link to="/shop" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">New Releases</Link>
            <Link to="/shop" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Top Rated</Link>
            <Link to="/shop" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">FAQ</Link>
          </div>

          {/* Social & Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className="font-pixel text-[9px] text-[var(--accent)] tracking-wider mb-2">CONNECT</h4>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Follow us for deals, updates, and gaming news.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Github className="w-4 h-4" />, label: 'GitHub' },
                { icon: <Twitter className="w-4 h-4" />, label: 'Twitter' },
                { icon: <MessageCircle className="w-4 h-4" />, label: 'Discord' },
                { icon: <Youtube className="w-4 h-4" />, label: 'YouTube' },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href="#" 
                  aria-label={social.label}
                  className="w-10 h-10 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--text-muted)] flex items-center justify-center rounded-md transition-all duration-200 hover:-translate-y-0.5"
                  style={{ boxShadow: '2px 2px 0 0 var(--card-shadow)' }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border-primary)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} GameHub. All Rights Reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <span>Powered by</span>
            <span className="text-[var(--accent)]">Pixels</span>
            <span>&</span>
            <span className="text-[var(--neon-pink)]">Passion</span>
            <span className="ml-2">🎮</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
