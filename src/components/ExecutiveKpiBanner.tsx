import React from 'react';
import { TrendingUp, AlertTriangle, Cpu, ShoppingBag, Layers, IndianRupee } from 'lucide-react';

interface ExecutiveKpiBannerProps {
  onNavigateToTable: () => void;
  onNavigateToSafetyStock: () => void;
}

export const ExecutiveKpiBanner: React.FC<ExecutiveKpiBannerProps> = ({
  onNavigateToTable,
  onNavigateToSafetyStock,
}) => {
  return (
    <div className="bg-slate-900 border-b border-slate-800">
      {/* Confidential Executive Bar */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">AMAZON INDIA</span>
            <span aria-hidden="true">·</span>
            <span>SALES SCIENCE & GENERATIVE AI CONSULTING</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400 font-medium">CONFIDENTIAL EXECUTIVE BRIEFING</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
            <span>Cycle: Q3-Q4 Peak Festivals</span>
            <span aria-hidden="true">·</span>
            <span>Ref: IND-SS-2026-FESTIVE</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Executive Sales Forecast & Festive Demand Briefing
          </h1>
          <p className="mt-2 text-base text-slate-300">
            Multi-Festival Demand Projections across <span className="text-amber-300 font-medium">Diwali</span>,{' '}
            <span className="text-amber-300 font-medium">Dussehra</span>,{' '}
            <span className="text-amber-300 font-medium">Holi</span>,{' '}
            <span className="text-amber-300 font-medium">Eid</span>,{' '}
            <span className="text-amber-300 font-medium">Pongal</span> &{' '}
            <span className="text-amber-300 font-medium">Christmas</span>.
          </p>
        </div>

        {/* 4 Core Primary Executive KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700/60 hover:border-slate-600 transition-colors">
            <div className="text-xs font-semibold text-slate-400 tracking-wider">PROJECTED VOLUME</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">4.90M</span>
              <span className="text-xs text-slate-400 font-medium">Units</span>
            </div>
            <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+15% to +18% YoY secular lift</span>
            </div>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700/60 hover:border-slate-600 transition-colors">
            <div className="text-xs font-semibold text-slate-400 tracking-wider">ESTIMATED GROSS GMV</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">INR 4,663 Cr</span>
            </div>
            <div className="mt-2 text-xs text-slate-400">
              <span className="text-amber-300 font-semibold">&gt;76% GMV</span> from Mobiles & Electronics
            </div>
          </div>

          <div 
            onClick={onNavigateToSafetyStock}
            className="bg-slate-800/60 rounded-xl p-5 border border-rose-900/40 hover:border-rose-500/60 transition-colors cursor-pointer group"
          >
            <div className="text-xs font-semibold text-rose-300 tracking-wider flex items-center justify-between">
              <span>CRITICAL STOCK SHORTAGES</span>
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono tabular-nums">28 Categories</span>
            </div>
            <div className="mt-2 text-xs text-rose-300/80">
              Immediate injection & FC rebalance required
            </div>
          </div>

          <div 
            onClick={onNavigateToTable}
            className="bg-slate-800/60 rounded-xl p-5 border border-slate-700/60 hover:border-slate-600 transition-colors cursor-pointer"
          >
            <div className="text-xs font-semibold text-slate-400 tracking-wider flex items-center justify-between">
              <span>ACTIVE SCENARIO</span>
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-300 font-mono">ENSEMBLE</span>
            </div>
            <div className="mt-2 text-xs text-slate-400">
              Random Forest + Ridge + Holt-Winters
            </div>
          </div>
        </div>

        {/* Section 1: Executive Context & Commercial Summary */}
        <div className="mt-8 bg-slate-950/60 rounded-xl border border-slate-800 p-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
            <span>1. Executive Context & Commercial Summary</span>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            During major Indian festive events, Amazon India experiences extreme non-linear demand multipliers 
            ranging from <strong className="text-white font-semibold">3.0x to 5.8x</strong> baseline velocity. Predictive machine learning models 
            (Ensemble of Random Forest, Ridge Regression, and Holt-Winters Time-Series) forecast secular year-on-year 
            demand growth of <strong className="text-emerald-400 font-semibold">15% to 18%</strong>. While Fashion drives aggregate physical parcel 
            volume, Mobiles and Electronics contribute over <strong className="text-amber-400 font-semibold">76% of Gross Merchandise Value</strong>. Operational 
            focus must balance high-converting promotional pricing against critical supply-chain replenishment lead times.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-slate-800/80 text-xs">
            <div className="flex items-start gap-3">
              <ShoppingBag className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400">Parcel Volume Driver</span>
                <p className="font-semibold text-slate-200 mt-0.5">Fashion & Apparel (Elasticity: -2.35)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <IndianRupee className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400">Revenue Foundation</span>
                <p className="font-semibold text-slate-200 mt-0.5">Mobiles & High-ASP Appliances (&gt;76% GMV)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Layers className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400">Demand Multiplier Window</span>
                <p className="font-semibold text-slate-200 mt-0.5">3.0x to 5.8x Run-Rate Peak Surge</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
