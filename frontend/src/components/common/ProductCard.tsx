import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col w-full"
    >
      <Link to={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-theme-secondary block mb-4">
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-accent text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">
            {product.badge}
          </div>
        )}
        <img
          src={product.image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-accent text-white shadow-lg shadow-accent/30 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Cart
          </button>
          <button className="w-11 h-11 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-xl text-black hover:bg-accent hover:text-white transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </Link>
      
      <div className="flex flex-col px-1">
        <span className="text-theme-muted text-[10px] font-semibold uppercase tracking-widest mb-1">
          {product.category || 'Fashion'}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-sans text-theme-primary font-semibold text-sm leading-snug hover:text-accent transition-colors line-clamp-1 mb-2">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          {product.originalPrice && (
            <span className="text-theme-muted text-xs line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-accent font-bold text-base">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
