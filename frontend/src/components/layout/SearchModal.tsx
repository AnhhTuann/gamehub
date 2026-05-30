import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, TrendingUp, ArrowRight } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../graphql/queries';
import { Product } from '../../types';
import { Link } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const trendingSearches = ['Leather Jacket', 'Black Denim', 'Oversized Tee', 'Sneakers'];
  const { data } = useQuery(GET_PRODUCTS);
  const suggestedProducts: Product[] = (data?.products || []).slice(0, 3);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] backdrop-blur-xl flex flex-col"
          style={{ backgroundColor: 'var(--overlay)' }}
        >
          <div className="flex justify-end p-6 shrink-0">
            <button onClick={onClose} className="p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 w-full max-w-3xl mx-auto px-6 flex flex-col pt-8 md:pt-16 overflow-y-auto custom-scrollbar">
            <div className="relative w-full flex items-center mb-12 shrink-0">
              <Search className="absolute left-0 w-6 h-6 text-white/40" />
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Search for products..."
                className="w-full bg-transparent text-2xl md:text-4xl font-sans font-light text-white pl-10 pb-4 border-b border-white/20 focus:border-white/60 focus:outline-none transition-colors placeholder:text-white/30"
              />
            </div>

            <div className="flex flex-col gap-12 pb-16">
              {/* Trending */}
              <div>
                <h3 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" /> Trending
                </h3>
                <div className="flex flex-wrap gap-3">
                  {trendingSearches.map(term => (
                    <button key={term} className="px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium text-white/70 hover:bg-white hover:text-black transition-all duration-300">
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Suggested */}
              <div>
                <h3 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Suggested</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {suggestedProducts.map(product => (
                    <Link key={product.id} to={`/product/${product.id}`} onClick={onClose} className="group flex flex-col gap-3 p-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="aspect-square rounded-xl overflow-hidden bg-white/5">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm line-clamp-1 group-hover:text-purple-300 transition-colors">{product.title}</h4>
                        <span className="text-white/50 text-xs font-semibold">${product.price.toFixed(2)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
