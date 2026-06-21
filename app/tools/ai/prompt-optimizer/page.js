'use client'

import { useState } from 'react'

export default function PromptOptimizerPage() {
  const [input, setInput] = useState('Write a story about a cat')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const optimizePrompt = async () => {
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
          max_tokens: 600,
          messages: [
            {
              role: 'user',
              content: `Optimize this ChatGPT/Claude prompt to be more effective. Make it more specific, detailed, and clear. Include:
1. The optimized prompt
2. Key improvements made

Original prompt: "${input}"`,
            },
          ],
        }),
      })

      const data = await response.json()
      if (data.content && data.content[0]) {
        setOutput(data.content[0].text)
      }
    } catch (error) {
      setOutput('Error: Could not connect to API')
    }
    setLoading(false)
  }

  const copyOutput = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Prompt Optimizer</h1>
        <p className="text-white/70 mb-8">Optimize your AI prompts for better results</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-lg p-6 space-y-4">
            <h2 className="text-lg font-bold">Your Prompt</h2>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your prompt here..."
              className="w-full h-64 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none resize-none"
            />
            <button
              onClick={optimizePrompt}
              disabled={loading || !input.trim()}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg disabled:opacity-50 transition-all"
            >
              {loading ? 'Optimizing...' : 'Optimize Prompt'}
            </button>
          </div>

          <div className="glass-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Optimized Prompt</h2>
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
                <pre className="whitespace-pre-wrap">{output}</pre>
              ) : (
                <p className="text-white/50">Optimized prompt will appear here...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
    }
