'use client'

import type { AnalysisResult } from '@/lib/types'
import { formatBRL } from '@/lib/utils'
import ExpenseChart from './charts/ExpenseChart'
import InsightsPanel from './InsightsPanel'
import TransactionTable from './TransactionTable'

interface AnalysisDashboardProps {
  analysis: AnalysisResult
}

export default function AnalysisDashboard({ analysis }: AnalysisDashboardProps) {
  const { summary, categorized, insights, recommendations } = analysis

  const summaryCards = [
    {
      label: 'Renda Total',
      value: formatBRL(summary.totalIncome),
      icon: '💰',
      color: 'bg-green-50 border-green-200 text-green-700',
      valueColor: 'text-green-700',
    },
    {
      label: 'Despesas Totais',
      value: formatBRL(summary.totalExpenses),
      icon: '💸',
      color: 'bg-red-50 border-red-200 text-red-700',
      valueColor: 'text-red-700',
    },
    {
      label: 'Saldo Líquido',
      value: formatBRL(summary.netBalance),
      icon: '📈',
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      valueColor: 'text-blue-700',
    },
    {
      label: 'Transações',
      value: String(categorized.length),
      icon: '🧾',
      color: 'bg-gray-50 border-gray-200 text-gray-700',
      valueColor: 'text-gray-800',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryCards.map(card => (
          <div
            key={card.label}
            className={`rounded-2xl border p-5 ${card.color}`}
          >
            <div className="text-2xl mb-2">{card.icon}</div>
            <p className="text-xs font-medium uppercase tracking-wide opacity-70 mb-1">
              {card.label}
            </p>
            <p className={`text-xl font-bold ${card.valueColor}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Chart + Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Gastos por Categoria</h3>
          <ExpenseChart data={summary.byCategory} />
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <InsightsPanel insights={insights} recommendations={recommendations} />
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Transações ({categorized.length})
        </h3>
        <TransactionTable transactions={categorized} />
      </div>
    </div>
  )
}
