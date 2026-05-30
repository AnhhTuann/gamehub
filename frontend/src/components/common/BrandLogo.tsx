import React from 'react';

interface BrandLogoProps {
  collapsed?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ collapsed = false }) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none group">
      {/* Icon tay cầm chơi game */}
      <span className="text-3xl filter drop-shadow-[2px_2px_0_rgba(0,0,0,1)] group-hover:scale-110 transition-transform duration-200">
        🎮
      </span>
      
      {/* Text Logo phong cách Dracula */}
      {!collapsed && (
        <h1 
          className="font-pixel text-2xl tracking-widest text-transparent bg-clip-text drop-shadow-[3px_3px_0_rgba(0,0,0,1)]"
          style={{ backgroundImage: 'linear-gradient(to right, var(--logo-from), var(--logo-to))' }}
        >
          GAMEHUB
        </h1>
      )}
    </div>
  );
};
