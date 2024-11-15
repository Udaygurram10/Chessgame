import React from 'react';
import { useSpring, animated } from '@react-spring/web';

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
  const animation = useSpring({
    transform: isSelected ? 'translateY(-4px)' : 'translateY(0px)',
    config: { tension: 300, friction: 10 },
  });

  const baseClasses = "w-full aspect-square flex items-center justify-center relative transition-all duration-200";
  const colorClasses = isLight 
    ? "bg-white/20 hover:bg-white/30" 
    : "bg-black/40 hover:bg-black/50";
  const selectedClasses = isSelected 
    ? "ring-2 ring-blue-400 ring-inset shadow-lg shadow-blue-500/20" 
    : "";
  const validMoveClasses = isValidMove 
    ? "after:absolute after:w-3 after:h-3 after:rounded-full after:bg-blue-400/60 after:shadow-lg after:animate-pulse" 
    : "";

  return (
    <animated.div
      style={animation}
      className={`${baseClasses} ${colorClasses} ${selectedClasses} ${validMoveClasses}`}
      onClick={onClick}
    >
      {children}
    </animated.div>
  );
};