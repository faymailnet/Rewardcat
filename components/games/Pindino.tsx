
import React, { useState, useEffect, useRef } from 'react';

interface PindinoProps {
  onWin: (amount: number) => void;
  onClose: () => void;
}

const Pindino: React.FC<PindinoProps> = ({ onWin, onClose }) => {
  const [isDropping, setIsDropping] = useState(false);
  const [ballPos, setBallPos] = useState({ x: 50, y: 0 });
  const [history, setHistory] = useState<number[]>([]);
  const [lastWin, setLastWin] = useState<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const dropZones = [
    { label: '0.1x', color: 'bg-red-900/40', text: 'text-red-400', value: 5 },
    { label: '0.5x', color: 'bg-orange-900/40', text: 'text-orange-400', value: 25 },
    { label: '1.2x', color: 'bg-amber-900/40', text: 'text-amber-400', value: 60 },
    { label: '5.0x', color: 'bg-orange-600', text: 'text-white', value: 250 },
    { label: '1.2x', color: 'bg-amber-900/40', text: 'text-amber-400', value: 60 },
    { label: '0.5x', color: 'bg-orange-900/40', text: 'text-orange-400', value: 25 },
    { label: '0.1x', color: 'bg-red-900/40', text: 'text-red-400', value: 5 },
  ];

  const handleDrop = () => {
    if (isDropping) return;
    setIsDropping(true);
    setLastWin(null);
    setBallPos({ x: 50, y: 0 });

    let currentX = 50;
    let currentY = 0;
    const steps = 20;
    const interval = 60;

    const runStep = (step: number) => {
      if (step >= steps) {
        const finalZoneIdx = Math.floor((currentX / 100) * dropZones.length);
        const win = dropZones[Math.min(finalZoneIdx, dropZones.length - 1)].value;
        setHistory(prev => [win, ...prev].slice(0, 5));
        setLastWin(win);
        onWin(win);
        setIsDropping(false);
        return;
      }

      const bounce = (Math.random() - 0.5) * 18;
      currentX = Math.max(5, Math.min(95, currentX + bounce));
      currentY = (step / steps) * 100;

      setBallPos({ x: currentX, y: currentY });
      timeoutRef.current = window.setTimeout(() => runStep(step + 1), interval);
    };

    runStep(0);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md mx-auto bg-slate-900 p-8 rounded-[40px] shadow-2xl border border-white/5 animate-in zoom-in duration-300">
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col">
           <h3 className="text-2xl font-black text-white tracking-tight">Pindino Elite</h3>
           <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Physics Engine Active</span>
        </div>
        <button onClick={onClose} className="w-10 h-10 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-full flex items-center justify-center transition-colors">✕</button>
      </div>

      <div className="relative w-full aspect-[4/5] bg-slate-950 rounded-3xl overflow-hidden border-4 border-slate-800 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
        {/* Pegs Grid */}
        <div className="absolute inset-0 grid grid-cols-7 grid-rows-10 gap-4 p-8 opacity-20">
          {Array.from({ length: 70 }).map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]"></div>
          ))}
        </div>

        {/* Ball */}
        <div 
          className="absolute w-8 h-8 bg-orange-600 rounded-full shadow-[0_0_30px_rgba(249,115,22,1)] transition-all duration-75 ease-linear z-20 flex items-center justify-center text-lg"
          style={{ 
            left: `${ballPos.x}%`, 
            top: `${ballPos.y}%`, 
            transform: 'translate(-50%, -50%)' 
          }}
        >
          🐱
        </div>

        {/* Catch Zones */}
        <div className="absolute bottom-0 left-0 w-full h-20 flex border-t border-slate-800 bg-slate-900/50">
          {dropZones.map((zone, idx) => (
            <div key={idx} className={`flex-1 ${zone.color} flex flex-col items-center justify-center text-[8px] font-black uppercase border-x border-white/5`}>
              <span className={zone.text}>{zone.label}</span>
              <span className={`text-xs ${zone.text}`}>+{zone.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full space-y-4">
        {lastWin !== null && (
          <div className="text-center animate-bounce text-orange-500 font-black text-3xl drop-shadow-[0_0_10px_rgba(249,115,22,0.4)]">
            WIN +{lastWin} 🪙
          </div>
        )}
        
        <button 
          onClick={handleDrop}
          disabled={isDropping}
          className={`w-full py-5 rounded-3xl font-black text-xl transition-all shadow-2xl
            ${isDropping ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-white/5' : 'bg-orange-600 text-white hover:bg-orange-500 active:scale-95 shadow-orange-600/20'}`}
        >
          {isDropping ? 'BALL IN TRANSIT...' : 'RELEASE BALL (10 🪙)'}
        </button>

        <div className="space-y-3 pt-2">
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest block text-center">Session History</span>
            <div className="flex justify-center gap-2">
              {history.map((win, i) => (
                <div key={i} className="px-4 py-2 bg-slate-800/50 text-orange-400 rounded-xl text-xs font-black border border-white/5 shadow-lg animate-in fade-in slide-in-from-right-1">
                  +{win}
                </div>
              ))}
              {history.length === 0 && <div className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">No drops recorded</div>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Pindino;