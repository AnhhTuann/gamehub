'use client';

import { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { ProductCard } from '../../../components/storefront/ProductCard';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      price
      category
      inventory
      image
    }
  }
`;

export default function ProductsPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState(150);
  
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  const products = data?.products || [];

  // Filter based on category, search term, and price range
  const filteredProducts = products.filter(product => {
    const matchesCategory = filter === 'All' || product.category === filter;
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesPrice = product.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="animate-fade-in container pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 mt-8">
        <h1 className="text-4xl font-heading font-bold tracking-tight">Our Collection</h1>
        
        {/* Search */}
        <div className="w-full md:w-80 relative">
          <input 
            type="text"
            placeholder="Search products..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-background border border-border rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" 
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="font-heading font-bold text-lg mb-4 tracking-wide uppercase">Categories</h3>
            <ul className="flex flex-col gap-2">
              {['All', 'Men', 'Women', 'Accessories', 'Shoes'].map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setFilter(cat)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-all text-sm font-medium ${
                      filter === cat 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
            
            <h3 className="font-heading font-bold text-lg mt-10 mb-4 tracking-wide uppercase">Price Range</h3>
            <input 
              type="range" 
              min="0" 
              max="500" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
              className="w-full accent-primary" 
            />
            <div className="flex justify-between text-muted-foreground text-sm mt-2 font-medium">
              <span>$0</span>
              <span>${maxPrice}</span>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-96 bg-muted/50 animate-pulse rounded-xl border border-border" />
              ))}
            </div>
          ) : error ? (
             <p className="text-destructive font-medium bg-destructive/10 p-4 rounded-md">Error loading products: {error.message}</p>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-border rounded-xl bg-muted/20">
              <p className="text-muted-foreground font-medium text-lg">No products found matching your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
