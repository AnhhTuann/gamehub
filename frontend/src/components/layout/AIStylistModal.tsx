import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Camera, Sparkles } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../graphql/queries';
import { Product } from '../../types';
import { ProductCard } from '../common/ProductCard';

interface AIStylistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'upload' | 'scanning' | 'results';

export const AIStylistModal = ({ isOpen, onClose }: AIStylistModalProps) => {
  const [step, setStep] = useState<Step>('upload');
  const dummyUploadedImage = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"; 

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep('upload');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (step === 'scanning') {
      const timer = setTimeout(() => {
        setStep('results');
      }, 2500); // 2.5 seconds simulation
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleUpload = () => {
    setStep('scanning');
  };

  const colors = ['#2C3E50', '#E74C3C', '#AAAAAA', '#F5DF4D'];
  const materials = ['Denim', 'Canvas', 'Matte Leather'];
  // Show 2-4 products matching criteria
  const { data } = useQuery(GET_PRODUCTS);
  const matchedProducts: Product[] = (data?.products || []).slice(1, 4);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 md:p-8 shrink-0 border-b border-zinc-800/50">
             <div className="flex items-center gap-3">
               <Sparkles className="w-6 h-6 text-emerald-400" />
               <h2 className="font-serif text-2xl font-bold text-white tracking-wide flex items-center">
                 Belle
                 <span className="font-sans text-[10px] uppercase tracking-widest text-zinc-500 ml-3 font-semibold border border-zinc-700 px-2 py-0.5">AI Stylist</span>
               </h2>
             </div>
             <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white transition-colors">
               <X className="w-6 h-6" />
             </button>
          </div>

          <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:py-16 overflow-y-auto custom-scrollbar flex flex-col">
            <AnimatePresence mode="wait">
              
              {/* Upload Zone */}
              {step === 'upload' && (
                <motion.div 
                  key="upload"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-700/60 hover:border-zinc-500 transition-colors cursor-pointer group rounded-sm min-h-[400px]"
                  onClick={handleUpload}
                >
                  <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-black transition-colors duration-500 text-zinc-500 shadow-xl">
                    <Camera className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl text-white mb-6 tracking-wide text-center">
                    Drop an image here, and let Belle find your style.
                  </h3>
                  <p className="text-zinc-400 font-sans tracking-widest text-center uppercase text-sm md:text-base font-semibold">
                    Click to browse or drag & drop.
                  </p>
                </motion.div>
              )}

              {/* Scanning State */}
              {step === 'scanning' && (
                <motion.div 
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex-1 flex flex-col items-center justify-center relative min-h-[400px]"
                >
                  <div className="relative w-64 md:w-80 aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl ring-1 ring-zinc-800">
                    <img src={dummyUploadedImage} alt="Scanning..." className="w-full h-full object-cover opacity-30 grayscale blur-[2px]" />
                    
                    {/* Laser scanning line overlay */}
                     <div className="absolute left-0 w-full h-[2px] bg-white shadow-[0_0_20px_4px_rgba(255,255,255,0.7)] animate-scan" />
                     
                     <div className="absolute inset-0 border border-zinc-700" />
                  </div>
                  <motion.div 
                    animate={{ opacity: [0.4, 1, 0.4] }} 
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="mt-12 text-white font-mono uppercase tracking-widest text-sm flex items-center gap-3"
                  >
                    <Sparkles className="w-4 h-4" />
                    Analyzing visual aesthetic...
                  </motion.div>
                </motion.div>
              )}

              {/* Results State */}
              {step === 'results' && (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex flex-col gap-20 pb-16"
                >
                  {/* AI Analysis Breakdown */}
                  <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                     {/* Scanned Image Thumbnail */}
                     <div className="w-48 xl:w-64 shrink-0 aspect-[4/5] bg-zinc-900 overflow-hidden relative shadow-2xl hidden md:block mt-8">
                        <img src={dummyUploadedImage} alt="Analyzed" className="w-full h-full object-cover" />
                        <div className="absolute top-3 left-3 bg-white/90 text-black px-2 py-1 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 backdrop-blur-md">
                          <Sparkles className="w-3 h-3" />
                          Analyzed
                        </div>
                     </div>
                     
                     <div className="flex-1 flex flex-col gap-12 w-full mt-4">
                       <div>
                         <h4 className="font-serif text-3xl text-white mb-8 tracking-wide border-b border-zinc-800/80 pb-4">Extracted Palette</h4>
                         <div className="flex flex-wrap gap-6">
                           {colors.map((color, idx) => (
                             <motion.div 
                               initial={{ opacity: 0, scale: 0.8 }}
                               animate={{ opacity: 1, scale: 1 }}
                               transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                               key={idx} 
                               className="flex flex-col items-center gap-4 group"
                             >
                               <div className="w-16 h-16 rounded-full ring-1 ring-zinc-700/50 shadow-inner group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: color }} />
                               <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-widest">{color}</span>
                             </motion.div>
                           ))}
                         </div>
                       </div>
                       
                       <div>
                         <h4 className="font-serif text-3xl text-white mb-8 tracking-wide border-b border-zinc-800/80 pb-4">Detected Textures</h4>
                         <div className="flex flex-wrap gap-4">
                           {materials.map((mat, idx) => (
                             <motion.div 
                               initial={{ opacity: 0, x: -10 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                               key={idx} 
                               className="px-6 py-3 border border-zinc-700 text-zinc-300 text-xs font-bold tracking-widest uppercase bg-zinc-900/50"
                             >
                               {mat}
                             </motion.div>
                           ))}
                         </div>
                       </div>
                     </div>
                  </div>
                  
                  {/* Matched Products Timeline/Grid */}
                  <div className="border-t border-zinc-800/80 pt-16">
                    <div className="flex items-center gap-4 mb-12">
                      <Sparkles className="w-8 h-8 text-white" />
                      <h3 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-wide">Matches for You</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {matchedProducts.map((product, idx) => (
                        <motion.div 
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + idx * 0.1, duration: 0.6 }}
                          onClick={onClose}
                        >
                           <ProductCard product={product} />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
