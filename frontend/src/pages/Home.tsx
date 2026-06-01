import React, { useEffect, useState, useRef } from 'react';
import { Game } from '../types';
import { getTrendingGames, getNewReleases, getAllGames, getSpecialDeals } from '../services/api';
import { HeroBanner } from '../components/home/HeroBanner';
import { BrowseGameHub } from '../components/home/BrowseGameHub';
import { ProductCard } from '../components/common/ProductCard';
import { Link } from 'react-router-dom';
import { Flame, Tag, Grid, LayoutTemplate, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const BROWSE_CATEGORIES = [
  { name: 'Action', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800' },
  { name: 'RPG', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800' },
  { name: 'Strategy', image: 'https://images.unsplash.com/photo-1518908336710-4e1cf821d3d1?auto=format&fit=crop&q=80&w=800' },
  { name: 'Indie', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800' }
];

export const Home = () => {
  const [specialDeals, setSpecialDeals] = useState<Game[]>([]);
  const [newReleases, setNewReleases] = useState<Game[]>([]);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading || specialDeals.length === 0 || isHovered || isManualScrolling) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 1) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'auto' });
        } else {
          scrollRef.current.scrollBy({ left: 1, behavior: 'auto' });
        }
      }
    }, 25);

    return () => clearInterval(interval);
  }, [loading, specialDeals, isHovered, isManualScrolling]);

  const scroll = (direction: 'left' | 'right') => {
    setIsManualScrolling(true);
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
    setTimeout(() => setIsManualScrolling(false), 800);
  };

  useEffect(() => {
    Promise.all([
      getSpecialDeals(),
      getNewReleases(),
      getAllGames()
    ]).then(([specialsData, newData, allData]) => {
      setSpecialDeals(specialsData);
      setNewReleases(newData);
      setAllGames(allData);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-gamehub-bg min-h-screen">
      
      {/* 1. Featured & Recommended */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8">
        <h2 className="font-pixel text-lg md:text-xl text-gamehub-text tracking-wider mb-6">
          FEATURED & RECOMMENDED
        </h2>
      </div>
      <HeroBanner />

      {/* 2. Discounts & Events */}
      <div 
        className="max-w-7xl mx-auto px-4 md:px-6 py-16 border-t border-gamehub-border mt-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Tag className="w-6 h-6 text-gamehub-green" />
            <h2 className="font-pixel text-lg text-gamehub-text tracking-wider">DISCOUNTS & EVENTS</h2>
          </div>
          <div className="flex gap-2.5">
            <button 
              onClick={() => scroll('left')}
              className="p-1.5 bg-gamehub-surface border border-gamehub-border/40 rounded hover:border-gamehub-purple text-gamehub-muted hover:text-gamehub-purple transition-all cursor-pointer active:scale-95 flex items-center justify-center"
              title="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-1.5 bg-gamehub-surface border border-gamehub-border/40 rounded hover:border-gamehub-purple text-gamehub-muted hover:text-gamehub-purple transition-all cursor-pointer active:scale-95 flex items-center justify-center"
              title="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex gap-6 overflow-x-hidden">
             {[...Array(4)].map((_, i) => (
                <div key={i} className="min-w-[280px] w-[280px] h-[350px] bg-gamehub-surface rounded-lg animate-pulse" />
             ))}
          </div>
        ) : (
          <div 
            ref={scrollRef} 
            className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar" 
            style={{ scrollbarWidth: 'none' }}
          >
            {specialDeals.map((game, idx) => (
              <div key={`discount-${idx}`} className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] shrink-0 relative group">
                <ProductCard product={game} />
                {game.badge && (
                  <div className="absolute top-2 left-2 z-30 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg flex items-center gap-1 pointer-events-none">
                    <Tag className="w-3.5 h-3.5" />
                    {game.badge}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Browse by Category */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Grid className="w-6 h-6 text-orange-500" />
          <h2 className="font-pixel text-lg text-gamehub-text tracking-wider">BROWSE BY CATEGORY</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BROWSE_CATEGORIES.map(cat => (
            <Link 
              to="/shop" 
              state={{ category: `${cat.name} Games` }} 
              key={cat.name}
              className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer border-2 border-gamehub-border hover:border-gamehub-purple transition-all"
            >
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 to-transparent">
                <span className="font-pixel text-sm md:text-base text-white tracking-widest drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                  {cat.name.toUpperCase()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Browse Gamehub */}
      <BrowseGameHub />
    </div>
  );
};
