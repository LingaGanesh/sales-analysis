import React, { useState, useMemo } from 'react';
import { DEMAND_PROJECTIONS, FESTIVALS, DemandProjection } from '../data/festivalData';
import { formatIndianNumber } from '../utils/formatters';
import { Calculator, AlertTriangle, CheckCircle, RefreshCw, Layers, ShieldCheck, ArrowRight } from 'lucide-react';

interface SlaLevel {
  label: string;
  zValue: number;
  slaPercent: string;
  description: string;
}

const SLA_LEVELS: SlaLevel[] = [
  { label: 'Standard (90%)', zValue: 1.28, slaPercent: '90.0%', description: 'Non-peak baseline replenishment' },
  { label: 'Commercial (95%)', zValue: 1.65, slaPercent: '95.0%', description: 'General retail festive buffer' },
  { label: 'Prime SLA (98%)', zValue: 2.05, slaPercent: '98.0%', description: 'Official Amazon Prime Event Standard' },
  { label: 'Zero-Stockout (99%)', zValue: 2.33, slaPercent: '99.0%', description: 'High-ASP Marquee flagship launches' },
  { label: 'Mission-Critical (99.9%)', zValue: 3.09, slaPercent: '99.9%', description: 'Unbuffered single-source supplier' },
];

export const SafetyStockCalculator: React.FC = () => {
  // Simulator state
  const [selectedFestival, setSelectedFestival] = useState<string>('Diwali');
  const [selectedCategory, setSelectedCategory] = useState<string>('Electronics & Appliances');
  const [selectedZIndex, setSelectedZIndex] = useState<number>(2); // 98% Prime SLA default
  const [customLeadTime, setCustomLeadTime] = useState<number>(14);
  const [customStdDevRatio, setCustomStdDevRatio] = useState<number>(0.22); // 22% standard deviation
  const [tableFestivalFilter, setTableFestivalFilter] = useState<string>('All');

  // Selected item base data
  const baseItem = useMemo(() => {
    return DEMAND_PROJECTIONS.find(
      (p) => p.festival === selectedFestival && p.category === selectedCategory
    ) || DEMAND_PROJECTIONS[1]; // default Diwali Electronics
  }, [selectedFestival, selectedCategory]);

  // Update custom lead time when baseItem changes
  React.useEffect(() => {
    setCustomLeadTime(baseItem.leadTimeDays);
  }, [baseItem]);

  // Calculations for simulator
  const simResults = useMemo(() => {
    const totalFestiveDemand = baseItem.demand;
    // Assume 7-day intense festive surge window
    const festiveDays = 7;
    const dailyAverageRunRate = Math.round(totalFestiveDemand / festiveDays);
    const sigmaD = Math.round(dailyAverageRunRate * customStdDevRatio);
    const z = SLA_LEVELS[selectedZIndex].zValue;
    const sqrtL = Math.sqrt(customLeadTime);
    
    // Formula: SS = Z * sigma_d * sqrt(L)
    const safetyStock = Math.round(z * sigmaD * sqrtL);
    
    // Lead time demand: d_bar * L
    const leadTimeDemand = Math.round(dailyAverageRunRate * customLeadTime);
    
    // ROP = (Daily Run Rate * L) + SS
    const reorderPoint = leadTimeDemand + safetyStock;

    // Projected shortfall with current stock
    const deficitDelta = baseItem.stock - (baseItem.demand + safetyStock);

    return {
      dailyAverageRunRate,
      sigmaD,
      z,
      sqrtL: sqrtL.toFixed(2),
      safetyStock,
      leadTimeDemand,
      reorderPoint,
      deficitDelta,
    };
  }, [baseItem, selectedZIndex, customLeadTime, customStdDevRatio]);

  // Filtered shortfall table data
  const tableData = useMemo(() => {
    if (tableFestivalFilter === 'All') return DEMAND_PROJECTIONS;
    return DEMAND_PROJECTIONS.filter((p) => p.festival === tableFestivalFilter);
  }, [tableFestivalFilter]);

  const totalDeficitUnits = useMemo(() => {
    return tableData.reduce((acc, curr) => acc + (curr.deficit < 0 ? Math.abs(curr.deficit) : 0), 0);
  }, [tableData]);

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Title & Official Formulation Banner */}
      <div>
        <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
          Inventory Science & Optimization
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
          Stock-Out Shortfall & Safety Stock Optimization
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Mathematical Inventory Sizing: SS = Z · σ_d · √L and Reorder Point Calculations
        </p>
      </div>

      {/* FORMULATIONS CARD */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-6 space-y-4">
        <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
          MATHEMATICAL FORMULATIONS EMPLOYED IN SIZING INVENTORY:
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block mb-1">Safety Stock Model</span>
            <div className="font-mono text-base font-bold text-amber-300">
              SS = Z × σ_d × √L
            </div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Where <strong className="text-slate-200">Z = 2.05</strong> for 98% Prime Service Level SLA; <strong className="text-slate-200">L</strong> = Supplier Lead Time in days.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block mb-1">Velocity Volatility</span>
            <div className="font-mono text-base font-bold text-amber-300">
              σ_d ≈ 22% × Run-Rate
            </div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Daily Standard Deviation (<strong className="text-slate-200">σ_d</strong>) modeled at ~22% of mean daily festive run-rate velocity.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block mb-1">Replenishment Trigger</span>
            <div className="font-mono text-base font-bold text-amber-300">
              ROP = (d̄ × L) + SS
            </div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Reorder Point (<strong className="text-slate-200">ROP</strong>) ensures replenishment POs are dispatched before inventory dips below the safety buffer.
            </p>
          </div>
        </div>
      </div>

      {/* INTERACTIVE SIMULATOR */}
      <div className="bg-slate-900 rounded-xl border border-amber-900/40 p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Safety Stock & Reorder Point (ROP) Simulator
            </h3>
          </div>
          <span className="text-xs text-amber-400/90 font-mono">Live Parameter Calibration</span>
        </div>

        {/* Input Parameters Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Festival Selection */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">
              Select Festival:
            </label>
            <select
              value={selectedFestival}
              onChange={(e) => setSelectedFestival(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            >
              {FESTIVALS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* Category Selection */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">
              Select Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            >
              {DEMAND_PROJECTIONS.filter((p) => p.festival === selectedFestival).map((p) => (
                <option key={p.id} value={p.category}>
                  {p.category}
                </option>
              ))}
            </select>
          </div>

          {/* SLA Service Level */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">
              Service Level SLA (Z-Score):
            </label>
            <select
              value={selectedZIndex}
              onChange={(e) => setSelectedZIndex(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-amber-300 font-medium focus:outline-none focus:border-amber-400"
            >
              {SLA_LEVELS.map((level, idx) => (
                <option key={level.label} value={idx}>
                  {level.label} (Z = {level.zValue})
                </option>
              ))}
            </select>
          </div>

          {/* Lead Time Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-1.5">
              <span>Lead Time (L):</span>
              <span className="text-amber-400 font-mono">{customLeadTime} Days</span>
            </div>
            <input
              type="range"
              min="2"
              max="25"
              step="1"
              value={customLeadTime}
              onChange={(e) => setCustomLeadTime(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Live Formula Computation Outputs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Daily Average Run-Rate (d̄)</span>
            <div className="mt-1 text-xl font-extrabold text-white font-mono tabular-nums">
              {formatIndianNumber(simResults.dailyAverageRunRate)}
              <span className="text-xs text-slate-400 font-normal ml-1">units/day</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono block mt-1">
              σ_d: ±{formatIndianNumber(simResults.sigmaD)} (22%)
            </span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-amber-900/40">
            <span className="text-xs text-amber-400 font-semibold block">Calculated Safety Stock (SS)</span>
            <div className="mt-1 text-xl font-extrabold text-amber-300 font-mono tabular-nums">
              {formatIndianNumber(simResults.safetyStock)}
              <span className="text-xs text-slate-400 font-normal ml-1">units</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono block mt-1">
              Z ({simResults.z}) × {simResults.sigmaD} × √{customLeadTime}
            </span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Lead Time Demand (d̄ × L)</span>
            <div className="mt-1 text-xl font-extrabold text-white font-mono tabular-nums">
              {formatIndianNumber(simResults.leadTimeDemand)}
              <span className="text-xs text-slate-400 font-normal ml-1">units</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono block mt-1">
              Over {customLeadTime} days delivery window
            </span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-indigo-900/40">
            <span className="text-xs text-indigo-300 font-semibold block">Required Reorder Point (ROP)</span>
            <div className="mt-1 text-xl font-extrabold text-indigo-300 font-mono tabular-nums">
              {formatIndianNumber(simResults.reorderPoint)}
              <span className="text-xs text-slate-400 font-normal ml-1">units</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono block mt-1">
              Trigger PO when stock hits ROP
            </span>
          </div>
        </div>

        {/* Selected Category Diagnostic Note */}
        <div className="bg-slate-950/90 rounded-lg p-4 border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <strong className="text-white font-semibold">{baseItem.festival} · {baseItem.category}</strong>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">Recorded Deficit: </span>
              <span className="font-mono text-rose-400 font-bold">{formatIndianNumber(baseItem.deficit)} units</span>
            </div>
            <p className="text-slate-400">{baseItem.rootCause}</p>
          </div>
          <div className="shrink-0 text-amber-400 font-medium bg-amber-400/10 px-3 py-1.5 rounded border border-amber-400/20">
            {baseItem.leadTimeDays}d Inbound SLA
          </div>
        </div>
      </div>

      {/* FULL SHORTFALL & SIZING TABLE (Pages 4, 5, 6 of Briefing) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Stock-Out Shortfall & Root-Cause Mitigation Table
            </h3>
            <p className="text-xs text-slate-400">
              Detailed breakdown of festival demand vs current stock, replenishment lead times, and mother hub mitigation POs.
            </p>
          </div>

          {/* Festival quick filters */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
            <button
              onClick={() => setTableFestivalFilter('All')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                tableFestivalFilter === 'All' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Events
            </button>
            {FESTIVALS.map((f) => (
              <button
                key={f}
                onClick={() => setTableFestivalFilter(f)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  tableFestivalFilter === f ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Shortfall Summary Strip */}
        <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-slate-400">Showing:</span>
            <span className="font-semibold text-white">{tableData.length} category records</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-400">Aggregate Shortfall Deficit:</span>
            <span className="font-mono font-bold text-rose-400">-{formatIndianNumber(totalDeficitUnits)} units</span>
          </div>
          <span className="text-slate-400 text-[11px]">
            Primary Hubs: Bhiwandi (West), Bilaspur (North), Bengaluru / Nelamangala (South)
          </span>
        </div>

        {/* The Table */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-950/90 text-slate-400 border-b border-slate-800 font-semibold tracking-wider text-[11px] sm:text-xs uppercase">
                  <th className="py-3 px-4">Festival</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-right">Demand</th>
                  <th className="py-3 px-4 text-right">Stock</th>
                  <th className="py-3 px-4 text-right">Deficit</th>
                  <th className="py-3 px-4 text-center">Lead Time</th>
                  <th className="py-3 px-4">Root Cause of Risk</th>
                  <th className="py-3 px-4">Mitigation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {tableData.map((row) => {
                  const hasSevereDeficit = row.deficit < -5000;
                  const hasSurplus = row.deficit > 0;

                  return (
                    <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                        {row.festival}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-300 whitespace-nowrap">
                        {row.category}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-200 whitespace-nowrap">
                        {formatIndianNumber(row.demand)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-300 whitespace-nowrap">
                        {formatIndianNumber(row.stock)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums font-bold whitespace-nowrap">
                        {hasSurplus ? (
                          <span className="text-emerald-400">+{formatIndianNumber(row.deficit)}</span>
                        ) : (
                          <span className={hasSevereDeficit ? 'text-rose-400 font-extrabold' : 'text-amber-400'}>
                            {formatIndianNumber(row.deficit)}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center font-mono tabular-nums text-slate-300 whitespace-nowrap">
                        <span className="text-slate-200 font-medium">{row.leadTimeDays}</span> Days
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-300 leading-relaxed min-w-[220px]">
                        {row.rootCause}
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-300 leading-relaxed min-w-[240px]">
                        <span className="text-amber-300/90">{row.mitigationAction}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
