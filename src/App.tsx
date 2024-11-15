import React from 'react';
import { ChessBoard } from './components/ChessBoard';
import { Crown, Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&q=80&w=2000')] opacity-10 bg-cover bg-center"></div>
      <div className="container mx-auto relative">
        <div className="flex flex-col items-center justify-center gap-2 mb-8">
          <div className="flex items-center justify-center gap-3">
            <Crown className="w-10 h-10 text-amber-400" />
            <h1 className="text-6xl font-bold text-center bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              Ethereal Chess
            </h1>
            <Crown className="w-10 h-10 text-amber-400" />
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-lg text-purple-300 tracking-widest uppercase">Royale Edition</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
        </div>
        <ChessBoard />
        <div className="fixed bottom-6 right-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-amber-500 to-purple-600 rounded-lg opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
            <div className="relative px-6 py-3 bg-black rounded-lg leading-none">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Built by</span>
                <span className="font-bold bg-gradient-to-r from-purple-400 via-amber-400 to-purple-400 bg-clip-text text-transparent text-lg">
                  Uday Gurram
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;