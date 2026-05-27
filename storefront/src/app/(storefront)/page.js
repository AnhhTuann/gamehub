'use client';

import Link from 'next/link';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { HeroBanner } from '../../components/storefront/HeroBanner';
import { CategoryCard } from '../../components/storefront/CategoryCard';
import { ProductCard } from '../../components/storefront/ProductCard';

const GET_BEST_SELLERS = gql`
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

export default function Home() {
  const categories = ['Men', 'Women', 'Accessories', 'Shoes'];
  const { data, loading, error } = useQuery(GET_BEST_SELLERS);

  const bestSellers = data?.products?.slice(0, 4) || [];

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
          <Link href="/products" style={{ color: 'var(--primary)', fontWeight: 500 }}>View All</Link>
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
        {loading ? (
          <p>Loading best sellers...</p>
        ) : error ? (
          <p>Error loading products: {error.message}</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
            {bestSellers.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>
      
    </div>
  );
}
