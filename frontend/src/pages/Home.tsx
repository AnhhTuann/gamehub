import React, { useEffect, useState } from 'react';
import { Game } from '../types';
import { getTrendingGames, getNewGames } from '../services/api';
import { HeroBanner } from '../components/home/HeroBanner';
import { ProductCard } from '../components/common/ProductCard';
import { Link } from 'react-router-dom';
import { Gamepad2, Swords, Crosshair, Joystick, Trophy, ChevronRight } from 'lucide-react';

/* ===== Sidebar Filters ===== */
const CATEGORIES = [
  { name: 'RPG', icon: <Swords className="w-3.5 h-3.5" /> },
  { name: 'Action', icon: <Crosshair className="w-3.5 h-3.5" /> },
  { name: 'Arcade', icon: <Joystick className="w-3.5 h-3.5" /> },
  { name: 'Retro', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
];

const Sidebar = ({ selected, onToggle }: { selected: string[]; onToggle: (cat: string) => void }) => {
  const [priceRange, setPriceRange] = useState([0, 60]);

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-theme-card border-4 border-theme-secondary retro-shadow p-4">
        {/* Categories */}
        <h3 className="font-pixel text-[9px] text-[var(--neon-cyan)] mb-4 tracking-wider">CATEGORIES</h3>
        <div className="flex flex-col gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <label 
              key={cat.name} 
              className="flex items-center gap-3 cursor-pointer group py-1.5 px-2 hover:bg-theme-secondary transition-colors"
            >
              <input
                type="checkbox"
                checked={selected.includes(cat.name)}
                onChange={() => onToggle(cat.name)}
                className="pixel-checkbox"
              />
              <span className="text-theme-secondary">{cat.icon}</span>
              <span className={`font-pixel text-[8px] tracking-wider ${
                selected.includes(cat.name) ? 'text-[var(--neon-cyan)]' : 'text-theme-secondary group-hover:text-white'
              } transition-colors`}>
                {cat.name.toUpperCase()}
              </span>
            </label>
          ))}
        </div>

        {/* Price Range */}
        <div className="border-t-2 border-theme-primary pt-4">
          <h3 className="font-pixel text-[9px] text-[var(--neon-cyan)] mb-4 tracking-wider">PRICE RANGE</h3>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 bg-theme-tertiary h-3 relative overflow-hidden border-2 border-theme-secondary">
              <div 
                className="absolute left-0 top-0 bottom-0 bg-[var(--neon-green)]"
                style={{ width: `${(priceRange[1] / 100) * 100}%` }}
              />
              <div 
                className="absolute top-0 bottom-0 bg-[var(--neon-green)] opacity-50"
                style={{ left: `${(priceRange[0] / 100) * 100}%`, right: `${100 - (priceRange[1] / 100) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <span className="font-pixel text-[7px] text-[var(--neon-green)]">${priceRange[0]}</span>
            <span className="font-pixel text-[7px] text-[var(--neon-green)]">${priceRange[1]}</span>
          </div>
        </div>

        {/* Platforms */}
        <div className="border-t-2 border-theme-primary pt-4 mt-4">
          <h3 className="font-pixel text-[9px] text-[var(--neon-cyan)] mb-4 tracking-wider">PLATFORMS</h3>
          <div className="flex flex-col gap-2">
            {['PC', 'PS5', 'XBOX', 'SWITCH'].map((platform) => (
              <label key={platform} className="flex items-center gap-3 cursor-pointer group py-1.5 px-2 hover:bg-theme-secondary transition-colors">
                <input type="checkbox" className="pixel-checkbox" />
                <span className="font-pixel text-[8px] text-theme-secondary group-hover:text-white tracking-wider transition-colors">
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-[var(--neon-yellow)]" />
            <h2 className="font-pixel text-sm md:text-base text-white tracking-wider">TRENDING GAMES</h2>
          </div>
          <Link to="/shop" className="font-pixel text-[8px] text-[var(--accent)] hover:text-[var(--accent-hover)] flex items-center gap-1 tracking-wider transition-colors">
            VIEW ALL <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <Sidebar selected={selectedCategories} onToggle={toggleCategory} />

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-theme-card border-4 border-theme-secondary retro-shadow animate-pulse">
                    <div className="aspect-video bg-theme-secondary" />
                    <div className="p-3 space-y-3">
                      <div className="h-2 bg-theme-secondary w-1/3" />
                      <div className="h-3 bg-theme-secondary w-2/3" />
                      <div className="h-2 bg-theme-secondary w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : displayGames.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="text-5xl mb-4">🎮</span>
                <p className="font-pixel text-[10px] text-theme-muted tracking-wider">NO GAMES FOUND</p>
                <p className="text-theme-muted text-sm mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
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
