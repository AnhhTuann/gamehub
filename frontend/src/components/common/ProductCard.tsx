import React from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingCart } from 'lucide-react';
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
          className={`w-3.5 h-3.5 ${
            i < fullStars
              ? 'text-[var(--neon-yellow)] fill-[var(--neon-yellow)]'
              : i === fullStars && hasHalf
              ? 'text-[var(--neon-yellow)] fill-[var(--neon-yellow)] opacity-50'
              : 'text-[var(--text-muted)] opacity-40'
          }`}
        />
      ))}
      <span className="text-xs text-[var(--text-muted)] ml-1.5">{rating.toFixed(1)}</span>
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
      className="group flex flex-col w-full bg-[var(--bg-card)] border-2 border-[var(--border-primary)] rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--accent)] hover:-translate-y-1"
      style={{ boxShadow: 'none' }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = `4px 4px 0 0 var(--shadow-hover-color)`)}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative aspect-video overflow-hidden block bg-black">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, var(--card-fallback-from), var(--card-fallback-to))' }}>
            <span className="text-4xl">🎮</span>
          </div>
        )}
        {/* Subtle scanline overlay */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.04)_2px,rgba(0,0,0,0.04)_4px)] pointer-events-none opacity-60" />
        
        {/* Rating badge */}
        {product.rating > 0 && (
          <div className="absolute top-2 left-2 bg-[var(--bg-primary)]/90 backdrop-blur-sm border border-[var(--accent)] px-2.5 py-1 rounded-md">
            <span className="text-xs font-bold text-[var(--accent)]">★ {product.rating.toFixed(1)}</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col p-4 gap-2.5 flex-1">
        {/* Genre tag */}
        <span className="text-[11px] font-semibold text-[var(--accent)] tracking-wider uppercase">
          {product.genre?.name || 'INDIE'}
        </span>

        {/* Title - Sans-serif */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-bold leading-snug text-[var(--neon-pink)] hover:text-[var(--accent)] transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <PixelRating rating={product.rating} />

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--border-primary)]">
          <span className="text-lg font-bold text-[var(--neon-green)]">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 text-xs font-bold bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] px-4 py-2.5 rounded-md border border-[var(--accent-hover)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200 uppercase tracking-wide"
            style={{ boxShadow: '3px 3px 0 0 var(--card-shadow)' }}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            ADD TO CART
          </button>
        </div>
      </div>
    </motion.div>
  );
};
