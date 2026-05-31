import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, X, Swords, Crosshair, Joystick, Gamepad2, Search } from 'lucide-react';
import { Game } from '../types';
import { getAllGames } from '../services/api';
import { ProductCard } from '../components/common/ProductCard';

const CATEGORIES = [
  'Action Games',
  'FPS Games',
  'Strategy Games',
  'MMO Games',
  'RPG Games',
  'Simulation Games',
  'Adventure Games',
  'Indie Games',
  'Fighting Games',
  'Platformer Games',
  'Racing Games',
  'Sports Games'
];

const PLATFORMS = [
  'Steam Games',
  'XBOX Games',
  'PlayStation Games',
  'Nintendo Switch Games',
  'EA App Games',
  'Ubisoft Connect Games',
  'Epic Games',
  'GOG Games',
  'Battle.net Games',
  'Other Games',
  'DLCs'
];

export const Shop = () => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    location.state?.category ? [location.state.category] : []
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const togglePlatform = (plat: string) => {
    setSelectedPlatforms(prev => prev.includes(plat) ? prev.filter(p => p !== plat) : [...prev, plat]);
  };

  const [games, setGames] = useState<Game[]>([]);
  const [totalGames, setTotalGames] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Helper to fetch CheapShark price or fall back to a stable price based on game title length
  const getCheapSharkPrice = async (title: string): Promise<number> => {
    try {
      const res = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(title)}&limit=1`);
      const data = await res.json();
      if (data && data.length > 0 && data[0].cheapest) {
        return parseFloat(data[0].cheapest);
      }
    } catch (error) {
      console.error('CheapShark fetch error:', error);
    }
    return 19.99 + (title.length % 5) * 10;
  };

  const fetchGames = async (page: number) => {
    setIsLoading(true);
    try {
      const key = (import.meta as any).env.VITE_RAWG_API_KEY || 'b01eca51fc9c49b7be3a217fc76f779f';
      let url = `https://api.rawg.io/api/games?key=${key}&page_size=40&page=${page}&ordering=-metacritic`;
      if (debouncedSearch) {
        url += `&search=${encodeURIComponent(debouncedSearch)}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      if (data.count) {
        setTotalGames(data.count);
      }
      const results = data.results || [];

      // Fetch prices for the newly loaded games
      const newGames = await Promise.all(results.map(async (g: any) => {
        const price = await getCheapSharkPrice(g.name);
        return {
          id: g.id.toString(),
          rawgId: g.id,
          title: g.name,
          image: g.background_image,
          rating: g.rating,
          released: g.released,
          price,
          genre: g.genres && g.genres.length > 0 ? { name: g.genres[0].name, slug: g.genres[0].slug } : undefined,
          platforms: g.platforms?.map((p: any) => p.platform.name) || []
        } as Game;
      }));

      setGames(prev => page === 1 ? newGames : [...prev, ...newGames]);
      setHasMore(data.next !== null);
    } catch (error) {
      console.error('Failed to fetch from RAWG:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setGames([]);
    fetchGames(1);
  }, [debouncedSearch]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchGames(currentPage);
    }
  }, [currentPage]);

  const displayProducts = games.filter(g => {
    const matchCategory = selectedCategories.length === 0 || selectedCategories.some(cat => {
      const gStr = g.genre?.name?.toLowerCase() || '';
      if (cat === 'Action Games') return gStr.includes('action');
      if (cat === 'FPS Games') return gStr.includes('shooter');
      if (cat === 'Strategy Games') return gStr.includes('strategy');
      if (cat === 'MMO Games') return gStr.includes('massively') || gStr.includes('mmo');
      if (cat === 'RPG Games') return gStr.includes('rpg') || gStr.includes('role');
      if (cat === 'Simulation Games') return gStr.includes('simulation');
      if (cat === 'Adventure Games') return gStr.includes('adventure');
      if (cat === 'Indie Games') return gStr.includes('indie');
      if (cat === 'Fighting Games') return gStr.includes('fighting');
      if (cat === 'Platformer Games') return gStr.includes('platformer');
      if (cat === 'Racing Games') return gStr.includes('racing');
      if (cat === 'Sports Games') return gStr.includes('sports');
      return false;
    });
    
    const matchPlatform = selectedPlatforms.length === 0 || selectedPlatforms.some(p => {
      const pStr = g.platforms?.join(' ').toLowerCase() || '';
      if (['Steam Games', 'Epic Games', 'GOG Games', 'EA App Games', 'Battle.net Games', 'Ubisoft Connect Games'].includes(p)) {
        return pStr.includes('pc') || pStr.includes('mac') || pStr.includes('linux');
      }
      if (p === 'XBOX Games') return pStr.includes('xbox');
      if (p === 'PlayStation Games') return pStr.includes('playstation') || pStr.includes('ps4') || pStr.includes('ps5');
      if (p === 'Nintendo Switch Games') return pStr.includes('nintendo') || pStr.includes('switch');
      if (p === 'Other Games') return !pStr.includes('pc') && !pStr.includes('xbox') && !pStr.includes('playstation') && !pStr.includes('nintendo');
      if (p === 'DLCs') return g.title.toLowerCase().includes('dlc') || g.title.toLowerCase().includes('expansion');
      return false;
    });

    return matchCategory && matchPlatform;
  });

  const [openDropdown, setOpenDropdown] = useState<'genres' | 'platforms' | null>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.filter-dropdown')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const FilterDropdown = ({ title, type, items, selected, toggleFn }: any) => (
    <div className="relative filter-dropdown">
      <button 
        onClick={() => setOpenDropdown(openDropdown === type ? null : type)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-md border-2 transition-all font-medium text-sm ${
          openDropdown === type || selected.length > 0
            ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-subtle)]' 
            : 'border-[var(--border-primary)] text-[var(--text-primary)] hover:border-[var(--accent)]'
        }`}
      >
        {title}
        {selected.length > 0 && (
          <span className="bg-[var(--accent)] text-black text-xs font-bold px-1.5 py-0.5 rounded-full ml-1">
            {selected.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {openDropdown === type && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-64 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg shadow-xl z-40 max-h-[400px] overflow-y-auto custom-scrollbar"
            style={{ boxShadow: '4px 4px 0 0 var(--card-shadow)' }}
          >
            <div className="p-4 flex flex-col gap-1">
              {items.map((item: string) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group py-2.5 px-3 hover:bg-[var(--accent-subtle)] transition-colors rounded-md">
                  <input
                    type="checkbox"
                    checked={selected.includes(item)}
                    onChange={() => toggleFn(item)}
                    className="pixel-checkbox"
                  />
                  <span className={`text-sm font-medium tracking-wide transition-colors ${
                    selected.includes(item) ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                  }`}>{item}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

      {/* Horizontal Filter Navbar */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-[var(--border-primary)] pb-4 mb-8 gap-4 sticky top-16 z-30 bg-theme-primary/90 backdrop-blur pt-4">
        
        {/* Desktop Filter Dropdowns */}
        <div className="hidden lg:flex items-center gap-4 flex-1">
          <span className="font-pixel text-[10px] text-[var(--text-muted)] tracking-widest mr-2">FILTERS:</span>
          
          <FilterDropdown 
            title="Genres" 
            type="genres" 
            items={CATEGORIES} 
            selected={selectedCategories} 
            toggleFn={toggleCategory} 
          />
          
          <FilterDropdown 
            title="Platforms" 
            type="platforms" 
            items={PLATFORMS} 
            selected={selectedPlatforms} 
            toggleFn={togglePlatform} 
          />
          
          {(selectedCategories.length > 0 || selectedPlatforms.length > 0) && (
            <button
              onClick={() => { setSelectedCategories([]); setSelectedPlatforms([]); }}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--danger)] ml-2 transition-colors flex items-center gap-1 font-medium"
            >
              <X className="w-3 h-3" /> Clear All
            </button>
          )}
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="lg:hidden flex items-center justify-center gap-2 text-sm font-medium text-[var(--text-primary)] border border-[var(--border-primary)] px-4 py-2 rounded-md hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all w-full md:w-auto"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters {(selectedCategories.length > 0 || selectedPlatforms.length > 0) && `(${selectedCategories.length + selectedPlatforms.length})`}
        </button>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <input 
            type="text" 
            placeholder="Search games..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-sm bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] px-4 py-2 w-full rounded-md focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent-glow)] transition-all"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
        </div>

        <span className="text-[#bd93f9] text-sm font-pixel uppercase tracking-wider hidden xl:block whitespace-nowrap">
          {totalGames.toLocaleString()} GAMES FOUND
        </span>
      </div>

      <div className="flex gap-8 items-start">
        {/* Product Grid (Full Width) */}
        <div className="w-full lg:flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {(isLoading && currentPage === 1) ? (
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
          
          {/* Load More Button */}
          {displayProducts.length > 0 && hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={isLoading}
                className="px-8 py-3 bg-[#bd93f9] text-[#282a36] font-bold text-sm tracking-widest rounded hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(189,147,249,0.3)] transition-all duration-200 disabled:opacity-60 flex items-center gap-2 uppercase select-none cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4.5 h-4.5 border-2 border-[#282a36] border-t-transparent rounded-full animate-spin" />
                    LOADING...
                  </>
                ) : (
                  'LOAD MORE GAMES'
                )}
              </button>
            </div>
          )}
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
              <div className="flex-1 overflow-y-auto p-5 custom-scrollbar flex flex-col gap-8">
                <div>
                  <h3 className="font-pixel text-[10px] text-[var(--accent)] mb-4 tracking-wider">GENRES</h3>
                  <div className="flex flex-col gap-1">
                    {CATEGORIES.map(cat => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group py-2.5 px-3 hover:bg-[var(--accent-subtle)] transition-colors rounded-md">
                        <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} className="pixel-checkbox" />
                        <span className={`text-sm font-medium tracking-wide transition-colors ${selectedCategories.includes(cat) ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`}>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-pixel text-[10px] text-[var(--accent)] mb-4 tracking-wider">PLATFORMS</h3>
                  <div className="flex flex-col gap-1">
                    {PLATFORMS.map(p => (
                      <label key={p} className="flex items-center gap-3 cursor-pointer group py-2.5 px-3 hover:bg-[var(--accent-subtle)] transition-colors rounded-md">
                        <input type="checkbox" checked={selectedPlatforms.includes(p)} onChange={() => togglePlatform(p)} className="pixel-checkbox" />
                        <span className={`text-sm font-medium tracking-wide transition-colors ${selectedPlatforms.includes(p) ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`}>{p}</span>
                      </label>
                    ))}
                  </div>
                </div>
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
