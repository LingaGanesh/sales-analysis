/**
 * Utility functions for formatting Indian currency, numbers, and data exports.
 */

export function formatIndianNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

export function formatInrCrores(inrCrores: number): string {
  return `₹${inrCrores.toLocaleString('en-IN')} Cr`;
}

export function exportDemandCsv(data: Array<{
  festival: string;
  category: string;
  predictedUnits: number;
  growthPercent: number;
  stockRisk: string;
  recommendedAction: string;
  demand: number;
  stock: number;
  deficit: number;
  leadTimeDays: number;
  mitigationAction: string;
}>, filename = 'amazon_india_festive_demand_projections.csv') {
  const headers = [
    'Festival',
    'Category',
    'Predicted Units',
    'Growth %',
    'Stock Risk',
    'Stock Deficit',
    'Lead Time (Days)',
    'Strategic Recommendation',
    'Mitigation Action'
  ];

  const rows = data.map(item => [
    `"${item.festival}"`,
    `"${item.category}"`,
    item.predictedUnits,
    `"${item.growthPercent}%"`,
    `"${item.stockRisk}"`,
    item.deficit,
    item.leadTimeDays,
    `"${item.recommendedAction.replace(/"/g, '""')}"`,
    `"${item.mitigationAction.replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
