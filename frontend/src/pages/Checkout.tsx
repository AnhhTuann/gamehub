import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ChevronLeft, CreditCard, Lock, DownloadCloud } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderSuccessModal } from '../components/shop/OrderSuccessModal';

export const Checkout = () => {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const shipping = 0; // Digital goods
  const taxes = 0; // Digital goods
  const orderTotal = cartTotal + shipping + taxes;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  if (cartCount === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center bg-[#282a36]">
        <span className="text-6xl mb-6 opacity-50 grayscale">🎮</span>
        <h2 className="font-pixel text-xl text-[#ff79c6] mb-4 tracking-wider">YOUR CART IS EMPTY</h2>
        <p className="text-[#f8f8f2] mb-8 max-w-md opacity-80 font-sans">
          You need items in your cart to proceed to checkout.
        </p>
        <Link 
          to="/shop"
          className="px-8 py-4 bg-[#bd93f9] text-black font-pixel text-xs rounded hover:bg-[#ff79c6] hover:-translate-y-1 transition-all"
          style={{ boxShadow: '4px 4px 0 0 rgba(0,0,0,0.5)' }}
        >
          RETURN TO STORE
        </Link>
      </div>
    );
  }

  const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs font-bold text-[#f8f8f2] uppercase tracking-widest">{label}</label>
      <input 
        className="w-full bg-[#282a36] border border-[#6272a4] text-[#f8f8f2] px-4 py-3 rounded-md focus:border-[#bd93f9] focus:ring-1 focus:ring-[#bd93f9] focus:outline-none transition-all font-sans"
        {...props}
      />
    </div>
  );

  return (
    <div className="bg-[#282a36] flex-1 min-h-screen font-sans pb-20">
      <div className="max-w-7xl mx-auto w-full px-6 py-8">
        
        <Link to="/cart" className="inline-flex items-center gap-2 text-[#6272a4] hover:text-[#ff79c6] transition-colors mb-8 text-sm font-bold uppercase tracking-widest">
          <ChevronLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="font-pixel text-2xl md:text-3xl text-[#bd93f9] tracking-wider mb-4">SECURE CHECKOUT</h1>
          <div className="h-1 w-24 bg-[#ff79c6] rounded" style={{ boxShadow: '0 0 10px rgba(255,121,198,0.5)' }}></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="flex flex-col gap-8">
              
              <section className="bg-[#44475a]/30 border border-[#6272a4]/30 rounded-lg p-6">
                <h2 className="font-pixel text-sm text-[#f8f8f2] mb-6 flex items-center gap-3">
                  <span className="text-[#ff79c6]">1.</span> PLAYER DETAILS
                </h2>
                <div className="flex flex-col gap-5">
                  <Input label="Email Address" type="email" required placeholder="player1@example.com" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="First Name" type="text" required placeholder="Cloud" />
                    <Input label="Last Name" type="text" required placeholder="Strife" />
                  </div>
                </div>
              </section>

              <section className="bg-[#44475a]/30 border border-[#6272a4]/30 rounded-lg p-6">
                <h2 className="font-pixel text-sm text-[#f8f8f2] mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[#ff79c6]">2.</span> PAYMENT METHOD
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-sans text-[#50fa7b] font-bold bg-[#50fa7b]/10 px-3 py-1.5 rounded border border-[#50fa7b]/30 uppercase tracking-widest">
                    <Lock className="w-3 h-3" />
                    Encrypted
                  </span>
                </h2>
                <div className="flex flex-col gap-5">
                  <Input label="Card Number" type="text" required placeholder="0000 0000 0000 0000" maxLength={19} />
                  <div className="grid grid-cols-2 gap-5">
                    <Input label="Expiry (MM/YY)" type="text" required placeholder="MM/YY" maxLength={5} />
                    <Input label="CVC" type="text" required placeholder="123" maxLength={4} />
                  </div>
                  <Input label="Name on Card" type="text" required placeholder="CLOUD STRIFE" />
                </div>
              </section>

            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-[#44475a]/50 rounded-lg p-6 lg:p-8 border-2 border-[#bd93f9] sticky top-24 shadow-[0_0_15px_rgba(189,147,249,0.15)]">
              <h2 className="font-pixel text-base text-[#f8f8f2] mb-6 tracking-wider">ORDER SUMMARY</h2>
              
              <div className="flex flex-col gap-5 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-20 shrink-0 bg-[#282a36] relative rounded border border-[#6272a4] overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute top-0 right-0 w-5 h-5 bg-[#bd93f9] flex items-center justify-center text-[10px] font-bold text-black border-b border-l border-[#282a36]">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex flex-col flex-grow min-w-0">
                      <h3 className="text-[#f8f8f2] text-sm font-bold line-clamp-2 leading-snug">{item.title}</h3>
                      <span className="text-[#ff79c6] text-[10px] font-bold tracking-widest uppercase mt-1">PC / STEAM</span>
                    </div>
                    <div className="flex items-center shrink-0">
                      <span className="text-[#50fa7b] font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 text-sm font-bold border-t border-[#6272a4]/50 pt-5 mb-5 text-[#f8f8f2]">
                <div className="flex justify-between">
                  <span className="text-[#6272a4] uppercase tracking-wider">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6272a4] uppercase tracking-wider flex items-center gap-2">
                    <DownloadCloud className="w-4 h-4" /> Digital Delivery
                  </span>
                  <span className="text-[#50fa7b]">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6272a4] uppercase tracking-wider">Tax (Digital)</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-[#6272a4]/50 pt-5 mb-8">
                <span className="font-pixel text-lg text-[#f8f8f2]">TOTAL</span>
                <span className="text-3xl font-bold text-[#50fa7b]">${orderTotal.toFixed(2)}</span>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                className="w-full py-4 bg-[#bd93f9] text-black font-bold tracking-widest uppercase text-base rounded hover:-translate-y-1 hover:bg-[#ff79c6] transition-all flex items-center justify-center gap-3"
                style={{ boxShadow: '0 5px 15px rgba(189,147,249,0.3)' }}
              >
                INSERT COIN TO BUY
                <ShieldCheck className="w-5 h-5" />
              </button>
              
              <p className="text-center text-[10px] text-[#6272a4] mt-4 flex items-center justify-center gap-1.5 uppercase tracking-widest font-bold">
                <CreditCard className="w-3.5 h-3.5" />
                256-bit Secure Encryption
              </p>
            </div>
          </div>

        </div>
      </div>
      
      <OrderSuccessModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          if (clearCart) clearCart();
        }} 
        orderTotal={orderTotal} 
      />
    </div>
  );
};
