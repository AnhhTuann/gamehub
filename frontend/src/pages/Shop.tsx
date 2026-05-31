import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search } from 'lucide-react';
import { Game } from '../types';
import { ProductCard } from '../components/common/ProductCard';

export const Shop = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Selected filters from RAWG API ids
  const [selectedGenre, setSelectedGenre] = useState<string>(() => {
    const cat = location.state?.category;
    if (!cat) return '';
    if (cat.includes('Action')) return '4';
    if (cat.includes('RPG')) return '5';
    if (cat.includes('Indie')) return '51';
    return '';
  });
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const [games, setGames] = useState<Game[]>([]);
  const [totalGames, setTotalGames] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Deriving debouncedSearch from the URL search query parameter (debounced at Navbar level)
  const debouncedSearch = searchParams.get('search') || '';

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
      if (selectedGenre) {
        url += `&genres=${selectedGenre}`;
      }
      if (selectedPlatform) {
        url += `&platforms=${selectedPlatform}`;
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

  // Reset page and fetch new games whenever filters or search query change
  useEffect(() => {
    setCurrentPage(1);
    setGames([]);
    fetchGames(1);
  }, [debouncedSearch, selectedGenre, selectedPlatform]);

  // Load more pages
  useEffect(() => {
    if (currentPage > 1) {
      fetchGames(currentPage);
    }
  }, [currentPage]);

  // RAWG handles all the filtering server-side
  const displayProducts = games;

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
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[var(--border-primary)] pb-4 mb-8 gap-4 sticky top-16 z-30 bg-theme-primary/90 backdrop-blur pt-4">
        
        {/* Filters Select Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <span className="font-pixel text-[10px] text-[var(--text-muted)] tracking-widest mr-2">FILTERS:</span>
          
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-[#282a36] border border-[#6272a4] text-[#f8f8f2] px-4 py-2.5 rounded-md focus:outline-none focus:border-[#bd93f9] focus:ring-1 focus:ring-[#bd93f9] transition-all font-sans text-sm cursor-pointer min-w-[140px] flex-1 sm:flex-none"
          >
            <option value="">All Genres</option>
            <option value="4">Action</option>
            <option value="5">RPG</option>
            <option value="2">Shooter</option>
            <option value="51">Indie</option>
          </select>
          
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="bg-[#282a36] border border-[#6272a4] text-[#f8f8f2] px-4 py-2.5 rounded-md focus:outline-none focus:border-[#bd93f9] focus:ring-1 focus:ring-[#bd93f9] transition-all font-sans text-sm cursor-pointer min-w-[140px] flex-1 sm:flex-none"
          >
            <option value="">All Platforms</option>
            <option value="4">PC</option>
            <option value="187">PlayStation 5</option>
            <option value="186">Xbox Series S/X</option>
            <option value="7">Nintendo Switch</option>
          </select>

          {(selectedGenre || selectedPlatform) && (
            <button
              onClick={() => { setSelectedGenre(''); setSelectedPlatform(''); }}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors flex items-center gap-1 font-medium"
            >
              <X className="w-3 h-3" /> Clear All
            </button>
          )}
        </div>

        <span className="text-[#bd93f9] text-sm font-pixel uppercase tracking-wider hidden md:block whitespace-nowrap">
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
    </div>
  );
};
