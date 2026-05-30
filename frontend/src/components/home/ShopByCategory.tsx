import React from 'react';
import { Link } from 'react-router-dom';
import { Shirt, Watch, Footprints, Gem, Glasses, ShoppingBag as Bag, Sparkles, LayoutGrid, Monitor, Home, Car } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../../graphql/queries';

// Helper function to map category names to Lucide icons
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  if (name.includes('shirt') || name.includes('dress') || name.includes('top')) return <Shirt className="w-5 h-5" />;
  if (name.includes('watch')) return <Watch className="w-5 h-5" />;
  if (name.includes('shoe')) return <Footprints className="w-5 h-5" />;
  if (name.includes('jewel')) return <Gem className="w-5 h-5" />;
  if (name.includes('glass')) return <Glasses className="w-5 h-5" />;
  if (name.includes('bag')) return <Bag className="w-5 h-5" />;
  if (name.includes('beauty') || name.includes('skin') || name.includes('fragrance')) return <Sparkles className="w-5 h-5" />;
  if (name.includes('laptop') || name.includes('phone') || name.includes('tablet')) return <Monitor className="w-5 h-5" />;
  if (name.includes('furniture') || name.includes('home') || name.includes('kitchen')) return <Home className="w-5 h-5" />;
  if (name.includes('vehicle') || name.includes('motorcycle')) return <Car className="w-5 h-5" />;
  
  return <LayoutGrid className="w-5 h-5" />; // Default icon
};

export const ShopByCategory = () => {
  const { data, loading } = useQuery(GET_CATEGORIES);

  // We'll take 8 specific categories from the data to showcase, or just the first 8
  // Prefer taking a diverse set if available
  const preferredCategories = [
    'mens-shirts', 'womens-dresses', 'mens-shoes', 'womens-jewellery', 
    'sunglasses', 'womens-bags', 'mens-watches', 'fragrances'
  ];

  let displayCategories = [];
  
  if (data?.categories) {
    // Try to find the preferred categories first
    displayCategories = data.categories.filter((c: any) => preferredCategories.includes(c.name));
    
    // Fill the rest with other categories up to 8
    if (displayCategories.length < 8) {
      const remaining = data.categories.filter((c: any) => !preferredCategories.includes(c.name));
      displayCategories = [...displayCategories, ...remaining].slice(0, 8);
    } else {
      displayCategories = displayCategories.slice(0, 8);
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-theme-primary">Shop by Category</h2>
        <Link to="/shop" className="text-accent text-sm font-semibold hover:underline transition-all">View All</Link>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {[...Array(8)].map((_, i) => (
             <div key={i} className="h-32 rounded-2xl bg-theme-secondary animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {displayCategories.map((cat: any, i: number) => (
            <Link 
              key={i}
              to="/shop"
              state={{ category: cat.name }}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-theme-primary bg-theme-card hover:border-accent hover:shadow-accent-glow transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-subtle flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                {getCategoryIcon(cat.name)}
              </div>
              <span className="text-xs font-semibold text-theme-secondary group-hover:text-accent transition-colors text-center truncate w-full capitalize">
                {cat.name.replace('-', ' ')}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};
