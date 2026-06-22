'use client'

import { useState } from 'react'

export default function LyricsMetadataPage() {
  const [metadata, setMetadata] = useState({
    songTitle: 'Song Title',
    artist: 'Artist Name',
    album: 'Album Name',
    year: new Date().getFullYear(),
    genre: 'Genre',
    language: 'English',
    duration: '3:45',
    composer: 'Composer',
    lyricist: 'Lyricist',
  })

  const [output, setOutput] = useState('')

  const generateMetadata = () => {
    const json = JSON.stringify(metadata, null, 2)
    setOutput(json)
  }

  const copyMetadata = () => {
    navigator.clipboard.writeText(output)
  }

  const downloadMetadata = () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(output))
    element.setAttribute('download', 'song-metadata.json')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Lyrics Metadata Manager</h1>
        <p className="text-white/70 mb-8">Manage song metadata and tags</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-lg p-6 space-y-3">
            <div>
              <label className="block text-sm font-semibold mb-1">Song Title</label>
              <input
                type="text"
                value={metadata.songTitle}
                onChange={(e) => setMetadata({ ...metadata, songTitle: e.target.value })}
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Artist</label>
              <input
                type="text"
                value={metadata.artist}
                onChange={(e) => setMetadata({ ...metadata, artist: e.target.value })}
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Album</label>
              <input
                type="text"
                value={metadata.album}
                onChange={(e) => setMetadata({ ...metadata, album: e.target.value })}
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Genre</label>
              <input
                type="text"
                value={metadata.genre}
                onChange={(e) => setMetadata({ ...metadata, genre: e.target.value })}
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Language</label>
              <input
                type="text"
                value={metadata.language}
                onChange={(e) => setMetadata({ ...metadata, language: e.target.value })}
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Year</label>
              <input
                type="number"
                value={metadata.year}
                onChange={(e) => setMetadata({ ...metadata, year: parseInt(e.target.value) })}
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Duration</label>
              <input
                type="text"
                value={metadata.duration}
                onChange={(e) => setMetadata({ ...metadata, duration: e.target.value })}
                placeholder="MM:SS"
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Composer</label>
              <input
                type="text"
                value={metadata.composer}
                onChange={(e) => setMetadata({ ...metadata, composer: e.target.value })}
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Lyricist</label>
              <input
                type="text"
                value={metadata.lyricist}
                onChange={(e) => setMetadata({ ...metadata, lyricist: e.target.value })}
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
              />
            </div>

            <button
              onClick={generateMetadata}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Generate Metadata
            </button>
          </div>

          <div className="glass-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Metadata JSON</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyMetadata}
                  disabled={!output}
                  className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 transition"
                >
                  Copy
                </button>
                <button
                  onClick={downloadMetadata}
                  disabled={!output}
                  className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 transition"
                >
                  Download
                </button>
              </div>
            </div>
            <pre className="w-full h-96 bg-dark-bg border border-white/10 rounded p-4 overflow-y-auto text-white/80 text-xs font-mono whitespace-pre-wrap">
              {output || 'JSON will appear here...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
                  }
