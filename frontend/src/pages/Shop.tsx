import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, SlidersHorizontal, X, Check, ChevronUp } from 'lucide-react';
import { Game } from '../types';
import { getTrendingGames } from '../services/api';
import { ProductCard } from '../components/common/ProductCard';

export const Shop = () => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    location.state?.category ? [location.state.category] : []
  );
  
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTrendingGames().then(data => {
      setGames(data);
      setLoading(false);
    });
  }, []);

  const CATEGORIES = ["Action", "Adventure", "RPG", "Shooter", "Strategy"];

  const displayProducts = games.filter(g => 
    selectedCategories.length === 0 || 
    (g.genre && selectedCategories.includes(g.genre.name))
  );

  const Sidebar = () => (
    <div className="flex flex-col gap-6">
      {/* Categories */}
      <div className="border-b border-theme-primary pb-6">
        <button 
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="flex items-center justify-between w-full text-left font-semibold text-theme-primary mb-4 group focus:outline-none text-sm"
        >
          Genres
          {isCategoryOpen ? <ChevronUp className="w-4 h-4 text-theme-muted" /> : <ChevronDown className="w-4 h-4 text-theme-muted" />}
        </button>
        <AnimatePresence>
          {isCategoryOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col gap-2 overflow-hidden"
            >
              {CATEGORIES.map((cat: string) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group/item py-1">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-accent border-accent' : 'bg-transparent border-theme-secondary group-hover/item:border-accent'}`}>
                    {selectedCategories.includes(cat) && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
                  <span className={`text-sm transition-colors ${selectedCategories.includes(cat) ? 'text-theme-primary font-medium' : 'text-theme-secondary group-hover/item:text-theme-primary'}`}>
                    {cat}
                  </span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 flex flex-col">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-theme-primary mb-3">
          Game Catalog
        </h1>
        <p className="text-theme-muted max-w-lg mx-auto text-sm">
          Explore our curated selection of premium video games.
        </p>
      </div>

      <div className="flex items-center justify-between border-b border-theme-primary pb-4 mb-8 gap-4">
        <button 
          onClick={() => setIsMobileFiltersOpen(true)}
          className="lg:hidden flex items-center gap-2 text-theme-primary font-medium text-sm border border-theme-primary px-4 py-2.5 rounded-xl hover:bg-theme-secondary transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
        <span className="text-theme-muted text-sm hidden sm:block">
          {displayProducts.length} games
        </span>
      </div>

      <div className="flex gap-10 items-start">
        <aside className="hidden lg:block w-60 shrink-0 sticky top-24">
          <Sidebar />
        </aside>

        <div className="w-full lg:flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 gap-y-10">
            <AnimatePresence mode="popLayout">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] rounded-2xl bg-theme-secondary mb-4" />
                    <div className="h-3 rounded bg-theme-secondary mb-2 w-1/3" />
                    <div className="h-4 rounded bg-theme-secondary mb-2 w-2/3" />
                  </div>
                ))
              ) : displayProducts.length === 0 ? (
                <div className="col-span-full text-center py-12 text-theme-muted">
                  No games found.
                </div>
              ) : (
                displayProducts.map((game, idx) => (
                  <ProductCard key={`${game.id}-${idx}`} product={game} />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
