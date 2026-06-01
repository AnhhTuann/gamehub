export interface Game {
  id: string; // Internal DB ID or generated
  rawgId: number; // RAWG API ID
  title: string;
  description?: string;
  image?: string;
  price: number;
  rating: number;
  released?: string;
  createdAt?: string;
  genre?: {
    name: string;
    slug: string;
  };
  stockQuantity?: number;
  originalPrice?: number; // Used for UI only
  badge?: string; // Used for UI only
  screenshots?: string[];
  developers?: string[];
  publishers?: string[];
  platforms?: string[];
  genres?: { name: string; slug: string }[];
  tags?: { name: string; slug: string; language?: string }[];
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image?: string;
  category?: string;
  quantity: number;
  game?: Game;
}

export type Product = Game;

