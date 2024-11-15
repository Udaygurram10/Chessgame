import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Square } from './Square';
import { Piece } from './Piece';
import { useChessGame } from '../hooks/useChessGame';
import { Trophy, Clock, RotateCcw } from 'lucide-react';

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

  const boardAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.9) rotateX(20deg)' },
    to: { opacity: 1, transform: 'scale(1) rotateX(5deg)' },
    config: { tension: 100, friction: 10 },
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center w-full max-w-7xl mx-auto">
      <div className="flex flex-col items-center gap-6 w-full lg:w-auto">
        <div className="w-full max-w-md lg:w-auto bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-xl border border-white/20">
          <div className="flex items-center gap-3 justify-center">
            {gameStatus === 'checkmate' ? (
              <Trophy className="w-6 h-6 text-amber-400" />
            ) : (
              <Clock className="w-6 h-6 text-blue-400 animate-pulse" />
            )}
            <h2 className="text-2xl font-bold text-white">
              {gameStatus === 'checkmate' 
                ? `Checkmate! ${currentPlayer === 'white' ? 'Black' : 'White'} wins!`
                : gameStatus === 'stalemate'
                ? "Stalemate! It's a draw!"
                : `${currentPlayer === 'white' ? 'White' : 'Black'}'s turn`}
            </h2>
          </div>
        </div>
        
        <animated.div style={boardAnimation} className="w-full max-w-2xl">
          <div className="grid grid-cols-8 gap-0 bg-gradient-to-br from-slate-800 to-purple-900 p-6 rounded-2xl shadow-2xl">
            <div className="col-span-8 grid grid-cols-8 gap-0 bg-white/5 p-3 rounded-xl shadow-inner">
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
        </animated.div>
      </div>

      <div className="w-full lg:w-80 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              Move History
            </h2>
            <span className="text-sm text-white/60">
              {moveHistory.length} moves
            </span>
          </div>
        </div>
        <div className="h-[32rem] overflow-y-auto custom-scrollbar">
          <div className="p-4 space-y-2">
            {moveHistory.map((move, index) => (
              <div key={index} className="flex items-center py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <span className="w-8 text-amber-400/80 font-medium">{index + 1}.</span>
                <span className="flex-1 text-white/90">{move}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};