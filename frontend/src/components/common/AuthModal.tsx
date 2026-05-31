import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gamepad2 } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { LOGIN, REGISTER } from '../../graphql/mutations';
import { useAuthStore } from '../../store/useAuthStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-xs font-bold text-[#f8f8f2] tracking-widest uppercase">{label}</label>
    <input 
      className="w-full bg-[#282a36] border border-[#6272a4] text-[#f8f8f2] px-4 py-3 rounded focus:border-[#ff79c6] focus:ring-1 focus:ring-[#ff79c6] focus:outline-none transition-all duration-300 font-sans"
      {...props}
    />
  </div>
);

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const setAuth = useAuthStore((state) => state.setAuth);

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      setAuth(data.login.user, data.login.token);
      onSuccess();
      onClose();
    },
    onError: (err) => {
      setError(err.message);
    }
  });

  const [register] = useMutation(REGISTER, {
    onCompleted: (data) => {
      setAuth(data.register.user, data.register.token);
      onSuccess();
      onClose();
    },
    onError: (err) => {
      setError(err.message);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      login({ variables: { email, password } });
    } else {
      register({ variables: { email, password, name } });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#44475a]/95 backdrop-blur-md border-2 border-[#bd93f9] p-8 w-full max-w-md rounded-lg relative overflow-hidden shadow-[0_0_15px_rgba(189,147,249,0.3)]"
        >
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-[#6272a4] hover:text-[#ff5555] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#282a36] border-2 border-[#ff79c6] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,121,198,0.4)]">
              <Gamepad2 className="w-8 h-8 text-[#bd93f9] animate-pulse" />
            </div>
          </div>

          <h1 className="font-pixel text-center text-xl md:text-2xl text-[#bd93f9] mb-2 tracking-wide leading-relaxed">
            {isLogin ? 'PLAYER 1 LOGIN' : 'NEW PLAYER REGISTRATION'}
          </h1>
          <p className="text-[#f8f8f2] text-center mb-8 text-sm opacity-80">
            {isLogin ? 'Enter your credentials to continue.' : 'Create your profile to join.'}
          </p>

          {error && (
            <div className="bg-[#ff5555]/20 border border-[#ff5555] text-[#ff5555] px-4 py-2 rounded mb-4 text-sm text-center">
              {error}
            </div>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <Input 
                label="Username" 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="RetroGamer99" 
                required 
              />
            )}
            <Input 
              label="Email Address" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="player1@example.com" 
              required 
            />
            <Input 
              label="Password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required 
            />

            <button 
                type="submit"
                className="w-full py-4 mt-4 bg-[#bd93f9] text-black font-pixel text-[10px] tracking-widest uppercase rounded hover:bg-[#ff79c6] hover:-translate-y-1 transition-all duration-300"
                style={{ boxShadow: '4px 4px 0 0 rgba(0,0,0,0.5)' }}
            >
              {isLogin ? 'PRESS START (LOGIN)' : 'JOIN GAME'}
            </button>
          </form>

          <div className="text-center mt-6 text-[#f8f8f2] text-sm opacity-80">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => {
                setError('');
                setIsLogin(!isLogin);
              }}
              className="text-[#bd93f9] hover:text-[#ff79c6] hover:underline underline-offset-4 tracking-wide font-bold ml-1 transition-all"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
