import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_BRANDS } from '../../graphql/queries';

export const ShopByBrands = () => {
  const { data, loading } = useQuery(GET_BRANDS);
  
  // Extract up to 12 brands for the UI
  const brands = data?.brands?.slice(0, 12) || [];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-theme-primary">Popular Brands</h2>
        <Link to="/shop" className="flex items-center gap-2 text-accent text-sm font-semibold hover:underline transition-all group">
          See All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
          {[...Array(12)].map((_, i) => (
             <div key={i} className="h-20 md:h-24 rounded-2xl bg-theme-secondary animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
          {brands.map((brand: any) => (
            <Link 
              key={brand.id} 
              to="/shop"
              state={{ brand: brand.name }}
              className="h-20 md:h-24 px-2 rounded-2xl border border-theme-primary bg-theme-card flex items-center justify-center hover:border-accent hover:shadow-accent-glow transition-all duration-300 group"
            >
              <span className="font-sans font-extrabold text-theme-muted group-hover:text-accent transition-colors text-xs md:text-sm tracking-wider text-center line-clamp-2">
                {brand.name.toUpperCase()}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};
