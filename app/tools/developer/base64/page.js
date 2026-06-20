'use client'

import { useState } from 'react'

export default function Base64Page() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')

  const handleEncode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)))
      setOutput(encoded)
      setMode('encode')
    } catch (e) {
      setOutput('Error: ' + e.message)
    }
  }

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)))
      setOutput(decoded)
      setMode('decode')
    } catch (e) {
      setOutput('Error: Invalid Base64')
    }
  }

  const copyOutput = () => {
    navigator.clipboard.writeText(output)
  }

  const downloadOutput = () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output))
    element.setAttribute('download', `base64-${mode}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Base64 Encoder/Decoder</h1>
        <p className="text-white/70 mb-8">Convert text to and from Base64</p>

        <div className="flex gap-3 mb-8">
          <button
            onClick={handleEncode}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              mode === 'encode'
                ? 'bg-yellow-400 text-white'
                : 'glass hover:bg-white/10'
            }`}
          >
            Encode to Base64
          </button>
          <button
            onClick={handleDecode}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              mode === 'decode'
                ? 'bg-yellow-400 text-white'
                : 'glass hover:bg-white/10'
            }`}
          >
            Decode from Base64
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-lg p-6">
            <h2 className="text-lg font-bold mb-4">Input</h2>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
              className="w-full h-64 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none resize-none"
            />
          </div>

          <div className="glass-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Output</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyOutput}
                  disabled={!output}
                  className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 transition"
                >
                  Copy
                </button>
                <button
                  onClick={downloadOutput}
                  disabled={!output}
                  className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 transition"
                >
                  Download
                </button>
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              className="w-full h-64 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white outline-none resize-none"
              placeholder="Output will appear here..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
