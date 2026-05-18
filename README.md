<div align="center">
  <h1>🤖 AI Financial Copilot</h1>
  <p>Upload your bank statement CSV and let Claude AI categorize your expenses and generate insights</p>

  ![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Claude AI](https://img.shields.io/badge/Claude_AI-FF6B35?style=for-the-badge&logo=anthropic&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)
</div>

## ✨ Features
- 📁 **CSV Upload** — Drag-and-drop support, auto-detects Nubank/Inter/generic formats
- 🤖 **AI Categorization** — Claude AI automatically categorizes each transaction into 9 categories
- 📊 **Visual Analytics** — Donut chart breakdown + sortable transaction table
- 💡 **Smart Insights** — AI identifies top spending patterns and anomalies
- 🎯 **Recommendations** — Personalized tips to improve your financial health
- 🇧🇷 **Brazil-ready** — BRL currency, Portuguese interface, Brazilian bank format support
- 🔒 **Privacy-first** — Data is analyzed in real-time and never stored
- 🎮 **Demo mode** — "Load sample data" works without API key

## 🚀 Getting Started
```bash
git clone https://github.com/TargaryenAG/ai-financial-copilot.git
cd ai-financial-copilot
npm install
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local
npm run dev
```
Get your free API key at [console.anthropic.com](https://console.anthropic.com)

> 💡 Click **"Carregar dados de exemplo"** to try the full experience without an API key.

## 📋 Supported CSV Formats
| Bank | Columns | Auto-detect |
|---|---|---|
| Nubank | Data, Descrição, Valor | ✅ |
| Inter | Data, Lançamento, Valor | ✅ |
| Generic | date, description, amount | ✅ |

## 🏗️ How It Works
```
1. Upload CSV → 2. PapaParse → 3. Claude API → 4. Categorized JSON → 5. Recharts
```

## 📄 License
MIT © Nathan Andrade
