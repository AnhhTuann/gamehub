import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroBanner = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero Grid */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[70vh]">
          
          {/* Left — Main Hero */}
          <div className="relative rounded-3xl overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1800&auto=format&fit=crop"
              alt="Man in stylish outfit"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-8 pb-10 md:p-12 md:pb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-300 text-xs font-bold uppercase tracking-widest">New Season 2025</span>
                </div>
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
                  Define<br />Your Style
                </h1>
                <p className="text-white/60 text-sm md:text-base max-w-sm mb-8 leading-relaxed">
                  Explore our curated collection of premium fashion — designed for those who set trends, not follow them.
                </p>
                <Link 
                  to="/shop"
                  className="inline-flex items-center gap-3 bg-white text-black font-bold px-8 py-4 rounded-full text-sm hover:bg-purple-500 hover:text-white transition-all duration-300 group/btn"
                >
                  Shop Collection
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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
              className="relative rounded-3xl overflow-hidden flex-1 group min-h-[240px]"
            >
              <img
                src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1200&auto=format&fit=crop"
                alt="Women fashion"
                className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-8 pb-10">
                <span className="text-white/50 text-xs uppercase tracking-widest mb-2">Women</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">Minimal Elegance</h2>
                <Link to="/shop" className="text-white/80 text-sm flex items-center gap-2 hover:text-white transition-colors">
                  Explore <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>

            {/* Bottom card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden flex-1 group min-h-[240px]"
            >
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop"
                alt="Sneakers"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-8 pb-10">
                <span className="text-white/50 text-xs uppercase tracking-widest mb-2">Footwear</span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">Street Ready</h2>
                <Link to="/shop" className="text-white/80 text-sm flex items-center gap-2 hover:text-white transition-colors">
                  Explore <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
