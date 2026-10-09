import React, { useState, useMemo } from 'react';
import { DEMAND_PROJECTIONS, FESTIVALS, CATEGORIES, FestivalType, CategoryType, DemandProjection } from '../data/festivalData';
import { formatIndianNumber, exportDemandCsv } from '../utils/formatters';
import { Search, Download, ArrowUpDown, Filter, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export const DemandProjectionsTable: React.FC = () => {
  const [selectedFestival, setSelectedFestival] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortField, setSortField] = useState<keyof DemandProjection>('predictedUnits');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // Filter logic
  const filteredData = useMemo(() => {
    return DEMAND_PROJECTIONS.filter((item) => {
      if (selectedFestival !== 'All' && item.festival !== selectedFestival) return false;
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      if (selectedRisk !== 'All' && item.stockRisk !== selectedRisk) return false;
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesCat = item.category.toLowerCase().includes(query);
        const matchesFest = item.festival.toLowerCase().includes(query);
        const matchesRec = item.recommendedAction.toLowerCase().includes(query);
        if (!matchesCat && !matchesFest && !matchesRec) return false;
      }
      return true;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return 0;
    });
  }, [selectedFestival, selectedCategory, selectedRisk, searchTerm, sortField, sortAsc]);

  const handleSort = (field: keyof DemandProjection) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false); // default descending for metrics
    }
  };

  const handleExport = () => {
    exportDemandCsv(filteredData, `amazon_demand_projections_${selectedFestival.toLowerCase()}.csv`);
  };

  // Metrics summary for the current filter
  const totalUnits = useMemo(() => {
    return filteredData.reduce((acc, curr) => acc + curr.predictedUnits, 0);
  }, [filteredData]);

  const criticalShortageCount = useMemo(() => {
    return filteredData.filter((i) => i.stockRisk === 'Critical Shortage').length;
  }, [filteredData]);

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Title & Official Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
            Official Forecast Matrix
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
            Festival & Category Demand Projections Table
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Official Output Format: Predicted Units, Expected Growth %, Stock Risk & Recommendations across all 36 category pairings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Download CSV ({filteredData.length} rows)</span>
          </button>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-800 space-y-4">
        {/* Festival Segmented Buttons */}
        <div>
          <label className="text-xs font-semibold text-slate-400 block mb-2">
            Target Festive Event:
          </label>
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950/70 rounded-lg border border-slate-800/80">
            <button
              onClick={() => setSelectedFestival('All')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedFestival === 'All'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Festivals (36)
            </button>
            {FESTIVALS.map((fest) => {
              const count = DEMAND_PROJECTIONS.filter((p) => p.festival === fest).length;
              return (
                <button
                  key={fest}
                  onClick={() => setSelectedFestival(fest)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    selectedFestival === fest
                      ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {fest} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Dropdowns + Search */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Category Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">
              Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="All">All Categories (6)</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Risk Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">
              Stock Risk Status:
            </label>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
            >
              <option value="All">All Risk Profiles</option>
              <option value="Critical Shortage">Critical Shortage (28 items)</option>
              <option value="Moderate Risk">Moderate Risk (6 items)</option>
              <option value="Optimal / Safe">Optimal / Safe (2 items)</option>
            </select>
          </div>

          {/* Search Field */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">
              Search Keywords:
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search category, recommendation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400 placeholder:text-slate-600"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            </div>
          </div>
        </div>

        {/* Dynamic Status Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <div>
              <span>Displaying: </span>
              <strong className="text-white font-mono">{filteredData.length}</strong> of 36 projections
            </div>
            <span aria-hidden="true" className="text-slate-700">|</span>
            <div>
              <span>Volume: </span>
              <strong className="text-amber-400 font-mono tabular-nums">{formatIndianNumber(totalUnits)}</strong> units
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Shortage alerts:</span>
            <span className={`font-mono font-semibold ${criticalShortageCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {criticalShortageCount} critical
            </span>
          </div>
        </div>
      </div>

      {/* Main High-Density Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-950/90 text-slate-400 border-b border-slate-800 font-semibold tracking-wider text-[11px] sm:text-xs uppercase">
                <th 
                  onClick={() => handleSort('festival')}
                  className="py-3 px-4 sm:px-6 cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Festival</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('category')}
                  className="py-3 px-4 cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Category</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('predictedUnits')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-white"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Predicted Units</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('growthPercent')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-white"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Growth %</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('stockRisk')}
                  className="py-3 px-4 cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Stock Risk</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  </div>
                </th>
                <th className="py-3 px-4 sm:px-6">Strategic Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No projections match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => {
                  const isCritical = row.stockRisk === 'Critical Shortage';
                  const isModerate = row.stockRisk === 'Moderate Risk';
                  const isOptimal = row.stockRisk === 'Optimal / Safe';

                  return (
                    <tr 
                      key={row.id} 
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Festival */}
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-200 whitespace-nowrap">
                        <span className="font-semibold text-white">{row.festival}</span>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 font-medium text-slate-300 whitespace-nowrap">
                        {row.category}
                      </td>

                      {/* Predicted Units */}
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-white whitespace-nowrap">
                        {formatIndianNumber(row.predictedUnits)}
                      </td>

                      {/* Expected Growth */}
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums whitespace-nowrap font-medium text-emerald-400">
                        +{row.growthPercent.toFixed(1)}%
                      </td>

                      {/* Stock Risk (unboxed text per zero-pill discipline) */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {isCritical && (
                          <span className="font-semibold text-rose-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" aria-hidden="true" />
                            Critical Shortage
                          </span>
                        )}
                        {isModerate && (
                          <span className="font-medium text-amber-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
                            Moderate Risk
                          </span>
                        )}
                        {isOptimal && (
                          <span className="font-medium text-emerald-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                            Optimal / Safe
                          </span>
                        )}
                      </td>

                      {/* Strategic Recommendation */}
                      <td className="py-3.5 px-4 sm:px-6 text-xs text-slate-300 leading-relaxed min-w-[280px]">
                        {row.recommendedAction}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
