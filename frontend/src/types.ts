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
  originalPrice?: number; // Used for UI only
  badge?: string; // Used for UI only
}

export interface CartItem {
  id?: string;
  game: Game;
  quantity: number;
}
