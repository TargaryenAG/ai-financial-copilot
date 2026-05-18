interface InsightsPanelProps {
  insights: string[]
  recommendations: string[]
}

export default function InsightsPanel({ insights, recommendations }: InsightsPanelProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span>✨</span> Insights da IA
        </h3>
        <div className="space-y-3">
          {insights.map((insight, i) => (
            <div
              key={i}
              className="flex gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4"
            >
              <span className="text-blue-500 text-lg flex-shrink-0">💡</span>
              <p className="text-sm text-blue-800 leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span>🎯</span> Recomendações
        </h3>
        <div className="space-y-3">
          {recommendations.map((rec, i) => (
            <div
              key={i}
              className="flex gap-3 bg-green-50 border border-green-100 rounded-xl p-4"
            >
              <span className="text-green-500 text-lg flex-shrink-0">🎯</span>
              <p className="text-sm text-green-800 leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
