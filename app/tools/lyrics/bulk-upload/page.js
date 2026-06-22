'use client'

import { useState } from 'react'

export default function LyricsBulkUploadPage() {
  const [csvData, setCsvData] = useState('song_title,artist,lyrics\n"My Song","My Artist","Verse 1..."')
  const [preview, setPreview] = useState([])

  const parseCsv = (text) => {
    const lines = text.trim().split('\n')
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    const rows = lines.slice(1).map(line => {
      const values = line.match(/("[^"]*"|[^,]*)/g) || []
      return values.reduce((obj, val, idx) => {
        obj[headers[idx]] = val.trim().replace(/"/g, '')
        return obj
      }, {})
    })
    return rows
  }

  const handleParse = () => {
    const data = parseCsv(csvData)
    setPreview(data)
  }

  const downloadTemplate = () => {
    const template = 'song_title,artist,album,year,lyrics\n"Song Title","Artist Name","Album Name","2024","Paste lyrics here..."'
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(template))
    element.setAttribute('download', 'lyrics-template.csv')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const downloadJson = () => {
    const data = parseCsv(csvData)
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2)))
    element.setAttribute('download', 'lyrics.json')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Lyrics Bulk Upload</h1>
        <p className="text-white/70 mb-8">Upload multiple songs via CSV</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="glass-lg p-6 space-y-4">
            <h2 className="text-lg font-bold">CSV Format</h2>
            <textarea
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              className="w-full h-64 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none resize-none font-mono text-sm"
            />

            <div className="flex gap-2">
              <button
                onClick={handleParse}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded hover:shadow-lg transition-all"
              >
                Parse CSV
              </button>
              <button
                onClick={downloadTemplate}
                className="flex-1 px-4 py-2 bg-white/10 rounded hover:bg-white/20 transition"
              >
                Download Template
              </button>
            </div>
          </div>

          {/* Preview */}
          {preview.length > 0 && (
            <div className="glass-lg p-6 space-y-4">
              <h2 className="text-lg font-bold">Preview ({preview.length} songs)</h2>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {preview.map((song, idx) => (
                  <div key={idx} className="bg-dark-bg border border-white/10 rounded p-3 text-sm">
                    <p className="font-semibold text-yellow-400">{song.song_title}</p>
                    <p className="text-white/60">{song.artist}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={downloadJson}
                className="w-full px-4 py-2 bg-white/10 rounded hover:bg-white/20 transition"
              >
                Download as JSON
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
    }
