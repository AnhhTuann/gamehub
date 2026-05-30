import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

export const PromoBanners = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Banner 1 — Large */}
        <Link to="/shop" className="md:col-span-2 relative rounded-3xl overflow-hidden group min-h-[350px] flex items-end p-8 md:p-12">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop" 
            alt="Collection promo" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 text-purple-300 text-[10px] font-bold uppercase tracking-widest mb-3">
              <Zap className="w-3 h-3" /> Trending Now
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Summer<br />Collection '25
            </h3>
            <span className="inline-flex items-center gap-2 text-white/70 text-sm group-hover:text-white transition-colors">
              Shop Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </Link>

        {/* Banner 2 — Small */}
        <Link to="/shop" className="relative rounded-3xl overflow-hidden group min-h-[350px] flex items-end p-8">
          <img 
            src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop" 
            alt="Streetwear" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="relative z-10">
            <h3 className="font-serif text-2xl font-bold text-white mb-3">Streetwear Essentials</h3>
            <span className="inline-flex items-center gap-2 text-white/70 text-sm group-hover:text-white transition-colors">
              Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </Link>

      </div>
    </section>
  );
};
