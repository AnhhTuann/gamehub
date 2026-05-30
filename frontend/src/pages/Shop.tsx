import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, X, ChevronRight, Trophy, Swords, Crosshair, Joystick, Gamepad2 } from 'lucide-react';
import { Game } from '../types';
import { getTrendingGames } from '../services/api';
import { ProductCard } from '../components/common/ProductCard';

const CATEGORIES = [
  { name: 'RPG', icon: <Swords className="w-3.5 h-3.5" /> },
  { name: 'Action', icon: <Crosshair className="w-3.5 h-3.5" /> },
  { name: 'Arcade', icon: <Joystick className="w-3.5 h-3.5" /> },
  { name: 'Retro', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
];

export const Shop = () => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    location.state?.category ? [location.state.category] : []
  );

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

  const displayProducts = games.filter(g =>
    selectedCategories.length === 0 ||
    (g.genre && selectedCategories.includes(g.genre.name))
  );

  const Sidebar = () => (
    <div className="bg-theme-card border-4 border-theme-secondary retro-shadow p-4">
      <h3 className="font-pixel text-[9px] text-[var(--neon-cyan)] mb-4 tracking-wider">GENRES</h3>
      <div className="flex flex-col gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <label key={cat.name} className="flex items-center gap-3 cursor-pointer group py-1.5 px-2 hover:bg-theme-secondary transition-colors">
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat.name)}
              onChange={() => toggleCategory(cat.name)}
              className="pixel-checkbox"
            />
            <span className="text-theme-secondary">{cat.icon}</span>
            <span className={`font-pixel text-[8px] tracking-wider ${
              selectedCategories.includes(cat.name) ? 'text-[var(--neon-cyan)]' : 'text-theme-secondary group-hover:text-white'
            } transition-colors`}>
              {cat.name.toUpperCase()}
            </span>
          </label>
        ))}
      </div>
      <div className="border-t-2 border-theme-primary pt-4">
        <h3 className="font-pixel text-[9px] text-[var(--neon-cyan)] mb-4 tracking-wider">PLATFORMS</h3>
        <div className="flex flex-col gap-2">
          {['PC', 'PS5', 'XBOX', 'SWITCH'].map((p) => (
            <label key={p} className="flex items-center gap-3 cursor-pointer group py-1.5 px-2 hover:bg-theme-secondary transition-colors">
              <input type="checkbox" className="pixel-checkbox" />
              <span className="font-pixel text-[8px] text-theme-secondary group-hover:text-white tracking-wider transition-colors">{p}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-8 flex-1 flex flex-col">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-pixel text-lg md:text-xl text-white mb-3 tracking-wider">
          GAME CATALOG
        </h1>
        <p className="text-theme-muted text-sm">
          Explore our curated selection of premium video games.
        </p>
      </div>

      {/* Top Bar */}
      <div className="flex items-center justify-between border-b-2 border-theme-primary pb-4 mb-6 gap-4">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="lg:hidden flex items-center gap-2 font-pixel text-[8px] text-white border-2 border-theme-secondary px-3 py-2 retro-shadow-dark hover:translate-y-0.5 hover:shadow-none transition-all tracking-wider"
        >
          <SlidersHorizontal className="w-4 h-4" />
          FILTERS
        </button>
        <span className="font-pixel text-[8px] text-theme-muted hidden sm:block tracking-wider">
          {displayProducts.length} GAMES
        </span>
      </div>

      <div className="flex gap-6 items-start">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-60 shrink-0 sticky top-24">
          <Sidebar />
        </aside>

        {/* Product Grid */}
        <div className="w-full lg:flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="bg-theme-card border-4 border-theme-secondary retro-shadow animate-pulse">
                    <div className="aspect-video bg-theme-secondary" />
                    <div className="p-3 space-y-3">
                      <div className="h-2 bg-theme-secondary w-1/3" />
                      <div className="h-3 bg-theme-secondary w-2/3" />
                      <div className="h-2 bg-theme-secondary w-1/4" />
                    </div>
                  </div>
                ))
              ) : displayProducts.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <span className="text-5xl block mb-4">🎮</span>
                  <p className="font-pixel text-[10px] text-theme-muted tracking-wider">NO GAMES FOUND</p>
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

      {/* Mobile Filters */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 z-50 lg:hidden cursor-pointer"
              style={{ backgroundColor: 'var(--overlay)' }}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-theme-primary border-r-4 border-[var(--accent)] z-50 flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b-4 border-theme-secondary">
                <h2 className="font-pixel text-[10px] text-[var(--neon-cyan)] flex items-center gap-2 tracking-wider">
                  <SlidersHorizontal className="w-4 h-4 text-[var(--accent)]" />
                  FILTERS
                </h2>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 text-theme-muted hover:text-[var(--accent)] transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                <Sidebar />
              </div>
              <div className="p-5 border-t-4 border-theme-secondary flex gap-3">
                <button
                  onClick={() => { setSelectedCategories([]); }}
                  className="flex-1 font-pixel text-[8px] border-2 border-theme-secondary text-white py-2.5 tracking-wider hover:bg-theme-secondary transition-colors"
                >
                  CLEAR
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-1 font-pixel text-[8px] bg-[var(--accent)] text-white py-2.5 tracking-wider border-2 border-[var(--accent-hover)] retro-shadow-dark hover:translate-y-0.5 hover:shadow-none transition-all"
                >
                  APPLY
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
