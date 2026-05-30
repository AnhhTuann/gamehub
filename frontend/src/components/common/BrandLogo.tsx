import React from 'react';
import { LogoIcon } from './LogoIcon';

interface BrandLogoProps {
  collapsed?: boolean; // true = chỉ hiện icon (mobile), false = hiện đầy đủ
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ collapsed = false }) => {
  return (
    <div className="flex items-center gap-2 md:gap-3 cursor-pointer group">
      {/* Icon luôn hiển thị */}
      <LogoIcon className="size-7 md:size-8 text-accent group-hover:text-theme-primary transition-colors duration-300" />
      
      {/* Text: ẩn trên mobile, hiện trên md trở lên */}
      {!collapsed && (
        <h1 
          className="hidden md:flex tracking-widest uppercase items-center" 
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="font-bold text-xl text-theme-primary">Omni</span>
          <span className="font-light text-xl text-theme-muted group-hover:text-theme-secondary transition-colors duration-300">Wear</span>
        </h1>
      )}
    </div>
  );
};
