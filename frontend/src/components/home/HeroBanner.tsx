import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Gamepad2, Zap } from 'lucide-react';

export const HeroBanner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-theme-primary">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-12">
        {/* Main Hero Banner */}
        <div className="relative border-4 border-[var(--neon-cyan)] overflow-hidden retro-shadow scanlines min-h-[350px] md:min-h-[420px] flex items-center">
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1800&auto=format&fit=crop"
            alt="Gaming Setup"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
          
          {/* Content */}
          <div className="relative z-10 p-6 md:p-12 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-[var(--neon-yellow)]" />
                <span className="font-pixel text-[8px] text-[var(--neon-yellow)] tracking-wider">NEW RELEASE 2025</span>
              </div>
              <h1 className="font-pixel text-xl md:text-2xl lg:text-3xl text-white leading-relaxed mb-4 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                EXPLORE 1000+<br />CLASSIC & INDIE<br />GAMES
              </h1>
              <p className="text-slate-300 text-sm md:text-base max-w-md mb-8 leading-relaxed">
                From nostalgic pixel adventures to modern masterpieces. Find your next favorite game.
              </p>
              <Link 
                to="/shop"
                className="inline-flex items-center gap-3 font-pixel text-[10px] bg-[var(--accent)] text-white px-6 py-3 border-4 border-[var(--accent-hover)] retro-shadow-dark hover:translate-y-1 hover:shadow-none active:translate-y-1 active:shadow-none transition-all tracking-wider"
              >
                <Gamepad2 className="w-4 h-4" />
                BROWSE ALL GAMES
              </Link>
            </motion.div>
          </div>

          {/* Right side pixel character (decorative) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="hidden lg:flex absolute right-12 bottom-0 items-end"
          >
            <div className="text-7xl" style={{ animation: 'float 3s ease-in-out infinite' }}>
              🕹️
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
