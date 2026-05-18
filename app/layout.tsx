import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Financial Copilot — Smart expense analysis powered by Claude AI',
  description:
    'Upload your bank transactions CSV and let Claude AI categorize expenses, identify spending patterns, and generate actionable financial insights.',
  keywords: ['finance', 'AI', 'expense tracking', 'Claude AI', 'personal finance', 'budget analysis'],
  authors: [{ name: 'AI Financial Copilot' }],
  openGraph: {
    title: 'AI Financial Copilot',
    description: 'Smart expense analysis powered by Claude AI',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {children}
      </body>
    </html>
  )
}
