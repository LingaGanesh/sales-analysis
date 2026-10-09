/**
 * Amazon India - Sales Science & Generative AI Consulting
 * Executive Sales Forecast & Festive Demand Briefing Application
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { ExecutiveKpiBanner } from './components/ExecutiveKpiBanner';
import { StrategicInsightsView } from './components/StrategicInsightsView';
import { DemandProjectionsTable } from './components/DemandProjectionsTable';
import { SafetyStockCalculator } from './components/SafetyStockCalculator';
import { OperationalPlaybooksView } from './components/OperationalPlaybooksView';
import { FCHubRiskRadar } from './components/FCHubRiskRadar';
import { GmvVisualizer } from './components/GmvVisualizer';
import { PrintExecutiveBriefing } from './components/PrintExecutiveBriefing';
import { BarChart3, Calculator, BookOpen, Truck, Layers, Printer, FileText } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-300">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPrint={() => setShowPrintModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Top KPI Banner is visible in overview or available as context */}
        {activeTab === 'overview' && (
          <>
            <ExecutiveKpiBanner
              onNavigateToTable={() => setActiveTab('projections')}
              onNavigateToSafetyStock={() => setActiveTab('safetystock')}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <GmvVisualizer />
            </div>

            <StrategicInsightsView
              onSelectPlaybook={() => setActiveTab('playbooks')}
              onExploreHubs={() => setActiveTab('logistics')}
            />
          </>
        )}

        {activeTab === 'projections' && (
          <div>
            {/* Context breadcrumb strip */}
            <div className="bg-slate-900/40 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2.5">
              <div className="max-w-7xl mx-auto text-xs text-slate-400 flex items-center justify-between">
                <div>
                  <span className="text-slate-200">Executive Briefing</span>
                  <span className="mx-2">/</span>
                  <span className="text-amber-400 font-medium">Demand Projections Table</span>
                </div>
                <span className="font-mono text-[11px] text-slate-500">Official Output Matrix</span>
              </div>
            </div>
            <DemandProjectionsTable />
          </div>
        )}

        {activeTab === 'safetystock' && (
          <div>
            {/* Context breadcrumb strip */}
            <div className="bg-slate-900/40 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2.5">
              <div className="max-w-7xl mx-auto text-xs text-slate-400 flex items-center justify-between">
                <div>
                  <span className="text-slate-200">Executive Briefing</span>
                  <span className="mx-2">/</span>
                  <span className="text-amber-400 font-medium">Safety Stock & Reorder Point (ROP)</span>
                </div>
                <span className="font-mono text-[11px] text-slate-500">SS = Z · σ_d · √L</span>
              </div>
            </div>
            <SafetyStockCalculator />
          </div>
        )}

        {activeTab === 'playbooks' && (
          <div>
            {/* Context breadcrumb strip */}
            <div className="bg-slate-900/40 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2.5">
              <div className="max-w-7xl mx-auto text-xs text-slate-400 flex items-center justify-between">
                <div>
                  <span className="text-slate-200">Executive Briefing</span>
                  <span className="mx-2">/</span>
                  <span className="text-amber-400 font-medium">Commercial Strategy & Playbooks</span>
                </div>
                <span className="font-mono text-[11px] text-slate-500">6 Implementation SOPs</span>
              </div>
            </div>
            <OperationalPlaybooksView />
          </div>
        )}

        {activeTab === 'logistics' && (
          <div>
            {/* Context breadcrumb strip */}
            <div className="bg-slate-900/40 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2.5">
              <div className="max-w-7xl mx-auto text-xs text-slate-400 flex items-center justify-between">
                <div>
                  <span className="text-slate-200">Executive Briefing</span>
                  <span className="mx-2">/</span>
                  <span className="text-amber-400 font-medium">Fulfillment Centers & Bottleneck Radar</span>
                </div>
                <span className="font-mono text-[11px] text-slate-500">Bhiwandi · Bilaspur · Nelamangala</span>
              </div>
            </div>
            <FCHubRiskRadar />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Amazon India</span>
            <span aria-hidden="true">·</span>
            <span>Sales Science & Generative AI Consulting</span>
            <span aria-hidden="true">·</span>
            <span>Confidential Executive Briefing</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setShowPrintModal(true)}
              className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full Briefing PDF Format</span>
            </button>
            <span aria-hidden="true">·</span>
            <span>Sales Prediction Analysis during Festivals</span>
          </div>
        </div>
      </footer>

      {/* Print / Full Briefing Modal */}
      {showPrintModal && (
        <PrintExecutiveBriefing onClose={() => setShowPrintModal(false)} />
      )}
    </div>
  );
}
