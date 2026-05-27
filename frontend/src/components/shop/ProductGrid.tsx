import React from 'react';
import { AnimatePresence } from 'motion/react';
import { ProductCard } from '../common/ProductCard';
import { Product } from '../../types';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  error?: any;
}

export const ProductGrid = ({ products, loading, error }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-12">
      <AnimatePresence mode="popLayout">
        {loading ? (
          <div className="col-span-full text-center py-12 text-zinc-500 font-sans">
            Loading collection...
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-12 text-red-500 font-sans">
            Error loading products.
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center py-12 text-zinc-500 font-sans">
            No products found.
          </div>
        ) : (
          products.map((product, idx) => (
            <ProductCard key={`${product.id}-${idx}`} product={product} />
          ))
        )}
      </AnimatePresence>
    </div>
  );
};
