import React from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingCart, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Game } from '../../types';
import { useCartStore } from '../../store/useCartStore';

interface ProductCardProps {
  product: Game;
  onRemove?: (id: string) => void;
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

export const ProductCard: React.FC<ProductCardProps> = ({ product, onRemove }) => {
  const addToCart = useCartStore((state) => state.addToCart);

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
      <Link to={`/product/${product.id}`} state={{ productTitle: product.title, productData: product }} className="relative aspect-video overflow-hidden block bg-black">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#44475a]/50 border-b border-[var(--border-primary)]">
            <span className="text-4xl opacity-60 mb-2">👾</span>
            <span className="font-pixel text-[10px] text-[#6272a4] tracking-widest font-bold">DATA MISSING</span>
          </div>
        )}
        {/* Subtle scanline overlay */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.04)_2px,rgba(0,0,0,0.04)_4px)] pointer-events-none opacity-60" />
        
        {/* Rating badge */}
        {product.rating > 0 && (
          <div className="absolute top-2 left-2 z-10 bg-[var(--bg-primary)]/90 backdrop-blur-sm border border-[var(--accent)] px-2.5 py-1 rounded-md">
            <span className="text-xs font-bold text-[var(--accent)]">★ {product.rating.toFixed(1)}</span>
          </div>
        )}

        {/* Remove Button (Optional) */}
        {onRemove && (
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove(product.id); }}
            className="absolute top-2 right-2 z-20 bg-[var(--bg-primary)]/90 backdrop-blur-sm border border-[#6272a4] text-[#6272a4] p-1.5 rounded-md hover:text-[var(--neon-pink)] hover:border-[var(--neon-pink)] transition-all"
            title="Remove from Wishlist"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col p-4 gap-2.5 flex-1">
        {/* Genre tag */}
        <span className="text-[11px] font-semibold text-[var(--accent)] tracking-wider uppercase">
          {product.genre?.name || 'INDIE'}
        </span>

        {/* Title - Sans-serif */}
        <Link to={`/product/${product.id}`} state={{ productTitle: product.title, productData: product }}>
          <h3 className="text-sm font-bold leading-snug text-[var(--neon-pink)] hover:text-[var(--accent)] transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating > 0 ? (
          <PixelRating rating={product.rating} />
        ) : (
          <span className="text-xs font-medium text-[var(--text-muted)]">Unrated</span>
        )}

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--border-primary)]">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-[var(--text-muted)] line-through font-medium">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-[var(--neon-green)]">
              ${product.price.toFixed(2)}
            </span>
          </div>
          {product.stockQuantity === 0 ? (
            <button
              disabled
              className="flex items-center gap-1.5 text-xs font-bold bg-[#ff5555]/20 text-[#ff5555] px-4 py-2.5 rounded-md border border-[#ff5555]/50 uppercase tracking-wide cursor-not-allowed"
            >
              OUT OF STOCK
            </button>
          ) : (
            <button
              onClick={() => addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                coverImage: product.image
              })}
              className="flex items-center gap-1.5 text-xs font-bold bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] px-4 py-2.5 rounded-md border border-[var(--accent-hover)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200 uppercase tracking-wide cursor-pointer"
              style={{ boxShadow: '3px 3px 0 0 var(--card-shadow)' }}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              ADD TO CART
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
