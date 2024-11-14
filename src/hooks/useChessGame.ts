import { useState, useCallback } from 'react';
import { ChessPiece, Position, GameStatus } from '../types';
import { getValidMoves, isKingInCheck, isCheckmate, isStalemate } from '../utils/chessLogic';

const initialBoard: (ChessPiece | null)[][] = [
  [
    { type: 'rook', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'queen', color: 'black' },
    { type: 'king', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'rook', color: 'black' },
  ],
  Array(8).fill(null).map(() => ({ type: 'pawn', color: 'black' })),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null).map(() => ({ type: 'pawn', color: 'white' })),
  [
    { type: 'rook', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'queen', color: 'white' },
    { type: 'king', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'rook', color: 'white' },
  ],
];

export const useChessGame = () => {
  const [board, setBoard] = useState<(ChessPiece | null)[][]>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white');
  const [selectedPiece, setSelectedPiece] = useState<{
    piece: ChessPiece;
    position: Position;
  } | null>(null);
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [moveHistory, setMoveHistory] = useState<string[]>([]);

  const handleSquareClick = useCallback((row: number, col: number) => {
    if (gameStatus !== 'playing') return;

    const clickedPiece = board[row][col];

    // If no piece is selected and clicked square has a piece of current player's color
    if (!selectedPiece && clickedPiece?.color === currentPlayer) {
      const moves = getValidMoves(board, [row, col], clickedPiece);
      setSelectedPiece({ piece: clickedPiece, position: [row, col] });
      setValidMoves(moves);
      return;
    }

    // If a piece is selected and clicked square is a valid move
    if (selectedPiece && validMoves.some(([r, c]) => r === row && c === col)) {
      const newBoard = [...board.map(row => [...row])];
      const [fromRow, fromCol] = selectedPiece.position;
      
      // Record move in history
      const pieceType = selectedPiece.piece.type.charAt(0).toUpperCase() + selectedPiece.piece.type.slice(1);
      const fromSquare = `${String.fromCharCode(97 + fromCol)}${8 - fromRow}`;
      const toSquare = `${String.fromCharCode(97 + col)}${8 - row}`;
      const capture = board[row][col] ? 'x' : '';
      const moveNotation = `${pieceType} ${fromSquare}${capture}${toSquare}`;
      
      // Make the move
      newBoard[row][col] = selectedPiece.piece;
      newBoard[fromRow][fromCol] = null;
      
      // Update state
      setBoard(newBoard);
      setSelectedPiece(null);
      setValidMoves([]);
      setMoveHistory([...moveHistory, moveNotation]);
      
      // Check game status
      if (isCheckmate(newBoard, currentPlayer === 'white' ? 'black' : 'white')) {
        setGameStatus('checkmate');
      } else if (isStalemate(newBoard, currentPlayer === 'white' ? 'black' : 'white')) {
        setGameStatus('stalemate');
      } else {
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
      }
      return;
    }

    // Deselect piece
    setSelectedPiece(null);
    setValidMoves([]);
  }, [board, selectedPiece, validMoves, currentPlayer, gameStatus, moveHistory]);

  return {
    board,
    currentPlayer,
    selectedPiece,
    validMoves,
    gameStatus,
    moveHistory,
    handleSquareClick,
  };
};