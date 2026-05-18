import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY not configured. Add it to .env.local' },
      { status: 400 }
    )
  }

  try {
    const { transactions } = await req.json() as { transactions: unknown }

    const client = new Anthropic()

    const prompt = `You are a personal finance analyst. Analyze these Brazilian financial transactions and return ONLY a valid JSON object (no markdown, no explanation).

Transactions:
${JSON.stringify(transactions, null, 2)}

Return this exact JSON structure:
{
  "categorized": [
    { "date": "string", "description": "string", "amount": number, "category": "string", "isExpense": boolean }
  ],
  "summary": {
    "totalIncome": number,
    "totalExpenses": number,
    "netBalance": number,
    "byCategory": { "CategoryName": number }
  },
  "insights": ["insight1", "insight2", "insight3"],
  "recommendations": ["tip1", "tip2", "tip3"]
}

Categories to use: Alimentação, Transporte, Moradia, Entretenimento, Saúde, Compras, Serviços, Renda, Outros
All amounts should be positive numbers. isExpense = true for expenses, false for income.`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = (message.content[0] as { type: string; text: string }).text
    // Strip markdown code fences if present
    const cleaned = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim()
    const analysis = JSON.parse(cleaned) as unknown

    return NextResponse.json(analysis)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
