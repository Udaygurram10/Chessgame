import React from 'react';
import { ChessPiece } from '../types';

interface PieceProps {
  piece: ChessPiece;
}

export const Piece: React.FC<PieceProps> = ({ piece }) => {
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
    ? 'text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'
    : 'text-gray-900 drop-shadow-[0_2px_2px_rgba(255,255,255,0.3)]';

  return (
    <div 
      className={`text-4xl ${colorClasses} cursor-pointer hover:scale-110 transition-all duration-200 transform hover:-translate-y-1`}
      style={{
        textShadow: piece.color === 'white' 
          ? '2px 2px 4px rgba(0,0,0,0.5)' 
          : '2px 2px 4px rgba(0,0,0,0.3)',
      }}
    >
      {getPieceSymbol()}
    </div>
  );
};