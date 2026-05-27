import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, SlidersHorizontal, X, Check, ChevronUp } from 'lucide-react';
import { dummyProducts } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';

const CATEGORIES = ['Outerwear', 'T-Shirts', 'Denim', 'Footwear', 'Accessories'];
const BRANDS = ['Saint Laurent', 'Balenciaga', 'Acne Studios', 'Zara', 'Local Brands'];

export const Shop = () => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };
  
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  // Duplicate dummy products for display purposes
  const displayProducts = [...dummyProducts, ...dummyProducts].slice(0, 9);

  const Sidebar = () => (
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
              {CATEGORIES.map(cat => (
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
              {BRANDS.map(brand => (
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

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-12 flex-1 flex flex-col">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-white">The Collection</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
          Explore our complete range of high-end dark luxury apparel and accessories.
        </p>
      </div>

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-zinc-800/80 pb-6 mb-12 gap-4">
        <button 
          onClick={() => setIsMobileFiltersOpen(true)}
          className="lg:hidden flex items-center gap-2 text-white font-medium uppercase tracking-wider text-sm border border-zinc-800 px-6 py-3 w-full sm:w-auto justify-center hover:bg-zinc-900 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter
        </button>
        <div className="text-zinc-400 text-sm tracking-wide w-full sm:w-auto text-center sm:text-left">
          Showing 1-{displayProducts.length} of 124 Products
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <span className="text-zinc-500 text-sm font-medium uppercase tracking-widest hidden sm:inline">Sort By</span>
          <div className="relative w-full sm:w-56">
            <select className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 text-sm appearance-none focus:outline-none focus:border-zinc-500 cursor-pointer transition-colors">
              <option>Newest Arrivals</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Popular</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex gap-12 items-start">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-1/4 shrink-0 sticky top-28">
          <Sidebar />
        </aside>

        {/* Product Grid */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-12">
            <AnimatePresence mode="popLayout">
              {displayProducts.map((product, idx) => (
                <ProductCard key={`${product.id}-${idx}`} product={product} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden cursor-pointer"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-zinc-950 border-r border-zinc-800 z-50 flex flex-col shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-800/80">
                <h2 className="font-serif text-xl font-bold text-white tracking-wide">
                  Filters
                </h2>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <Sidebar />
              </div>
              <div className="p-6 border-t border-zinc-800/80 bg-zinc-950 flex gap-4">
                <button 
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedBrands([]);
                    setMinPrice('');
                    setMaxPrice('');
                  }}
                  className="flex-1 border border-zinc-800 text-white py-3 text-sm font-semibold uppercase tracking-wider hover:bg-zinc-900 transition-colors"
                >
                  Clear All
                </button>
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-1 bg-white text-black py-3 text-sm font-semibold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};
