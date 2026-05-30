import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Gamepad2, Sparkles } from 'lucide-react';

export const HeroBanner = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Hero Grid */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[70vh]">
          
          {/* Left — Main Hero */}
          <div className="relative rounded-xl overflow-hidden group border-2 border-[#1a1a2e] hover:border-accent transition-colors duration-300">
            <img
              src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1800&auto=format&fit=crop"
              alt="Gaming Setup"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[1.2s] ease-out pixelated-img"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            {/* Pixel Grid Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0wIDBoNHYxSDB6bTAgM2g0djFIMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz4KPC9zdmc+')] pointer-events-none opacity-50" />

            <div className="relative z-10 h-full flex flex-col justify-end p-8 pb-10 md:p-12 md:pb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-xs font-mono font-bold uppercase tracking-widest">New Release 2025</span>
                </div>
                <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
                  LEVEL UP<br />YOUR GAME
                </h1>
                <p className="text-zinc-300 font-mono text-sm md:text-base max-w-sm mb-8 leading-relaxed">
                  Explore our curated collection of premium video games — from nostalgic retro to modern masterpieces.
                </p>
                <Link 
                  to="/shop"
                  className="inline-flex items-center gap-3 bg-accent text-white font-mono font-bold px-8 py-4 rounded text-sm hover:brightness-125 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)] group/btn"
                >
                  <Gamepad2 className="w-5 h-5 group-hover/btn:animate-pulse" />
                  START PLAYING
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right — Two stacked cards */}
          <div className="flex flex-col gap-6">
            {/* Top card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative rounded-xl overflow-hidden flex-1 group min-h-[240px] border-2 border-[#1a1a2e] hover:border-accent transition-colors duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1200&auto=format&fit=crop"
                alt="RPG Games"
                className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0wIDBoNHYxSDB6bTAgM2g0djFIMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz4KPC9zdmc+')] pointer-events-none opacity-50" />
              
              <div className="relative z-10 h-full flex flex-col justify-end p-8 pb-10">
                <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-2">Adventure Awaits</span>
                <h2 className="font-mono text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">Epic RPGs</h2>
                <Link to="/shop" className="text-accent font-mono font-bold text-sm flex items-center gap-2 hover:text-white transition-colors">
                  EXPLORE <span className="animate-bounce">↓</span>
                </Link>
              </div>
            </motion.div>

            {/* Bottom card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative rounded-xl overflow-hidden flex-1 group min-h-[240px] border-2 border-[#1a1a2e] hover:border-accent transition-colors duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1580234797602-22c37b4a6217?q=80&w=1200&auto=format&fit=crop"
                alt="Retro Arcade"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0wIDBoNHYxSDB6bTAgM2g0djFIMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz4KPC9zdmc+')] pointer-events-none opacity-50" />

              <div className="relative z-10 h-full flex flex-col justify-end p-8 pb-10">
                <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-2">Classic Collection</span>
                <h2 className="font-mono text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">Retro Arcade</h2>
                <Link to="/shop" className="text-accent font-mono font-bold text-sm flex items-center gap-2 hover:text-white transition-colors">
                  EXPLORE <span className="animate-bounce">↓</span>
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
