'use client'

import { useState } from 'react'

export default function LyricsPreviewPage() {
  const [lyrics, setLyrics] = useState('Verse 1:\nFirst line of lyrics\nSecond line of lyrics\n\nChorus:\nChorus line 1\nChorus line 2')
  const [timing, setTiming] = useState('0:00')
  const [currentLine, setCurrentLine] = useState(0)

  const lines = lyrics.split('\n').filter(l => l.trim())

  const copyLyrics = () => {
    navigator.clipboard.writeText(lyrics)
  }

  const downloadLyrics = () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(lyrics))
    element.setAttribute('download', 'lyrics.txt')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Lyrics Preview & Sync</h1>
        <p className="text-white/70 mb-8">Preview and sync lyrics with music timing</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor */}
          <div className="glass-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Edit Lyrics</label>
              <textarea
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                className="w-full h-96 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none resize-none font-mono text-sm"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={copyLyrics}
                className="flex-1 px-4 py-2 bg-white/10 rounded hover:bg-white/20 transition"
              >
                Copy
              </button>
              <button
                onClick={downloadLyrics}
                className="flex-1 px-4 py-2 bg-white/10 rounded hover:bg-white/20 transition"
              >
                Download
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="glass-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Current Time</label>
              <input
                type="text"
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                placeholder="MM:SS"
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none font-mono"
              />
            </div>

            <div>
              <h3 className="font-bold mb-3">Live Preview</h3>
              <div className="h-80 bg-dark-bg border border-white/10 rounded p-4 overflow-y-auto space-y-2">
                {lines.map((line, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded transition ${
                      idx === currentLine
                        ? 'bg-yellow-400/20 border border-yellow-400 text-white'
                        : 'text-white/70'
                    }`}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCurrentLine((c) => (c + 1) % lines.length)}
              className="w-full px-4 py-2 bg-white/10 rounded hover:bg-white/20 transition"
            >
              Next Line
            </button>
          </div>
        </div>
      </div>
    </div>
  )
                  }
