import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import { Product } from '../types';

import { HeroBanner } from '../components/home/HeroBanner';
import { FlashSale } from '../components/home/FlashSale';
import { TrendingProducts } from '../components/home/TrendingProducts';
import { FeaturedProducts } from '../components/home/FeaturedProducts';

export const Home = () => {
  const { data, loading } = useQuery(GET_PRODUCTS);
  const products: Product[] = data?.products || [];

  const featuredProducts = products.slice(0, 4);

  // Derive Flash Sale Products
  const flashSaleProducts = products.slice(4, 8).map(p => ({
    ...p,
    originalPrice: p.price * 1.4,
    badge: 'SALE'
  }));

  // Derive Trending Products
  const trendingProducts = products.length >= 12 
    ? [products[8], products[9], products[10], products[11], products[0], products[1]]
    : products;

  return (
    <>
      <HeroBanner />
      <FlashSale products={flashSaleProducts} />
      <TrendingProducts products={trendingProducts} />
      <FeaturedProducts products={featuredProducts} loading={loading} />
    </>
  );
};
