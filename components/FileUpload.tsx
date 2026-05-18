'use client'

import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { parseCSV, csvToString } from '@/lib/csvParser'
import type { AnalysisResult } from '@/lib/types'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  onAnalysis: (data: AnalysisResult) => void
  isLoading: boolean
  setIsLoading: (v: boolean) => void
}

export default function FileUpload({ onAnalysis, isLoading, setIsLoading }: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    setFile(f)
    setError(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => setDragOver(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) handleFile(dropped)
  }

  const handleLoadSample = async () => {
    setError(null)
    setIsLoading(true)
    try {
      const res = await fetch('/api/sample')
      if (!res.ok) throw new Error('Falha ao carregar dados de exemplo')
      const data = (await res.json()) as AnalysisResult
      onAnalysis(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnalyze = async () => {
    if (!file) return
    setError(null)
    setIsLoading(true)
    try {
      const csvContent = await csvToString(file)
      const transactions = parseCSV(csvContent)
      if (transactions.length === 0) {
        throw new Error('Nenhuma transação encontrada no CSV. Verifique o formato do arquivo.')
      }
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactions }),
      })
      const data = (await res.json()) as AnalysisResult & { error?: string }
      if (!res.ok) throw new Error(data.error ?? 'Erro na análise')
      onAnalysis(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-colors duration-200',
          dragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-blue-300 bg-white hover:border-blue-400 hover:bg-blue-50/40',
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={e => {
            const f = e.target.files?.[0]
            if (f) handleFile(f)
          }}
        />
        <Upload
          size={40}
          className={cn('mx-auto mb-4', dragOver ? 'text-blue-500' : 'text-blue-400')}
        />
        {file ? (
          <div>
            <p className="font-semibold text-gray-800">{file.name}</p>
            <p className="text-sm text-gray-500 mt-1">
              {(file.size / 1024).toFixed(1)} KB — clique para trocar
            </p>
          </div>
        ) : (
          <div>
            <p className="text-lg font-semibold text-gray-700">Arraste seu CSV aqui</p>
            <p className="text-sm text-gray-500 mt-1">ou clique para selecionar</p>
          </div>
        )}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center gap-3 py-4 text-indigo-600">
          <svg
            className="animate-spin h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          <span className="font-medium">Claude está analisando suas finanças...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleLoadSample}
          disabled={isLoading}
          className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          📊 Carregar dados de exemplo
        </button>
        <button
          onClick={handleAnalyze}
          disabled={!file || isLoading}
          className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          🤖 Analisar com IA
        </button>
      </div>
    </div>
  )
}
