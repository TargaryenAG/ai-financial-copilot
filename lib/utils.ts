import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export const CATEGORY_COLORS: Record<string, string> = {
  'Alimentação': '#f97316',
  'Transporte': '#3b82f6',
  'Moradia': '#8b5cf6',
  'Entretenimento': '#ec4899',
  'Saúde': '#10b981',
  'Compras': '#f59e0b',
  'Serviços': '#6366f1',
  'Renda': '#22c55e',
  'Outros': '#94a3b8',
}
