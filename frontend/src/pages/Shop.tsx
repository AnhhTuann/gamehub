import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, SlidersHorizontal, X, Check, ChevronUp, LayoutGrid, List } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS, GET_CATEGORIES, GET_BRANDS } from '../graphql/queries';
import { Product } from '../types';
import { ProductCard } from '../components/common/ProductCard';

export const Shop = () => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    location.state?.category ? [location.state.category] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    location.state?.brand ? [location.state.brand] : []
  );
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

  const { data: productsData, loading, error } = useQuery(GET_PRODUCTS);
  const { data: categoriesData } = useQuery(GET_CATEGORIES);
  const { data: brandsData } = useQuery(GET_BRANDS);

  const searchParams = new URLSearchParams(location.search);
  const genderQuery = searchParams.get('gender');

  let displayProducts: Product[] = productsData?.products || [];

  // Filter logic
  if (genderQuery === 'men') {
    displayProducts = displayProducts.filter(p => p.category?.startsWith('mens-'));
  } else if (genderQuery === 'women') {
    displayProducts = displayProducts.filter(p => p.category?.startsWith('womens-'));
  }

  if (selectedCategories.length > 0) {
    displayProducts = displayProducts.filter(p => p.category && selectedCategories.includes(p.category));
  }
  if (selectedBrands.length > 0) {
    displayProducts = displayProducts.filter(p => p.brand && selectedBrands.includes(p.brand));
  }
  if (minPrice) {
    displayProducts = displayProducts.filter(p => p.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    displayProducts = displayProducts.filter(p => p.price <= parseFloat(maxPrice));
  }
  let CATEGORIES = categoriesData?.categories.map((c: any) => c.name) || [];
  if (genderQuery === 'men') {
    CATEGORIES = CATEGORIES.filter((c: string) => c.startsWith('mens-'));
  } else if (genderQuery === 'women') {
    CATEGORIES = CATEGORIES.filter((c: string) => c.startsWith('womens-'));
  }
  const BRANDS = brandsData?.brands.map((b: any) => b.name) || [];

  const Sidebar = () => (
    <div className="flex flex-col gap-6">
      {/* Categories */}
      <div className="border-b border-theme-primary pb-6">
        <button 
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="flex items-center justify-between w-full text-left font-semibold text-theme-primary mb-4 group focus:outline-none text-sm"
        >
          Categories
          {isCategoryOpen ? <ChevronUp className="w-4 h-4 text-theme-muted" /> : <ChevronDown className="w-4 h-4 text-theme-muted" />}
        </button>
        <AnimatePresence>
          {isCategoryOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col gap-2 overflow-hidden"
            >
              {CATEGORIES.map((cat: string) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group/item py-1">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-accent border-accent' : 'bg-transparent border-theme-secondary group-hover/item:border-accent'}`}>
                    {selectedCategories.includes(cat) && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
                  <span className={`text-sm transition-colors ${selectedCategories.includes(cat) ? 'text-theme-primary font-medium' : 'text-theme-secondary group-hover/item:text-theme-primary'}`}>
                    {cat}
                  </span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Brands */}
      <div className="border-b border-theme-primary pb-6">
        <button 
          onClick={() => setIsBrandOpen(!isBrandOpen)}
          className="flex items-center justify-between w-full text-left font-semibold text-theme-primary mb-4 group focus:outline-none text-sm"
        >
          Brands
          {isBrandOpen ? <ChevronUp className="w-4 h-4 text-theme-muted" /> : <ChevronDown className="w-4 h-4 text-theme-muted" />}
        </button>
        <AnimatePresence>
          {isBrandOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col gap-2 overflow-hidden"
            >
              {BRANDS.map((brand: string) => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group/item py-1">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-accent border-accent' : 'bg-transparent border-theme-secondary group-hover/item:border-accent'}`}>
                    {selectedBrands.includes(brand) && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} />
                  <span className={`text-sm transition-colors ${selectedBrands.includes(brand) ? 'text-theme-primary font-medium' : 'text-theme-secondary group-hover/item:text-theme-primary'}`}>
                    {brand}
                  </span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Range */}
      <div className="pb-6">
        <button 
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex items-center justify-between w-full text-left font-semibold text-theme-primary mb-4 group focus:outline-none text-sm"
        >
          Price Range
          {isPriceOpen ? <ChevronUp className="w-4 h-4 text-theme-muted" /> : <ChevronDown className="w-4 h-4 text-theme-muted" />}
        </button>
        <AnimatePresence>
          {isPriceOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex items-center gap-3 overflow-hidden pt-1"
            >
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted text-sm">$</span>
                <input 
                  type="number" 
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full bg-theme-secondary border border-theme-primary text-theme-primary pl-7 pr-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 ring-accent/30 transition-all"
                />
              </div>
              <span className="text-theme-muted text-sm">—</span>
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted text-sm">$</span>
                <input 
                  type="number" 
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-theme-secondary border border-theme-primary text-theme-primary pl-7 pr-3 py-2.5 text-sm rounded-xl focus:outline-none focus:ring-2 ring-accent/30 transition-all"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 flex flex-col">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-theme-primary mb-3">
          {genderQuery === 'men' ? "Men's Collection" : genderQuery === 'women' ? "Women's Collection" : "The Collection"}
        </h1>
        <p className="text-theme-muted max-w-lg mx-auto text-sm">
          Explore our curated selection of premium fashion pieces.
        </p>
      </div>

      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-theme-primary pb-4 mb-8 gap-4">
        <button 
          onClick={() => setIsMobileFiltersOpen(true)}
          className="lg:hidden flex items-center gap-2 text-theme-primary font-medium text-sm border border-theme-primary px-4 py-2.5 rounded-xl hover:bg-theme-secondary transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
        <span className="text-theme-muted text-sm hidden sm:block">
          {displayProducts.length} products
        </span>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select className="bg-theme-secondary border border-theme-primary text-theme-primary px-4 py-2.5 pr-10 text-sm appearance-none rounded-xl focus:outline-none focus:ring-2 ring-accent/30 cursor-pointer transition-all">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Popular</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex gap-10 items-start">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-60 shrink-0 sticky top-24">
          <Sidebar />
        </aside>

        {/* Product Grid */}
        <div className="w-full lg:flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 gap-y-10">
            <AnimatePresence mode="popLayout">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] rounded-2xl bg-theme-secondary mb-4" />
                    <div className="h-3 rounded bg-theme-secondary mb-2 w-1/3" />
                    <div className="h-4 rounded bg-theme-secondary mb-2 w-2/3" />
                    <div className="h-4 rounded bg-theme-secondary w-1/4" />
                  </div>
                ))
              ) : error ? (
                <div className="col-span-full text-center py-12 text-red-500">
                  Error loading products.
                </div>
              ) : displayProducts.length === 0 ? (
                <div className="col-span-full text-center py-12 text-theme-muted">
                  No products found.
                </div>
              ) : (
                displayProducts.map((product, idx) => (
                  <ProductCard key={`${product.id}-${idx}`} product={product} />
                ))
              )}
            </AnimatePresence>
          </div>
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
              transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-theme-primary border-r border-theme-primary z-50 flex flex-col shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-theme-primary">
                <h2 className="font-semibold text-lg text-theme-primary flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-accent" />
                  Filters
                </h2>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 text-theme-muted hover:text-theme-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <Sidebar />
              </div>
              <div className="p-6 border-t border-theme-primary flex gap-3">
                <button 
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedBrands([]);
                    setMinPrice('');
                    setMaxPrice('');
                  }}
                  className="flex-1 border border-theme-primary text-theme-primary py-3 text-sm font-semibold rounded-xl hover:bg-theme-secondary transition-colors"
                >
                  Clear
                </button>
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-1 bg-accent text-white py-3 text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
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
