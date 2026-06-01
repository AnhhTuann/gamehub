import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderTotal: number;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ isOpen, onClose, orderTotal }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center font-sans p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-gamehub-bg border-4 border-[#50fa7b] rounded-lg shadow-[0_0_30px_rgba(80,250,123,0.3)] overflow-hidden"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_4px)] pointer-events-none" />
            
            <div className="p-8 md:p-10 flex flex-col items-center text-center relative z-10">
              
              {/* Success Icon */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                className="w-20 h-20 bg-gamehub-bg border-4 border-[#50fa7b] rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(80,250,123,0.5)]"
              >
                <Trophy className="w-10 h-10 text-gamehub-cyan" />
              </motion.div>

              {/* Headings */}
              <h2 className="font-pixel text-xl md:text-2xl text-gamehub-cyan mb-4 tracking-wider leading-relaxed">
                MISSION ACCOMPLISHED!
              </h2>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#6272a4] to-transparent my-4 opacity-50"></div>
              
              <p className="text-gamehub-text text-sm md:text-base font-medium mb-8 opacity-90">
                Your transaction was successful, Player 1.
              </p>

              {/* Order Details Box */}
              <div className="w-full bg-gamehub-surface/50 p-5 rounded-md border border-gamehub-muted/50 flex flex-col gap-3 mb-6 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gamehub-muted uppercase tracking-widest">Order ID</span>
                  <span className="text-sm font-mono font-bold text-gamehub-text">#GH-990412</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gamehub-muted uppercase tracking-widest">Total Paid</span>
                  <span className="text-sm font-bold text-gamehub-cyan">${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              <p className="text-gamehub-muted text-xs font-medium mb-8 leading-relaxed max-w-sm">
                Your game keys have been added to your Dashboard and sent to your email.
              </p>

              {/* CTAs */}
              <div className="w-full flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/shop" 
                  onClick={onClose}
                  className="flex-1 py-4 px-6 border-2 border-gamehub-muted text-gamehub-text font-bold text-xs tracking-widest uppercase rounded hover:border-[#ff79c6] hover:text-[#ff79c6] transition-colors flex items-center justify-center"
                >
                  CONTINUE SHOPPING
                </Link>
                <Link 
                  to="/portal" 
                  onClick={onClose}
                  className="flex-1 py-4 px-6 bg-gamehub-purple text-black font-bold text-xs tracking-widest uppercase rounded hover:-translate-y-1 hover:bg-[#ff79c6] transition-all flex items-center justify-center gap-2"
                  style={{ boxShadow: '0 4px 10px rgba(189,147,249,0.3)' }}
                >
                  GO TO DASHBOARD
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
