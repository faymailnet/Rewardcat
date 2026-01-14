
import React from 'react';
import { Page } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activePage: Page;
  setActivePage: (page: Page) => void;
  balance: number;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, setActivePage, balance }) => {
  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pl-20 flex flex-col bg-slate-950 text-slate-100">
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-20 flex-col items-center py-8 space-y-8 bg-slate-900/80 backdrop-blur-xl border-r border-white/5 z-50 shadow-2xl">
        <div 
          onClick={() => setActivePage(Page.DASHBOARD)}
          className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-orange-500/20 cursor-pointer hover:scale-110 transition-transform"
        >
          RC
        </div>
        <div className="flex-1 flex flex-col space-y-6">
          <NavItem icon="🏠" active={activePage === Page.DASHBOARD} onClick={() => setActivePage(Page.DASHBOARD)} />
          <NavItem icon="🎮" active={activePage === Page.GAMES || activePage === Page.GAME_VIEW} onClick={() => setActivePage(Page.GAMES)} />
          <NavItem icon="🏆" active={activePage === Page.LEADERBOARD} onClick={() => setActivePage(Page.LEADERBOARD)} />
          <NavItem icon="💰" active={activePage === Page.WALLET} onClick={() => setActivePage(Page.WALLET)} />
          <NavItem icon="👤" active={activePage === Page.PROFILE} onClick={() => setActivePage(Page.PROFILE)} />
        </div>
        <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 font-bold text-[10px] text-center">
          {balance}
        </div>
      </nav>

      {/* Header */}
      <header className="sticky top-0 bg-slate-950/80 backdrop-blur-xl z-40 px-6 py-4 flex items-center justify-between md:hidden border-b border-white/5">
        <div className="flex items-center space-x-2" onClick={() => setActivePage(Page.DASHBOARD)}>
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">C</div>
          <span className="font-bold text-white tracking-tight">RewardCat</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full space-x-1">
            <span className="text-orange-500 font-bold text-sm">🪙 {balance}</span>
          </div>
          <button onClick={() => setActivePage(Page.PROFILE)} className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-xl overflow-hidden">
            🐱
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-slate-900/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-around z-50">
        <NavItem icon="🏠" active={activePage === Page.DASHBOARD} onClick={() => setActivePage(Page.DASHBOARD)} />
        <NavItem icon="🎮" active={activePage === Page.GAMES || activePage === Page.GAME_VIEW} onClick={() => setActivePage(Page.GAMES)} />
        <NavItem icon="🏆" active={activePage === Page.LEADERBOARD} onClick={() => setActivePage(Page.LEADERBOARD)} />
        <NavItem icon="💰" active={activePage === Page.WALLET} onClick={() => setActivePage(Page.WALLET)} />
        <NavItem icon="👤" active={activePage === Page.PROFILE} onClick={() => setActivePage(Page.PROFILE)} />
      </nav>
    </div>
  );
};

const NavItem = ({ icon, active, onClick }: { icon: string; active: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300 text-2xl
      ${active ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 scale-110' : 'text-slate-500 hover:bg-white/5'}`}
  >
    {icon}
  </button>
);

export default Layout;