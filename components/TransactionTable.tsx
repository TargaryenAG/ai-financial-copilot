'use client'

import { useState } from 'react'
import type { CategorizedTransaction } from '@/lib/types'
import { CATEGORY_COLORS, formatBRL } from '@/lib/utils'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'

interface TransactionTableProps {
  transactions: CategorizedTransaction[]
}

type SortKey = keyof Pick<CategorizedTransaction, 'date' | 'description' | 'category' | 'amount'>
type SortDir = 'asc' | 'desc'

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = [...transactions].sort((a, b) => {
    const av = a[sortKey]
    const bv = b[sortKey]
    const cmp = typeof av === 'number' && typeof bv === 'number'
      ? av - bv
      : String(av).localeCompare(String(bv), 'pt-BR')
    return sortDir === 'asc' ? cmp : -cmp
  })

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronsUpDown size={14} className="text-gray-400" />
    return sortDir === 'asc'
      ? <ChevronUp size={14} className="text-indigo-600" />
      : <ChevronDown size={14} className="text-indigo-600" />
  }

  const columns: { key: SortKey; label: string }[] = [
    { key: 'date', label: 'Data' },
    { key: 'description', label: 'Descrição' },
    { key: 'category', label: 'Categoria' },
    { key: 'amount', label: 'Valor' },
  ]

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className="px-4 py-3 text-left font-semibold text-gray-600 cursor-pointer hover:text-indigo-600 select-none"
              >
                <span className="flex items-center gap-1">
                  {col.label}
                  <SortIcon col={col.key} />
                </span>
              </th>
            ))}
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Tipo</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((tx, i) => {
            const color = CATEGORY_COLORS[tx.category] ?? '#94a3b8'
            return (
              <tr
                key={i}
                className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}
              >
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{tx.date}</td>
                <td className="px-4 py-3 text-gray-800 max-w-xs truncate">{tx.description}</td>
                <td className="px-4 py-3">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: color }}
                  >
                    {tx.category}
                  </span>
                </td>
                <td className={`px-4 py-3 font-semibold whitespace-nowrap ${tx.isExpense ? 'text-red-600' : 'text-green-600'}`}>
                  {tx.isExpense ? '−' : '+'}{formatBRL(tx.amount)}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tx.isExpense ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {tx.isExpense ? 'Débito' : 'Crédito'}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
