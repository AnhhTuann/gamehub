import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LayoutTemplate } from 'lucide-react';
import { Game } from '../../types';
import { getBrowseGames } from '../../services/api';
import { ProductCard } from '../common/ProductCard';

const TABS = ['NEW RELEASES', 'SPECIALS', 'FREE GAMES', 'BY USER TAGS'];

export const BrowseGameHub = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setGames([]);
    setPage(1);
  }, [activeTab]);

  useEffect(() => {
    let isMounted = true;
    const fetchTabGames = async () => {
      setIsLoading(true);
      try {
        const data = await getBrowseGames(activeTab, page);
        if (isMounted) {
          setGames(prev => (page === 1 ? data : [...prev, ...data]));
        }
      } catch (error) {
        console.error('Failed to fetch browse games:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchTabGames();
    return () => { isMounted = false; };
  }, [activeTab, page]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
      <div className="flex items-center gap-3 mb-8">
        <LayoutTemplate className="w-6 h-6 text-[#bd93f9]" />
        <h2 className="font-pixel text-lg text-[var(--text-primary)] tracking-wider">BROWSE GAMEHUB</h2>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap border-b border-[var(--border-primary)] gap-2 md:gap-6 mb-8">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => {
              if (activeTab !== tab) setActiveTab(tab);
            }}
            className={`pb-3 text-xs md:text-sm font-semibold tracking-wide transition-all duration-200 border-b-2 uppercase ${
              activeTab === tab
                ? 'text-[#bd93f9] border-[#bd93f9]'
                : 'text-[#6272a4] border-transparent hover:text-[#f8f8f2] hover:border-[#bd93f9]/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]">
        {games.map((game, idx) => (
          <motion.div 
            key={`browse-${game.id}-${idx}-${activeTab}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative h-full"
          >
            <ProductCard product={game} />
            {game.badge && (
              <div className="absolute top-2 left-2 z-10 bg-[#ff5555] text-white text-xs font-bold px-2 py-1 rounded shadow flex items-center pointer-events-none">
                {game.badge}
              </div>
            )}
          </motion.div>
        ))}
        {isLoading && page === 1 && (
          [...Array(8)].map((_, i) => (
            <div key={`loading-${i}`} className="h-[380px] bg-[var(--bg-tertiary)] rounded-lg animate-pulse" />
          ))
        )}
      </div>

      {/* Load More Button */}
      <div className="mt-10 flex justify-center">
        <button 
          onClick={() => setPage(prev => prev + 1)}
          disabled={isLoading}
          className="px-8 py-3 bg-[#44475a] hover:bg-[#6272a4] text-white font-bold text-sm tracking-widest rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-transparent hover:border-[#bd93f9]"
        >
          {isLoading ? 'LOADING...' : 'LOAD MORE'}
        </button>
      </div>
    </div>
  );
};
