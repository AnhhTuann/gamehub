import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const NotFound = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#0A0A0A] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1512413914594-5d5d8525b686?q=80&w=2000&auto=format&fit=crop"
          alt="Moody fashion background"
          className="w-full h-full object-cover opacity-20 blur-sm mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/50" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[20rem] lg:text-[26rem] font-serif font-bold text-zinc-900/40 select-none z-0 tracking-tighter"
        >
          404
        </motion.h1>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.3 }}
           className="relative z-10 flex flex-col items-center mt-12 md:mt-0"
        >
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 tracking-wide drop-shadow-xl">
            Lost in Style.
          </h2>
          <p className="text-zinc-400 font-sans text-sm md:text-base max-w-md mx-auto mb-12 tracking-widest leading-relaxed uppercase px-4 text-center">
            The page you are looking for has stepped off the runway.
          </p>
          <Link 
            to="/"
            className="group relative inline-flex items-center justify-center px-10 py-5 bg-white text-black font-semibold tracking-widest uppercase text-sm transition-all hover:bg-zinc-200"
          >
            Return to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
