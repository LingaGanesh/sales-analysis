import React from 'react';
import { MOTHER_FC_HUBS } from '../data/festivalData';
import { Truck, Plane, AlertTriangle, ShieldCheck, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export const FCHubRiskRadar: React.FC = () => {
  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
          Supply Chain Nodes & Logistics
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
          Fulfillment Center (FC) Hubs & Bottleneck Radar
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Bhiwandi, Bilaspur, and Nelamangala Mother Hub throughput telemetry, air charters, and ATS carrier inbound.
        </p>
      </div>

      {/* Mother Hubs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {MOTHER_FC_HUBS.map((hub) => {
          const isCritical = hub.status === 'Critical Alert';

          return (
            <div
              key={hub.name}
              className={`bg-slate-900 rounded-xl p-6 border flex flex-col justify-between ${
                isCritical
                  ? 'border-rose-900/50 hover:border-rose-700/80 ring-1 ring-rose-900/30'
                  : 'border-amber-900/40 hover:border-amber-700/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-slate-400 font-mono text-[11px]">{hub.region}</span>
                  <span
                    className={`font-semibold flex items-center gap-1.5 ${
                      isCritical ? 'text-rose-400' : 'text-amber-400'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isCritical ? 'bg-rose-500' : 'bg-amber-400'
                      }`}
                    />
                    {hub.status}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-bold text-white leading-snug">{hub.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{hub.city}</p>
                  </div>
                </div>

                {/* Overload badge */}
                <div className="mt-4 p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Festive Overload Run-rate</div>
                  <div className="text-sm font-bold font-mono text-rose-300 mt-0.5">
                    {hub.festiveOverload}
                  </div>
                </div>

                {/* Primary categories handled */}
                <div className="mt-4">
                  <span className="text-xs font-semibold text-slate-400 block mb-1.5">
                    Critical Inventory Flow:
                  </span>
                  <div className="flex flex-wrap gap-1 text-xs text-slate-300">
                    {hub.primaryCategories.map((c, i) => (
                      <span key={i} className="text-slate-300 text-xs">
                        {c}{i < hub.primaryCategories.length - 1 ? ' · ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mitigation action */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 text-xs">
                <span className="text-amber-400 font-medium block mb-1">Pre-Positioning Mandate:</span>
                <p className="text-slate-300 leading-relaxed">{hub.keyMitigation}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Amazon Transportation Services (ATS) & Air Charter Strip */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <Plane className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Amazon Air Charters & Flex Delivery Expansion
              </h3>
              <p className="text-xs text-slate-400">
                Air freight contingency routing on trunk corridors to bypass passenger flight belly cargo delays.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-indigo-300 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 shrink-0">
            <span>Dedicated Boeing 737 Cargo Fleet</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-xs text-slate-300">
          <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800">
            <div className="font-semibold text-white mb-1">Trunk Corridor Air Charters</div>
            <p className="text-slate-400 leading-relaxed">
              Direct charter flights connecting Delhi (DEL), Mumbai (BOM), and Bengaluru (BLR) with dedicated 15-minute offload turnarounds.
            </p>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800">
            <div className="font-semibold text-white mb-1">+35% Amazon Flex Courier Scale</div>
            <p className="text-slate-400 leading-relaxed">
              Crowd-sourced driver onboarding accelerated 14 days ahead of Diwali across top 40 Tier-1 and Tier-2 pin-code delivery stations.
            </p>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800">
            <div className="font-semibold text-white mb-1">CARP T-21 Day Appointment Lock</div>
            <p className="text-slate-400 leading-relaxed">
              Tier-1 sellers must reserve carrier receiving appointments 21 days in advance to eliminate dock congestion and dwell spikes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
