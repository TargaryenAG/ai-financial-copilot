import { NextResponse } from 'next/server'
import type { AnalysisResult } from '@/lib/types'

export async function GET() {
  const sampleAnalysis: AnalysisResult = {
    categorized: [
      { date: '2026-01-05', description: 'Supermercado Extra', amount: 245.80, category: 'Alimentação', isExpense: true },
      { date: '2026-01-07', description: 'Salário Mensal', amount: 5000.00, category: 'Renda', isExpense: false },
      { date: '2026-01-08', description: 'iFood Pedido', amount: 45.90, category: 'Alimentação', isExpense: true },
      { date: '2026-01-10', description: 'Uber', amount: 18.50, category: 'Transporte', isExpense: true },
      { date: '2026-01-12', description: 'Netflix', amount: 39.90, category: 'Entretenimento', isExpense: true },
      { date: '2026-01-15', description: 'Farmácia São João', amount: 89.00, category: 'Saúde', isExpense: true },
      { date: '2026-01-18', description: 'Posto Ipiranga', amount: 150.00, category: 'Transporte', isExpense: true },
      { date: '2026-01-20', description: 'Amazon Prime', amount: 299.00, category: 'Compras', isExpense: true },
      { date: '2026-01-22', description: 'Smart Fit Academia', amount: 99.90, category: 'Saúde', isExpense: true },
      { date: '2026-01-25', description: 'Aluguel Apartamento', amount: 1800.00, category: 'Moradia', isExpense: true },
      { date: '2026-01-28', description: 'Conta de Luz ENEL', amount: 187.00, category: 'Serviços', isExpense: true },
      { date: '2026-02-01', description: 'Restaurante Outback', amount: 156.00, category: 'Alimentação', isExpense: true },
      { date: '2026-02-03', description: 'Supermercado Pão de Açúcar', amount: 312.40, category: 'Alimentação', isExpense: true },
      { date: '2026-02-05', description: 'Salário Mensal', amount: 5000.00, category: 'Renda', isExpense: false },
      { date: '2026-02-07', description: 'Spotify Premium', amount: 21.90, category: 'Entretenimento', isExpense: true },
      { date: '2026-02-10', description: 'Nubank Fatura Cartão', amount: 850.00, category: 'Compras', isExpense: true },
      { date: '2026-02-12', description: 'Cinema Cinemark', amount: 68.00, category: 'Entretenimento', isExpense: true },
      { date: '2026-02-15', description: 'Farmácia Raia', amount: 134.00, category: 'Saúde', isExpense: true },
      { date: '2026-02-18', description: 'Uber', amount: 32.00, category: 'Transporte', isExpense: true },
      { date: '2026-02-20', description: 'Livraria Saraiva', amount: 79.90, category: 'Compras', isExpense: true },
    ],
    summary: {
      totalIncome: 10000.00,
      totalExpenses: 4629.20,
      netBalance: 5370.80,
      byCategory: {
        'Alimentação': 759.10,
        'Transporte': 200.50,
        'Moradia': 1800.00,
        'Entretenimento': 129.80,
        'Saúde': 322.90,
        'Compras': 1228.90,
        'Serviços': 187.00,
        'Renda': 10000.00,
        'Outros': 0,
      },
    },
    insights: [
      'Seus maiores gastos são com Compras (R$ 1.228,90) e Moradia (R$ 1.800,00), representando 65% das despesas totais.',
      'Você gastou R$ 759,10 em Alimentação distribuídos em 5 transações — uma média de R$ 151,82 por compra.',
      'Sua taxa de poupança é de 53,7% da renda, acima da média recomendada de 20%.',
    ],
    recommendations: [
      'Considere reduzir gastos com Compras avulsas (Amazon, Livraria). Crie uma lista de compras mensais e evite compras por impulso.',
      'O gasto com alimentação pode ser otimizado: prefira supermercado a delivery (iFood) para reduzir custos em até 40%.',
      'Com R$ 5.370,80 de saldo mensal, você pode investir R$ 2.000/mês e ainda manter uma reserva confortável.',
    ],
  }

  return NextResponse.json(sampleAnalysis)
}
