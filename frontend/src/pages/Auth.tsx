import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#bd93f9" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#ff79c6" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#f1fa8c" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#50fa7b" />
  </svg>
);

const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-xs font-bold text-gamehub-text tracking-widest uppercase">{label}</label>
    <input 
      className="w-full bg-gamehub-surface border border-gamehub-border text-gamehub-text px-4 py-3 rounded focus:border-gamehub-purple focus:ring-1 focus:ring-gamehub-purple focus:outline-none transition-all duration-300 font-sans"
      {...props}
    />
  </div>
);

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    const mockUser = username.trim() || 'RetroGamer99';
    login(mockUser);
    
    // Redirect to where they came from or portal
    const from = location.state?.from?.pathname || '/portal';
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gamehub-bg flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Retro background effects */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_4px)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gamehub-purple rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <Link to="/" className="absolute top-8 left-8 text-gamehub-muted hover:text-gamehub-purple hover:opacity-80 transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest z-20">
        <ArrowLeft className="w-4 h-4" />
        Back to Store
      </Link>

      <div className="w-full max-w-md relative z-10">
        {/* Glow behind container */}
        <div className="absolute inset-0 bg-gamehub-purple blur-xl opacity-20 rounded-lg"></div>

        <motion.div 
          className="bg-gamehub-surface/90 backdrop-blur-md border-2 border-gamehub-purple p-8 sm:p-10 rounded-lg relative overflow-hidden shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gamehub-bg border-2 border-gamehub-purple rounded-full flex items-center justify-center shadow-md">
              <Gamepad2 className="w-8 h-8 text-gamehub-purple animate-pulse" />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col"
            >
              <h1 className="font-pixel text-center text-xl md:text-2xl text-gamehub-purple mb-2 tracking-wide leading-relaxed">
                {isLogin ? 'PLAYER 1 LOGIN' : 'NEW PLAYER REGISTRATION'}
              </h1>
              <p className="text-gamehub-text text-center mb-8 text-sm opacity-80">
                {isLogin 
                  ? 'Enter your credentials to continue your adventure.' 
                  : 'Create your profile to join the game.'}
              </p>

              <form className="flex flex-col gap-5" onSubmit={handleSignIn}>
                {!isLogin && (
                  <Input label="Email Address" type="email" placeholder="player1@example.com" required />
                )}
                <Input 
                  label="Username" 
                  type="text" 
                  placeholder="RetroGamer99" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
                <Input label="Password" type="password" placeholder="••••••••" required />

                {isLogin && (
                  <div className="flex justify-end -mt-1">
                    <a href="#" className="text-xs font-medium text-gamehub-purple hover:opacity-80 transition-colors tracking-wide">
                      Forgot Password?
                    </a>
                  </div>
                )}

                <button 
                   type="submit"
                   className="w-full py-4 mt-4 bg-gamehub-purple text-white font-pixel text-[10px] tracking-widest uppercase rounded hover:opacity-80 hover:-translate-y-1 transition-all duration-300"
                   style={{ boxShadow: '4px 4px 0 0 rgba(0,0,0,0.5)' }}
                >
                  {isLogin ? 'PRESS START (LOGIN)' : 'JOIN GAME'}
                </button>
              </form>

              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 border-t border-gamehub-border"></div>
                <span className="text-gamehub-muted text-xs uppercase tracking-widest font-bold">Or</span>
                <div className="flex-1 border-t border-gamehub-border"></div>
              </div>

              <button 
                type="button"
                onClick={() => {
                  login('GoogleGamer');
                  navigate('/portal', { replace: true });
                }}
                className="w-full py-3.5 bg-transparent border-2 border-gamehub-border text-gamehub-text font-bold tracking-wide text-sm flex items-center justify-center gap-3 rounded hover:border-gamehub-purple hover:bg-gamehub-purple/10 transition-colors duration-300"
              >
                <GoogleIcon />
                Continue with Google
              </button>

              <div className="text-center mt-8 text-gamehub-text text-sm opacity-80">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-gamehub-purple hover:opacity-80 hover:underline underline-offset-4 tracking-wide font-bold ml-1 transition-all"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
