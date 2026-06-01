import React, { useEffect, useState, useRef } from 'react';
import { Game } from '../types';
import { getTrendingGames, getNewReleases, getAllGames, getSpecialDeals } from '../services/api';
import { HeroBanner } from '../components/home/HeroBanner';
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
  const [activeTab, setActiveTab] = useState<'New Releases' | 'Specials' | 'Free Games' | 'By User Tags'>('New Releases');

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
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

  // Compute tab data
  let tabGames: Game[] = [];
  if (activeTab === 'New Releases') {
    tabGames = newReleases.slice(0, 12);
  } else if (activeTab === 'Specials') {
    // Mock specials by picking a slice
    tabGames = allGames.slice(10, 22);
  } else if (activeTab === 'Free Games') {
    // Mock free games by taking another slice
    tabGames = allGames.slice(22, 34);
  } else if (activeTab === 'By User Tags') {
    tabGames = allGames.slice(0, 12);
  }

  return (
    <div className="bg-theme-primary min-h-screen">
      
      {/* 1. Featured & Recommended */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8">
        <h2 className="font-pixel text-lg md:text-xl text-[var(--text-primary)] tracking-wider mb-6">
          FEATURED & RECOMMENDED
        </h2>
      </div>
      <HeroBanner />

      {/* 2. Discounts & Events */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 border-t border-[var(--border-primary)] mt-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Tag className="w-6 h-6 text-[var(--neon-green)]" />
            <h2 className="font-pixel text-lg text-[var(--text-primary)] tracking-wider">DISCOUNTS & EVENTS</h2>
          </div>
          <div className="flex gap-2.5">
            <button 
              onClick={() => scroll('left')}
              className="p-1.5 bg-[#44475a] border border-[#6272a4]/40 rounded hover:border-[#bd93f9] text-[#6272a4] hover:text-[#bd93f9] transition-all cursor-pointer active:scale-95 flex items-center justify-center"
              title="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-1.5 bg-[#44475a] border border-[#6272a4]/40 rounded hover:border-[#bd93f9] text-[#6272a4] hover:text-[#bd93f9] transition-all cursor-pointer active:scale-95 flex items-center justify-center"
              title="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex gap-6 overflow-x-hidden">
             {[...Array(4)].map((_, i) => (
                <div key={i} className="min-w-[280px] w-[280px] h-[350px] bg-[var(--bg-tertiary)] rounded-lg animate-pulse" />
             ))}
          </div>
        ) : (
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-6 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
            {specialDeals.map((game, idx) => (
              <div key={`discount-${idx}`} className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] shrink-0 snap-start relative group">
                <ProductCard product={game} />
                {game.badge && (
                  <div className="absolute top-2 left-2 z-30 bg-[#ff5555] text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg flex items-center gap-1 pointer-events-none">
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
          <Grid className="w-6 h-6 text-[var(--neon-orange)]" />
          <h2 className="font-pixel text-lg text-[var(--text-primary)] tracking-wider">BROWSE BY CATEGORY</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BROWSE_CATEGORIES.map(cat => (
            <Link 
              to="/shop" 
              state={{ category: `${cat.name} Games` }} 
              key={cat.name}
              className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer border-2 border-[var(--border-primary)] hover:border-[var(--accent)] transition-all"
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
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <LayoutTemplate className="w-6 h-6 text-[#bd93f9]" />
          <h2 className="font-pixel text-lg text-[var(--text-primary)] tracking-wider">BROWSE GAMEHUB</h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-[var(--border-primary)] gap-2 md:gap-6 mb-8">
          {['New Releases', 'Specials', 'Free Games', 'By User Tags'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-3 text-xs md:text-sm font-semibold tracking-wide transition-all duration-200 border-b-2 uppercase ${
                activeTab === tab
                  ? 'text-[var(--accent)] border-[var(--accent)]'
                  : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-secondary)] hover:border-[var(--accent)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-[var(--bg-tertiary)] rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {tabGames.map((game, idx) => (
              <ProductCard key={`tab-${activeTab}-${idx}`} product={game} />
            ))}
          </motion.div>
        )}
        
        <div className="mt-10 flex justify-center">
          <Link 
            to="/shop" 
            className="px-8 py-3 bg-[var(--bg-card)] border-2 border-[var(--border-primary)] text-[var(--text-primary)] font-bold text-sm tracking-widest rounded hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
          >
            VIEW FULL CATALOG
          </Link>
        </div>
      </div>
    </div>
  );
};
