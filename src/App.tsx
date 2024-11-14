import React from 'react';
import { ChessBoard } from './components/ChessBoard';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-200 py-12 relative">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center text-amber-900 mb-12 drop-shadow-lg">
          Chess
        </h1>
        <ChessBoard />
      </div>
      <div className="fixed bottom-4 right-6 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
        <p className="text-amber-900 font-serif italic tracking-wide text-lg">
          Built by{' '}
          <span className="font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
            UdayGurram
          </span>
        </p>
      </div>
    </div>
  );
}

export default App;
