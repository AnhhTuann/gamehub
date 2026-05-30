import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Gamepad2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Game } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Game;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col w-full bg-theme-secondary/40 border border-theme-primary hover:border-accent transition-all duration-300 rounded-xl overflow-hidden"
    >
      <Link to={`/product/${product.id}`} className="relative aspect-video overflow-hidden block bg-black">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Rating overlay */}
        {product.rating > 0 && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1 border border-white/10">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-[10px] font-bold">{product.rating}</span>
          </div>
        )}
        
        {/* Hover overlay with Add to Cart */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full flex items-center justify-center gap-2 bg-accent text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] py-2.5 rounded text-sm font-bold tracking-wider hover:brightness-110 transition-all font-mono"
          >
            <Gamepad2 className="w-4 h-4" />
            PLAY NOW
          </button>
        </div>
      </Link>
      
      <div className="flex flex-col p-4 bg-theme-secondary/20">
        <div className="flex justify-between items-start gap-2 mb-2">
          <Link to={`/product/${product.id}`} className="flex-1">
            <h3 className="font-sans font-bold text-white text-base leading-tight hover:text-accent transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>
          <span className="text-accent font-bold text-sm bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">
            {product.genre?.name || 'Indie'}
          </span>
          {product.released && (
            <span className="text-zinc-600 text-[10px] font-mono">
              {product.released.split('-')[0]}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
