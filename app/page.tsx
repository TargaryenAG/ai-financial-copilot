'use client'

import { useState } from 'react'
import type { AnalysisResult } from '@/lib/types'
import FileUpload from '@/components/FileUpload'
import AnalysisDashboard from '@/components/AnalysisDashboard'

export default function HomePage() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<'upload' | 'results'>('upload')

  const handleAnalysis = (data: AnalysisResult) => {
    setAnalysis(data)
    setStep('results')
  }

  const handleReset = () => {
    setAnalysis(null)
    setStep('upload')
    setIsLoading(false)
  }

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-5xl">

        {step === 'upload' && (
          <div className="space-y-10">
            {/* Hero */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Financial Copilot
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Faça upload do seu extrato CSV e deixe o Claude AI analisar suas finanças
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
                {['🤖 Claude AI', '📊 Gráficos interativos', '🔒 Dados não armazenados'].map(pill => (
                  <span
                    key={pill}
                    className="px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* Upload card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-8">
              <FileUpload
                onAnalysis={handleAnalysis}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>

            {/* CSV format hint */}
            <div className="bg-white/60 rounded-2xl border border-gray-200 p-6 text-sm text-gray-600">
              <p className="font-semibold text-gray-700 mb-3">📋 Formatos de CSV suportados</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-1 pr-6 font-semibold">Banco</th>
                      <th className="text-left py-1 pr-6 font-semibold">Colunas</th>
                      <th className="text-left py-1 font-semibold">Auto-detect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      ['Nubank', 'Data, Descrição, Valor', '✅'],
                      ['Inter', 'Data, Lançamento, Valor', '✅'],
                      ['Genérico', 'date, description, amount', '✅'],
                    ].map(([bank, cols, ok]) => (
                      <tr key={bank}>
                        <td className="py-1.5 pr-6 font-medium">{bank}</td>
                        <td className="py-1.5 pr-6 text-gray-500 font-mono">{cols}</td>
                        <td className="py-1.5">{ok}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {step === 'results' && analysis && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
              >
                ← Nova análise
              </button>
              <h2 className="text-2xl font-bold text-gray-800">Análise Financeira</h2>
            </div>
            <AnalysisDashboard analysis={analysis} />
          </div>
        )}
      </div>
    </main>
  )
}
