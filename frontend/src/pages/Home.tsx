import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import { Product } from '../types';

import { HeroBanner } from '../components/home/HeroBanner';
import { ShopByCategory } from '../components/home/ShopByCategory';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { PromoBanners } from '../components/home/PromoBanners';
import { FeaturedDeals } from '../components/home/FeaturedDeals';
import { ShopByBrands } from '../components/home/ShopByBrands';
import { RecentPosts } from '../components/home/RecentPosts';

export const Home = () => {
  const { data, loading } = useQuery(GET_PRODUCTS);
  const products: Product[] = data?.products || [];

  const newArrivals = products.slice(0, 8);

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
