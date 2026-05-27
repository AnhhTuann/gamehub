import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { dummyProducts } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';

export const Home = () => {
  const featuredProducts = dummyProducts.slice(0, 4);

  // Derive Flash Sale Products
  const flashSaleProducts = dummyProducts.slice(4, 8).map(p => ({
    ...p,
    originalPrice: p.price * 1.4,
    badge: 'SALE'
  }));

  // Derive Trending Products
  const trendingProducts = [dummyProducts[8], dummyProducts[9], dummyProducts[10], dummyProducts[11], dummyProducts[0], dummyProducts[1]];

  // Countdown Timer Logic
  const [timeLeft, setTimeLeft] = useState(3 * 3600 + 45 * 60 + 12); // 03h:45m:12s

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}h : ${m.toString().padStart(2, '0')}m : ${s.toString().padStart(2, '0')}s`;
  };

  return (
    <>
      {/* Hero Section */}
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

      {/* Flash Sale Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white tracking-wide">
              Flash Sale
            </h2>
            <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-full">
              <span className="text-zinc-500 uppercase tracking-widest text-xs font-semibold">Ends In</span>
              <span className="font-mono text-white text-lg font-bold tracking-widest">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          <Link to="/shop" className="text-sm font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors shrink-0">
            View All Offers
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-16">
          {flashSaleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="py-24 pl-6 md:pl-8 lg:pl-12 ml-auto lg:mr-0 lg:ml-[calc((100vw-80rem)/2)] w-full overflow-hidden">
        <div className="flex items-center justify-between mb-12 pr-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white tracking-wide">
            Trending Now
          </h2>
          <div className="hidden sm:flex gap-4">
             {/* Optional custom navigation controls could go here, omitting for simplicity as horizontal scroll is sufficient */}
             <Link to="/shop" className="text-sm font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors">
               Explore More
             </Link>
          </div>
        </div>
        
        {/* Horizontal Scroll Container */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pr-6 md:pr-12">
          {trendingProducts.map((product) => (
             <div key={product.id} className="w-[85vw] sm:w-[45vw] md:w-[320px] lg:w-[350px] shrink-0 snap-start">
                <ProductCard product={product} />
             </div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-wide">New Arrivals</h2>
          <Link to="/shop" className="text-sm font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-16">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};
