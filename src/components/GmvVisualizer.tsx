import React, { useMemo } from 'react';
import { DEMAND_PROJECTIONS, FESTIVALS, CATEGORIES, CATEGORY_METRICS } from '../data/festivalData';
import { formatIndianNumber, formatInrCrores } from '../utils/formatters';
import { PieChart, TrendingUp, BarChart3, Layers, ShoppingBag, Sparkles } from 'lucide-react';

export const GmvVisualizer: React.FC = () => {
  // Aggregate festival unit distribution
  const festivalStats = useMemo(() => {
    return FESTIVALS.map((fest) => {
      const festProjections = DEMAND_PROJECTIONS.filter((p) => p.festival === fest);
      const units = festProjections.reduce((acc, curr) => acc + curr.predictedUnits, 0);
      return {
        festival: fest,
        units,
        percentOfTotal: ((units / 4900000) * 100).toFixed(1),
      };
    }).sort((a, b) => b.units - a.units);
  }, []);

  // Category volume vs GMV contribution
  const categoryStats = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const catProjections = DEMAND_PROJECTIONS.filter((p) => p.category === cat);
      const units = catProjections.reduce((acc, curr) => acc + curr.predictedUnits, 0);
      const metrics = CATEGORY_METRICS[cat];
      return {
        category: cat,
        units,
        unitPercent: ((units / 4900000) * 100).toFixed(1),
        gmvShare: metrics.shareGmv,
        avgPrice: metrics.avgPrice,
        desc: metrics.unitShareDesc,
      };
    });
  }, []);

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
            Commercial Analytics
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
            Gross GMV (INR 4,663 Cr) vs Physical Parcel Volume Dynamics
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Total Festive Volume: </span>
          <strong className="text-amber-400">4.90M Units</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Festival Volume Distribution (Diwali > 52%) */}
        <div className="bg-slate-950/70 rounded-xl p-5 border border-slate-800">
          <div className="flex items-center justify-between text-xs mb-4">
            <span className="font-semibold text-slate-200 uppercase tracking-wider">
              Demand Split by Festival Event
            </span>
            <span className="text-amber-400 font-medium">Diwali Spike &gt;52%</span>
          </div>

          <div className="space-y-3">
            {festivalStats.map((item) => {
              const isDiwali = item.festival === 'Diwali';

              return (
                <div key={item.festival} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className={`font-semibold ${isDiwali ? 'text-amber-400' : 'text-slate-300'}`}>
                      {item.festival}
                    </span>
                    <div className="flex items-center gap-2 font-mono tabular-nums">
                      <span className="text-white font-medium">{formatIndianNumber(item.units)} units</span>
                      <span className="text-slate-400">({item.percentOfTotal}%)</span>
                    </div>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isDiwali ? 'bg-amber-400' : 'bg-slate-600'
                      }`}
                      style={{ width: `${item.percentOfTotal}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            *Diwali accounts for over half of total annual festive fulfillment surge, demanding maximum line-haul and hub staffing focus.
          </div>
        </div>

        {/* Right: GMV Contribution vs Parcel Drivers */}
        <div className="bg-slate-950/70 rounded-xl p-5 border border-slate-800">
          <div className="flex items-center justify-between text-xs mb-4">
            <span className="font-semibold text-slate-200 uppercase tracking-wider">
              GMV Share vs Parcel Volume Driver
            </span>
            <span className="text-amber-400 font-medium">76.3% GMV in Top 2</span>
          </div>

          <div className="space-y-3">
            {categoryStats.map((item) => {
              const isHighGmv = item.category === 'Mobiles & Accessories' || item.category === 'Electronics & Appliances';
              const isFashion = item.category === 'Fashion & Apparel';

              return (
                <div key={item.category} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-200">{item.category}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-amber-300 font-mono font-bold">{item.gmvShare} GMV</span>
                      <span className="text-slate-400 font-mono text-[11px]">({item.unitPercent}% units)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-400">
                    <span>{item.desc}</span>
                    <span className="font-mono text-slate-300">ASP: ₹{formatIndianNumber(item.avgPrice)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            *Fashion generates highest parcel volume for ATS sortation; Mobiles and Large Appliances drive bulk financial GMV.
          </div>
        </div>
      </div>
    </div>
  );
};
