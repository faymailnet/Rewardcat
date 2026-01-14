
import React, { useState, useEffect } from 'react';

interface AdPortalProps {
  onComplete: () => void;
  onCancel: () => void;
}

const AdPortal: React.FC<AdPortalProps> = ({ onComplete, onCancel }) => {
  const [seconds, setSeconds] = useState(30);
  const [adClicked, setAdClicked] = useState(false);
  // Updated to the requested Dailymotion video
  const videoEmbedUrl = "https://www.dailymotion.com/embed/video/x9xlw8u";
  const videoDirectUrl = "https://dai.ly/x9xlw8u";

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  const handleAdClick = () => {
    setAdClicked(true);
    window.open(videoDirectUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/95 flex flex-col items-center justify-center p-4 md:p-6 backdrop-blur-2xl">
      <div className="max-w-4xl w-full bg-slate-900 rounded-[40px] md:rounded-[60px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] relative flex flex-col max-h-[95vh] border border-white/5">
        <div className="bg-orange-600 px-8 py-6 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-4">
            <span className="animate-spin text-2xl">⚡</span>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight">Reward Node Online</span>
              <span className="text-[10px] uppercase font-black tracking-widest opacity-70">Securing Transaction</span>
            </div>
          </div>
          {seconds === 0 && (
            <button 
              onClick={onCancel} 
              className="bg-black/20 hover:bg-black/40 px-6 py-2 rounded-2xl text-xs font-black transition-all border border-white/10"
            >
              EXIT PORTAL
            </button>
          )}
        </div>

        <div className="flex-1 overflow-hidden relative bg-slate-950 flex flex-col p-6 md:p-10">
          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5 mb-8">
            <div 
              className="h-full bg-gradient-to-r from-orange-600 to-amber-400 transition-all duration-1000 ease-linear shadow-[0_0_15px_rgba(249,115,22,0.6)]" 
              style={{ width: `${((30 - seconds) / 30) * 100}%` }}
            ></div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row gap-8 overflow-hidden">
            {/* Ad Frame */}
            <div className="flex-1 min-h-[300px] md:min-h-0 bg-black rounded-[32px] overflow-hidden border border-white/10 shadow-inner relative group flex items-center justify-center">
              <div className="w-full relative" style={{ paddingBottom: '56.25%' }}>
                <iframe 
                  src={videoEmbedUrl}
                  className="absolute top-0 left-0 w-full h-full border-none opacity-90 group-hover:opacity-100 transition-opacity"
                  title="Dailymotion video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {!adClicked && (
                <div className="absolute inset-0 bg-orange-500/5 pointer-events-none group-hover:bg-transparent transition-colors"></div>
              )}
            </div>

            {/* Controls */}
            <div className="w-full md:w-80 flex flex-col space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white tracking-tight leading-none">Unlock Reward</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  Watch the video content for 30 seconds and click below to verify your session and claim coins.
                </p>
              </div>

              <div className="flex-1 space-y-4">
                <button 
                  onClick={handleAdClick}
                  className={`w-full py-5 rounded-[24px] font-black text-lg transition-all flex flex-col items-center justify-center space-y-1 group
                    ${adClicked 
                      ? 'bg-green-500/10 text-green-400 border-2 border-green-500/30' 
                      : 'bg-orange-600 text-white shadow-2xl hover:bg-orange-500 active:scale-95'}`}
                >
                  <span className="text-xs uppercase tracking-widest opacity-60">Step 1</span>
                  <span>{adClicked ? 'AD CLICKED ✓' : 'CLICK TO VISIT AD'}</span>
                </button>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900 p-4 rounded-2xl border border-white/5 flex flex-col items-center">
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Timer</span>
                    <span className="font-black text-2xl text-white">{seconds}s</span>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-2xl border border-white/5 flex flex-col items-center">
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Reward</span>
                    <span className="font-black text-2xl text-orange-500">+100</span>
                  </div>
                </div>
              </div>

              <button
                disabled={seconds > 0 || !adClicked}
                onClick={onComplete}
                className={`w-full py-6 rounded-[30px] font-black text-xl transition-all shadow-2xl
                  ${seconds === 0 && adClicked 
                    ? 'bg-white text-black hover:bg-slate-200 active:scale-[0.98]' 
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-white/5'}`}
              >
                {seconds > 0 ? `WAIT ${seconds}s` : adClicked ? 'CLAIM COINS 🐾' : 'CLICK VIDEO AD'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
        Secure Encryption • Instant Payouts • RewardCat v3.0
      </p>
    </div>
  );
};

export default AdPortal;
