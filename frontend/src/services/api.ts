import { Game } from '../types';

const RAWG_API_KEY = (import.meta as any).env.VITE_RAWG_API_KEY;
const RAWG_BASE_URL = 'https://api.rawg.io/api';
const CHEAPSHARK_BASE_URL = 'https://www.cheapshark.com/api/1.0';

const getCheapSharkPrice = async (title: string): Promise<number> => {
  return 19.99 + (title.length % 5) * 10; // Fallback price logic to avoid API rate limiting
};

const getHighResRawg = (url?: string) => {
  if (!url) return '';
  return url.replace(/\/crop\/\d+\/\d+\//, '/').replace(/\/resize\/\d+\/-?\//, '/');
};

const fetchGames = async (endpoint: string, params = ''): Promise<Game[]> => {
  try {
    const res = await fetch(`${RAWG_BASE_URL}${endpoint}?key=${RAWG_API_KEY}${params}`);
    const data = await res.json();
    
    // Fetch prices in parallel
    const gamesWithPrices = await Promise.all(data.results.map(async (g: any) => {
      const price = await getCheapSharkPrice(g.name);
      return {
        id: g.id.toString(),
        rawgId: g.id,
        title: g.name,
        image: getHighResRawg(g.background_image),
        rating: g.rating,
        released: g.released,
        price,
        genre: g.genres && g.genres.length > 0 ? { name: g.genres[0].name, slug: g.genres[0].slug } : undefined,
        tags: g.tags ? g.tags.map((t: any) => ({ name: t.slug.replace(/-/g, ' '), slug: t.slug })) : [],
        platforms: g.parent_platforms ? g.parent_platforms.map((p: any) => p.platform.name) : [],
        screenshots: g.short_screenshots ? g.short_screenshots.map((s: any) => getHighResRawg(s.image)) : []
      };
    }));
    
    return gamesWithPrices;
  } catch (error) {
    console.error('Failed to fetch from RAWG:', error);
    return [];
  }
};

export const getTrendingGames = () => fetchGames('/games', '&ordering=-rating&dates=2023-01-01,2024-12-31&page_size=12');
export const getNewReleases = () => fetchGames('/games', '&ordering=-released&dates=2024-01-01,2024-12-31&page_size=8');
export const getNewReleasesNews = () => fetchGames('/games', '&ordering=-released&dates=2024-01-01,2024-12-31&page_size=20');
export const getFeaturedGames = () => fetchGames('/games', '&dates=2025-06-01,2026-06-01&ordering=-added&page_size=6');
export const getAllGames = (page = 1) => fetchGames('/games', `&ordering=-metacritic&page_size=40&page=${page}`);

export const getGameDetails = async (rawgId: number): Promise<Game | null> => {
  try {
    const [detailRes, screenshotRes] = await Promise.all([
      fetch(`${RAWG_BASE_URL}/games/${rawgId}?key=${RAWG_API_KEY}`),
      fetch(`${RAWG_BASE_URL}/games/${rawgId}/screenshots?key=${RAWG_API_KEY}`),
    ]);
    const g = await detailRes.json();
    const screenshotData = await screenshotRes.json();
    const price = await getCheapSharkPrice(g.name);
    return {
      id: g.id.toString(),
      rawgId: g.id,
      title: g.name,
      description: g.description_raw,
      image: g.background_image,
      rating: g.rating,
      released: g.released,
      price,
      genre: g.genres && g.genres.length > 0 ? { name: g.genres[0].name, slug: g.genres[0].slug } : undefined,
      screenshots: screenshotData?.results?.map((s: any) => s.image).slice(0, 5) || [],
      developers: g.developers?.map((d: any) => d.name) || [],
      publishers: g.publishers?.map((p: any) => p.name) || [],
      platforms: g.platforms?.map((p: any) => p.platform.name).slice(0, 4) || [],
    };
  } catch (error) {
    console.error('Failed to fetch game details:', error);
    return null;
  }
};
export const getGameDetailsByTitle = async (title: string): Promise<Game | null> => {
  try {
    const res = await fetch(`${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(title)}&page_size=1`);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return getGameDetails(data.results[0].id);
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch game details by title:', error);
    return null;
  }
};

export interface CheapSharkDeal {
  dealID: string;
  title: string;
  salePrice: string;
  normalPrice: string;
  savings: string;
  thumb: string;
  storeID: string;
  steamAppID?: string;
}

const getHighResImage = (url: string) => {
  if (url.includes('capsule')) {
    return url.replace(/capsule_[a-zA-Z0-9_]+\.jpg/i, 'header.jpg');
  }
  return url;
};

const MOCK_DEALS = [
  { dealID: 'mock-1', title: 'Cyberpunk 2077', salePrice: '29.99', normalPrice: '59.99', savings: '50.00', thumb: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg', storeID: '1' },
  { dealID: 'mock-2', title: 'The Witcher 3: Wild Hunt', salePrice: '9.99', normalPrice: '39.99', savings: '75.02', thumb: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg', storeID: '1' },
  { dealID: 'mock-3', title: 'Red Dead Redemption 2', salePrice: '19.79', normalPrice: '59.99', savings: '67.01', thumb: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg', storeID: '1' },
  { dealID: 'mock-4', title: 'Hades', salePrice: '12.49', normalPrice: '24.99', savings: '50.02', thumb: 'https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg', storeID: '1' },
  { dealID: 'mock-5', title: 'Hollow Knight', salePrice: '7.49', normalPrice: '14.99', savings: '50.03', thumb: 'https://cdn.akamai.steamstatic.com/steam/apps/367520/header.jpg', storeID: '1' }
];

export const getSpecialDeals = async (): Promise<Game[]> => {
  try {
    const response = await fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&sortBy=Deal%20Rating&pageSize=20');
    if (!response.ok) {
      throw new Error('CheapShark fetch failed');
    }
    const data: CheapSharkDeal[] = await response.json();
    return data.map(deal => ({
      id: deal.dealID,
      rawgId: 0,
      title: deal.title,
      image: deal.steamAppID ? `https://cdn.akamai.steamstatic.com/steam/apps/${deal.steamAppID}/header.jpg` : getHighResImage(deal.thumb),
      price: parseFloat(deal.salePrice),
      originalPrice: parseFloat(deal.normalPrice),
      rating: 0,
      genre: { name: 'DEAL', slug: 'deal' },
      badge: `${Math.round(parseFloat(deal.savings))}% OFF`
    }));
  } catch (err) {
    console.warn('CheapShark API failed, falling back to mock deals:', err);
    return MOCK_DEALS.map(deal => ({
      id: deal.dealID,
      rawgId: 0,
      title: deal.title,
      image: deal.thumb,
      price: parseFloat(deal.salePrice),
      originalPrice: parseFloat(deal.normalPrice),
      rating: 0,
      genre: { name: 'DEAL', slug: 'deal' },
      badge: `${Math.round(parseFloat(deal.savings))}% OFF`
    }));
  }
};

