'use client'

import { useState } from 'react'

export default function JsonFormatterTool() {
  const [input, setInput] = useState('{\n  "example": "paste your JSON here"\n}')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState('format')

  const processJson = (text, actionMode) => {
    setError('')
    try {
      const parsed = JSON.parse(text)

      if (actionMode === 'format') {
        setOutput(JSON.stringify(parsed, null, 2))
      } else if (actionMode === 'minify') {
        setOutput(JSON.stringify(parsed))
      } else if (actionMode === 'validate') {
        setOutput('✓ Valid JSON!')
      }
    } catch (err) {
      setError(`Error: ${err.message}`)
      setOutput('')
    }
  }

  const handleFormat = () => {
    processJson(input, 'format')
    setMode('format')
  }

  const handleMinify = () => {
    processJson(input, 'minify')
    setMode('minify')
  }

  const handleValidate = () => {
    processJson(input, 'validate')
    setMode('validate')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  const downloadJson = () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output))
    element.setAttribute('download', 'formatted.json')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">JSON Formatter</h1>
          <p className="text-lg text-white/70">Format, validate, and minify JSON</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={handleFormat}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              mode === 'format'
                ? 'bg-yellow-400 text-white'
                : 'glass hover:bg-white/10'
            }`}
          >
            Format
          </button>
          <button
            onClick={handleMinify}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              mode === 'minify'
                ? 'bg-yellow-400 text-white'
                : 'glass hover:bg-white/10'
            }`}
          >
            Minify
          </button>
          <button
            onClick={handleValidate}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              mode === 'validate'
                ? 'bg-yellow-400 text-white'
                : 'glass hover:bg-white/10'
            }`}
          >
            Validate
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-lg p-6">
            <h2 className="text-lg font-bold mb-4">Input JSON</h2>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-96 bg-dark-bg rounded-lg p-4 border border-white/10 focus:border-yellow-400 outline-none resize-none font-mono text-sm"
              placeholder="Paste your JSON here..."
            />
          </div>

          <div className="glass-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Output</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!output}
                  className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Copy
                </button>
                <button
                  onClick={downloadJson}
                  disabled={!output}
                  className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Download
                </button>
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              className="w-full h-96 bg-dark-bg rounded-lg p-4 border border-white/10 outline-none resize-none font-mono text-sm"
              placeholder="Formatted output will appear here..."
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-8">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        <div className="glass p-6 max-w-2xl">
          <h3 className="font-bold mb-2">How to use:</h3>
          <ul className="text-sm text-white/70 space-y-1">
            <li>• Paste or type your JSON in the input field</li>
            <li>• Click Format to pretty-print with indentation</li>
            <li>• Click Minify to remove all unnecessary whitespace</li>
            <li>• Click Validate to check if JSON is valid</li>
            <li>• Use Copy or Download buttons to save your result</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
