import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" />
  </svg>
);

const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-sm font-medium text-zinc-400 tracking-wide">{label}</label>
    <input 
      className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 px-4 py-3 rounded-none focus:border-white focus:ring-1 focus:ring-white focus:outline-none transition-all duration-300"
      {...props}
    />
  </div>
);

export const Auth = () => {
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      navigate('/portal');
    } else {
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:grid md:grid-cols-2">
      {/* Left Column: Visuals */}
      <div className="hidden md:flex relative w-full h-full bg-zinc-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1618932260643-ee4aeefcb214?q=80&w=1600&auto=format&fit=crop" 
          alt="Cinematic Fashion" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <Link to="/" className="absolute top-8 left-8 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" />
          Back to Store
        </Link>
        <div className="absolute bottom-16 left-12 max-w-md">
          <h2 className="font-serif text-white text-5xl font-bold mb-4 tracking-wide">
            OmniWear<span className="text-zinc-400">.</span>
          </h2>
          <p className="text-zinc-300 font-serif text-lg italic leading-relaxed">
            "Fashion is the armor to survive the reality of everyday life."
          </p>
        </div>
      </div>

      {/* Right Column: Form Area */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-20 relative">
        <div className="md:hidden absolute top-8 left-8">
          <Link to="/" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
        </div>

        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex flex-col w-full"
            >
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-2 tracking-wide">
                {isLogin ? 'Welcome Back' : 'Join OmniWear'}
              </h1>
              <p className="text-zinc-400 mb-10 text-lg">
                {isLogin 
                  ? 'Sign in to access your exclusive offers and orders.' 
                  : 'Create an account to unlock premium editorial experiences.'}
              </p>

              <form className="flex flex-col gap-6" onSubmit={handleSignIn}>
                {!isLogin && (
                  <Input label="Full Name" type="text" placeholder="Sophia Chen" required />
                )}
                <Input label="Email Address" type="email" placeholder="sophia@example.com" required />
                <Input label="Password" type="password" placeholder="••••••••" required />

                {isLogin && (
                  <div className="flex justify-end -mt-2">
                    <a href="#" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                      Forgot pattern?
                    </a>
                  </div>
                )}

                <button 
                   type="submit"
                   className="w-full py-4 mt-2 bg-white text-black font-bold tracking-widest uppercase text-sm hover:bg-zinc-200 transition-colors duration-300"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 border-t border-zinc-800"></div>
                <span className="text-zinc-500 text-xs uppercase tracking-widest">Or</span>
                <div className="flex-1 border-t border-zinc-800"></div>
              </div>

              <button className="w-full py-4 bg-transparent border border-white text-white font-semibold tracking-wide text-sm flex items-center justify-center gap-3 hover:bg-white/5 transition-colors duration-300">
                <GoogleIcon />
                Continue with Google
              </button>

              <div className="text-center mt-12 bg-transparent text-zinc-400 text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-white hover:underline underline-offset-4 tracking-wide font-medium ml-1 transition-all"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
