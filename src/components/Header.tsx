import React from 'react';
import { Download, Printer } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onPrint }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button 
            onClick={() => setActiveTab('overview')}
            className="text-left font-bold tracking-tight text-white whitespace-nowrap shrink-0 text-base sm:text-lg flex items-center gap-2 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <span className="text-amber-400 font-extrabold tracking-wider">amazon</span>
            <span className="text-slate-300 font-normal">India</span>
            <span className="text-slate-500 font-light text-sm hidden sm:inline">| Sales Science Briefing</span>
          </button>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => setActiveTab('overview')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeTab === 'overview' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : ''
              }`}
            >
              Executive Summary
            </button>
            <button
              onClick={() => setActiveTab('projections')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeTab === 'projections' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : ''
              }`}
            >
              Demand Projections
            </button>
            <button
              onClick={() => setActiveTab('safetystock')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeTab === 'safetystock' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : ''
              }`}
            >
              Safety Stock & ROP
            </button>
            <button
              onClick={() => setActiveTab('playbooks')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeTab === 'playbooks' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : ''
              }`}
            >
              Commercial Playbooks
            </button>
            <button
              onClick={() => setActiveTab('logistics')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeTab === 'logistics' ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' : ''
              }`}
            >
              FC Hubs & Risks
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onPrint}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
              title="Print or save as Executive PDF Briefing"
            >
              <Printer className="w-4 h-4" />
              <span>Print Briefing</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
