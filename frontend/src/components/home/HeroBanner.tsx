import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Gamepad2, Zap, Sparkles } from 'lucide-react';

export const HeroBanner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-theme-primary">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-12">
        {/* Main Hero Banner */}
        <div className="relative border-2 border-[var(--accent)] overflow-hidden min-h-[350px] md:min-h-[420px] flex items-center rounded-lg" style={{ boxShadow: '0 0 30px var(--accent-glow), inset 0 0 30px rgba(0,0,0,0.05)' }}>
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1800&auto=format&fit=crop"
            alt="Gaming Setup"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Theme-aware dark overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--hero-overlay-from), var(--hero-overlay-via), var(--hero-overlay-to))' }} />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(var(--accent-glow) 1px, transparent 1px), linear-gradient(90deg, var(--accent-glow) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          {/* Content */}
          <div className="relative z-10 p-6 md:p-12 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[var(--neon-pink)]" />
                <span className="text-sm font-medium text-[var(--neon-pink)] tracking-wide uppercase">New Release 2025</span>
              </div>
              <h1 className="font-pixel text-xl md:text-2xl lg:text-3xl leading-relaxed mb-5">
                <span className="text-[var(--accent)] drop-shadow-[0_0_20px_rgba(189,147,249,0.4)]">EXPLORE 1000+</span>
                <br />
                <span className="text-[var(--neon-pink)] drop-shadow-[0_0_20px_rgba(255,121,198,0.4)]">CLASSIC & INDIE</span>
                <br />
                <span className="text-[var(--text-primary)]">GAMES</span>
              </h1>
              <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-md mb-8 leading-relaxed">
                From nostalgic pixel adventures to modern masterpieces. Find your next favorite game at unbeatable prices.
              </p>
              <Link 
                to="/shop"
                className="inline-flex items-center gap-3 text-sm font-semibold bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] px-7 py-3.5 border-2 border-[var(--accent-hover)] rounded-md hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200"
                style={{ boxShadow: '4px 4px 0 0 var(--card-shadow), 0 0 20px var(--accent-glow)' }}
              >
                <Gamepad2 className="w-4 h-4" />
                BROWSE ALL GAMES
              </Link>
            </motion.div>
          </div>

          {/* Right side floating emoji */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="hidden lg:flex absolute right-12 bottom-8 items-end"
          >
            <div className="text-7xl" style={{ animation: 'float 3s ease-in-out infinite', filter: 'drop-shadow(0 0 20px rgba(189,147,249,0.3))' }}>
              🕹️
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
