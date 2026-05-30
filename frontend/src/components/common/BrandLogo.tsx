import React from 'react';

interface BrandLogoProps {
  collapsed?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ collapsed = false }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer group">
      {/* Pixel controller icon */}
      <div className="text-[var(--neon-cyan)] text-lg">🎮</div>
      {!collapsed && (
        <span className="font-pixel text-sm md:text-base text-white tracking-wider">
          <span className="text-[var(--accent)]">GAME</span>
          <span className="text-[var(--neon-cyan)]">HUB</span>
        </span>
      )}
    </div>
  );
};
