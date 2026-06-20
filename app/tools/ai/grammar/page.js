'use client'

import { useState } from 'react'

export default function GrammarCheckerPage() {
  const [input, setInput] = useState('The quick brown fox jump over the lazyy dog.')
  const [output, setOutput] = useState('')
  const [corrections, setCorrections] = useState([])
  const [loading, setLoading] = useState(false)

  const checkGrammar = async () => {
    if (!input.trim()) return

    setLoading(true)
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || '',
        },
        body: JSON.stringify({
          model: 'claude-opus-4-6',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `Check the grammar and spelling of this text. Provide:
1. Corrected version
2. List of errors found with explanations

Text: "${input}"`,
            },
          ],
        }),
      })

      const data = await response.json()
      if (data.content && data.content[0]) {
        setOutput(data.content[0].text)
      }
    } catch (error) {
      setOutput('Error: Could not connect to API. Make sure you have ANTHROPIC_API_KEY set.')
    }
    setLoading(false)
  }

  const copyOutput = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Grammar Checker</h1>
        <p className="text-white/70 mb-8">Check grammar and spelling using AI</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-lg p-6 space-y-4">
            <h2 className="text-lg font-bold">Input Text</h2>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your text here..."
              className="w-full h-64 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none resize-none"
            />
            <button
              onClick={checkGrammar}
              disabled={loading || !input.trim()}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg disabled:opacity-50 transition-all"
            >
              {loading ? 'Checking...' : 'Check Grammar'}
            </button>
          </div>

          <div className="glass-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Results</h2>
              <button
                onClick={copyOutput}
                disabled={!output}
                className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 transition"
              >
                Copy
              </button>
            </div>
            <div className="h-64 bg-dark-bg border border-white/10 rounded p-4 overflow-y-auto text-white/80 text-sm">
              {output ? (
                <pre className="whitespace-pre-wrap font-mono">{output}</pre>
              ) : (
                <p className="text-white/50">Results will appear here...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
