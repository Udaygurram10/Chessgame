import { ChessPiece, Position } from '../types';

export const getValidMoves = (
  board: (ChessPiece | null)[][],
  [row, col]: Position,
  piece: ChessPiece
): Position[] => {
  const moves: Position[] = [];
  const direction = piece.color === 'white' ? -1 : 1;

  switch (piece.type) {
    case 'pawn':
      // Forward move
      if (!board[row + direction]?.[col]) {
        moves.push([row + direction, col]);
        // Initial two-square move
        if (
          ((piece.color === 'white' && row === 6) ||
            (piece.color === 'black' && row === 1)) &&
          !board[row + 2 * direction]?.[col]
        ) {
          moves.push([row + 2 * direction, col]);
        }
      }
      // Captures
      [-1, 1].forEach(offset => {
        const target = board[row + direction]?.[col + offset];
        if (target && target.color !== piece.color) {
          moves.push([row + direction, col + offset]);
        }
      });
      break;

    case 'knight':
      [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
      ].forEach(([dRow, dCol]) => {
        const newRow = row + dRow;
        const newCol = col + dCol;
        if (
          newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 &&
          (!board[newRow][newCol] || board[newRow][newCol]?.color !== piece.color)
        ) {
          moves.push([newRow, newCol]);
        }
      });
      break;

    case 'bishop':
    case 'rook':
    case 'queen':
      const directions = piece.type === 'rook'
        ? [[0, 1], [0, -1], [1, 0], [-1, 0]]
        : piece.type === 'bishop'
        ? [[1, 1], [1, -1], [-1, 1], [-1, -1]]
        : [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];

      directions.forEach(([dRow, dCol]) => {
        let newRow = row + dRow;
        let newCol = col + dCol;
        while (
          newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8
        ) {
          const target = board[newRow][newCol];
          if (!target) {
            moves.push([newRow, newCol]);
          } else {
            if (target.color !== piece.color) {
              moves.push([newRow, newCol]);
            }
            break;
          }
          newRow += dRow;
          newCol += dCol;
        }
      });
      break;

    case 'king':
      [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
      ].forEach(([dRow, dCol]) => {
        const newRow = row + dRow;
        const newCol = col + dCol;
        if (
          newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 &&
          (!board[newRow][newCol] || board[newRow][newCol]?.color !== piece.color)
        ) {
          moves.push([newRow, newCol]);
        }
      });
      break;
  }

  return moves;
};

export const isKingInCheck = (
  board: (ChessPiece | null)[][],
  color: 'white' | 'black'
): boolean => {
  // Find king position
  let kingPos: Position | null = null;
  board.forEach((row, i) => {
    row.forEach((piece, j) => {
      if (piece?.type === 'king' && piece.color === color) {
        kingPos = [i, j];
      }
    });
  });

  if (!kingPos) return false;

  // Check if any opponent piece can capture the king
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece && piece.color !== color) {
        const moves = getValidMoves(board, [i, j], piece);
        if (moves.some(([row, col]) => row === kingPos![0] && col === kingPos![1])) {
          return true;
        }
      }
    }
  }

  return false;
};

export const isCheckmate = (
  board: (ChessPiece | null)[][],
  color: 'white' | 'black'
): boolean => {
  if (!isKingInCheck(board, color)) return false;

  // Check if any move can get out of check
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece && piece.color === color) {
        const moves = getValidMoves(board, [i, j], piece);
        for (const [newRow, newCol] of moves) {
          // Try the move
          const newBoard = board.map(row => [...row]);
          newBoard[newRow][newCol] = piece;
          newBoard[i][j] = null;
          
          // If this move gets out of check, it's not checkmate
          if (!isKingInCheck(newBoard, color)) {
            return false;
          }
        }
      }
    }
  }

  return true;
};

export const isStalemate = (
  board: (ChessPiece | null)[][],
  color: 'white' | 'black'
): boolean => {
  if (isKingInCheck(board, color)) return false;

  // Check if any legal move exists
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece && piece.color === color) {
        const moves = getValidMoves(board, [i, j], piece);
        if (moves.length > 0) return false;
      }
    }
  }

  return true;
};