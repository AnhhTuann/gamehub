import React, { useState, useEffect } from 'react';
import { ShoppingCart, Tag, Clock } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { ProductCard } from '../components/common/ProductCard';

interface Deal {
  dealID: string;
  title: string;
  salePrice: string;
  normalPrice: string;
  savings: string;
  thumb: string;
  storeID: string;
  steamAppID?: string;
}

// Helper to upgrade small Steam thumbnails to high-res headers
const getHighResImage = (url: string) => {
  if (url.includes('capsule')) {
    return url.replace(/capsule_[a-zA-Z0-9_]+\.jpg/i, 'header.jpg');
  }
  return url;
};

const MOCK_DEALS: Deal[] = [
  { dealID: 'mock-1', title: 'Cyberpunk 2077', salePrice: '29.99', normalPrice: '59.99', savings: '50.00', thumb: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg', storeID: '1' },
  { dealID: 'mock-2', title: 'The Witcher 3: Wild Hunt', salePrice: '9.99', normalPrice: '39.99', savings: '75.02', thumb: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg', storeID: '1' },
  { dealID: 'mock-3', title: 'Red Dead Redemption 2', salePrice: '19.79', normalPrice: '59.99', savings: '67.01', thumb: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg', storeID: '1' },
  { dealID: 'mock-4', title: 'Hades', salePrice: '12.49', normalPrice: '24.99', savings: '50.02', thumb: 'https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg', storeID: '1' },
  { dealID: 'mock-5', title: 'Hollow Knight', salePrice: '7.49', normalPrice: '14.99', savings: '50.03', thumb: 'https://cdn.akamai.steamstatic.com/steam/apps/367520/header.jpg', storeID: '1' }
];

export const Specials = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&sortBy=Deal%20Rating&pageSize=20');
        if (!response.ok) {
          throw new Error('Failed to fetch deals. Rate limit exceeded.');
        }
        const data = await response.json();
        setDeals(data);
        setIsOfflineMode(false);
      } catch (err: any) {
        console.warn('CheapShark API failed, falling back to mock deals:', err);
        setDeals(MOCK_DEALS);
        setIsOfflineMode(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeals();
  }, []);

  return (
    <div className="min-h-screen bg-[#282a36] text-[var(--text-primary)] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-10 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-pixel text-[#ff79c6] mb-4 drop-shadow-[0_0_8px_rgba(255,121,198,0.5)] uppercase flex items-center gap-4">
            <Clock className="w-8 h-8 md:w-10 md:h-10 text-[#ff5555] animate-pulse" />
            Special Deals
          </h1>
          <p className="text-[#bd93f9] text-sm md:text-base max-w-2xl font-medium tracking-wider mb-2">
            Grab these top-rated titles before the countdown ends. Epic savings await!
          </p>
          {isOfflineMode && (
            <div className="bg-[#ff5555]/20 border border-[#ff5555] text-[#ff5555] px-4 py-2 rounded-md text-xs font-bold tracking-widest mt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff5555] animate-pulse" />
              API RATE LIMIT EXCEEDED. SHOWING OFFLINE CACHED DEALS.
            </div>
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bd93f9]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-[#ff5555] bg-[#44475a] p-6 rounded-lg shadow-lg border border-[#ff5555]">
            <p className="text-lg font-bold">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {deals.map((deal) => {
              const mappedGame = {
                id: deal.dealID,
                rawgId: 0,
                title: deal.title,
                image: deal.steamAppID ? `https://cdn.akamai.steamstatic.com/steam/apps/${deal.steamAppID}/header.jpg` : getHighResImage(deal.thumb),
                price: parseFloat(deal.salePrice),
                originalPrice: parseFloat(deal.normalPrice),
                rating: 0,
                genre: { name: 'DEAL', slug: 'deal' }
              };
              
              return (
                <div key={deal.dealID} className="relative group">
                  <ProductCard product={mappedGame} />
                  {/* Discount Badge on top of ProductCard */}
                  <div className="absolute top-2 left-2 z-30 bg-[#ff5555] text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg flex items-center gap-1 pointer-events-none">
                    <Tag className="w-3 h-3" />
                    {Math.round(parseFloat(deal.savings))}% OFF
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
