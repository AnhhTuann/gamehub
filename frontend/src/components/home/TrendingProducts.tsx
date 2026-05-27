import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../common/ProductCard';
import { Product } from '../../types';

interface TrendingProductsProps {
  products: Product[];
}

export const TrendingProducts = ({ products }: TrendingProductsProps) => {
  return (
    <section className="py-24 pl-6 md:pl-8 lg:pl-12 ml-auto lg:mr-0 lg:ml-[calc((100vw-80rem)/2)] w-full overflow-hidden">
      <div className="flex items-center justify-between mb-12 pr-6">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white tracking-wide">
          Trending Now
        </h2>
        <div className="hidden sm:flex gap-4">
           {/* Optional custom navigation controls could go here, omitting for simplicity as horizontal scroll is sufficient */}
           <Link to="/shop" className="text-sm font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors">
             Explore More
           </Link>
        </div>
      </div>
      
      {/* Horizontal Scroll Container */}
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pr-6 md:pr-12">
        {products.map((product) => (
           <div key={product.id} className="w-[85vw] sm:w-[45vw] md:w-[320px] lg:w-[350px] shrink-0 snap-start">
              <ProductCard product={product} />
           </div>
        ))}
      </div>
    </section>
  );
};
