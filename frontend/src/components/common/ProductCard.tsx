import React from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Game } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Game;
}

const PixelRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < fullStars
              ? 'text-[var(--neon-yellow)] fill-[var(--neon-yellow)]'
              : i === fullStars && hasHalf
              ? 'text-[var(--neon-yellow)] fill-[var(--neon-yellow)] opacity-50'
              : 'text-theme-muted'
          }`}
        />
      ))}
    </div>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col w-full bg-theme-card border-4 border-theme-secondary hover:border-[var(--neon-cyan)] transition-all duration-200 retro-shadow hover:retro-shadow-accent"
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative aspect-video overflow-hidden block bg-black border-b-4 border-theme-secondary group-hover:border-[var(--neon-cyan)] transition-colors">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <span className="text-4xl">🎮</span>
          </div>
        )}
        {/* Scanline overlay */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.06)_2px,rgba(0,0,0,0.06)_4px)] pointer-events-none" />
        
        {/* Rating badge */}
        {product.rating > 0 && (
          <div className="absolute top-2 left-2 bg-black/80 border-2 border-[var(--neon-yellow)] px-2 py-1">
            <span className="font-pixel text-[7px] text-[var(--neon-yellow)]">{product.rating.toFixed(1)}</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col p-3 gap-2 flex-1">
        {/* Genre tag */}
        <span className="font-pixel text-[7px] text-[var(--neon-cyan)] tracking-wider uppercase">
          {product.genre?.name || 'INDIE'}
        </span>

        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-pixel text-[9px] leading-relaxed text-white hover:text-[var(--accent)] transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <PixelRating rating={product.rating} />

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t-2 border-theme-primary">
          <span className="font-pixel text-[10px] text-[var(--neon-green)]">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="font-pixel text-[7px] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] px-3 py-1.5 border-2 border-black/30 retro-shadow-dark hover:translate-y-0.5 hover:shadow-none active:translate-y-1 active:shadow-none transition-all"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </motion.div>
  );
};
