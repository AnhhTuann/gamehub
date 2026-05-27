'use client';

import Link from 'next/link';
import { HeroBanner } from '../../components/storefront/HeroBanner';
import { CategoryCard } from '../../components/storefront/CategoryCard';
import { ProductCard } from '../../components/storefront/ProductCard';

export default function Home() {
  const categories = ['Men', 'Women', 'Accessories', 'Shoes'];
  const bestSellers = [
    { id: '1', title: 'Premium Cotton T-Shirt 1', category: 'Urban Collection', price: 49.99, isNew: true },
    { id: '2', title: 'Premium Cotton T-Shirt 2', category: 'Urban Collection', price: 49.99, isNew: true },
    { id: '3', title: 'Premium Cotton T-Shirt 3', category: 'Urban Collection', price: 49.99, isNew: true },
    { id: '4', title: 'Premium Cotton T-Shirt 4', category: 'Urban Collection', price: 49.99, isNew: true }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      
      <HeroBanner 
        title={<>Elevate Your <span style={{ color: 'var(--primary)' }}>Style</span></>}
        subtitle="Discover the latest trends in fashion. Premium quality, modern design, exclusively for you."
        primaryAction={{ label: 'Shop Collection', href: '/products' }}
        secondaryAction={{ label: 'Flash Sale', href: '/products?sale=true' }}
      />

      {/* Categories */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--spacing-lg)' }}>
          <h2 style={{ fontSize: '2rem' }}>Featured Categories</h2>
          <Link href="/categories" style={{ color: 'var(--primary)', fontWeight: 500 }}>View All</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-md)' }}>
          {categories.map((cat) => (
            <CategoryCard key={cat} category={cat} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--spacing-lg)' }}>
          <h2 style={{ fontSize: '2rem' }}>Best Sellers</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
          {bestSellers.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
      
    </div>
  );
}
