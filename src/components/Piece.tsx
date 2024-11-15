import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { ChessPiece } from '../types';

interface PieceProps {
  piece: ChessPiece;
}

export const Piece: React.FC<PieceProps> = ({ piece }) => {
  const animation = useSpring({
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    config: { tension: 200, friction: 20 },
  });

  const getPieceSymbol = () => {
    const symbols: Record<string, string> = {
      'white-king': '♔',
      'white-queen': '♕',
      'white-rook': '♖',
      'white-bishop': '♗',
      'white-knight': '♘',
      'white-pawn': '♙',
      'black-king': '♚',
      'black-queen': '♛',
      'black-rook': '♜',
      'black-bishop': '♝',
      'black-knight': '♞',
      'black-pawn': '♟',
    };
    return symbols[`${piece.color}-${piece.type}`];
  };

  const colorClasses = piece.color === 'white'
    ? 'text-amber-200 drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]'
    : 'text-slate-900 drop-shadow-[0_2px_3px_rgba(255,255,255,0.3)]';

  return (
    <animated.div 
      style={animation}
      className={`text-4xl ${colorClasses} cursor-pointer hover:scale-110 transition-all duration-200 transform hover:-translate-y-1`}
    >
      {getPieceSymbol()}
    </animated.div>
  );
};