export interface ProductVariant {
  id: string;
  sku?: string;
  color?: string;
  size?: string;
  price: number;
  inventory: number;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;
  inventory?: number;
  createdAt?: string;
  variants?: ProductVariant[];
  originalPrice?: number;
  badge?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
