import React from 'react';
import { Square } from './Square';
import { Piece } from './Piece';
import { useChessGame } from '../hooks/useChessGame';

export const ChessBoard = () => {
  const {
    board,
    selectedPiece,
    validMoves,
    currentPlayer,
    handleSquareClick,
    gameStatus,
    moveHistory,
  } = useChessGame();

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-center w-full max-w-7xl mx-auto p-4">
      <div className="flex flex-col items-center gap-6">
        <div className="text-2xl font-bold text-amber-900 bg-white/80 px-6 py-3 rounded-xl shadow-lg backdrop-blur-sm">
          {gameStatus === 'checkmate' 
            ? `Checkmate! ${currentPlayer === 'white' ? 'Black' : 'White'} wins!`
            : gameStatus === 'stalemate'
            ? "Stalemate! It's a draw!"
            : `${currentPlayer === 'white' ? 'White' : 'Black'}'s turn`}
        </div>
        
        <div className="grid grid-cols-8 gap-0 bg-gradient-to-br from-amber-700 to-amber-900 p-4 rounded-xl shadow-2xl transform rotate-x-5">
          <div className="col-span-8 grid grid-cols-8 gap-0 bg-white/10 p-2 rounded-lg shadow-inner">
            {board.map((row, i) =>
              row.map((piece, j) => {
                const isSelected = selectedPiece?.position[0] === i && selectedPiece?.position[1] === j;
                const isValidMove = validMoves.some(move => move[0] === i && move[1] === j);
                
                return (
                  <Square
                    key={`${i}-${j}`}
                    isLight={(i + j) % 2 === 0}
                    isSelected={isSelected}
                    isValidMove={isValidMove}
                    onClick={() => handleSquareClick(i, j)}
                  >
                    {piece && <Piece piece={piece} />}
                  </Square>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="w-full md:w-72 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 transform rotate-y-5">
        <h2 className="text-xl font-bold mb-4 text-amber-900">Move History</h2>
        <div className="h-96 overflow-y-auto pr-2 custom-scrollbar">
          {moveHistory.map((move, index) => (
            <div key={index} className="flex items-center py-2 border-b border-amber-100">
              <span className="w-8 text-amber-600 font-medium">{index + 1}.</span>
              <span className="flex-1 text-amber-900">{move}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};