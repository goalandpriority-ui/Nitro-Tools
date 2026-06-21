'use client'

import { useState } from 'react'

export default function KeywordAnalyzerPage() {
  const [text, setText] = useState('AI machine learning is transforming technology. Machine learning algorithms are powerful.')
  const [keywords, setKeywords] = useState([])

  const analyzeKeywords = () => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || []
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'are', 'was', 'were', 'be', 'by', 'this', 'that', 'from', 'as'])

    const filtered = words.filter(word => word.length > 2 && !stopWords.has(word))
    
    const frequency = {}
    filtered.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1
    })

    const sorted = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / filtered.length) * 100).toFixed(2),
      }))

    setKeywords(sorted)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Keyword Analyzer</h1>
        <p className="text-white/70 mb-8">Analyze keywords in your content</p>

        <div className="glass-lg p-6 space-y-6 mb-8">
          <h2 className="text-lg font-bold">Text to Analyze</h2>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your content here..."
            className="w-full h-40 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none resize-none"
          />

          <button
            onClick={analyzeKeywords}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            Analyze Keywords
          </button>
        </div>

        {keywords.length > 0 && (
          <div className="glass-lg p-6">
            <h3 className="text-lg font-bold mb-4">Top Keywords ({keywords.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-4">Rank</th>
                    <th className="text-left py-2 px-4">Keyword</th>
                    <th className="text-left py-2 px-4">Count</th>
                    <th className="text-left py-2 px-4">Density (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {keywords.map((kw, idx) => (
                    <tr key={idx} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-2 px-4 text-white/60">{idx + 1}</td>
                      <td className="py-2 px-4 font-mono text-yellow-400">{kw.word}</td>
                      <td className="py-2 px-4">{kw.count}</td>
                      <td className="py-2 px-4">{kw.density}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
          }
