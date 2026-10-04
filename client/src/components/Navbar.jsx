import React from 'react';
import { Terminal, BarChart2, Sparkles, ShieldCheck } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, totalRegistrations = 342, onEnrollClick }) {
  const seatsRemaining = Math.max(0, 500 - totalRegistrations);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#050508]/85 border-b border-white/[0.08] px-4 md:px-8 py-3.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('student')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            <Terminal className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white font-sans">NxtWave</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                AI LABS
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-medium">Hands-On Engineering Masterclass</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Seats Ticker */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{seatsRemaining} Seats Remaining (Cap: 500)</span>
          </div>

          {/* View Switcher: Workshop vs Analytics Console */}
          <div className="flex items-center p-1 rounded-xl bg-zinc-900/90 border border-white/[0.08] text-xs font-medium">
            <button
              onClick={() => setActiveTab('student')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'student'
                  ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>Workshop Portal</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Growth Console</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
