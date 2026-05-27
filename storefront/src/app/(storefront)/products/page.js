'use client';

import { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { ProductCard } from '../../../components/storefront/ProductCard';
import { Input } from '../../../components/ui/Input';

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
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Our Collection</h1>
        
        {/* Search */}
        <div style={{ width: '300px' }}>
          <Input 
            placeholder="Search products..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ borderRadius: 'var(--radius-full)' }} 
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-xl)' }}>
        {/* Sidebar Filters */}
        <aside style={{ width: '250px' }}>
          <div style={{ position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Categories</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              {['All', 'Men', 'Women', 'Accessories', 'Shoes'].map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setFilter(cat)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer',
                      fontSize: '1rem',
                      color: filter === cat ? 'var(--primary)' : 'var(--text-secondary)',
                      fontWeight: filter === cat ? '600' : '400',
                      textAlign: 'left',
                      width: '100%',
                      padding: 'var(--spacing-xs) 0',
                      transition: 'var(--transition)'
                    }}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
            
            <h3 style={{ marginTop: 'var(--spacing-xl)', marginBottom: 'var(--spacing-md)' }}>Price Range</h3>
            <input 
              type="range" 
              min="0" 
              max="150" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
              style={{ width: '100%' }} 
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <span>$0</span>
              <span>${maxPrice}</span>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div style={{ flex: 1 }}>
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p>Error loading products: {error.message}</p>
          ) : filteredProducts.length === 0 ? (
            <p>No products found matching your filters.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
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
