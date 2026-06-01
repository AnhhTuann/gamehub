import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, value, onChange, placeholder = 'Select...', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-gamehub-surface border text-gamehub-text px-4 py-2.5 rounded-md focus:outline-none transition-all font-sans text-sm cursor-pointer min-w-[150px] ${isOpen ? 'border-gamehub-purple ring-1 ring-gamehub-purple' : 'border-gamehub-border'}`}
      >
        <span className="truncate mr-3">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown className={`w-4 h-4 text-gamehub-muted transition-transform duration-200 ${isOpen ? 'transform rotate-180 text-gamehub-purple' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-1.5 w-full bg-gamehub-surface border border-gamehub-border rounded-md shadow-xl z-50 overflow-hidden"
          >
            <ul className="max-h-60 overflow-y-auto py-1" style={{ scrollbarWidth: 'thin' }}>
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer transition-colors flex items-center justify-between ${
                    value === option.value
                      ? 'text-gamehub-green font-bold'
                      : 'text-gamehub-text hover:text-gamehub-purple hover:bg-gamehub-purple/10'
                  }`}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
