import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';

export const RecentPosts = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-theme-primary mb-10">Style Journal</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <Link to="#" className="group relative rounded-3xl overflow-hidden aspect-[16/10] flex items-end">
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop" 
            alt="Fashion trends" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="relative z-10 p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-300 bg-purple-500/20 backdrop-blur-sm px-3 py-1 rounded-full">Trends</span>
              <span className="text-white/50 text-[10px] flex items-center gap-1"><Clock className="w-3 h-3" /> 5 min read</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug mb-2">
              10 Streetwear Essentials You Need This Summer
            </h3>
            <span className="text-white/50 text-sm flex items-center gap-1 group-hover:text-white/80 transition-colors">
              Read Article <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </Link>

        <Link to="#" className="group relative rounded-3xl overflow-hidden aspect-[16/10] flex items-end">
          <img 
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop" 
            alt="Modern fashion" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="relative z-10 p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-300 bg-purple-500/20 backdrop-blur-sm px-3 py-1 rounded-full">Style Guide</span>
              <span className="text-white/50 text-[10px] flex items-center gap-1"><Clock className="w-3 h-3" /> 3 min read</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug mb-2">
              How to Build a Capsule Wardrobe That Works
            </h3>
            <span className="text-white/50 text-sm flex items-center gap-1 group-hover:text-white/80 transition-colors">
              Read Article <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </Link>

      </div>
    </section>
  );
};
