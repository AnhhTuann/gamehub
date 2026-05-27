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
  { id: 1, label: 'Order Placed', icon: CheckCircle2, status: 'completed', date: 'May 25, 10:00 AM' },
  { id: 2, label: 'Processing', icon: Box, status: 'completed', date: 'May 26, 09:15 AM' },
  { id: 3, label: 'In Transit', icon: Truck, status: 'active', date: 'May 27, 08:30 AM' },
  { id: 4, label: 'Out for Delivery', icon: Truck, status: 'pending', date: 'Pending' },
  { id: 5, label: 'Delivered', icon: Home, status: 'pending', date: 'Pending' },
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

  const { data } = useQuery(GET_PRODUCTS);
  const wishlistProducts = (data?.products || []).slice(3, 6);
  const orderedProduct = data?.products?.[0] || null;

  const renderOrders = () => (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-wide">
          Order Tracking
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
          <button className="bg-white text-black font-bold uppercase tracking-wider text-xs px-8 py-3 hover:bg-zinc-200 transition-colors duration-300">
            Track Package
          </button>
        </div>

        {/* Shipping Timeline */}
        <div className="p-8 md:p-12 border-b border-zinc-800/80 overflow-x-auto custom-scrollbar bg-[#0A0A0A]/30">
          <div className="min-w-[600px] w-full flex items-start relative px-4 mx-auto max-w-4xl">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex-1 flex flex-col items-center relative group">
                 {/* Connection Line */}
                 {index !== STEPS.length - 1 && (
                   <div className={`absolute top-5 left-[50%] w-full h-[2px] ${step.status === 'completed' ? 'bg-white' : 'bg-zinc-800'}`} />
                 )}
                 
                 {/* Icon Node */}
                 <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    step.status === 'completed' ? 'bg-white border-white text-black' :
                    step.status === 'active' ? 'bg-[#0A0A0A] border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' :
                    'bg-[#0A0A0A] border-zinc-800 text-zinc-700'
                 }`}>
                   <step.icon className={`w-4 h-4 ${step.status === 'active' ? 'animate-pulse text-white' : ''} ${step.status === 'pending' ? 'text-zinc-600' : ''}`} />
                 </div>
                 
                 {/* Label & Date */}
                 <div className="mt-5 flex flex-col items-center text-center">
                   <span className={`text-[11px] font-bold tracking-widest uppercase mb-1.5 ${
                     step.status === 'completed' || step.status === 'active' ? 'text-white' : 'text-zinc-500'
                   }`}>
                     {step.label}
                   </span>
                   <span className="text-[10px] text-zinc-500 font-medium tracking-widest font-mono">
                     {step.date}
                   </span>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details & Shipping Info */}
        <div className="p-6 md:p-8 flex flex-col xl:flex-row gap-8 xl:gap-12 relative bg-zinc-900/10">
          <div className="flex-1 flex flex-col sm:flex-row gap-6">
            {orderedProduct && (
              <Link to={`/product/${orderedProduct.id}`} className="w-24 sm:w-32 shrink-0 aspect-square bg-zinc-800 border border-zinc-800 block overflow-hidden group">
                <img src={orderedProduct.imageUrl} alt={orderedProduct.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </Link>
            )}
            <div className="flex flex-col justify-center gap-2">
              <Link to={`/product/${orderedProduct?.id}`} className="font-sans text-white text-lg font-medium leading-relaxed max-w-md hover:text-zinc-300 transition-colors">
                {orderedProduct?.name}
              </Link>
              <div className="flex flex-col gap-1.5 mt-2">
                <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Size: <span className="text-zinc-300 font-medium ml-2 tracking-normal capitalize">Medium</span></span>
                <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Color: <span className="text-zinc-300 font-medium ml-2 tracking-normal capitalize">Midnight Black</span></span>
                <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Qty: <span className="text-zinc-300 font-medium ml-2 tracking-normal capitalize">1</span></span>
              </div>
            </div>
          </div>
          
          <div className="w-full xl:w-80 bg-[#0A0A0A]/50 border border-zinc-800 p-6 flex flex-col gap-5">
             <h4 className="text-white font-serif text-lg tracking-wide border-b border-zinc-800/80 pb-3">Shipping Details</h4>
             <div className="flex flex-col gap-3.5 text-sm mt-1">
               <div className="flex justify-between items-center">
                 <span className="text-zinc-500 font-medium text-xs uppercase tracking-wider">Est. Delivery</span>
                 <span className="text-white font-semibold tracking-wide text-xs uppercase">Tomorrow by 8 PM</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-zinc-500 font-medium text-xs uppercase tracking-wider">Carrier</span>
                 <span className="text-zinc-300 font-medium text-sm">FedEx Priority</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-zinc-500 font-medium text-xs uppercase tracking-wider">Tracking No.</span>
                 <span className="text-emerald-400 font-mono text-sm tracking-widest font-semibold">FX-8392193240</span>
               </div>
             </div>
             <button className="mt-4 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors border-t border-zinc-800 pt-4 flex items-center justify-center gap-2">
               View Full Details
             </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-wide">
          Your Wishlist
        </h2>
        <span className="text-zinc-400 font-medium tracking-wide border border-zinc-800 px-4 py-2 text-xs uppercase">{wishlistProducts.length} Items Saved</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-12">
        {wishlistProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-[#0A0A0A] flex flex-col font-sans w-full max-w-[100vw] overflow-x-hidden min-h-[80vh]">
      
      {/* Mobile Sidebar Toggle Header */}
      <div className="md:hidden flex items-center justify-between p-6 border-b border-zinc-800 bg-[#0A0A0A] sticky top-0 z-30">
        <h2 className="font-serif text-xl font-bold text-white tracking-wide">My Account</h2>
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
          fixed md:sticky top-0 md:top-28 left-0 z-50 md:z-auto w-72 md:w-64 h-screen md:h-auto bg-zinc-950 px-6 py-12 md:p-0 md:bg-transparent border-r border-zinc-800 md:border-none
          transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col gap-2 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="mb-8 md:hidden">
            <h2 className="font-serif text-2xl font-bold text-white tracking-wide">My Account</h2>
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
                  className={`flex items-center gap-4 px-5 py-4 font-medium transition-all duration-300 w-full text-left
                    ${isActive 
                      ? 'bg-zinc-900/80 border-l-2 border-white text-white shadow-sm' 
                      : 'border-l-2 border-transparent text-zinc-500 hover:bg-zinc-900/40 hover:text-white'}
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-zinc-600'}`} />
                  <span className="text-xs uppercase tracking-widest font-semibold">{tab.id}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-auto md:mt-12 w-full">
             <button className="flex items-center gap-4 px-5 py-4 w-full text-left text-zinc-500 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold group">
               <X className="w-5 h-5 group-hover:text-white" />
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
                <div className="bg-zinc-900/30 border border-zinc-800/50 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                  <LayoutDashboard className="w-12 h-12 text-zinc-700 mb-6" />
                  <h3 className="font-serif text-3xl font-bold text-white mb-2 tracking-wide">{activeTab}</h3>
                  <p className="text-zinc-500 max-w-sm mt-2 text-sm leading-relaxed">This section is currently being updated to bring you a more personalized luxury experience.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
};
