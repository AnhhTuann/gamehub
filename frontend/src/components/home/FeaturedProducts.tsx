import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../common/ProductCard';
import { Product } from '../../types';

interface FeaturedProductsProps {
  products: Product[];
  loading?: boolean;
}

export const FeaturedProducts = ({ products, loading = false }: FeaturedProductsProps) => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-16">
        <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-wide">New Arrivals</h2>
        <Link to="/shop" className="text-sm font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors">
          View All
        </Link>
      </div>
      {loading ? (
        <div className="text-center py-12 text-zinc-500 font-sans">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
