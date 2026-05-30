import { Game } from '../types';

const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const RAWG_BASE_URL = 'https://api.rawg.io/api';
const CHEAPSHARK_BASE_URL = 'https://www.cheapshark.com/api/1.0';

const getCheapSharkPrice = async (title: string): Promise<number> => {
  try {
    const res = await fetch(`${CHEAPSHARK_BASE_URL}/games?title=${encodeURIComponent(title)}&limit=1`);
    const data = await res.json();
    if (data && data.length > 0 && data[0].cheapest) {
      return parseFloat(data[0].cheapest);
    }
  } catch (error) {
    console.error('CheapShark fetch error:', error);
  }
  return 59.99; // Fallback price
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
        image: g.background_image,
        rating: g.rating,
        released: g.released,
        price,
        genre: g.genres && g.genres.length > 0 ? { name: g.genres[0].name, slug: g.genres[0].slug } : undefined
      };
    }));
    
    return gamesWithPrices;
  } catch (error) {
    console.error('Failed to fetch from RAWG:', error);
    return [];
  }
};

export const getTrendingGames = () => fetchGames('/games', '&ordering=-rating&dates=2024-01-01,2024-12-31&page_size=12');
export const getNewReleases = () => fetchGames('/games', '&ordering=-released&dates=2024-01-01,2024-12-31&page_size=8');
export const getFeaturedGames = () => fetchGames('/games', '&ordering=-added&page_size=4');

export const getGameDetails = async (rawgId: number): Promise<Game | null> => {
  try {
    const res = await fetch(`${RAWG_BASE_URL}/games/${rawgId}?key=${RAWG_API_KEY}`);
    const g = await res.json();
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
      genre: g.genres && g.genres.length > 0 ? { name: g.genres[0].name, slug: g.genres[0].slug } : undefined
    };
  } catch (error) {
    console.error('Failed to fetch game details:', error);
    return null;
  }
};
