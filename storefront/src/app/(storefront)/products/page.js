'use client';

import { useState } from 'react';
import { ProductCard } from '../../../components/storefront/ProductCard';
import { Input } from '../../../components/ui/Input';

export default function ProductsPage() {
  const [filter, setFilter] = useState('All');

  const products = [
    { id: '1', name: 'Essential Cotton Tee', price: 29.99, category: 'Men', img: 'https://source.unsplash.com/random/400x500/?clothing,1' },
    { id: '2', name: 'Urban Denim Jacket', price: 89.99, category: 'Women', img: 'https://source.unsplash.com/random/400x500/?clothing,2' },
    { id: '3', name: 'Classic Sneakers', price: 119.99, category: 'Shoes', img: 'https://source.unsplash.com/random/400x500/?clothing,3' },
    { id: '4', name: 'Leather Crossbody Bag', price: 149.99, category: 'Accessories', img: 'https://source.unsplash.com/random/400x500/?clothing,4' },
    { id: '5', name: 'Linen Summer Dress', price: 79.99, category: 'Women', img: 'https://source.unsplash.com/random/400x500/?clothing,5' },
    { id: '6', name: 'Tailored Chinos', price: 59.99, category: 'Men', img: 'https://source.unsplash.com/random/400x500/?clothing,6' },
  ];

  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Our Collection</h1>
        
        {/* Search */}
        <div style={{ width: '300px' }}>
          <Input placeholder="Search products..." style={{ borderRadius: 'var(--radius-full)' }} />
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
            <input type="range" min="0" max="200" style={{ width: '100%' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <span>$0</span>
              <span>$200+</span>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
