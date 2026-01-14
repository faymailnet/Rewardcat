
import React from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const stats = [
    { label: 'Active Users', value: '125,402+', icon: '👥' },
    { label: 'Coins Distributed', value: '14.5M+', icon: '🪙' },
    { label: 'Premium Games', value: '35+', icon: '🎮' },
    { label: 'Total Payouts', value: '$840k+', icon: '💎' },
  ];

  const reviews = [
    { name: 'KittyTycoon', text: 'Best passive income app ever. The games are actually fun!', stars: 5, avatar: '🐈' },
    { name: 'ShadowPaws', text: 'Withdrew $50 last week. Instant and reliable.', stars: 5, avatar: '🐈‍⬛' },
    { name: 'MeowMaster', text: 'Age of Tanks is addictive. Leveling up feels rewarding.', stars: 4, avatar: '🐯' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-orange-500/30">
      {/* Hero Section */}
      <nav className="p-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-orange-600/30">RC</div>
          <span className="font-black text-2xl tracking-tighter italic uppercase">RewardCat</span>
        </div>
        <button 
          onClick={onEnter}
          className="bg-white/5 border border-white/10 px-8 py-3 rounded-2xl font-black text-sm hover:bg-orange-600 hover:text-white transition-all uppercase tracking-widest"
        >
          Enter Platform
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-24">
        {/* Banner */}
        <section className="text-center space-y-10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
          <div className="inline-block px-6 py-2 bg-orange-600/10 border border-orange-500/20 rounded-full text-orange-500 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">
            Next-Gen Earning Hub
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.8] drop-shadow-2xl">
            Play Games.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">Earn Wealth.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
            The world's #1 community-driven reward platform. Join thousands of gamers turning high-score streaks into real-world value.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <button 
              onClick={onEnter}
              className="group bg-orange-600 text-white px-12 py-6 rounded-[40px] font-black text-2xl shadow-2xl shadow-orange-600/20 hover:bg-orange-500 hover:scale-105 transition-all flex items-center space-x-4"
            >
              <span>LAUNCH APP</span>
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </button>
            <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-950 bg-slate-800 flex items-center justify-center text-xl shadow-xl">
                  {['🐱', '🐯', '🦁', '🐈'][i-1]}
                </div>
              ))}
              <div className="pl-6 flex flex-col items-start justify-center">
                <span className="text-xs font-black text-white">42k+ Users Online</span>
                <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">● Live Network</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(stat => (
            <div key={stat.label} className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-10 rounded-[50px] text-center space-y-4 hover:border-orange-500/30 transition-colors group">
              <span className="text-4xl group-hover:scale-125 transition-transform block">{stat.icon}</span>
              <div className="space-y-1">
                <p className="text-4xl font-black text-white tracking-tighter">{stat.value}</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Importance / Feature Section */}
        <section className="bg-slate-900/40 rounded-[60px] border border-white/5 p-12 md:p-20 flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <h2 className="text-5xl font-black italic tracking-tighter leading-none uppercase">Why the World is<br /><span className="text-orange-500">Meowing for RewardCat?</span></h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-16 h-16 shrink-0 bg-orange-600/20 rounded-2xl flex items-center justify-center text-3xl">🎮</div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black uppercase italic tracking-tight">Curated Game Library</h4>
                  <p className="text-slate-400 font-medium">No boring surveys. We host premium titles from Age of Tanks to Millionaire Life. Fun is our currency.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-16 h-16 shrink-0 bg-orange-600/20 rounded-2xl flex items-center justify-center text-3xl">🔒</div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black uppercase italic tracking-tight">Verified Blockchain Node</h4>
                  <p className="text-slate-400 font-medium">Every MeowCoin is backed by our decentralized reward engine. Secure, fast, and transparent withdrawals.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-16 h-16 shrink-0 bg-orange-600/20 rounded-2xl flex items-center justify-center text-3xl">🤝</div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black uppercase italic tracking-tight">User-First Ecosystem</h4>
                  <p className="text-slate-400 font-medium">Our online community is our pulse. Participate in daily global missions to multiply your earnings.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="aspect-square bg-gradient-to-br from-orange-600 to-amber-500 rounded-[80px] rotate-6 shadow-2xl overflow-hidden flex items-center justify-center group">
              <span className="text-[240px] group-hover:scale-110 transition-transform duration-700 animate-float">🐱</span>
            </div>
            <div className="absolute -bottom-10 -left-10 bg-slate-950 p-8 rounded-[40px] border border-white/10 shadow-2xl animate-bounce">
              <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest mb-1">New Payout</p>
              <p className="text-2xl font-black text-white italic">+50.00 USDT</p>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-4xl font-black italic uppercase tracking-tighter">Voice of the Pride</h3>
            <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.5em]">What our members say about us</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map(review => (
              <div key={review.name} className="bg-slate-900/60 p-10 rounded-[50px] border border-white/5 space-y-6 flex flex-col justify-between hover:-translate-y-2 transition-transform">
                <div className="space-y-4">
                  <div className="flex text-orange-500 text-sm">
                    {Array.from({ length: review.stars }).map((_, i) => <span key={i}>★</span>)}
                  </div>
                  <p className="text-slate-200 text-lg font-medium italic">"{review.text}"</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-2xl">{review.avatar}</div>
                  <div>
                    <p className="font-black text-white italic uppercase">{review.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Verified Earner</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-20 text-center">
           <div className="bg-gradient-to-r from-orange-600/20 to-amber-500/20 border border-orange-500/20 p-16 rounded-[80px] space-y-8">
              <h2 className="text-5xl font-black uppercase italic tracking-tighter">Ready to join the Hunt?</h2>
              <p className="text-slate-400 font-medium">Create your profile and start earning in less than 30 seconds.</p>
              <button 
                onClick={onEnter}
                className="bg-white text-black px-16 py-6 rounded-[40px] font-black text-2xl hover:bg-slate-200 shadow-2xl active:scale-95 transition-all"
              >
                OPEN REWARDCAT NOW
              </button>
           </div>
        </section>
      </main>

      <footer className="p-12 border-t border-white/5 text-center text-slate-600">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">© 2024 RewardCat Ecosystem • All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default LandingPage;
