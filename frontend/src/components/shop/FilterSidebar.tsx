import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

interface FilterSidebarProps {
  categories: string[];
  brands: string[];
  selectedCategories: string[];
  selectedBrands: string[];
  minPrice: string;
  maxPrice: string;
  toggleCategory: (cat: string) => void;
  toggleBrand: (brand: string) => void;
  setMinPrice: (price: string) => void;
  setMaxPrice: (price: string) => void;
}

export const FilterSidebar = ({
  categories,
  brands,
  selectedCategories,
  selectedBrands,
  minPrice,
  maxPrice,
  toggleCategory,
  toggleBrand,
  setMinPrice,
  setMaxPrice,
}: FilterSidebarProps) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  return (
    <div className="flex flex-col gap-8">
      {/* Categories */}
      <div className="border-b border-zinc-800/80 pb-6">
        <button 
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="flex items-center justify-between w-full text-left font-serif text-lg text-white mb-4 group focus:outline-none"
        >
          Categories
          {isCategoryOpen ? <ChevronUp className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" /> : <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />}
        </button>
        <AnimatePresence>
          {isCategoryOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col gap-3 overflow-hidden"
            >
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-white border-white' : 'bg-transparent border-zinc-700 group-hover:border-zinc-400'}`}>
                    {selectedCategories.includes(cat) && <Check className="w-3 h-3 text-black" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
                  <span className={`text-sm transition-colors ${selectedCategories.includes(cat) ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                    {cat}
                  </span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Brands */}
      <div className="border-b border-zinc-800/80 pb-6">
        <button 
          onClick={() => setIsBrandOpen(!isBrandOpen)}
          className="flex items-center justify-between w-full text-left font-serif text-lg text-white mb-4 group focus:outline-none"
        >
          Brands
          {isBrandOpen ? <ChevronUp className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" /> : <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />}
        </button>
        <AnimatePresence>
          {isBrandOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col gap-3 overflow-hidden"
            >
              {brands.map(brand => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-white border-white' : 'bg-transparent border-zinc-700 group-hover:border-zinc-400'}`}>
                    {selectedBrands.includes(brand) && <Check className="w-3 h-3 text-black" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} />
                  <span className={`text-sm transition-colors ${selectedBrands.includes(brand) ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                    {brand}
                  </span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Range */}
      <div className="border-b border-zinc-800/80 pb-6">
        <button 
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex items-center justify-between w-full text-left font-serif text-lg text-white mb-4 group focus:outline-none"
        >
          Price
          {isPriceOpen ? <ChevronUp className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" /> : <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />}
        </button>
        <AnimatePresence>
          {isPriceOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex items-center gap-4 overflow-hidden pt-2"
            >
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">$</span>
                <input 
                  type="number" 
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white pl-7 pr-3 py-3 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
                />
              </div>
              <span className="text-zinc-600">-</span>
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">$</span>
                <input 
                  type="number" 
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white pl-7 pr-3 py-3 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
