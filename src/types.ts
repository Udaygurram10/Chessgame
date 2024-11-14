export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceColor = 'white' | 'black';
export type Position = [number, number];
export type GameStatus = 'playing' | 'checkmate' | 'stalemate';

export interface ChessPiece {
  type: PieceType;
  color: PieceColor;
}