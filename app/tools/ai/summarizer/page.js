'use client'

import { useState } from 'react'

export default function TextSummarizerPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [length, setLength] = useState('medium')
  const [loading, setLoading] = useState(false)

  const summarizeText = async () => {
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
          max_tokens: 500,
          messages: [
            {
              role: 'user',
              content: `Summarize this text in ${length} length. Just provide the summary, nothing else.\n\nText: ${input}`,
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

  const downloadOutput = () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output))
    element.setAttribute('download', 'summary.txt')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Text Summarizer</h1>
        <p className="text-white/70 mb-8">Summarize long text using AI</p>

        <div className="glass-lg p-6 space-y-6 mb-8">
          <div>
            <label className="block text-sm font-semibold mb-2">Summary Length</label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
            >
              <option value="short">Short (1-2 sentences)</option>
              <option value="medium">Medium (3-5 sentences)</option>
              <option value="long">Long (7-10 sentences)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Text to Summarize</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your text here..."
              className="w-full h-40 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none resize-none"
            />
          </div>

          <button
            onClick={summarizeText}
            disabled={loading || !input.trim()}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg disabled:opacity-50 transition-all"
          >
            {loading ? 'Summarizing...' : 'Summarize Text'}
          </button>
        </div>

        {output && (
          <div className="glass-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Summary</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyOutput}
                  className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 transition"
                >
                  Copy
                </button>
                <button
                  onClick={downloadOutput}
                  className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 transition"
                >
                  Download
                </button>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">{output}</p>
            <p className="text-xs text-white/50">
              Original: {input.split(' ').length} words | Summary: {output.split(' ').length} words
            </p>
          </div>
        )}
      </div>
    </div>
  )
                }
