'use client'

import { useState, useEffect } from 'react'

export default function LyricsVersionControlPage() {
  const [lyrics, setLyrics] = useState('Version 1 of lyrics...')
  const [versions, setVersions] = useState([])
  const [name, setName] = useState('Draft 1')

  useEffect(() => {
    const stored = localStorage.getItem('lyric_versions')
    if (stored) {
      setVersions(JSON.parse(stored))
    }
  }, [])

  const saveVersion = () => {
    const newVersion = {
      id: Date.now(),
      name,
      content: lyrics,
      date: new Date().toLocaleString(),
    }
    const updated = [...versions, newVersion]
    setVersions(updated)
    localStorage.setItem('lyric_versions', JSON.stringify(updated))
    setName(`Draft ${updated.length + 1}`)
  }

  const loadVersion = (version) => {
    setLyrics(version.content)
  }

  const deleteVersion = (id) => {
    const updated = versions.filter(v => v.id !== id)
    setVersions(updated)
    localStorage.setItem('lyric_versions', JSON.stringify(updated))
  }

  const downloadVersion = (version) => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(version.content))
    element.setAttribute('download', `${version.name}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Lyrics Version Control</h1>
        <p className="text-white/70 mb-8">Save and manage multiple versions of your lyrics</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor */}
          <div className="lg:col-span-2 glass-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Version Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Lyrics</label>
              <textarea
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                className="w-full h-64 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none resize-none"
              />
            </div>

            <button
              onClick={saveVersion}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Save Version
            </button>
          </div>

          {/* Version History */}
          <div className="glass-lg p-6 space-y-4">
            <h3 className="text-lg font-bold">Versions ({versions.length})</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {versions.length === 0 ? (
                <p className="text-white/50 text-sm">No versions saved yet</p>
              ) : (
                versions.map(version => (
                  <div key={version.id} className="bg-dark-bg border border-white/10 rounded p-3 text-sm space-y-2">
                    <p className="font-semibold text-yellow-400 truncate">{version.name}</p>
                    <p className="text-white/50 text-xs">{version.date}</p>
                    <div className="flex gap-1">
                      <button
                        onClick={() => loadVersion(version)}
                        className="flex-1 px-2 py-1 bg-white/10 rounded hover:bg-white/20 text-xs transition"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => downloadVersion(version)}
                        className="flex-1 px-2 py-1 bg-white/10 rounded hover:bg-white/20 text-xs transition"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => deleteVersion(version.id)}
                        className="flex-1 px-2 py-1 bg-red-500/20 rounded hover:bg-red-500/30 text-xs transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
                             }
