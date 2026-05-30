import React, { useEffect, useState } from 'react';
import { Game } from '../types';
import { getTrendingGames } from '../services/api';

import { HeroBanner } from '../components/home/HeroBanner';
import { ShopByCategory } from '../components/home/ShopByCategory';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { PromoBanners } from '../components/home/PromoBanners';
import { FeaturedDeals } from '../components/home/FeaturedDeals';
import { ShopByBrands } from '../components/home/ShopByBrands';
import { RecentPosts } from '../components/home/RecentPosts';

export const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingGames().then(data => {
      setGames(data);
      setLoading(false);
    });
  }, []);

  const newArrivals = games.slice(0, 8);

  return (
    <>
      <HeroBanner />
      <ShopByCategory />
      <FeaturedProducts products={newArrivals} loading={loading} />
      <PromoBanners />
      <FeaturedDeals />
      <ShopByBrands />
      <RecentPosts />
    </>
  );
};
