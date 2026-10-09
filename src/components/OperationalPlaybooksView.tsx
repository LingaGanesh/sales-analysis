import React, { useState } from 'react';
import { OPERATIONAL_PLAYBOOKS, OperationalPlaybook } from '../data/festivalData';
import { CheckSquare, Square, ClipboardCheck, ArrowUpRight, ShieldCheck, Clock, Plane, Percent, BellRing, PackageCheck } from 'lucide-react';

export const OperationalPlaybooksView: React.FC = () => {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [activePlaybookId, setActivePlaybookId] = useState<string>('playbook-1');

  const toggleCheck = (key: string) => {
    setCompletedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getPlaybookIcon = (area: string) => {
    switch (area) {
      case 'Logistics':
        return <PackageCheck className="w-4 h-4 text-amber-400" />;
      case 'Pricing':
        return <Percent className="w-4 h-4 text-emerald-400" />;
      case 'Advertising':
        return <Clock className="w-4 h-4 text-sky-400" />;
      case 'Delivery':
        return <Plane className="w-4 h-4 text-indigo-400" />;
      case 'Merchandising':
        return <ShieldCheck className="w-4 h-4 text-purple-400" />;
      case 'Automation':
        return <BellRing className="w-4 h-4 text-rose-400" />;
      default:
        return <ClipboardCheck className="w-4 h-4 text-amber-400" />;
    }
  };

  const activePlaybook = OPERATIONAL_PLAYBOOKS.find((p) => p.id === activePlaybookId) || OPERATIONAL_PLAYBOOKS[0];

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Title */}
      <div>
        <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
          Standard Operating Procedures
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
          Amazon Commercial Strategy & Operational Playbooks
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Actionable Implementation Playbooks across Discounts, Advertising, Delivery & FC Inbound.
        </p>
      </div>

      {/* Grid of the 6 Playbooks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {OPERATIONAL_PLAYBOOKS.map((pb) => {
          const isSelected = activePlaybookId === pb.id;
          const completedCount = pb.checklist.filter((_, idx) => completedItems[`${pb.id}-${idx}`]).length;
          const totalCount = pb.checklist.length;

          return (
            <div
              key={pb.id}
              onClick={() => setActivePlaybookId(pb.id)}
              className={`bg-slate-900 rounded-xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-400 ring-1 ring-amber-400/40 bg-slate-850 shadow-lg'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <div className="flex items-center gap-2">
                    {getPlaybookIcon(pb.targetArea)}
                    <span className="font-semibold text-slate-200">Playbook {pb.number}</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">{pb.targetArea}</span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {pb.title}
                </h3>

                <p className="mt-2 text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {pb.details}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 text-xs">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="font-mono text-amber-300 text-[11px]">{pb.keyMetric}</span>
                  <span className="font-mono text-[11px] text-slate-400">{completedCount}/{totalCount} tasks</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full transition-all"
                    style={{ width: `${(completedCount / totalCount) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Playbook Detailed Execution Console */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
              {getPlaybookIcon(activePlaybook.targetArea)}
            </div>
            <div>
              <div className="text-xs font-semibold text-amber-400">
                Playbook #{activePlaybook.number} · {activePlaybook.targetArea} Execution
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {activePlaybook.title}
              </h3>
            </div>
          </div>

          <div className="text-xs font-mono text-amber-300 bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800 shrink-0">
            {activePlaybook.keyMetric}
          </div>
        </div>

        {/* Playbook narrative briefing */}
        <div className="py-5">
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
            {activePlaybook.details}
          </p>
        </div>

        {/* Interactive Action Checklist */}
        <div className="mt-2 bg-slate-950/70 rounded-xl p-5 border border-slate-800/80">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-semibold text-slate-300 tracking-wider uppercase">
              Operational Action Checklist & Sign-Offs
            </h4>
            <span className="text-[11px] text-slate-400">Click task to mark completed</span>
          </div>

          <div className="space-y-2.5">
            {activePlaybook.checklist.map((item, idx) => {
              const checkKey = `${activePlaybook.id}-${idx}`;
              const isDone = !!completedItems[checkKey];

              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(checkKey)}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer select-none ${
                    isDone
                      ? 'bg-emerald-950/20 border-emerald-900/40 text-slate-300'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {isDone ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                  <div className="text-xs sm:text-sm leading-snug">
                    <span className={isDone ? 'line-through text-slate-400' : 'text-slate-100 font-medium'}>
                      {item}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
