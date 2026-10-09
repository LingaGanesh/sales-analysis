import React, { useState } from 'react';
import { STRATEGIC_INSIGHTS, OPERATIONAL_RISKS } from '../data/festivalData';
import { ChevronRight, AlertOctagon, Lightbulb, ShieldAlert, ArrowRight } from 'lucide-react';

interface StrategicInsightsViewProps {
  onSelectPlaybook?: () => void;
  onExploreHubs?: () => void;
}

export const StrategicInsightsView: React.FC<StrategicInsightsViewProps> = ({
  onSelectPlaybook,
  onExploreHubs,
}) => {
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null);

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* 2. Top 5 Key Strategic Insights for the Sales Manager */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase">Executive Guidance</div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
              2. Top 5 Key Strategic Insights for the Sales Manager
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">5 Core Predictive Vectors</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STRATEGIC_INSIGHTS.map((item) => {
            const isExpanded = selectedInsight === item.number;
            return (
              <div
                key={item.number}
                onClick={() => setSelectedInsight(isExpanded ? null : item.number)}
                className={`bg-slate-900/80 rounded-xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                  isExpanded 
                    ? 'border-amber-400/80 ring-1 ring-amber-400/30 bg-slate-850' 
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="font-semibold text-amber-400">Insight {item.number}</span>
                    <span className="text-slate-400">{item.impactArea}</span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-100 leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-amber-300 font-medium tabular-nums">{item.metric}</span>
                    <span className="text-slate-400 text-[11px] flex items-center gap-1 group-hover:text-amber-400">
                      {isExpanded ? 'Less' : 'Action detail'}
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg">
                      <strong className="text-amber-400 block mb-1">Operational Imperative:</strong>
                      {item.strategicNote}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Quick Summary Card */}
          <div className="bg-gradient-to-br from-slate-900 to-amber-950/30 rounded-xl p-5 border border-amber-900/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Executive Takeaway</span>
              </div>
              <h3 className="text-base font-semibold text-slate-100">
                Synchronized Pre-Festival Execution
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Diwali captures &gt;52% of total demand, but high lead times in Mobiles & Electronics 
                (10–14 days) make in-season stock replenishment impossible. Pre-positioning in Mother Hubs before T-14 is vital.
              </p>
            </div>
            {onSelectPlaybook && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPlaybook();
                }}
                className="mt-4 inline-flex items-center justify-between text-xs font-semibold text-amber-300 hover:text-amber-200 pt-3 border-t border-amber-900/40 cursor-pointer"
              >
                <span>Review Commercial Playbooks</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CRITICAL OPERATIONAL & LOGISTICAL RISKS IDENTIFIED BY AI */}
      <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
          <div className="flex items-center gap-2.5">
            <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0" />
            <h3 className="text-base sm:text-lg font-bold text-rose-200 tracking-tight">
              CRITICAL OPERATIONAL & LOGISTICAL RISKS IDENTIFIED BY AI
            </h3>
          </div>
          <span className="text-xs text-rose-300/80 font-mono">4 High-Vulnerability Chokepoints</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OPERATIONAL_RISKS.map((risk) => (
            <div
              key={risk.id}
              className="bg-slate-900/90 rounded-lg p-4 border border-rose-900/30 hover:border-rose-700/60 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-rose-300">{risk.name}</span>
                  <span className="text-slate-400 text-[11px]">{risk.hubOrScope}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {risk.description}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
                <span className="text-amber-400 font-medium">AI Countermeasure: </span>
                <span>{risk.aiIdentifiedResolution}</span>
              </div>
            </div>
          ))}
        </div>

        {onExploreHubs && (
          <div className="mt-5 flex justify-end">
            <button
              onClick={onExploreHubs}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-300 hover:text-rose-200 transition-colors cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Inspect Mother FC Hubs & Overload Capacities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
