'use client'

import { useState } from 'react'

export default function LyricsQualityCheckerPage() {
  const [lyrics, setLyrics] = useState('Verse 1:\nFirst line\nSecond line\n\nChorus:\nChorus line')
  const [issues, setIssues] = useState([])
  const [score, setScore] = useState(0)

  const checkQuality = () => {
    const foundIssues = []
    let qualityScore = 100

    // Check for empty sections
    if (!lyrics.trim()) {
      foundIssues.push('⚠️ Lyrics are empty')
      qualityScore -= 50
    }

    // Check length
    const wordCount = lyrics.split(/\s+/).length
    if (wordCount < 20) {
      foundIssues.push('⚠️ Lyrics too short (less than 20 words)')
      qualityScore -= 15
    }

    // Check for formatting
    if (!lyrics.includes(':')) {
      foundIssues.push('ℹ️ No section headers (Verse:, Chorus:, etc.)')
      qualityScore -= 10
    }

    // Check rhyme consistency
    const lines = lyrics.split('\n').filter(l => l.trim() && !l.includes(':'))
    if (lines.length < 4) {
      foundIssues.push('ℹ️ Limited number of lyric lines')
      qualityScore -= 5
    }

    // Check for spelling (simple check)
    if (!lyrics.match(/[a-z]/i)) {
      foundIssues.push('⚠️ No alphabetic characters found')
      qualityScore -= 30
    }

    if (foundIssues.length === 0) {
      foundIssues.push('✅ No major issues found!')
    }

    setIssues(foundIssues)
    setScore(Math.max(0, qualityScore))
  }

  const downloadReport = () => {
    const report = `LYRICS QUALITY REPORT\n${'='.repeat(50)}\n\nQuality Score: ${score}/100\n\nIssues:\n${issues.join('\n')}`
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(report))
    element.setAttribute('download', 'quality-report.txt')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Lyrics Quality Checker</h1>
        <p className="text-white/70 mb-8">Check quality and completeness of your lyrics</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="glass-lg p-6 space-y-4">
            <label className="block text-sm font-semibold mb-2">Your Lyrics</label>
            <textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              className="w-full h-96 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none resize-none"
            />

            <button
              onClick={checkQuality}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Check Quality
            </button>
          </div>

          {/* Results */}
          <div className="glass-lg p-6 space-y-4">
            {score > 0 && (
              <>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">Quality Score</h3>
                    <span className="text-3xl font-bold text-yellow-400">{score}</span>
                  </div>
                  <div className="w-full bg-dark-bg rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all"
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-3">Issues & Suggestions:</h3>
                  <div className="space-y-2">
                    {issues.map((issue, idx) => (
                      <div key={idx} className="bg-dark-bg border border-white/10 rounded p-2 text-sm">
                        {issue}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={downloadReport}
                  className="w-full px-4 py-2 bg-white/10 rounded hover:bg-white/20 transition"
                >
                  Download Report
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
                      }
