import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ChevronLeft, CreditCard, Lock, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Checkout = () => {
  const { cart, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const shipping = cartCount > 0 ? 15.00 : 0;
  const taxes = cartTotal * 0.08;
  const orderTotal = cartTotal + shipping + taxes;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order placed successfully! This is a prototype.");
    navigate('/');
  };

  if (cartCount === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-theme-primary mb-4">Your cart is empty</h2>
        <p className="text-theme-muted mb-8 max-w-md">
          You need items in your cart to proceed to checkout.
        </p>
        <Link 
          to="/shop"
          className="px-8 py-4 bg-accent text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-semibold text-theme-muted uppercase tracking-wider">{label}</label>
      <input 
        className="w-full bg-theme-secondary border border-theme-primary text-theme-primary px-4 py-3 rounded-xl focus:ring-2 ring-accent/30 focus:outline-none transition-all text-sm"
        {...props}
      />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-8 flex-1">
      <Link to="/cart" className="inline-flex items-center gap-2 text-theme-muted hover:text-accent transition-colors mb-8 text-sm font-medium">
        <ChevronLeft className="w-4 h-4" />
        Return to Cart
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Forms */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          <form id="checkout-form" onSubmit={handlePlaceOrder} className="flex flex-col gap-10">
            
            <section>
              <h2 className="font-serif text-xl font-bold mb-5 text-theme-primary">Contact</h2>
              <Input label="Email Address" type="email" required placeholder="sophia@example.com" />
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold mb-5 text-theme-primary">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="First Name" type="text" required placeholder="Sophia" />
                <Input label="Last Name" type="text" required placeholder="Chen" />
                <div className="md:col-span-2">
                  <Input label="Street Address" type="text" required placeholder="123 Fashion Ave, Suite 400" />
                </div>
                <Input label="City" type="text" required placeholder="New York" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="State" type="text" required placeholder="NY" />
                  <Input label="ZIP Code" type="text" required placeholder="10001" />
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold mb-5 text-theme-primary flex items-center justify-between">
                <span>Payment</span>
                <span className="flex items-center gap-1.5 text-[10px] font-sans text-theme-muted font-semibold bg-theme-secondary px-3 py-1.5 rounded-full border border-theme-primary uppercase tracking-wider">
                  <Lock className="w-3 h-3" />
                  Encrypted
                </span>
              </h2>
              <div className="p-6 bg-theme-secondary border border-theme-primary rounded-2xl flex flex-col gap-4">
                <Input label="Card Number" type="text" required placeholder="0000 0000 0000 0000" maxLength={19} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Expiry (MM/YY)" type="text" required placeholder="MM/YY" maxLength={5} />
                  <Input label="CVC" type="text" required placeholder="123" maxLength={4} />
                </div>
                <Input label="Name on Card" type="text" required placeholder="SOPHIA CHEN" />
              </div>
            </section>

          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-theme-secondary rounded-2xl p-6 lg:p-8 border border-theme-primary sticky top-24">
            <h2 className="font-serif text-xl font-bold mb-6 text-theme-primary">Order Summary</h2>
            
            <div className="flex flex-col gap-4 mb-6 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 shrink-0 aspect-square bg-theme-tertiary relative rounded-xl overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-[9px] font-bold text-white">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center flex-grow min-w-0">
                    <h3 className="text-theme-primary text-sm font-medium line-clamp-1">{item.title}</h3>
                    <span className="text-theme-muted text-xs">{item.category}</span>
                  </div>
                  <div className="flex items-center shrink-0">
                    <span className="text-theme-primary font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 text-sm border-t border-theme-primary pt-4 mb-4">
              <div className="flex justify-between">
                <span className="text-theme-muted">Subtotal</span>
                <span className="text-theme-primary font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-theme-muted flex items-center gap-1"><Truck className="w-3 h-3" /> Shipping</span>
                <span className="text-theme-primary font-medium">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-theme-muted">Tax</span>
                <span className="text-theme-primary font-medium">${taxes.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-theme-primary pt-4 mb-6">
              <span className="font-serif text-lg text-theme-primary">Total</span>
              <span className="text-2xl font-bold text-accent">${orderTotal.toFixed(2)}</span>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              className="w-full py-4 bg-accent text-white font-bold tracking-wider uppercase text-sm rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Place Order
              <ShieldCheck className="w-4 h-4" />
            </button>
            <p className="text-center text-[10px] text-theme-muted mt-3 flex items-center justify-center gap-1 uppercase tracking-wider">
              <CreditCard className="w-3 h-3" />
              Secure payment processing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
