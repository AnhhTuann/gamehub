import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../common/ProductCard';
import { Product } from '../../types';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
  loading?: boolean;
}

export const FeaturedProducts = ({ products, loading = false }: FeaturedProductsProps) => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-theme-primary">New Arrivals</h2>
          <p className="text-theme-muted text-sm mt-1">Fresh drops you don't want to miss</p>
        </div>
        <Link to="/shop" className="hidden md:flex items-center gap-2 text-accent text-sm font-semibold hover:underline transition-all group">
          View All
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] rounded-2xl bg-theme-secondary mb-4" />
              <div className="h-3 rounded bg-theme-secondary mb-2 w-1/3" />
              <div className="h-4 rounded bg-theme-secondary mb-2 w-2/3" />
              <div className="h-4 rounded bg-theme-secondary w-1/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <div className="mt-8 text-center md:hidden">
        <Link to="/shop" className="inline-flex items-center gap-2 text-accent text-sm font-semibold">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
