import React from 'react';
import { Link } from 'react-router-dom';
import { Percent, Gift, ArrowRight } from 'lucide-react';

export const FeaturedDeals = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-theme-primary mb-10">Featured Deals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Deal 1 */}
        <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-purple-800 p-8 md:p-10 flex flex-col justify-between min-h-[260px] relative overflow-hidden group">
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5 group-hover:scale-150 transition-transform duration-700" />
          <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/5 group-hover:scale-150 transition-transform duration-700 delay-100" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
              <Percent className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
              Up to 40% Off
            </h3>
            <p className="text-purple-200 text-sm mb-6 max-w-xs">
              Exclusive discounts on selected items. Don't miss your chance.
            </p>
          </div>
          <Link to="/shop" className="relative z-10 inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-6 py-3 rounded-full text-sm w-fit hover:bg-purple-100 transition-colors group/btn">
            Shop Deals
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Deal 2 */}
        <div className="rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 p-8 md:p-10 flex flex-col justify-between min-h-[260px] relative overflow-hidden group">
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5 group-hover:scale-150 transition-transform duration-700" />
          <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/5 group-hover:scale-150 transition-transform duration-700 delay-100" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
              Welcome Gift
            </h3>
            <p className="text-orange-100 text-sm mb-6 max-w-xs">
              First-time buyers get a special surprise with their order.
            </p>
          </div>
          <Link to="/shop" className="relative z-10 inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-6 py-3 rounded-full text-sm w-fit hover:bg-orange-50 transition-colors group/btn">
            Claim Now
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
