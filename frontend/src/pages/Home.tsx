import React, { useEffect, useState } from 'react';
import { Game } from '../types';
import { getTrendingGames } from '../services/api';
import { HeroBanner } from '../components/home/HeroBanner';
import { ProductCard } from '../components/common/ProductCard';
import { Link } from 'react-router-dom';
import { Gamepad2, Swords, Crosshair, Joystick, Trophy, ChevronRight, Flame } from 'lucide-react';

/* ===== Sidebar Filters ===== */
const CATEGORIES = [
  { name: 'RPG', icon: <Swords className="w-4 h-4" /> },
  { name: 'Action', icon: <Crosshair className="w-4 h-4" /> },
  { name: 'Arcade', icon: <Joystick className="w-4 h-4" /> },
  { name: 'Retro', icon: <Gamepad2 className="w-4 h-4" /> },
];

const Sidebar = ({ selected, onToggle }: { selected: string[]; onToggle: (cat: string) => void }) => {
  const [priceRange, setPriceRange] = useState([0, 60]);

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg p-5" style={{ boxShadow: '4px 4px 0 0 var(--card-shadow)' }}>
        {/* Categories */}
        <h3 className="font-pixel text-[10px] text-[var(--accent)] mb-5 tracking-wider">CATEGORIES</h3>
        <div className="flex flex-col gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <label 
              key={cat.name} 
              className="flex items-center gap-3 cursor-pointer group py-2.5 px-3 hover:bg-[var(--accent-subtle)] transition-colors rounded-md"
            >
              <input
                type="checkbox"
                checked={selected.includes(cat.name)}
                onChange={() => onToggle(cat.name)}
                className="pixel-checkbox"
              />
              <span className={`transition-colors ${
                selected.includes(cat.name) ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'
              }`}>{cat.icon}</span>
              <span className={`text-sm font-medium tracking-wide ${
                selected.includes(cat.name) ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
              } transition-colors`}>
                {cat.name}
              </span>
            </label>
          ))}
        </div>

        {/* Price Range */}
        <div className="border-t border-[var(--border-primary)] pt-5">
          <h3 className="font-pixel text-[10px] text-[var(--accent)] mb-5 tracking-wider">PRICE RANGE</h3>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 bg-[var(--bg-tertiary)] h-2.5 relative overflow-hidden rounded-full border border-[var(--border-primary)]">
              <div 
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[var(--accent)] to-[var(--neon-pink)] rounded-full"
                style={{ width: `${(priceRange[1] / 100) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-xs font-medium text-[var(--accent)]">${priceRange[0]}</span>
            <span className="text-xs font-medium text-[var(--accent)]">${priceRange[1]}</span>
          </div>
        </div>

        {/* Platforms */}
        <div className="border-t border-[var(--border-primary)] pt-5 mt-5">
          <h3 className="font-pixel text-[10px] text-[var(--accent)] mb-5 tracking-wider">PLATFORMS</h3>
          <div className="flex flex-col gap-2">
            {['PC', 'PlayStation 5', 'Xbox Series', 'Nintendo Switch'].map((platform) => (
              <label key={platform} className="flex items-center gap-3 cursor-pointer group py-2.5 px-3 hover:bg-[var(--accent-subtle)] transition-colors rounded-md">
                <input type="checkbox" className="pixel-checkbox" />
                <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                  {platform}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

/* ===== Main Page ===== */
export const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    getTrendingGames().then(data => {
      setGames(data);
      setLoading(false);
    });
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const displayGames = selectedCategories.length > 0
    ? games.filter(g => g.genre && selectedCategories.includes(g.genre.name))
    : games;

  return (
    <div className="bg-theme-primary min-h-screen">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Main Content: Sidebar + Product Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        {/* Section title */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Flame className="w-5 h-5 text-[var(--neon-orange)]" />
            <h2 className="font-pixel text-sm md:text-base text-[var(--text-primary)] tracking-wider">TRENDING GAMES</h2>
          </div>
          <Link to="/shop" className="text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] flex items-center gap-1 transition-colors">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <Sidebar selected={selectedCategories} onToggle={toggleCategory} />

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg animate-pulse overflow-hidden">
                    <div className="aspect-video bg-[var(--bg-tertiary)]" />
                    <div className="p-4 space-y-3">
                      <div className="h-3 bg-[var(--bg-tertiary)] w-1/3 rounded" />
                      <div className="h-4 bg-[var(--bg-tertiary)] w-2/3 rounded" />
                      <div className="h-3 bg-[var(--bg-tertiary)] w-1/4 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : displayGames.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="text-5xl mb-4">🎮</span>
                <p className="font-pixel text-xs text-[var(--text-muted)] tracking-wider mb-2">NO GAMES FOUND</p>
                <p className="text-[var(--text-muted)] text-sm">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayGames.slice(0, 9).map((game, idx) => (
                  <ProductCard key={`${game.id}-${idx}`} product={game} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
