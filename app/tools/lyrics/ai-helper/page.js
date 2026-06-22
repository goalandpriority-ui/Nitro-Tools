'use client'

import { useState } from 'react'

export default function LyricsAiHelperPage() {
  const [lyrics, setLyrics] = useState('Write your lyrics here...')
  const [operation, setOperation] = useState('grammar')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const helpLyrics = async () => {
    if (!lyrics.trim()) return

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
          max_tokens: 800,
          messages: [
            {
              role: 'user',
              content: `As a lyrics editor, please ${operation === 'grammar' ? 'fix grammar and spelling' : operation === 'rhyme' ? 'improve rhyme scheme' : 'enhance poetic quality'} of these lyrics:\n\n${lyrics}`,
            },
          ],
        }),
      })

      const data = await response.json()
      if (data.content && data.content[0]) {
        setResult(data.content[0].text)
      }
    } catch (error) {
      setResult('Error: Could not connect to API')
    }
    setLoading(false)
  }

  const copyResult = () => {
    navigator.clipboard.writeText(result)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Lyrics AI Helper</h1>
        <p className="text-white/70 mb-8">Improve your lyrics with AI assistance</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Help Type</label>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
              >
                <option value="grammar">Fix Grammar</option>
                <option value="rhyme">Improve Rhyme Scheme</option>
                <option value="poetry">Enhance Poetic Quality</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Your Lyrics</label>
              <textarea
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                className="w-full h-64 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none resize-none"
              />
            </div>

            <button
              onClick={helpLyrics}
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg disabled:opacity-50 transition-all"
            >
              {loading ? 'Processing...' : 'Get AI Help'}
            </button>
          </div>

          <div className="glass-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Improved Lyrics</h2>
              <button
                onClick={copyResult}
                disabled={!result}
                className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 transition"
              >
                Copy
              </button>
            </div>
            <div className="h-64 bg-dark-bg border border-white/10 rounded p-4 overflow-y-auto text-white/80">
              {result ? <pre className="whitespace-pre-wrap">{result}</pre> : <p className="text-white/50">Results will appear here...</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
    }
