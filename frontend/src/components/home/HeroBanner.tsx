import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const HeroBanner = () => {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
          alt="Fashion hero"
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          Elevate Your Style
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="text-lg md:text-xl text-zinc-300 font-light max-w-2xl mb-12"
        >
          Discover our latest collection of cinematic, deep dark luxury pieces. Engineered for the modern aesthete.
        </motion.p>
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link 
            to="/shop"
            className="px-8 py-4 bg-white text-black font-semibold tracking-wide uppercase text-sm hover:bg-zinc-200 transition-colors duration-300"
          >
            Shop Collection
          </Link>
          <button className="px-8 py-4 bg-transparent border border-white text-white font-semibold tracking-wide uppercase text-sm hover:bg-white/10 transition-colors duration-300">
            View Lookbook
          </button>
        </motion.div>
      </div>
    </section>
  );
};
