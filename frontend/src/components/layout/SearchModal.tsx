import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, History } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../graphql/queries';
import { Product } from '../../types';

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
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const trendingSearches = ['Leather Jacket', 'Black Denim', 'Oversized Tee', 'Combat Boots'];
  const { data } = useQuery(GET_PRODUCTS);
  const suggestedProducts: Product[] = (data?.products || []).slice(0, 3);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col"
        >
          <div className="flex justify-end p-6 md:p-8 shrink-0">
             <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white transition-colors">
               <X className="w-8 h-8" />
             </button>
          </div>

          <div className="flex-1 w-full max-w-4xl mx-auto px-6 flex flex-col pt-12 md:pt-24 shrink-0 overflow-y-auto custom-scrollbar">
             <div className="relative w-full flex items-center mb-16 shrink-0">
               <Search className="absolute left-0 w-8 h-8 text-zinc-500" />
               <input 
                 ref={inputRef}
                 type="text" 
                 placeholder="Search for style, color, or item..."
                 className="w-full bg-transparent text-2xl md:text-5xl font-serif text-white pl-12 md:pl-16 pb-4 border-b-2 border-zinc-700/50 focus:border-white focus:outline-none transition-colors duration-300 placeholder:text-zinc-600 tracking-wide"
               />
             </div>

             <div className="flex flex-col gap-16 animate-in md:fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both pb-16">
               {/* Trending Searches */}
               <div>
                  <h3 className="font-sans text-sm font-semibold tracking-widest uppercase text-zinc-500 mb-6">Trending Searches</h3>
                  <div className="flex flex-wrap gap-4">
                    {trendingSearches.map(term => (
                      <button key={term} className="px-6 py-3 rounded-full border border-zinc-700 text-sm font-medium tracking-wider text-zinc-300 hover:bg-white hover:text-black transition-colors duration-300">
                        {term}
                      </button>
                    ))}
                  </div>
               </div>

               {/* Suggested Products */}
               <div>
                  <h3 className="font-sans text-sm font-semibold tracking-widest uppercase text-zinc-500 mb-6">Suggested Products</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {suggestedProducts.map(product => (
                      <Link key={product.id} to={`/product/${product.id}`} onClick={onClose} className="group flex flex-col gap-4 p-4 border border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
                        <div className="aspect-square bg-zinc-900 overflow-hidden relative">
                           <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h4 className="text-zinc-300 font-serif text-lg leading-snug group-hover:text-white transition-colors">{product.name}</h4>
                          <span className="text-zinc-500 text-xs font-semibold uppercase tracking-widest block mt-2">${product.price.toFixed(2)}</span>
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
