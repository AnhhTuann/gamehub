import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-xs font-bold text-[#f8f8f2] tracking-widest uppercase">{label}</label>
    <input 
      className="w-full bg-[#282a36] border border-[#6272a4] text-[#f8f8f2] px-4 py-3 rounded focus:border-[#ff79c6] focus:ring-1 focus:ring-[#ff79c6] focus:outline-none transition-all duration-300 font-sans"
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
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Retro background effects */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_4px)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#bd93f9] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff79c6] rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <Link to="/" className="absolute top-8 left-8 text-[var(--text-muted)] hover:text-[#ff79c6] transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest z-20">
        <ArrowLeft className="w-4 h-4" />
        Back to Store
      </Link>

      <div className="w-full max-w-md relative z-10">
        {/* Glow behind container */}
        <div className="absolute inset-0 bg-[#bd93f9] blur-xl opacity-20 rounded-lg"></div>

        <motion.div 
          className="bg-[#44475a]/90 backdrop-blur-md border-2 border-[#bd93f9] p-8 sm:p-10 rounded-lg relative overflow-hidden shadow-[0_0_15px_rgba(189,147,249,0.3)]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#282a36] border-2 border-[#ff79c6] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,121,198,0.4)]">
              <Gamepad2 className="w-8 h-8 text-[#bd93f9] animate-pulse" />
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
              <h1 className="font-pixel text-center text-xl md:text-2xl text-[#bd93f9] mb-2 tracking-wide leading-relaxed">
                {isLogin ? 'PLAYER 1 LOGIN' : 'NEW PLAYER REGISTRATION'}
              </h1>
              <p className="text-[#f8f8f2] text-center mb-8 text-sm opacity-80">
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
                    <a href="#" className="text-xs font-medium text-[#bd93f9] hover:text-[#ff79c6] transition-colors tracking-wide">
                      Forgot Password?
                    </a>
                  </div>
                )}

                <button 
                   type="submit"
                   className="w-full py-4 mt-4 bg-[#bd93f9] text-black font-pixel text-[10px] tracking-widest uppercase rounded hover:bg-[#ff79c6] hover:-translate-y-1 transition-all duration-300"
                   style={{ boxShadow: '4px 4px 0 0 rgba(0,0,0,0.5)' }}
                >
                  {isLogin ? 'PRESS START (LOGIN)' : 'JOIN GAME'}
                </button>
              </form>

              <div className="text-center mt-8 text-[#f8f8f2] text-sm opacity-80">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#bd93f9] hover:text-[#ff79c6] hover:underline underline-offset-4 tracking-wide font-bold ml-1 transition-all"
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
