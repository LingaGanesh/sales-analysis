import React from 'react';
import { DEMAND_PROJECTIONS, STRATEGIC_INSIGHTS, OPERATIONAL_RISKS, OPERATIONAL_PLAYBOOKS } from '../data/festivalData';
import { formatIndianNumber } from '../utils/formatters';
import { X, Printer } from 'lucide-react';

interface PrintExecutiveBriefingProps {
  onClose: () => void;
}

export const PrintExecutiveBriefing: React.FC<PrintExecutiveBriefingProps> = ({ onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md overflow-y-auto p-4 sm:p-6 print:p-0 print:bg-white print:overflow-visible">
      {/* Top action bar (hidden during print) */}
      <div className="max-w-4xl mx-auto mb-4 flex items-center justify-between print:hidden bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white text-sm">Official Executive Briefing PDF Document</span>
          <span className="text-slate-500 text-xs font-mono">(4-Page Formatted Briefing)</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print to PDF</span>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Printable Sheet (Standard A4 / Letter Executive Styling) */}
      <div className="max-w-4xl mx-auto bg-white text-slate-900 p-8 sm:p-12 shadow-2xl rounded-lg print:shadow-none print:p-6 font-sans space-y-12">
        {/* PAGE 1 */}
        <div className="border-b-2 border-slate-200 pb-12 print:break-after-page">
          <div className="text-[11px] font-bold text-emerald-800 tracking-wider uppercase border-b border-emerald-900/20 pb-2 mb-6">
            AMAZON INDIA · SALES SCIENCE & GENERATIVE AI CONSULTING CONFIDENTIAL · EXECUTIVE BRIEFING · PAGE 1
          </div>

          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Executive Sales Forecast & Festive Demand Briefing
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Multi-Festival Demand Projections across Diwali, Dussehra, Holi, Eid, Pongal & Christmas
          </p>

          {/* 4 KPIs */}
          <div className="grid grid-cols-4 gap-4 mt-6 p-4 bg-slate-50 rounded border border-slate-200">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500">PROJECTED VOLUME</div>
              <div className="text-xl font-black text-slate-900 mt-1">4.90M Units</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500">ESTIMATED GROSS GMV</div>
              <div className="text-xl font-black text-slate-900 mt-1">INR 4663 Cr</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500">CRITICAL STOCK SHORTAGES</div>
              <div className="text-xl font-black text-rose-600 mt-1">28 Categories</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500">ACTIVE SCENARIO</div>
              <div className="text-xl font-black text-slate-900 mt-1">ENSEMBLE</div>
            </div>
          </div>

          {/* Section 1 */}
          <div className="mt-8">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              1. Executive Context & Commercial Summary
            </h2>
            <p className="text-xs text-slate-700 mt-2 leading-relaxed text-justify">
              During major Indian festive events, Amazon India experiences extreme non-linear demand multipliers ranging from 3.0x to 5.8x
              baseline velocity. Predictive machine learning models (Ensemble of Random Forest, Ridge Regression, and Holt-Winters
              Time-Series) forecast secular year-on-year demand growth of 15% to 18%. While Fashion drives aggregate physical parcel
              volume, Mobiles and Electronics contribute over 76% of Gross Merchandise Value. Operational focus must balance
              high-converting promotional pricing against critical supply-chain replenishment lead times.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mt-8">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
              2. Top 5 Key Strategic Insights for the Sales Manager
            </h2>
            <div className="space-y-2.5 text-xs">
              {STRATEGIC_INSIGHTS.map((item) => (
                <div key={item.number} className="flex items-start gap-2 text-slate-800">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-700 shrink-0 mt-1" />
                  <div>
                    <strong className="text-slate-900 font-bold">Insight {item.number}: </strong>
                    <span className="leading-relaxed">{item.summary}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risks Box */}
          <div className="mt-8 p-4 bg-rose-50 border border-rose-200 rounded">
            <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wide mb-2">
              CRITICAL OPERATIONAL & LOGISTICAL RISKS IDENTIFIED BY AI:
            </h3>
            <ul className="text-xs text-rose-950 space-y-1.5 list-disc list-inside">
              <li><strong>Fulfillment Center Bottlenecks:</strong> West (Bhiwandi) and North (Bilaspur) sorting hubs face +24% overload on Day 1-2.</li>
              <li><strong>Mobiles & Electronics Shortage:</strong> Opening inventory represents only 1.05x demand, risking 48-hour stock depletion.</li>
              <li><strong>Shelf-Life Expiry:</strong> Gourmet sweets require localized Vendor Flex dispatch to prevent 4-day expiry write-offs.</li>
              <li><strong>Margin Cannibalization:</strong> Deep discounts beyond 30% dilute operating contribution margins on branded appliances.</li>
            </ul>
          </div>

          <div className="mt-8 pt-4 flex justify-between text-[10px] text-slate-500 border-t border-slate-100">
            <span>Sales Prediction Analysis during Festivals Using AI / Generative AI at Amazon</span>
            <span>Page 1 of 4</span>
          </div>
        </div>

        {/* PAGE 2 */}
        <div className="border-b-2 border-slate-200 pb-12 print:break-after-page">
          <div className="text-[11px] font-bold text-emerald-800 tracking-wider uppercase border-b border-emerald-900/20 pb-2 mb-6">
            AMAZON INDIA · SALES SCIENCE & GENERATIVE AI CONSULTING CONFIDENTIAL · EXECUTIVE BRIEFING · PAGE 2
          </div>

          <h2 className="text-xl font-bold text-slate-900">Festival & Category Demand Projections Table</h2>
          <p className="text-xs text-slate-600 mb-4">Official Output Format: Predicted Units, Expected Growth %, Stock Risk & Recommendations</p>

          <table className="w-full text-left text-[11px] border-collapse">
            <thead>
              <tr className="bg-emerald-950 text-white font-bold text-[10px] uppercase">
                <th className="p-2">Festival</th>
                <th className="p-2">Category</th>
                <th className="p-2 text-right">Predicted Units</th>
                <th className="p-2 text-right">Growth %</th>
                <th className="p-2">Stock Risk</th>
                <th className="p-2">Strategic Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {DEMAND_PROJECTIONS.slice(0, 18).map((row) => (
                <tr key={row.id}>
                  <td className="p-1.5 font-bold">{row.festival}</td>
                  <td className="p-1.5">{row.category}</td>
                  <td className="p-1.5 text-right font-mono font-medium">{formatIndianNumber(row.predictedUnits)}</td>
                  <td className="p-1.5 text-right font-mono text-emerald-700">+{row.growthPercent}%</td>
                  <td className="p-1.5 font-bold">
                    <span className={row.stockRisk === 'Critical Shortage' ? 'text-rose-600' : row.stockRisk === 'Moderate Risk' ? 'text-amber-600' : 'text-emerald-600'}>
                      {row.stockRisk}
                    </span>
                  </td>
                  <td className="p-1.5 text-[10px] text-slate-700">{row.recommendedAction}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 pt-4 flex justify-between text-[10px] text-slate-500 border-t border-slate-100">
            <span>Sales Prediction Analysis during Festivals Using AI / Generative AI at Amazon</span>
            <span>Page 2 of 4</span>
          </div>
        </div>

        {/* PAGE 3 */}
        <div className="border-b-2 border-slate-200 pb-12 print:break-after-page">
          <div className="text-[11px] font-bold text-emerald-800 tracking-wider uppercase border-b border-emerald-900/20 pb-2 mb-6">
            AMAZON INDIA · SALES SCIENCE & GENERATIVE AI CONSULTING CONFIDENTIAL · EXECUTIVE BRIEFING · PAGE 3
          </div>

          <table className="w-full text-left text-[11px] border-collapse mb-8">
            <thead>
              <tr className="bg-emerald-950 text-white font-bold text-[10px] uppercase">
                <th className="p-2">Festival</th>
                <th className="p-2">Category</th>
                <th className="p-2 text-right">Predicted Units</th>
                <th className="p-2 text-right">Growth %</th>
                <th className="p-2">Stock Risk</th>
                <th className="p-2">Strategic Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {DEMAND_PROJECTIONS.slice(18).map((row) => (
                <tr key={row.id}>
                  <td className="p-1.5 font-bold">{row.festival}</td>
                  <td className="p-1.5">{row.category}</td>
                  <td className="p-1.5 text-right font-mono font-medium">{formatIndianNumber(row.predictedUnits)}</td>
                  <td className="p-1.5 text-right font-mono text-emerald-700">+{row.growthPercent}%</td>
                  <td className="p-1.5 font-bold">
                    <span className={row.stockRisk === 'Critical Shortage' ? 'text-rose-600' : row.stockRisk === 'Moderate Risk' ? 'text-amber-600' : 'text-emerald-600'}>
                      {row.stockRisk}
                    </span>
                  </td>
                  <td className="p-1.5 text-[10px] text-slate-700">{row.recommendedAction}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Formulations */}
          <div className="p-4 bg-slate-50 rounded border border-slate-200 text-xs">
            <h3 className="font-bold text-slate-900 uppercase mb-1">
              Stock-Out Shortfall & Safety Stock Optimization Formulations:
            </h3>
            <p className="text-slate-700 mb-1">
              • <strong>Safety Stock (SS) = Z × σ_d × √L</strong> (Where Z = 2.05 for 98% Prime Service Level SLA; L = Supplier Lead Time in days)
            </p>
            <p className="text-slate-700 mb-1">
              • <strong>Daily Standard Deviation (σ_d)</strong> is modeled at ~22% of mean daily festive run-rate velocity.
            </p>
            <p className="text-slate-700">
              • <strong>Reorder Point (ROP) = (Daily Average Run-Rate × L) + Safety Stock (SS)</strong> ensures replenishment triggers before stockout.
            </p>
          </div>

          <div className="mt-8 pt-4 flex justify-between text-[10px] text-slate-500 border-t border-slate-100">
            <span>Sales Prediction Analysis during Festivals Using AI / Generative AI at Amazon</span>
            <span>Page 3 of 4</span>
          </div>
        </div>

        {/* PAGE 4 */}
        <div>
          <div className="text-[11px] font-bold text-emerald-800 tracking-wider uppercase border-b border-emerald-900/20 pb-2 mb-6">
            AMAZON INDIA · SALES SCIENCE & GENERATIVE AI CONSULTING CONFIDENTIAL · EXECUTIVE BRIEFING · PAGE 4
          </div>

          <h2 className="text-xl font-bold text-slate-900">Amazon Commercial Strategy & Operational Playbooks</h2>
          <p className="text-xs text-slate-600 mb-6">Actionable Implementation Playbooks across Discounts, Advertising, Delivery & FC Inbound</p>

          <div className="space-y-4 text-xs">
            {OPERATIONAL_PLAYBOOKS.map((pb) => (
              <div key={pb.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded">
                <div className="font-bold text-slate-900 mb-1">
                  {pb.number}. {pb.title}:
                </div>
                <p className="text-slate-700 leading-relaxed">{pb.details}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-4 flex justify-between text-[10px] text-slate-500 border-t border-slate-100">
            <span>Sales Prediction Analysis during Festivals Using AI / Generative AI at Amazon</span>
            <span>Page 4 of 4</span>
          </div>
        </div>
      </div>
    </div>
  );
};
