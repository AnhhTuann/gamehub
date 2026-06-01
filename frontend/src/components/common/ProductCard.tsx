import React from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingCart, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Game } from '../../types';
import { useCartStore } from '../../store/useCartStore';

interface ProductCardProps {
  product: Game;
  onRemove?: (id: string) => void;
  imageAspect?: 'video' | 'steam';
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
              ? 'text-yellow-400 fill-yellow-400'
              : i === fullStars && hasHalf
              ? 'text-yellow-400 fill-yellow-400 opacity-50'
              : 'text-gamehub-muted opacity-40'
          }`}
        />
      ))}
      <span className="text-xs font-bold text-gamehub-text ml-1.5">{rating.toFixed(1)}</span>
    </div>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, onRemove, imageAspect = 'video' }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const aspectClass = imageAspect === 'steam' ? 'aspect-[460/215]' : 'aspect-video';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col w-full h-full bg-gamehub-surface border border-gamehub-border/50 rounded-lg overflow-hidden transition-all duration-300 ease-in-out shadow-md hover:-translate-y-1 hover:shadow-2xl hover:border-gamehub-purple/50"
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} state={{ productTitle: product.title, productData: product }} className={`relative ${aspectClass} w-full overflow-hidden block bg-gamehub-bg`}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gamehub-surface border-b border-gamehub-border">
            <span className="text-4xl opacity-60 mb-2">👾</span>
            <span className="font-pixel text-[10px] text-gamehub-muted tracking-widest font-bold">DATA MISSING</span>
          </div>
        )}
        {/* Subtle scanline overlay */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.04)_2px,rgba(0,0,0,0.04)_4px)] pointer-events-none opacity-60" />
        
        {/* Rating badge */}
        {product.rating > 0 && (
          <div className="absolute top-2 left-2 z-10 bg-gamehub-surface/90 backdrop-blur-sm border border-gamehub-purple px-2.5 py-1 rounded-md">
            <span className="text-xs font-bold text-gamehub-purple">★ {product.rating.toFixed(1)}</span>
          </div>
        )}

        {/* Remove Button (Optional) */}
        {onRemove && (
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove(product.id); }}
            className="absolute top-2 right-2 z-20 bg-gamehub-surface/90 backdrop-blur-sm border border-gamehub-border text-gamehub-muted p-1.5 rounded-md hover:text-gamehub-purple hover:border-gamehub-purple transition-all"
            title="Remove from Wishlist"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow justify-between p-5">
        <div className="flex flex-col gap-2">
          {/* Genre tag */}
          <span className="text-[11px] font-semibold text-gamehub-purple tracking-wider uppercase">
            {product.genre?.name || 'UNRATED'}
          </span>

          {/* Title - Sans-serif */}
          <Link to={`/product/${product.id}`} state={{ productTitle: product.title, productData: product }}>
            <h3 className="text-sm font-bold leading-snug text-gamehub-text group-hover:text-gamehub-purple transition-colors line-clamp-2">
              {product.title || 'Unknown Title'}
            </h3>
          </Link>

          {/* Rating */}
          {product.rating > 0 ? (
            <PixelRating rating={product.rating} />
          ) : (
            <span className="text-xs font-medium text-gamehub-muted">Unrated</span>
          )}
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-auto pt-4 mt-4 border-t border-gamehub-purple/30">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-gamehub-muted line-through font-medium">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.price !== undefined && product.price !== null ? (
              <span className="text-lg font-bold text-gamehub-green">
                ${product.price.toFixed(2)}
              </span>
            ) : (
              <span className="text-gamehub-muted text-sm">N/A</span>
            )}
          </div>
          {product.stockQuantity === 0 ? (
            <button
              disabled
              className="flex items-center gap-1.5 text-xs font-bold bg-red-500/10 text-red-500 px-4 py-2.5 rounded-md border border-red-500/30 uppercase tracking-wide cursor-not-allowed"
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
              className="flex items-center gap-1.5 text-xs font-bold bg-gamehub-purple text-white px-4 py-2.5 rounded-md border border-gamehub-purple hover:opacity-80 hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200 uppercase tracking-wide cursor-pointer"
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
