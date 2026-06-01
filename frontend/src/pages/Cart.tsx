import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag className="w-10 h-10 text-zinc-500" />
        </div>
        <h2 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-zinc-400 mb-8 text-lg max-w-md">
          Looks like you haven't added any items to your cart yet. Discover our latest collection.
        </p>
        <Link 
          to="/shop"
          className="px-8 py-4 bg-white text-black font-semibold tracking-wide uppercase text-sm hover:bg-zinc-200 transition-colors duration-300"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-12 flex-1">
      <h1 className="font-serif text-4xl font-bold mb-12">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {cart.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              className="flex gap-6 p-4 bg-zinc-900 border border-zinc-800/50"
            >
              <div className="w-24 h-32 shrink-0 bg-zinc-800 relative">
                <img 
                  src={item.image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex flex-col flex-grow py-2">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-serif text-lg font-medium leading-snug text-balance">
                    {item.title}
                  </h3>
                  <span className="font-medium tracking-wider shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                
                <span className="text-zinc-500 text-sm mt-1">{item.category}</span>
                
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center border border-zinc-700 bg-zinc-950">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-zinc-400 hover:text-gamehub-text transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-zinc-400 hover:text-gamehub-text transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-zinc-500 hover:text-red-400 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 border border-zinc-800/50 p-8 sticky top-28">
            <h3 className="font-serif text-2xl font-bold mb-6">Order Summary</h3>
            
            <div className="flex flex-col gap-4 text-sm mb-6 border-b border-zinc-800 pb-6">
              <div className="flex justify-between">
                <span className="text-zinc-400">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mb-8">
              <span className="font-serif text-xl">Total</span>
              <span className="text-2xl font-bold tracking-wider">${cartTotal.toFixed(2)}</span>
            </div>
            
            <Link to="/checkout" className="w-full block">
              <button className="w-full py-4 bg-white text-black font-semibold tracking-wide uppercase text-sm hover:bg-zinc-200 transition-colors duration-300">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
