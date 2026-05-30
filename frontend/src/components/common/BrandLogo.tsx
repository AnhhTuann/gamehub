import React from 'react';

interface BrandLogoProps {
  collapsed?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ collapsed = false }) => {
  return (
    <div className="flex items-center gap-2 md:gap-3 cursor-pointer group">
      <img src="/logo.png" alt="GameHub Logo" className={`object-contain transition-all duration-300 ${collapsed ? 'h-8' : 'h-10'}`} />
    </div>
  );
};
