'use client'

import { useState } from 'react'

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')
  const [flags, setFlags] = useState('g')
  const [testString, setTestString] = useState('test@example.com\ninvalid@.com\nvalid.email@domain.co.uk')
  const [matches, setMatches] = useState([])
  const [error, setError] = useState('')

  const testRegex = () => {
    setError('')
    setMatches([])

    try {
      const regex = new RegExp(pattern, flags)
      const foundMatches = []
      let match

      if (flags.includes('g')) {
        const allMatches = testString.match(regex)
        if (allMatches) {
          foundMatches.push(...allMatches.map(m => ({ text: m, index: testString.indexOf(m) })))
        }
      } else {
        match = testString.match(regex)
        if (match) {
          foundMatches.push({ text: match[0], index: match.index })
        }
      }

      setMatches(foundMatches)
    } catch (e) {
      setError(`Error: ${e.message}`)
    }
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Regex Tester</h1>
        <p className="text-white/70 mb-8">Test regular expressions with live matches</p>

        <div className="space-y-6">
          {/* Pattern Input */}
          <div className="glass-lg p-6">
            <label className="block text-sm font-semibold mb-2">Regex Pattern</label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none font-mono"
            />
          </div>

          {/* Flags */}
          <div className="glass-lg p-6">
            <label className="block text-sm font-semibold mb-3">Flags</label>
            <div className="space-y-2">
              {['g', 'i', 'm', 's'].map(flag => (
                <label key={flag} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={flags.includes(flag)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFlags(flags + flag)
                      } else {
                        setFlags(flags.replace(flag, ''))
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">
                    {flag === 'g' && 'Global (find all matches)'}
                    {flag === 'i' && 'Case insensitive'}
                    {flag === 'm' && 'Multiline'}
                    {flag === 's' && 'Dot matches newline'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Test String */}
          <div className="glass-lg p-6">
            <label className="block text-sm font-semibold mb-2">Test String</label>
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter text to test..."
              className="w-full h-32 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none resize-none font-mono text-sm"
            />
          </div>

          {/* Test Button */}
          <button
            onClick={testRegex}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            Test Regex
          </button>

          {/* Error */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {/* Results */}
          {matches.length > 0 && (
            <div className="glass-lg p-6">
              <h3 className="font-bold mb-4">Found {matches.length} Match{matches.length !== 1 ? 'es' : ''}</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {matches.map((m, idx) => (
                  <div key={idx} className="bg-dark-bg p-2 rounded text-sm font-mono text-white/80">
                    {idx + 1}. "{m.text}"
                  </div>
                ))}
              </div>
            </div>
          )}

          {matches.length === 0 && !error && pattern && (
            <div className="glass p-4 text-center text-white/50">
              No matches found
            </div>
          )}
        </div>
      </div>
    </div>
  )
                }
