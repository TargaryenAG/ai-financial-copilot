import Papa from 'papaparse'
import type { Transaction } from './types'

export type { Transaction }

export function parseCSV(content: string): Transaction[] {
  const result = Papa.parse<Record<string, string>>(content, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header: string) => header.trim(),
  })

  const rows = result.data
  if (rows.length === 0) return []

  const headers = Object.keys(rows[0])

  // Detect column names (case-insensitive, accent-insensitive)
  const normalize = (s: string) =>
    s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

  const findCol = (candidates: string[]): string | undefined =>
    headers.find(h => candidates.includes(normalize(h)))

  const dateCol = findCol(['data', 'date', 'dt'])
  const descCol = findCol(['descricao', 'description', 'lancamento', 'historico', 'memo'])
  const amountCol = findCol(['valor', 'amount', 'value', 'quantia'])

  if (!dateCol || !descCol || !amountCol) return []

  const transactions: Transaction[] = []

  for (const row of rows) {
    const rawDate = (row[dateCol] ?? '').trim()
    const rawDesc = (row[descCol] ?? '').trim()
    const rawAmount = (row[amountCol] ?? '').trim().replace(',', '.')

    const amount = parseFloat(rawAmount)
    if (!rawDesc || isNaN(amount)) continue

    transactions.push({
      date: rawDate,
      description: rawDesc,
      amount: Math.abs(amount),
      type: amount >= 0 ? 'credit' : 'debit',
    })
  }

  return transactions
}

export function csvToString(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => resolve(e.target?.result as string)
    reader.onerror = reject
    reader.readAsText(file, 'UTF-8')
  })
}
