import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 overflow-hidden w-full"
    >
      <Link to={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-zinc-800 block">
        {product.badge && (
          <div className="absolute top-4 left-4 z-10 bg-white text-black text-xs font-bold tracking-widest uppercase px-3 py-1 shadow-md">
            {product.badge}
          </div>
        )}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="flex flex-col flex-grow">
          <span className="text-zinc-500 text-xs font-semibold tracking-widest uppercase mb-3">
            {product.category}
          </span>
          <h3 className="font-sans text-zinc-300 text-lg leading-relaxed mb-6 hover:text-white transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto flex items-center justify-between border-t border-zinc-800/50 pt-6">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-zinc-500 text-sm line-through mb-0.5">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-white font-bold tracking-wider text-xl">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex items-center justify-center bg-black hover:bg-zinc-800 text-white p-4 rounded-full transition-all duration-300 group/btn border border-zinc-800/50 hover:border-zinc-700"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
