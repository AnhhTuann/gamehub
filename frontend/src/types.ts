export type Category = 'All' | 'Men' | 'Women' | 'Shoes' | 'Accessories';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  category: Category;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}
