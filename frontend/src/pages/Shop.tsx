import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, X, Swords, Crosshair, Joystick, Gamepad2 } from 'lucide-react';
import { Game } from '../types';
import { getTrendingGames } from '../services/api';
import { ProductCard } from '../components/common/ProductCard';

const CATEGORIES = [
  { name: 'RPG', icon: <Swords className="w-4 h-4" /> },
  { name: 'Action', icon: <Crosshair className="w-4 h-4" /> },
  { name: 'Arcade', icon: <Joystick className="w-4 h-4" /> },
  { name: 'Retro', icon: <Gamepad2 className="w-4 h-4" /> },
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
    <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg p-5" style={{ boxShadow: '4px 4px 0 0 var(--card-shadow)' }}>
      <h3 className="font-pixel text-[10px] text-[var(--accent)] mb-5 tracking-wider">GENRES</h3>
      <div className="flex flex-col gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <label key={cat.name} className="flex items-center gap-3 cursor-pointer group py-2.5 px-3 hover:bg-[var(--accent-subtle)] transition-colors rounded-md">
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat.name)}
              onChange={() => toggleCategory(cat.name)}
              className="pixel-checkbox"
            />
            <span className={`transition-colors ${
              selectedCategories.includes(cat.name) ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'
            }`}>{cat.icon}</span>
            <span className={`text-sm font-medium tracking-wide ${
              selectedCategories.includes(cat.name) ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
            } transition-colors`}>
              {cat.name}
            </span>
          </label>
        ))}
      </div>
      <div className="border-t border-[var(--border-primary)] pt-5">
        <h3 className="font-pixel text-[10px] text-[var(--accent)] mb-5 tracking-wider">PLATFORMS</h3>
        <div className="flex flex-col gap-2">
          {['PC', 'PlayStation 5', 'Xbox Series', 'Nintendo Switch'].map((p) => (
            <label key={p} className="flex items-center gap-3 cursor-pointer group py-2.5 px-3 hover:bg-[var(--accent-subtle)] transition-colors rounded-md">
              <input type="checkbox" className="pixel-checkbox" />
              <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{p}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-8 flex-1 flex flex-col">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-pixel text-lg md:text-xl text-[var(--text-primary)] mb-3 tracking-wider">
          GAME <span className="text-[var(--accent)]">CATALOG</span>
        </h1>
        <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto">
          Explore our curated selection of premium video games across all genres and platforms.
        </p>
      </div>

      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[var(--border-primary)] pb-4 mb-8 gap-4">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="lg:hidden flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] border border-[var(--border-primary)] px-4 py-2 rounded-md hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
        <span className="text-sm text-[var(--text-muted)] hidden sm:block">
          {displayProducts.length} games found
        </span>
      </div>

      <div className="flex gap-8 items-start">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-24">
          <Sidebar />
        </aside>

        {/* Product Grid */}
        <div className="w-full lg:flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg animate-pulse overflow-hidden">
                    <div className="aspect-video bg-[var(--bg-tertiary)]" />
                    <div className="p-4 space-y-3">
                      <div className="h-3 bg-[var(--bg-tertiary)] w-1/3 rounded" />
                      <div className="h-4 bg-[var(--bg-tertiary)] w-2/3 rounded" />
                      <div className="h-3 bg-[var(--bg-tertiary)] w-1/4 rounded" />
                    </div>
                  </div>
                ))
              ) : displayProducts.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <span className="text-5xl block mb-4">🎮</span>
                  <p className="font-pixel text-xs text-[var(--text-muted)] tracking-wider mb-2">NO GAMES FOUND</p>
                  <p className="text-sm text-[var(--text-muted)]">Try adjusting your filters</p>
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
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-[var(--bg-primary)] border-r-2 border-[var(--accent)] z-50 flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-[var(--border-primary)]">
                <h2 className="font-pixel text-xs text-[var(--accent)] flex items-center gap-2 tracking-wider">
                  <SlidersHorizontal className="w-4 h-4 text-[var(--neon-pink)]" />
                  FILTERS
                </h2>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors rounded-md">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                <Sidebar />
              </div>
              <div className="p-5 border-t border-[var(--border-primary)] flex gap-3">
                <button
                  onClick={() => { setSelectedCategories([]); }}
                  className="flex-1 text-sm font-medium border border-[var(--border-primary)] text-[var(--text-primary)] py-2.5 rounded-md hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-1 text-sm font-bold bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] py-2.5 rounded-md border border-[var(--accent-hover)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
                  style={{ boxShadow: '3px 3px 0 0 var(--card-shadow)' }}
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
