import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronDown, ChevronUp, ShoppingBag, Heart, Truck, RotateCcw, Shield, Star } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT } from '../graphql/queries';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ProductReviews } from '../components/common/ProductReviews';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const COLORS = [
  { name: 'Jet Black', hex: '#1a1a1a' },
  { name: 'Stone Grey', hex: '#6b7280' },
  { name: 'Navy', hex: '#1e3a5f' },
  { name: 'Burgundy', hex: '#7f1d1d' },
];

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id },
    skip: !id,
  });
  
  const product: Product | undefined = data?.product;
  
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(COLORS[0].hex);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-theme-secondary" />
          <div className="h-4 w-32 rounded bg-theme-secondary" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl text-theme-muted">Product not found</h2>
        <Link to="/shop" className="text-accent font-semibold text-sm hover:underline">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => addToCart(product);

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8 flex-1">
      {/* Breadcrumb */}
      <div className="text-sm text-theme-muted mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-accent transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/shop" className="hover:text-accent transition-colors">Shop</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-theme-secondary">{product.category}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Left — Image */}
        <div className="relative aspect-[3/4] w-full bg-theme-secondary overflow-hidden rounded-3xl">
          <img 
            src={product.image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'} 
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <button className="absolute top-4 right-4 w-11 h-11 bg-theme-elevated backdrop-blur-sm rounded-full flex items-center justify-center text-theme-muted hover:text-red-500 transition-colors border border-theme-primary">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Right — Details */}
        <div className="flex flex-col py-2">
          <span className="text-accent text-xs font-bold uppercase tracking-widest mb-3">{product.category || 'Fashion'}</span>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold leading-tight text-theme-primary mb-4">
            {product.title}
          </h1>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className={`w-4 h-4 ${i <= 4 ? 'text-amber-400 fill-amber-400' : 'text-theme-muted'}`} />
              ))}
            </div>
            <span className="text-theme-muted text-sm">(128 reviews)</span>
          </div>

          <p className="text-2xl font-bold text-accent mb-6">
            ${product.price.toFixed(2)}
          </p>
          
          <p className="text-theme-secondary leading-relaxed mb-8 text-sm">
            {product.description || "Crafted from premium materials for a refined look and exceptional comfort. This piece seamlessly transitions from day to night, making it an essential addition to your wardrobe."}
          </p>

          {/* Color */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-theme-muted uppercase tracking-widest mb-3">Color</h3>
            <div className="flex gap-3">
              {COLORS.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.hex)}
                  className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${selectedColor === color.hex ? 'border-accent scale-110 shadow-accent-glow' : 'border-theme-primary hover:border-theme-secondary'}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold text-theme-muted uppercase tracking-widest">Size</h3>
              <button className="text-xs text-accent hover:underline font-medium">Size Guide</button>
            </div>
            <div className="flex gap-2">
              {SIZES.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                    selectedSize === size 
                      ? 'bg-accent text-white border-accent shadow-accent-glow' 
                      : 'bg-transparent text-theme-secondary border-theme-primary hover:border-accent hover:text-accent'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3 mb-8">
            <button 
              onClick={handleAddToCart}
              className="flex-1 py-4 bg-accent text-white font-bold tracking-wider uppercase flex items-center justify-center gap-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </button>
            <button className="w-14 h-14 border border-theme-primary rounded-xl flex items-center justify-center text-theme-muted hover:text-red-500 hover:border-red-500 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { icon: <Truck className="w-4 h-4" />, label: 'Free Shipping' },
              { icon: <RotateCcw className="w-4 h-4" />, label: '30-Day Returns' },
              { icon: <Shield className="w-4 h-4" />, label: 'Secure Checkout' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-theme-secondary text-center">
                <span className="text-accent">{item.icon}</span>
                <span className="text-[10px] text-theme-muted font-semibold uppercase tracking-wider">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Accordions */}
          <div className="border-t border-theme-primary">
            {[
              { id: 'material', title: 'Material & Care', content: (
                <ul className="list-disc list-inside space-y-2 text-theme-secondary text-sm">
                  <li>100% Premium Cotton / Silk Blend</li>
                  <li>Dry clean recommended</li>
                  <li>Store folded in a cool, dry place</li>
                  <li>Do not bleach or tumble dry</li>
                </ul>
              )},
              { id: 'shipping', title: 'Shipping & Returns', content: (
                <div className="text-theme-secondary text-sm space-y-3">
                  <p>Free express shipping on orders over $150. Standard delivery in 2-4 business days.</p>
                  <p>We accept returns within 30 days. Items must be unworn with tags attached.</p>
                </div>
              )},
            ].map(section => (
              <div key={section.id} className="border-b border-theme-primary">
                <button 
                  onClick={() => toggleSection(section.id)}
                  className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="font-semibold text-sm text-theme-primary group-hover:text-accent transition-colors">{section.title}</span>
                  {expandedSection === section.id 
                    ? <ChevronUp className="w-4 h-4 text-theme-muted" /> 
                    : <ChevronDown className="w-4 h-4 text-theme-muted" />
                  }
                </button>
                <AnimatePresence>
                  {expandedSection === section.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pb-5"
                    >
                      {section.content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProductReviews />
    </div>
  );
};
