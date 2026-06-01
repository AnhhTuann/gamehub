import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ChevronLeft, CreditCard, Lock, DownloadCloud } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { OrderSuccessModal } from '../components/shop/OrderSuccessModal';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../graphql/mutations';

export const Checkout = () => {
  const cart = useCartStore((state) => state.cart);
  const cartTotal = useCartStore((state) => state.cartTotal)();
  const clearCart = useCartStore((state) => state.clearCart);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const shipping = 0; // Digital goods
  const taxes = 0; // Digital goods
  const orderTotal = cartTotal + shipping + taxes;

  const [createOrder] = useMutation(CREATE_ORDER);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Map cart to expected OrderItemInput
      const orderItems = cart.map(item => ({
        rawgId: (item as any).rawgId || parseInt(item.id) || 0,
        title: item.title,
        price: item.price,
        image: item.coverImage || item.image,
        quantity: 1 // cart items usually don't have quantity in this UI, defaulting to 1 or you can add quantity to cart
      }));

      // Assuming we get the name from the form (we can just mock it for now from the form if we want)
      const form = e.target as HTMLFormElement;
      const firstName = (form.elements.namedItem('firstName') as HTMLInputElement).value;
      const lastName = (form.elements.namedItem('lastName') as HTMLInputElement).value;
      const customerName = `${firstName} ${lastName}`;
      const customerPhone = '000000000'; // mocked since form doesn't have it

      await createOrder({
        variables: {
          customerName,
          customerPhone,
          items: orderItems
        }
      });

      setIsProcessing(false);
      setIsSuccessModalOpen(true);
      clearCart();
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
      alert(error.message || "Failed to place order");
    }
  };

  if (cart.length === 0 && !isSuccessModalOpen) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center bg-gamehub-bg min-h-screen">
        <svg viewBox="0 0 11 8" className="w-16 h-16 text-gamehub-purple animate-bounce fill-current mb-6 drop-shadow-lg">
          <path d="M3 0h1v1H3zm5 0h1v1H8zM4 1h3v1H4zm-2 1h7v1H2zm-2 1h11v1H0zm0 1h2v1H0zm3 0h5v1H3zm6 0h2v1H9zm-9 1h1v1H0zm2 0h1v1H2zm5 0h1v1H7zm3 0h1v1H10zm2 1h2v1H2zm5 0h2v1H7z" />
        </svg>
        <h2 className="font-pixel text-xl text-gamehub-purple mb-4 tracking-wider uppercase">YOUR INVENTORY IS EMPTY</h2>
        <p className="text-gamehub-muted mb-8 max-w-md font-sans text-sm font-medium">
          YOUR INVENTORY IS EMPTY. HEAD BACK TO THE CATALOG TO GEAR UP.
        </p>
        <Link 
          to="/"
          className="px-8 py-4 bg-gamehub-purple text-white font-pixel text-xs rounded hover:opacity-80 hover:-translate-y-1 transition-all duration-200 shadow-md"
        >
          RETURN TO HOME
        </Link>
      </div>
    );
  }

  const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs font-bold text-gamehub-text uppercase tracking-widest">{label}</label>
      <input 
        className="w-full bg-gamehub-bg border border-gamehub-border text-gamehub-text px-4 py-3 rounded-md focus:border-gamehub-purple focus:ring-1 focus:ring-gamehub-purple focus:outline-none transition-all font-sans"
        {...props}
      />
    </div>
  );

  return (
    <div className="bg-gamehub-bg flex-1 min-h-screen font-sans pb-20">
      <div className="max-w-7xl mx-auto w-full px-6 py-8">
        
        <Link to="/shop" className="inline-flex items-center gap-2 text-gamehub-muted hover:text-gamehub-purple transition-colors mb-8 text-sm font-bold uppercase tracking-widest">
          <ChevronLeft className="w-4 h-4" />
          Back to Catalog
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="font-pixel text-2xl md:text-3xl text-gamehub-purple tracking-wider mb-4">SECURE CHECKOUT</h1>
          <div className="h-1 w-24 bg-gamehub-purple rounded shadow-sm"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="flex flex-col gap-8">
              
              <section className="bg-gamehub-surface border border-gamehub-border rounded-lg p-6">
                <h2 className="font-pixel text-sm text-gamehub-text mb-6 flex items-center gap-3">
                  <span className="text-gamehub-purple">1.</span> PLAYER DETAILS
                </h2>
                <div className="flex flex-col gap-5">
                  <Input label="Email Address" type="email" required placeholder="player1@example.com" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input name="firstName" label="First Name" type="text" required placeholder="Cloud" />
                    <Input name="lastName" label="Last Name" type="text" required placeholder="Strife" />
                  </div>
                </div>
              </section>

              <section className="bg-gamehub-surface border border-gamehub-border rounded-lg p-6">
                <h2 className="font-pixel text-sm text-gamehub-text mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-gamehub-purple">2.</span> PAYMENT METHOD
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-sans text-gamehub-green font-bold bg-gamehub-green/10 px-3 py-1.5 rounded border border-gamehub-green/30 uppercase tracking-widest">
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
            <div className="bg-gamehub-surface rounded-lg p-6 lg:p-8 border-2 border-gamehub-purple sticky top-24 shadow-md">
              <h2 className="font-pixel text-base text-gamehub-text mb-6 tracking-wider">ORDER SUMMARY</h2>
              
              <div className="flex flex-col gap-5 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-20 shrink-0 bg-gamehub-bg relative rounded border border-gamehub-border overflow-hidden">
                      <img src={item.coverImage || item.image || 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80'} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute top-0 right-0 w-5 h-5 bg-gamehub-purple flex items-center justify-center text-[10px] font-bold text-white border-b border-l border-gamehub-border">
                        1
                      </div>
                    </div>
                    <div className="flex flex-col flex-grow min-w-0">
                      <h3 className="text-gamehub-text text-sm font-bold line-clamp-2 leading-snug">{item.title}</h3>
                      <span className="text-gamehub-purple text-[10px] font-bold tracking-widest uppercase mt-1">PC / STEAM</span>
                    </div>
                    <div className="flex items-center shrink-0">
                      <span className="text-gamehub-green font-bold text-sm">${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 text-sm font-bold border-t border-gamehub-border pt-5 mb-5 text-gamehub-text">
                <div className="flex justify-between">
                  <span className="text-gamehub-muted uppercase tracking-wider">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gamehub-muted uppercase tracking-wider flex items-center gap-2">
                    <DownloadCloud className="w-4 h-4" /> Digital Delivery
                  </span>
                  <span className="text-gamehub-green">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gamehub-muted uppercase tracking-wider">Tax (Digital)</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-gamehub-border pt-5 mb-8">
                <span className="font-pixel text-lg text-gamehub-text">TOTAL</span>
                <span className="text-3xl font-bold text-gamehub-green">${orderTotal.toFixed(2)}</span>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                disabled={isProcessing}
                className="w-full py-4 bg-gamehub-purple text-white font-bold tracking-widest uppercase text-base rounded hover:-translate-y-1 hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer shadow-md"
              >
                {isProcessing ? 'PROCESSING...' : 'INSERT COIN TO BUY'}
                <ShieldCheck className="w-5 h-5" />
              </button>
              
              <p className="text-center text-[10px] text-gamehub-muted mt-4 flex items-center justify-center gap-1.5 uppercase tracking-widest font-bold">
                <CreditCard className="w-3.5 h-3.5" />
                256-bit Secure Encryption
              </p>
            </div>
          </div>

        </div>
      </div>
      
      <OrderSuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => {
          setIsSuccessModalOpen(false);
          navigate('/');
        }} 
        orderTotal={orderTotal} 
      />
    </div>
  );
};
