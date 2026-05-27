import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
import { dummyProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductReviews } from '../components/common/ProductReviews';

const SIZES = ['S', 'M', 'L', 'XL'];
const COLORS = [
  { name: 'Obsidian Black', value: 'bg-zinc-950' },
  { name: 'Charcoal Grey', value: 'bg-zinc-800' },
  { name: 'Midnight Navy', value: 'bg-slate-900' }
];

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = dummyProducts.find(p => p.id === id) || dummyProducts[0]; // fallback to first if direct visit
  
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <h2 className="text-xl text-zinc-400 font-serif">Product not found</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  }

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-12 flex-1">
      <div className="text-sm text-zinc-500 mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-zinc-300 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/shop" className="hover:text-zinc-300 transition-colors">Shop</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-zinc-300">{product.category}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Left Column: Visuals */}
        <div className="relative aspect-[3/4] w-full bg-zinc-900 overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(10,10,10,0.9)] pointer-events-none" />
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col py-6 md:py-12">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold leading-tight text-white mb-6 text-balance">
            {product.name}
          </h1>
          
          <p className="text-2xl font-bold text-zinc-200 tracking-wider mb-8">
             ${product.price.toFixed(2)}
          </p>
          
          <p className="text-zinc-400 leading-relaxed mb-12 text-lg">
            Engineered for the modern aesthete, this piece is crafted from premium, ethically sourced materials to ensure unparalleled comfort and a flawless drape. Elevate your twilight wardrobe with its cinematic silhouette.
          </p>

          {/* Color Selector */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-4">Color</h3>
            <div className="flex gap-4">
              {COLORS.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${color.value} ${selectedColor === color.value ? 'border-zinc-200 scale-110 shadow-lg shadow-black/50' : 'border-zinc-800 hover:border-zinc-500'}`}
                  aria-label={`Select ${color.name}`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-12">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">Size</h3>
                <button className="text-sm text-zinc-500 underline underline-offset-4 hover:text-zinc-300 transition-colors">Size Guide</button>
             </div>
             <div className="flex gap-3">
               {SIZES.map(size => (
                 <button
                   key={size}
                   onClick={() => setSelectedSize(size)}
                   className={`w-14 h-14 border flex items-center justify-center font-medium transition-all duration-300 ${selectedSize === size ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-zinc-200'}`}
                 >
                   {size}
                 </button>
               ))}
             </div>
          </div>

          {/* CTA */}
          <button 
             onClick={handleAddToCart}
             className="w-full py-5 bg-white text-black font-bold tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-zinc-200 transition-colors duration-300 mb-12 group"
          >
            <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
            Add to Cart
          </button>

          {/* Accordions */}
          <div className="border-t border-zinc-800/60">
             <div className="border-b border-zinc-800/60">
                <button 
                  onClick={() => toggleSection('material')}
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none group/acc"
                >
                  <span className="font-serif text-lg text-zinc-300 tracking-wide group-hover/acc:text-white transition-colors">Material & Care</span>
                  {expandedSection === 'material' ? <ChevronUp className="w-5 h-5 text-zinc-500 group-hover/acc:text-zinc-300 transition-colors" /> : <ChevronDown className="w-5 h-5 text-zinc-500 group-hover/acc:text-zinc-300 transition-colors" />}
                </button>
                <AnimatePresence>
                  {expandedSection === 'material' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-zinc-400 text-sm leading-relaxed pb-6"
                    >
                      <ul className="list-disc list-inside space-y-2">
                        <li>100% Premium Heavyweight Cotton / Silk Blend</li>
                        <li>Dry clean only to maintain the structural integrity</li>
                        <li>Store folded in a cool, dark place</li>
                        <li>Do not bleach or tumble dry</li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
             
             <div className="border-b border-zinc-800/60">
                <button 
                   onClick={() => toggleSection('shipping')}
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none group/acc"
                >
                  <span className="font-serif text-lg text-zinc-300 tracking-wide group-hover/acc:text-white transition-colors">Shipping & Returns</span>
                   {expandedSection === 'shipping' ? <ChevronUp className="w-5 h-5 text-zinc-500 group-hover/acc:text-zinc-300 transition-colors" /> : <ChevronDown className="w-5 h-5 text-zinc-500 group-hover/acc:text-zinc-300 transition-colors" />}
                </button>
                 <AnimatePresence>
                  {expandedSection === 'shipping' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-zinc-400 text-sm leading-relaxed pb-6 space-y-4"
                    >
                      <p>Complimentary express shipping on all orders above $300. Standard delivery typically takes 2-4 business days.</p>
                      <p>We accept returns within 14 days of delivery. Items must be unworn with all original tags attached. A return shipping fee of $15 will be deducted from your refund.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </div>
      <ProductReviews />
    </div>
  );
};
