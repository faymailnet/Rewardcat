
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Page, UserProfile, DailyChallenge, Game, Transaction } from './types';
import { GAMES, INITIAL_ACHIEVEMENTS, SAMPLE_LEADERBOARD } from './constants';
import UniversalGame from './components/games/UniversalGame';
import AdPortal from './components/AdPortal';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [user, setUser] = useState<UserProfile>({
    id: '1',
    name: 'WhiskersMaster',
    balance: 500,
    level: 5,
    xp: 240,
    streak: 3,
    avatar: '🐱',
    stats: {
      totalGamesPlayed: 42,
      totalCoinsEarned: 2450,
      pindinoHighScore: 0,
      catDashHighScore: 1200,
      winRate: 68
    },
    achievements: INITIAL_ACHIEVEMENTS,
    transactions: [
      { id: 't1', type: 'Game', amount: 50, date: '2023-10-27 14:20', status: 'Completed' },
      { id: 't2', type: 'Ad', amount: 100, date: '2023-10-27 15:10', status: 'Completed' }
    ]
  });

  const [activePage, setActivePage] = useState<Page>(Page.DASHBOARD);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showAdPortal, setShowAdPortal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [challenges] = useState<DailyChallenge[]>([
    { id: '1', task: 'Watch Ad Portal', reward: 100, completed: false },
    { id: '2', task: 'Try Millionaire Life', reward: 50, completed: false },
    { id: '3', task: 'Play 3 Games Today', reward: 150, completed: false }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const addCoins = (amount: number, type: Transaction['type'] = 'Game') => {
    setUser(prev => {
      const newBalance = prev.balance + amount;
      const newStats = { ...prev.stats };
      newStats.totalCoinsEarned += amount;
      
      const newTransaction: Transaction = {
        id: `t-${Date.now()}`,
        type,
        amount,
        date: new Date().toLocaleString(),
        status: 'Completed'
      };

      const addedXp = 25;
      const totalXp = prev.xp + addedXp;
      const newLevel = totalXp >= 500 ? prev.level + 1 : prev.level;
      const remainingXp = totalXp % 500;

      return {
        ...prev,
        balance: newBalance,
        stats: newStats,
        transactions: [newTransaction, ...prev.transactions].slice(0, 20),
        level: newLevel,
        xp: remainingXp
      };
    });
  };

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setActivePage(Page.GAME_VIEW);
  };

  if (showLanding) {
    return <LandingPage onEnter={() => setShowLanding(false)} />;
  }

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-700">
      <section className="bg-gradient-to-br from-orange-600 to-amber-500 rounded-[40px] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl glow-orange">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight drop-shadow-lg italic uppercase leading-tight">Master's Vault 🐾</h1>
          <p className="opacity-95 text-lg md:text-xl leading-relaxed font-bold">Your cat tower is booming. Play our premium curated games to earn instant MeowCoins!</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button onClick={() => setShowAdPortal(true)} className="bg-slate-950 text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all shadow-xl flex items-center space-x-3 group">
              <span className="group-hover:animate-bounce">⚡</span> 
              <span>AD PORTAL (+100)</span>
            </button>
            <button onClick={() => setActivePage(Page.GAMES)} className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-2xl font-black hover:bg-white/30 transition-all">
              OPEN LOBBY
            </button>
          </div>
        </div>
        <div className="absolute right-[-40px] bottom-[-40px] text-[280px] opacity-10 pointer-events-none animate-float select-none">🐱</div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white flex items-center italic uppercase">
              <span className="mr-3 text-orange-500 bg-orange-500/10 w-10 h-10 rounded-xl flex items-center justify-center">⚡</span> 
              Daily Missions
            </h2>
            <div className="grid gap-4">
              {challenges.map(challenge => (
                <div key={challenge.id} className="bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-orange-500/40 transition-all">
                  <div className="flex items-center space-x-5">
                    <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-orange-500 font-black text-xs border border-white/5">0%</div>
                    <span className="text-slate-200 font-black text-lg italic uppercase tracking-tight">{challenge.task}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-orange-500 text-2xl tracking-tighter italic">+{challenge.reward} 🪙</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-white flex items-center italic uppercase">
            <span className="mr-3 text-orange-500 bg-orange-500/10 w-10 h-10 rounded-xl flex items-center justify-center">🏆</span> 
            Level Status
          </h2>
          <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-[40px] border border-white/5 shadow-2xl space-y-8">
            <div className="flex justify-between items-end">
               <div className="space-y-1">
                 <span className="text-[10px] font-black text-orange-500 tracking-[0.2em] uppercase">Current Level</span>
                 <p className="text-4xl font-black text-white">Lvl {user.level}</p>
               </div>
               <div className="text-right">
                 <span className="text-slate-400 font-black text-sm">{user.xp} / 500 <span className="text-[10px] text-slate-600">XP</span></span>
               </div>
            </div>
            <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden p-1 shadow-inner">
               <div className="h-full bg-orange-500 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(249,115,22,0.6)]" style={{ width: `${(user.xp / 500) * 100}%` }}></div>
            </div>
            <div className="bg-orange-500/5 p-4 rounded-2xl border border-orange-500/10 text-center">
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                 Next Reward: <span className="text-orange-500">+250 MeowCoins</span>
               </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const renderGAMES = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-600">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-6xl font-black text-white tracking-tighter italic uppercase">Game Lobby</h1>
          <p className="text-orange-500 font-black uppercase tracking-[0.4em] text-xs mt-2">Premium Curated Catalog</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-10">
        {GAMES.map(game => (
          <div 
            key={game.id} 
            onClick={() => handleGameSelect(game)}
            className="bg-slate-900/40 backdrop-blur-md rounded-[50px] overflow-hidden border border-white/5 shadow-2xl hover:border-orange-500/50 hover:-translate-y-4 transition-all group cursor-pointer"
          >
            <div className="relative h-48 md:h-64 flex items-center justify-center bg-slate-800/20 group-hover:bg-slate-800/40 transition-colors">
              <span className="text-7xl md:text-9xl transform group-hover:scale-125 transition-transform duration-500 select-none">{game.image}</span>
              <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg">
                +{game.reward} 🪙
              </div>
            </div>
            <div className="p-8 md:p-10 bg-slate-950/40">
              <span className="text-[10px] uppercase font-black text-orange-500 tracking-[0.2em]">{game.category}</span>
              <h3 className="font-black text-white text-3xl mt-2 truncate group-hover:text-orange-500 transition-colors uppercase italic tracking-tighter">{game.title}</h3>
              <p className="text-slate-600 text-sm font-medium mt-3 line-clamp-2 leading-relaxed">{game.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Layout activePage={activePage} setActivePage={setActivePage} balance={user.balance}>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-10">
          <div className="text-[120px] animate-float drop-shadow-[0_0_50px_rgba(249,115,22,0.5)]">🐱</div>
          <div className="flex flex-col items-center space-y-4">
            <p className="text-orange-500 font-black tracking-[0.5em] uppercase text-sm animate-pulse">Syncing Play Session</p>
            <div className="w-64 h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5 relative">
              <div className="absolute top-0 left-0 h-full bg-orange-500 w-1/3 animate-loading"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {showAdPortal && (
            <div className="animate-in fade-in zoom-in-95 duration-400">
              <AdPortal onComplete={() => { addCoins(100, 'Ad'); setShowAdPortal(false); }} onCancel={() => setShowAdPortal(false)} />
            </div>
          )}
          {activePage === Page.DASHBOARD && renderDashboard()}
          {activePage === Page.GAMES && renderGAMES()}
          {activePage === Page.LEADERBOARD && (
            <div className="max-w-4xl mx-auto space-y-10 animate-in slide-in-from-bottom-8 duration-500">
               <div className="text-center space-y-3">
                 <h1 className="text-6xl font-black text-white italic tracking-tighter uppercase">Global Whiskers</h1>
                 <p className="text-orange-500 font-black uppercase tracking-[0.5em] text-xs">The Top Earners Worldwide</p>
               </div>
               <div className="bg-slate-900/50 backdrop-blur-xl rounded-[50px] overflow-hidden border border-white/5 shadow-2xl">
                 {SAMPLE_LEADERBOARD.map((entry, i) => (
                   <div key={i} className={`flex items-center justify-between p-8 border-b border-white/5 last:border-0 ${entry.isUser ? 'bg-orange-500/10' : 'hover:bg-white/5'}`}>
                     <div className="flex items-center space-x-8">
                       <span className={`text-2xl font-black w-10 ${i < 3 ? 'text-orange-500' : 'text-slate-600'} italic`}>#{i+1}</span>
                       <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-4xl shadow-lg border border-white/10">{entry.avatar}</div>
                       <div>
                         <span className={`font-black text-2xl uppercase italic ${entry.isUser ? 'text-orange-500' : 'text-white'}`}>{entry.name} {entry.isUser && '(YOU)'}</span>
                         <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Master Tier</p>
                       </div>
                     </div>
                     <div className="text-right">
                        <span className="text-3xl font-black text-white tracking-tighter italic">{entry.score.toLocaleString()} <span className="text-orange-500 text-sm">🪙</span></span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          )}
          {activePage === Page.WALLET && (
            <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500">
               <section className="bg-slate-900 p-12 md:p-20 rounded-[60px] border border-white/5 shadow-2xl relative overflow-hidden group">
                 <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="text-center md:text-left">
                       <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-xs">Verified Balance</span>
                       <h1 className="text-8xl md:text-9xl font-black text-white tracking-tighter mt-4 leading-none">{user.balance.toLocaleString()} <span className="text-orange-500 text-4xl md:text-5xl italic">🪙</span></h1>
                       <p className="text-slate-500 font-bold mt-4 text-lg">Transaction status: <span className="text-green-500">SECURE</span></p>
                    </div>
                    <div className="flex flex-col gap-4 w-full md:w-auto">
                       <button className="bg-white text-black px-12 py-6 rounded-3xl font-black text-2xl hover:bg-slate-200 transition-all shadow-xl active:scale-95">WITHDRAW</button>
                    </div>
                 </div>
                 <div className="absolute right-[-40px] top-[-40px] text-[250px] opacity-5 select-none pointer-events-none">💳</div>
               </section>
            </div>
          )}
          {activePage === Page.PROFILE && (
            <div className="max-w-4xl mx-auto space-y-10 animate-in slide-in-from-right-8 duration-600">
               <section className="bg-slate-900/60 p-12 md:p-20 rounded-[60px] shadow-2xl border border-white/5 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden text-center md:text-left">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 p-2 shadow-2xl shrink-0">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[100px] select-none">
                      {user.avatar}
                    </div>
                  </div>
                  <div className="flex-1 space-y-6">
                    <div>
                       <h1 className="text-6xl font-black text-white tracking-tighter italic uppercase leading-none">{user.name}</h1>
                       <div className="flex items-center justify-center md:justify-start space-x-3 mt-4">
                         <span className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-lg shadow-lg">ELITE TIER 5</span>
                         <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Joined Oct 2023</span>
                       </div>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                       <div className="bg-slate-950/80 px-8 py-4 rounded-3xl border border-white/5">
                          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Lifetime</p>
                          <p className="text-2xl font-black text-white">{user.stats.totalCoinsEarned} 🪙</p>
                       </div>
                    </div>
                  </div>
               </section>
            </div>
          )}
          {activePage === Page.GAME_VIEW && selectedGame && (
            <div className="flex flex-col items-center py-6 space-y-10 animate-in zoom-in-95 duration-400">
              <UniversalGame 
                game={selectedGame} 
                onWin={(amount) => { addCoins(amount, 'Game'); setActivePage(Page.GAMES); }} 
                onClose={() => setActivePage(Page.GAMES)} 
              />
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default App;
