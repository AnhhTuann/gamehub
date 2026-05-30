import React from 'react';

interface LogoIconProps {
  className?: string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ className = 'size-8' }) => {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer hexagon frame */}
      <path
        d="M20 2L36.66 11V29L20 38L3.34 29V11L20 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner diamond / abstract hanger shape */}
      <path
        d="M20 8L30 20L20 32L10 20L20 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Center vertical accent line */}
      <line
        x1="20"
        y1="14"
        x2="20"
        y2="26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Small horizontal bar */}
      <line
        x1="16"
        y1="20"
        x2="24"
        y2="20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
