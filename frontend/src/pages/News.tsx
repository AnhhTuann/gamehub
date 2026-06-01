import React, { useState, useEffect } from 'react';
import { Rss } from 'lucide-react';
import { getNewReleasesNews } from '../services/api';
import { Game } from '../types';
import { ProductCard } from '../components/common/ProductCard';

export const News = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const data = await getNewReleasesNews();
        setGames(data);
      } catch (err: any) {
        setError('Failed to fetch new releases. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#282a36] text-[var(--text-primary)] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-pixel text-[#bd93f9] mb-4 drop-shadow-[0_0_8px_rgba(189,147,249,0.5)] uppercase flex items-center gap-4">
            <Rss className="w-8 h-8 md:w-10 md:h-10 text-[#bd93f9] animate-pulse" />
            LATEST TRANSMISSIONS
          </h1>
          <p className="text-[#6272a4] text-sm md:text-base max-w-2xl font-medium tracking-wider mb-2">
            Fresh off the servers. Secure your copy of the newest titles.
          </p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {games.map((game) => (
              <div key={game.id} className="flex flex-col relative group h-full">
                <div className="relative flex-1">
                  <ProductCard product={game} />
                  {/* New Release Badge */}
                  <div className="absolute top-2 right-2 z-30 bg-[#ffb86c] text-[#282a36] text-xs font-bold px-2 py-1 rounded-md shadow-[0_0_8px_rgba(255,184,108,0.8)] pointer-events-none">
                    NEW RELEASE
                  </div>
                </div>
                <div className="text-center text-[#6272a4] text-xs mt-3 font-medium tracking-wide">
                  Released: {formatDate(game.released)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
