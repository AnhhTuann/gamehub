import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, ChevronLeft, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Checkout = () => {
  const { cart, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shipping = cartCount > 0 ? 15.00 : 0;
  const taxes = cartTotal * 0.08; // 8% dummy tax
  const orderTotal = cartTotal + shipping + taxes;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process payment and submit order
    alert("Order placed successfully! This is a prototype.");
    navigate('/');
  };

  if (cartCount === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-zinc-400 mb-8 text-lg max-w-md">
          You need items in your cart to proceed to checkout.
        </p>
        <Link 
          to="/shop"
          className="px-8 py-4 bg-white text-black font-semibold tracking-wide uppercase text-sm hover:bg-zinc-200 transition-colors duration-300"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-zinc-400 tracking-wide">{label}</label>
      <input 
        className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 px-4 py-3 rounded-none focus:ring-1 focus:ring-white focus:outline-none transition-shadow"
        {...props}
      />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-12 flex-1">
      <Link to="/cart" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 text-sm">
        <ChevronLeft className="w-4 h-4" />
        Return to Cart
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Forms */}
        <div className="lg:col-span-7 flex flex-col gap-12">
          <form id="checkout-form" onSubmit={handlePlaceOrder} className="flex flex-col gap-12">
            
            {/* Contact Information */}
            <section>
              <h2 className="font-serif text-2xl font-bold mb-6 text-white tracking-wide">Contact Information</h2>
              <div className="grid grid-cols-1 gap-6">
                <Input label="Email Address" type="email" required placeholder="sophia@example.com" />
              </div>
            </section>

            {/* Shipping Information */}
            <section>
              <h2 className="font-serif text-2xl font-bold mb-6 text-white tracking-wide">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="First Name" type="text" required placeholder="Sophia" />
                <Input label="Last Name" type="text" required placeholder="Chen" />
                <div className="md:col-span-2">
                  <Input label="Street Address" type="text" required placeholder="123 Luxury Ave, Suite 400" />
                </div>
                <Input label="City" type="text" required placeholder="New York" />
                <div className="grid grid-cols-2 gap-6">
                  <Input label="State" type="text" required placeholder="NY" />
                  <Input label="ZIP Code" type="text" required placeholder="10001" />
                </div>
              </div>
            </section>

            {/* Payment Information */}
            <section>
              <h2 className="font-serif text-2xl font-bold mb-6 text-white tracking-wide flex items-center justify-between">
                <span>Payment</span>
                <span className="flex items-center gap-2 text-xs font-sans text-zinc-500 font-normal bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                  <ShieldCheck className="w-3 h-3" />
                  Secure Encrypted
                </span>
              </h2>
              <div className="p-6 bg-zinc-900 border border-zinc-800 flex flex-col gap-6">
                <Input label="Card Number" type="text" required placeholder="0000 0000 0000 0000" maxLength={19} />
                <div className="grid grid-cols-2 gap-6">
                  <Input label="Expiration Date (MM/YY)" type="text" required placeholder="MM/YY" maxLength={5} />
                  <Input label="Security Code (CVC)" type="text" required placeholder="123" maxLength={4} />
                </div>
                <Input label="Name on Card" type="text" required placeholder="SOPHIA CHEN" />
              </div>
            </section>

          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-zinc-900/50 rounded-lg p-6 lg:p-8 border border-zinc-800/50 sticky top-28 backdrop-blur-md">
            <h2 className="font-serif text-2xl font-bold mb-8 text-white tracking-wide">Order Summary</h2>
            
            <div className="flex flex-col gap-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 shrink-0 aspect-square bg-zinc-800 relative rounded-sm overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-zinc-900 text-white">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center flex-grow">
                    <h3 className="text-zinc-200 text-sm font-medium leading-snug line-clamp-2 md:line-clamp-none text-balance">
                      {item.name}
                    </h3>
                  </div>
                  <div className="flex flex-col justify-center shrink-0">
                    <span className="text-white font-medium tracking-wide text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 text-sm text-zinc-400 border-t border-zinc-800/60 pt-6 mb-6">
              <div className="flex justify-between items-center bg-transparent">
                <span>Subtotal</span>
                <span className="text-zinc-200 font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span className="text-zinc-200 font-medium">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Estimated Taxes</span>
                <span className="text-zinc-200 font-medium">${taxes.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-zinc-800/60 pt-6 mb-8">
              <span className="font-serif text-xl text-white">Total</span>
              <span className="text-3xl font-bold text-white tracking-wider">${orderTotal.toFixed(2)}</span>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              className="w-full py-5 bg-white text-black font-bold tracking-widest uppercase text-sm hover:bg-zinc-200 transition-colors duration-300 flex items-center justify-center gap-2 rounded-sm"
            >
              Place Order
              <ShieldCheck className="w-4 h-4 ml-1" />
            </button>
            <p className="text-center text-xs text-zinc-500 mt-4 font-medium flex items-center justify-center gap-1">
              <CreditCard className="w-3 h-3" />
              Payments are safe and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
