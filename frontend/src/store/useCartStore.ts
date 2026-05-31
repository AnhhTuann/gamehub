import { create } from 'zustand';

export interface GameItem {
  id: string;
  title: string;
  price: number;
  coverImage?: string;
  image?: string; // Fallback support for older image bindings
}

interface CartStore {
  cart: GameItem[];
  isDrawerOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (game: GameItem) => void;
  removeFromCart: (gameId: string) => void;
  cartTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  isDrawerOpen: false,
  openCart: () => set({ isDrawerOpen: true }),
  closeCart: () => set({ isDrawerOpen: false }),
  addToCart: (game) => {
    const { cart } = get();
    const exists = cart.some((item) => item.id === game.id);
    if (!exists) {
      set({ 
        cart: [...cart, game],
        isDrawerOpen: true 
      });
    } else {
      set({ isDrawerOpen: true }); // Auto open if already in cart
    }
  },
  removeFromCart: (gameId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== gameId)
    }));
  },
  cartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.price, 0);
  }
}));
