export interface Transaction {
  date: string
  description: string
  amount: number
  type: 'credit' | 'debit'
}

export interface CategorizedTransaction {
  date: string
  description: string
  amount: number
  category: string
  isExpense: boolean
}

export interface AnalysisSummary {
  totalIncome: number
  totalExpenses: number
  netBalance: number
  byCategory: Record<string, number>
}

export interface AnalysisResult {
  categorized: CategorizedTransaction[]
  summary: AnalysisSummary
  insights: string[]
  recommendations: string[]
}
