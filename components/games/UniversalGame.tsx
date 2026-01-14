
import React, { useState, useEffect, useRef } from 'react';
import { Game } from '../../types';

interface UniversalGameProps {
  game: Game;
  onWin: (amount: number) => void;
  onClose: () => void;
}

const UniversalGame: React.FC<UniversalGameProps> = ({ game, onWin, onClose }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameStarted, setGameStarted] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(false);
  const [items, setItems] = useState<{ id: number; x: number; y: number; type: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const theme = {
    emoji: game.image,
    player: '🐱',
    bgColor: 'bg-slate-900',
    accentColor: 'text-orange-500'
  };

  const startGame = () => {
    if (game.externalUrl) {
      setIsIframeLoading(true);
    }
    setGameStarted(true);
    if (!game.externalUrl) {
      setScore(0);
      setTimeLeft(20);
      setItems([]);
    }
  };

  const spawnItem = () => {
    if (game.externalUrl) return;
    const newItem = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: -10,
      type: theme.emoji
    };
    setItems(prev => [...prev, newItem]);
  };

  useEffect(() => {
    if (!gameStarted || game.externalUrl) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameStarted(false);
          onWin(Math.floor(score / 5) + game.reward);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const spawner = setInterval(spawnItem, 800);

    return () => {
      clearInterval(timer);
      clearInterval(spawner);
    };
  }, [gameStarted, score, game.externalUrl]);

  const handleItemClick = (id: number) => {
    setScore(prev => prev + 10);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleCloseExternal = () => {
    if (gameStarted && game.externalUrl) {
      onWin(game.reward);
    }
    onClose();
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${theme.bgColor} p-4 md:p-8 rounded-[40px] md:rounded-[50px] border-4 border-slate-800 shadow-2xl flex flex-col h-[650px] md:h-[750px] animate-in zoom-in duration-300`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none">{game.title}</h3>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] font-black mt-1">{game.category}</p>
        </div>
        <button onClick={handleCloseExternal} className="w-10 h-10 md:w-12 md:h-12 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-full flex items-center justify-center transition-colors">✕</button>
      </div>

      <div className="flex-1 bg-slate-950 rounded-[30px] md:rounded-[40px] relative overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] border border-white/5" ref={containerRef}>
        {!gameStarted ? (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center space-y-8 p-10 text-center z-50">
            <span className="text-7xl md:text-9xl animate-bounce drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]">{theme.emoji}</span>
            <div className="space-y-3">
              <h4 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter">Initialize {game.title}?</h4>
              <p className="text-slate-400 text-sm md:text-base font-medium max-w-md mx-auto">
                {game.externalUrl 
                  ? "Launch this premium game in a secure cloud environment." 
                  : `Capture ${theme.emoji} elements to maximize your payout.`}
              </p>
            </div>
            <button 
              onClick={startGame}
              className="bg-orange-600 text-white px-10 py-5 md:px-14 md:py-6 rounded-[35px] font-black text-lg md:text-2xl shadow-2xl shadow-orange-600/30 active:scale-95 transition-all hover:bg-orange-500 hover:scale-105"
            >
              START ENGINE
            </button>
            <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em] flex items-center">
              <span className="mr-2">🛡️</span> Secure Connection Established
            </p>
          </div>
        ) : game.externalUrl ? (
          <div className="w-full h-full relative">
            {isIframeLoading && (
              <div className="absolute inset-0 z-40 bg-slate-950 flex flex-col items-center justify-center space-y-8">
                <div className="text-9xl animate-float">🎮</div>
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-orange-500 font-black uppercase tracking-[0.4em] text-sm animate-pulse">Syncing Engine Data...</p>
                  <div className="w-72 h-3 bg-slate-900 rounded-full overflow-hidden border border-white/5 relative">
                    <div className="absolute top-0 left-0 h-full bg-orange-500 w-1/3 animate-loading"></div>
                  </div>
                  <div className="bg-orange-600/10 border border-orange-500/20 px-8 py-4 rounded-3xl max-w-xs text-center">
                    <p className="text-xs text-orange-400 font-black leading-relaxed italic">
                      NOTE: Some premium games take a bit longer to load. Please wait while we secure your reward session.
                    </p>
                  </div>
                </div>
              </div>
            )}
            <iframe 
              src={game.externalUrl} 
              className="w-full h-full border-none"
              allow="fullscreen; accelerometer; camera; clipboard-read; clipboard-write; screen-wake-lock; speaker-selection; web-share; geolocation; gyroscope; microphone; xr-spatial-tracking; autoplay; encrypted-media; picture-in-picture; payment; publickey-credentials-get; publickey-credentials-create; storage-access; attribution-reporting; browsing-topics"
              title={game.title}
              onLoad={() => setIsIframeLoading(false)}
            />
          </div>
        ) : (
          <div className="w-full h-full cursor-crosshair">
            <div className="absolute top-6 left-6 flex space-x-4 z-30">
              <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 px-5 py-2 rounded-2xl text-xs font-black text-slate-400">TIME: {timeLeft}s</div>
              <div className="bg-orange-600 px-5 py-2 rounded-2xl text-xs font-black text-white shadow-lg">SCORE: {score}</div>
            </div>

            <div className="absolute inset-0 opacity-10 pointer-events-none grid grid-cols-4 gap-8 p-10">
               {Array.from({length: 12}).map((_, i) => <div key={i} className="border border-white/20 rounded-full h-24"></div>)}
            </div>

            {items.map(item => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="absolute text-5xl transition-all duration-[3000ms] ease-linear animate-in fade-in zoom-in hover:scale-125 select-none"
                style={{ 
                  left: `${item.x}%`, 
                  top: '100%', 
                  transform: 'translate(-50%, -100%)',
                  marginTop: `-${Math.random() * 100}px` 
                }}
              >
                {item.type}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 md:mt-8 flex justify-between items-center bg-slate-950 p-4 md:p-6 rounded-[24px] md:rounded-[32px] border border-white/5 shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-600/10 rounded-2xl flex items-center justify-center text-xl md:text-2xl">🪙</div>
          <div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Base Payout</p>
            <p className="font-black text-white text-base md:text-lg">{game.reward} MeowCoins</p>
          </div>
        </div>
        {!game.externalUrl && (
          <div className="text-right">
             <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Bonus</p>
             <p className="font-black text-orange-500 text-base md:text-lg">+{Math.floor(score/5)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversalGame;
