import React from 'react';

interface SquareProps {
  isLight: boolean;
  isSelected: boolean;
  isValidMove: boolean;
  children?: React.ReactNode;
  onClick: () => void;
}

export const Square: React.FC<SquareProps> = ({
  isLight,
  isSelected,
  isValidMove,
  children,
  onClick,
}) => {
  const baseClasses = "w-16 h-16 flex items-center justify-center relative transform transition-all duration-200";
  const colorClasses = isLight 
    ? "bg-amber-50 hover:bg-amber-100" 
    : "bg-amber-800 hover:bg-amber-900";
  const selectedClasses = isSelected 
    ? "ring-4 ring-blue-400 ring-inset shadow-inner" 
    : "hover:-translate-y-1 hover:shadow-lg";
  const validMoveClasses = isValidMove 
    ? "after:absolute after:w-4 after:h-4 after:rounded-full after:bg-blue-400/40 after:shadow-lg after:animate-pulse"
    : "";

  return (
    <div
      className={`${baseClasses} ${colorClasses} ${selectedClasses} ${validMoveClasses}`}
      onClick={onClick}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};