import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Tags, Monitor, Package, Gift } from 'lucide-react';
import { getFeaturedGames } from '../../services/api';
import { Game } from '../../types';

export const HeroBanner = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    getFeaturedGames().then((data) => {
      setGames(data);
    });
  }, []);

  useEffect(() => {
    if (games.length === 0 || isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % games.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [games.length, isHovered, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % games.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? games.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (games.length === 0) {
    return (
      <section className="relative w-full bg-gamehub-bg pt-0 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="w-full h-[650px] sm:h-[550px] md:h-[460px] bg-gamehub-surface animate-pulse rounded-lg" />
        </div>
      </section>
    );
  }

  const activeGame = games[currentIndex];
  // Extract up to 4 screenshots, excluding the main image if possible
  const screenshots = activeGame.screenshots?.slice(1, 5) || [];
  // Robust Tag Filtering & Fallback
  const englishTags = activeGame.tags?.filter(tag => tag.language === 'eng') || [];
  const displayTags = englishTags.length > 0 ? englishTags : (activeGame.genres || []);
  const tagsToRender = displayTags.slice(0, 3);

  return (
    <section className="relative w-full overflow-hidden bg-gamehub-bg pt-0 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div 
          className="relative group rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row bg-gamehub-surface min-h-[650px] sm:min-h-[550px] md:min-h-[460px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left/Right Navigation Arrows (Global) */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 h-20 w-8 md:w-10 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-r-md opacity-0 group-hover:opacity-100 transition-all z-30"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 h-20 w-8 md:w-10 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-l-md opacity-0 group-hover:opacity-100 transition-all z-30"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Main Image (Left side on Desktop, Top on Mobile) */}
          <div className="w-full md:w-[62%] h-[250px] md:h-auto relative bg-gamehub-bg">
            <AnimatePresence mode="wait">
              <motion.div
                key={`main-img-${activeGame.id}`}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link to={`/product/${activeGame.id}`} state={{ productTitle: activeGame.title, productData: activeGame }} className="block w-full h-full">
                  <img
                    src={activeGame.image}
                    alt={activeGame.title}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Info Panel (Right side on Desktop, Bottom on Mobile) */}
          <div className="w-full md:w-[38%] p-6 flex flex-col h-full justify-between relative bg-gamehub-surface">
            <div>
              <AnimatePresence mode="wait">
                <motion.h2 
                  key={`title-${activeGame.id}`}
                  className="font-sans font-bold text-xl md:text-2xl text-gamehub-text mb-4 leading-tight drop-shadow-lg pr-8 line-clamp-2 min-h-[56px] md:min-h-[64px]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/product/${activeGame.id}`} state={{ productTitle: activeGame.title, productData: activeGame }} className="hover:text-gamehub-purple transition-colors">
                    {activeGame.title}
                  </Link>
                </motion.h2>
              </AnimatePresence>

              {/* Screenshots Grid */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <AnimatePresence mode="wait">
                  {screenshots.map((src, i) => (
                    <motion.div
                      key={`screenshot-${activeGame.id}-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="aspect-video bg-gamehub-bg rounded overflow-hidden"
                    >
                      <img src={src} alt="Screenshot" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Tags / Genres Section */}
              <div className="mb-6 min-h-[70px]">
                <div className="text-xs text-gamehub-muted font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Tags className="w-3 h-3" /> {englishTags.length > 0 ? 'User Tags' : 'Genres'}
                </div>
                {tagsToRender.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence mode="wait">
                      {tagsToRender.map((tag) => (
                        <motion.span 
                          key={`tag-${activeGame.id}-${tag.slug}`}
                          className="px-2 py-1 bg-gamehub-bg text-gamehub-muted text-xs rounded hover:opacity-80 hover:text-gamehub-purple transition-all cursor-pointer capitalize"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {tag.name}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <span className="text-gamehub-muted text-xs italic">Data missing</span>
                )}
              </div>
            </div>

            {/* Footer: Fake Price & Platforms */}
            <div className="flex items-end justify-between mt-auto">
              <div className="flex items-center gap-2 text-gamehub-muted">
                {activeGame.platforms?.some(p => p.toLowerCase().includes('pc') || p.toLowerCase().includes('windows')) && <Monitor className="w-4 h-4" />}
                {activeGame.platforms?.some(p => p.toLowerCase().includes('playstation')) && <Package className="w-4 h-4" />}
                {activeGame.platforms?.some(p => p.toLowerCase().includes('xbox')) && <Gift className="w-4 h-4" />}
              </div>
              
              <div className="flex items-center gap-3">
                {activeGame.price > 0 ? (
                  <div className="text-lg font-bold text-gamehub-green drop-shadow-sm">
                    ${activeGame.price.toFixed(2)}
                  </div>
                ) : (
                  <div className="text-lg font-bold text-orange-400">
                    Free To Play
                  </div>
                )}
                <Link 
                  to={`/product/${activeGame.id}`} 
                  state={{ productTitle: activeGame.title, productData: activeGame }}
                  className="px-3 py-1.5 bg-gamehub-purple text-white text-xs font-bold rounded hover:opacity-80 transition-opacity"
                >
                  VIEW DETAILS
                </Link>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {games.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                onClick={() => goToSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'w-8 bg-gamehub-purple shadow-sm' 
                    : 'w-4 bg-gamehub-border hover:bg-gamehub-muted'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
