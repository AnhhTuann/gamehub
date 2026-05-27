import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../common/ProductCard';
import { Product } from '../../types';

interface FlashSaleProps {
  products: Product[];
}

export const FlashSale = ({ products }: FlashSaleProps) => {
  const [timeLeft, setTimeLeft] = useState(3 * 3600 + 45 * 60 + 12); // 03h:45m:12s

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}h : ${m.toString().padStart(2, '0')}m : ${s.toString().padStart(2, '0')}s`;
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white tracking-wide">
            Flash Sale
          </h2>
          <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-full">
            <span className="text-zinc-500 uppercase tracking-widest text-xs font-semibold">Ends In</span>
            <span className="font-mono text-white text-lg font-bold tracking-widest">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        <Link to="/shop" className="text-sm font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors shrink-0">
          View All Offers
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-16">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
