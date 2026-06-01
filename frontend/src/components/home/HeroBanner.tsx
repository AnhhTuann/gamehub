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
      <section className="relative w-full bg-theme-primary pt-0 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="w-full h-[600px] md:h-[420px] bg-[#191A21] animate-pulse rounded-lg" />
        </div>
      </section>
    );
  }

  const activeGame = games[currentIndex];
  // Extract up to 4 screenshots, excluding the main image if possible
  const screenshots = activeGame.screenshots?.slice(1, 5) || [];
  const tags = activeGame.tags?.slice(0, 3) || [];

  return (
    <section className="relative w-full overflow-hidden bg-theme-primary pt-0 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div 
          className="relative group rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row bg-[#191A21] h-[650px] sm:h-[550px] md:h-[420px]"
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
          <div className="w-full md:w-[62%] h-[250px] md:h-auto relative bg-[#121318]">
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
          <div className="w-full md:w-[38%] p-6 flex flex-col justify-between relative bg-gradient-to-r from-[#191A21] to-[#282a36]">
            <div>
              <AnimatePresence mode="wait">
                <motion.h2 
                  key={`title-${activeGame.id}`}
                  className="font-sans font-bold text-xl md:text-2xl text-white mb-4 leading-tight drop-shadow-lg pr-8 line-clamp-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/product/${activeGame.id}`} state={{ productTitle: activeGame.title, productData: activeGame }} className="hover:text-[var(--neon-pink)] transition-colors">
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
                      className="aspect-video bg-[#282a36] rounded overflow-hidden"
                    >
                      <img src={src} alt="Screenshot" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Tags Section */}
              {tags.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs text-[#6272a4] font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Tags className="w-3 h-3" /> User Tags
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence mode="wait">
                      {tags.map((tag) => (
                        <motion.span 
                          key={`tag-${activeGame.id}-${tag.slug}`}
                          className="px-2 py-1 bg-[#282a36] text-[#6272a4] text-xs rounded hover:bg-[#44475a] hover:text-white transition-colors cursor-pointer"
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
                </div>
              )}
            </div>

            {/* Footer: Fake Price & Platforms */}
            <div className="flex items-end justify-between mt-4">
              <div className="flex items-center gap-2 text-[#6272a4]">
                {activeGame.platforms?.some(p => p.toLowerCase().includes('pc') || p.toLowerCase().includes('windows')) && <Monitor className="w-4 h-4" />}
                {activeGame.platforms?.some(p => p.toLowerCase().includes('playstation')) && <Package className="w-4 h-4" />}
                {activeGame.platforms?.some(p => p.toLowerCase().includes('xbox')) && <Gift className="w-4 h-4" />}
              </div>
              
              <div className="flex flex-col items-end">
                {activeGame.price > 0 ? (
                  <div className="text-xl font-bold text-[var(--neon-green)] drop-shadow-[0_0_8px_rgba(80,250,123,0.3)]">
                    ${activeGame.price.toFixed(2)}
                  </div>
                ) : (
                  <div className="text-xl font-bold text-[#ffb86c]">
                    Free To Play
                  </div>
                )}
                <Link 
                  to={`/product/${activeGame.id}`} 
                  state={{ productTitle: activeGame.title, productData: activeGame }}
                  className="text-xs text-[#bd93f9] hover:text-white underline decoration-[#bd93f9]/50 hover:decoration-white underline-offset-4 transition-colors mt-1"
                >
                  View Details
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
                    ? 'w-8 bg-[#bd93f9] shadow-[0_0_10px_rgba(189,147,249,0.5)]' 
                    : 'w-4 bg-[#44475a] hover:bg-[#6272a4]'
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
