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
  const categories = [
    { id: 'Men', label: "Men's Collection" },
    { id: 'Women', label: "Women's Collection" },
    { id: 'Accessories', label: "Accessories" },
    { id: 'Shoes', label: "Shoes Collection" }
  ];
  const { data, loading, error } = useQuery(GET_BEST_SELLERS);

  const bestSellers = data?.products?.slice(0, 4) || [];

  return (
    <div className="animate-fade-in flex flex-col gap-32 pb-32">
      
      <div className="container">
        <HeroBanner 
          title={<>Elevate Your <span className="text-primary">Style</span></>}
          subtitle="Discover the latest trends in fashion. Premium quality, modern design, exclusively for you."
          primaryAction={{ label: 'Shop Collection', href: '/products' }}
          secondaryAction={{ label: 'Flash Sale', href: '/products?sale=true' }}
        />
      </div>

      {/* Categories */}
      <section className="container">
        <div className="flex justify-between items-end mb-12 pb-4">
          <h2 className="text-3xl font-sans font-bold tracking-tight">Featured Categories</h2>
          <Link href="/products" className="text-primary font-medium hover:underline hover:underline-offset-4 transition-all">View All &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat.id} label={cat.label} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container">
        <div className="flex justify-between items-end mb-12 pb-4">
          <h2 className="text-3xl font-sans font-bold tracking-tight">Best Sellers</h2>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-muted/50 animate-pulse rounded-2xl border border-border" />
            ))}
          </div>
        ) : error ? (
          <p className="text-destructive font-medium bg-destructive/10 p-4 rounded-md">Error loading products: {error.message}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {bestSellers.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>
      
    </div>
  );
}
