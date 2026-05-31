import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  Heart, 
  MapPin, 
  Settings, 
  CheckCircle2, 
  Truck, 
  Box, 
  Clock, 
  Home,
  Menu,
  X,
  LogOut,
  CreditCard,
  ChevronRight,
  Bell
} from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import { ProductCard } from '../components/common/ProductCard';

const STEPS = [
  { id: 1, label: 'Payment Confirmed', icon: CheckCircle2, status: 'completed', date: 'May 25, 10:00 AM' },
  { id: 2, label: 'Generating License', icon: Box, status: 'completed', date: 'May 25, 10:01 AM' },
  { id: 3, label: 'Code Delivered', icon: CheckCircle2, status: 'completed', date: 'May 25, 10:01 AM' },
];

export const CustomerPortal = () => {
  const [activeTab, setActiveTab] = useState('Order History & Tracking');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const TABS = [
    { id: 'Dashboard', icon: LayoutDashboard },
    { id: 'Orders', label: 'Order History & Tracking', icon: Package },
    { id: 'Wishlist', icon: Heart },
    { id: 'Address Book', icon: MapPin },
    { id: 'Settings', icon: Settings },
  ];

  const MOCK_WISHLIST = [
    {
      id: "w1",
      rawgId: 101,
      title: "Cyber Neon 2077",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
      rating: 4.8,
      released: "2024-10-12",
      genre: { name: "Action", slug: "action" }
    },
    {
      id: "w2",
      rawgId: 102,
      title: "Vampire's Requiem",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
      rating: 4.5,
      released: "2023-05-20",
      genre: { name: "RPG", slug: "rpg" }
    }
  ];

  const [wishlistItems, setWishlistItems] = useState<any[]>(MOCK_WISHLIST);

  const handleRemoveWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const { data } = useQuery(GET_PRODUCTS);
  const orderedProduct = data?.products?.[0] || null;

  const renderOrders = () => (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="font-pixel text-lg md:text-xl text-[var(--text-primary)] tracking-wider">
          ORDER DETAILS
        </h2>
      </div>

      {/* Detailed Order Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-none overflow-hidden hover:border-zinc-700 transition-colors duration-300">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-zinc-800/80 bg-zinc-900/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-12 text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 font-medium uppercase tracking-wider text-xs">Order ID</span>
              <span className="text-white font-mono text-base font-bold tracking-widest">#OMNI-98234</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 font-medium uppercase tracking-wider text-xs">Date Placed</span>
              <span className="text-zinc-300 font-medium">May 25, 2026</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 font-medium uppercase tracking-wider text-xs">Total Amount</span>
              {orderedProduct && <span className="text-white font-bold tracking-wider">${orderedProduct.price.toFixed(2)}</span>}
            </div>
          </div>
          <button className="bg-[var(--accent)] text-black font-bold uppercase tracking-wider text-xs px-8 py-3 hover:bg-[var(--accent-hover)] transition-colors duration-300">
            Download Invoice
          </button>
        </div>

        {/* Product Details & Activation Code Info */}
        <div className="p-6 md:p-8 flex flex-col xl:flex-row gap-8 xl:gap-12 relative bg-zinc-900/10">
          <div className="flex-1 flex flex-col sm:flex-row gap-6">
            {orderedProduct && (
              <Link to={`/product/${orderedProduct.id}`} className="w-24 sm:w-32 shrink-0 aspect-video bg-zinc-800 border border-zinc-800 block overflow-hidden group">
                <img src={orderedProduct.imageUrl} alt={orderedProduct.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </Link>
            )}
            <div className="flex flex-col justify-center gap-2">
              <Link to={`/product/${orderedProduct?.id}`} className="font-sans text-[var(--neon-pink)] text-lg font-bold leading-relaxed max-w-md hover:text-[var(--accent)] transition-colors">
                {orderedProduct?.name}
              </Link>
              <div className="flex flex-col gap-1.5 mt-2">
                <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Format: <span className="text-zinc-300 font-medium ml-2 tracking-normal capitalize">Digital License</span></span>
                <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Platform: <span className="text-zinc-300 font-medium ml-2 tracking-normal capitalize">PC / Steam</span></span>
                <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Status: <span className="text-emerald-400 font-medium ml-2 tracking-normal capitalize">Delivered</span></span>
              </div>
            </div>
          </div>
          
          <div className="w-full xl:w-96 bg-[#0A0A0A]/50 border border-[var(--border-primary)] p-6 flex flex-col gap-5 rounded-md">
             <h4 className="text-[var(--accent)] font-pixel text-xs tracking-wider border-b border-zinc-800/80 pb-3">ACTIVATION KEY</h4>
             <div className="flex flex-col gap-3.5 text-sm mt-1">
               <div className="bg-zinc-900 p-4 border border-zinc-800 rounded flex items-center justify-center cursor-pointer hover:border-[var(--accent)] transition-all group">
                 <span className="text-emerald-400 font-mono text-lg tracking-widest font-bold group-hover:text-emerald-300">
                   XXXX-XXXX-XXXX-XXXX
                 </span>
               </div>
               <p className="text-zinc-500 text-xs text-center">Click to reveal your product code</p>
             </div>
             <button className="mt-2 text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] hover:text-[var(--accent)] bg-[var(--bg-tertiary)] py-3 rounded transition-colors flex items-center justify-center gap-2">
               Redeem on Steam
             </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-[var(--border-primary)] pb-4 mb-4">
        <h2 className="font-pixel text-lg md:text-xl text-[var(--text-primary)] tracking-wider">
          YOUR WISHLIST
        </h2>
        <span className="text-[var(--text-muted)] font-medium tracking-wide text-xs uppercase">{wishlistItems.length} GAMES SAVED</span>
      </div>
      
      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg p-12 text-center relative overflow-hidden" style={{ boxShadow: '4px 4px 0 0 var(--card-shadow)' }}>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.02)_2px,rgba(0,0,0,0.02)_4px)] pointer-events-none opacity-50" />
          
          <div className="w-24 h-24 flex items-center justify-center bg-[var(--bg-tertiary)] border-2 border-[var(--border-primary)] rounded-full mb-6 relative z-10" style={{ boxShadow: '0 0 15px rgba(98, 114, 164, 0.2)' }}>
            <span className="text-5xl opacity-80 grayscale">💔</span>
          </div>
          <p className="text-[var(--text-secondary)] font-sans text-base mb-8 relative z-10 font-medium">
            Your wishlist is empty, Player 1. Go explore the catalog.
          </p>
          <Link 
            to="/shop" 
            className="relative z-10 bg-[var(--accent)] text-black font-pixel text-xs tracking-widest px-8 py-4 rounded hover:bg-[var(--neon-pink)] hover:-translate-y-1 transition-all duration-300"
            style={{ boxShadow: '4px 4px 0 0 rgba(0,0,0,0.5)' }}
          >
            BROWSE GAMES
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-12">
          {wishlistItems.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onRemove={handleRemoveWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-[var(--bg-primary)] flex flex-col font-sans w-full max-w-[100vw] overflow-x-hidden min-h-[80vh]">
      
      {/* Mobile Sidebar Toggle Header */}
      <div className="md:hidden flex items-center justify-between p-6 border-b border-[var(--border-primary)] bg-[var(--bg-primary)] sticky top-0 z-30">
        <h2 className="font-pixel text-sm font-bold text-[var(--accent)] tracking-wider">PLAYER DASHBOARD</h2>
        <button className="text-zinc-400 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="max-w-7xl mx-auto w-full px-0 md:px-6 py-0 md:py-16 flex flex-col md:flex-row items-start gap-12 relative flex-1">
        
        {/* Sidebar Overlay (Mobile) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

        {/* Sidebar Navigation */}
        <aside className={`
          fixed md:sticky top-0 md:top-24 left-0 z-50 md:z-auto w-72 md:w-64 h-screen md:h-auto bg-[var(--bg-card)] md:bg-transparent px-6 py-12 md:p-0 border-r border-[var(--border-primary)] md:border-none
          transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col gap-2 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="mb-8 md:hidden">
            <h2 className="font-pixel text-sm font-bold text-[var(--accent)] tracking-wider">PLAYER DASHBOARD</h2>
          </div>
          
          <div className="flex flex-col gap-1 w-full">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === (tab.label || tab.id);
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.label || tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-4 px-5 py-4 font-medium transition-all duration-300 w-full text-left rounded-r-lg md:rounded-lg
                    ${isActive 
                      ? 'bg-[var(--accent-subtle)] border-l-4 border-[var(--accent)] text-[var(--accent)] shadow-[4px_4px_0_0_var(--card-shadow)]' 
                      : 'border-l-4 border-transparent text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:border-[var(--border-primary)] hover:text-[var(--neon-pink)]'}
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] group-hover:text-[var(--neon-pink)]'}`} />
                  <span className="text-xs uppercase tracking-widest font-bold">{tab.id}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-auto md:mt-12 w-full">
             <button className="flex items-center gap-4 px-5 py-4 w-full text-left text-[var(--text-muted)] hover:text-[var(--danger)] hover:bg-[var(--bg-card)] rounded-lg transition-colors uppercase tracking-widest text-xs font-bold group">
               <LogOut className="w-5 h-5 group-hover:text-[var(--danger)]" />
               Sign Out
             </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 w-full px-6 py-10 md:p-0 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full"
            >
              {activeTab === 'Order History & Tracking' && renderOrders()}
              {activeTab === 'Wishlist' && renderWishlist()}
              {activeTab !== 'Order History & Tracking' && activeTab !== 'Wishlist' && (
                <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] p-12 text-center flex flex-col items-center justify-center min-h-[400px] rounded-lg relative overflow-hidden" style={{ boxShadow: '4px 4px 0 0 var(--card-shadow)' }}>
                  {/* Subtle scanline overlay */}
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.02)_2px,rgba(0,0,0,0.02)_4px)] pointer-events-none opacity-50" />
                  
                  {/* Pixel art placeholder avatar */}
                  <div className="w-20 h-20 mb-8 bg-[var(--bg-tertiary)] border-2 border-[var(--accent)] flex items-center justify-center rounded-md relative z-10" style={{ boxShadow: '0 0 20px rgba(189, 147, 249, 0.2)' }}>
                    <span className="text-5xl opacity-90 animate-pulse">👾</span>
                  </div>
                  
                  <h3 className="font-pixel text-lg md:text-xl text-[var(--accent)] mb-4 tracking-wider uppercase relative z-10">
                    WELCOME BACK, PLAYER 1.
                  </h3>
                  <p className="text-[var(--text-secondary)] max-w-md text-sm leading-relaxed relative z-10 font-medium">
                    Your inventory, order history, and game saves are currently syncing to the cloud...
                  </p>
                  
                  <div className="mt-8 flex gap-3 relative z-10">
                    <div className="w-2.5 h-2.5 bg-[var(--accent)] rounded-full animate-bounce" />
                    <div className="w-2.5 h-2.5 bg-[var(--neon-pink)] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <div className="w-2.5 h-2.5 bg-[var(--neon-yellow)] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
};
