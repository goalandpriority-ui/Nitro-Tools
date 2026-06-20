'use client'

import { useState, useEffect } from 'react'

export default function LyricsEditorTool() {
  const [song, setSong] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    duration: '',
    lyrics: '',
  })

  const [drafts, setDrafts] = useState([])
  const [selectedDraft, setSelectedDraft] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('lyrics_drafts')
    if (saved) {
      setDrafts(JSON.parse(saved))
    }
  }, [])

  const saveDraft = () => {
    if (!song.title) {
      alert('Please enter a song title')
      return
    }

    const newDraft = {
      id: Date.now(),
      ...song,
      savedAt: new Date().toLocaleString(),
    }

    const updated = [newDraft, ...drafts.filter(d => d.id !== selectedDraft)]
    setDrafts(updated)
    localStorage.setItem('lyrics_drafts', JSON.stringify(updated))
    setSelectedDraft(newDraft.id)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const loadDraft = (id) => {
    const draft = drafts.find(d => d.id === id)
    if (draft) {
      const { id: _, savedAt, ...data } = draft
      setSong(data)
      setSelectedDraft(id)
    }
  }

  const deleteDraft = (id) => {
    if (confirm('Delete this draft?')) {
      const updated = drafts.filter(d => d.id !== id)
      setDrafts(updated)
      localStorage.setItem('lyrics_drafts', JSON.stringify(updated))
      if (selectedDraft === id) {
        setSelectedDraft(null)
        setSong({
          title: '',
          artist: '',
          album: '',
          genre: '',
          duration: '',
          lyrics: '',
        })
      }
    }
  }

  const exportAsJson = () => {
    const dataStr = JSON.stringify(song, null, 2)
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dataStr))
    element.setAttribute('download', `${song.title || 'lyrics'}.json`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const wordCount = song.lyrics.split(/\s+/).filter(w => w).length
  const lineCount = song.lyrics.split('\n').filter(l => l.trim()).length

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Lyric Text Editor</h1>
          <p className="text-lg text-white/70">Write and manage song lyrics with ease</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="glass-lg p-6 lg:col-span-1 h-fit">
            <h3 className="font-bold mb-4">Drafts</h3>
            {drafts.length === 0 ? (
              <p className="text-sm text-white/50">No drafts yet</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {drafts.map(draft => (
                  <div
                    key={draft.id}
                    className={`p-3 rounded-lg cursor-pointer transition ${
                      selectedDraft === draft.id
                        ? 'bg-yellow-400/20 border-l-2 border-yellow-400'
                        : 'glass hover:bg-white/10'
                    }`}
                  >
                    <p
                      onClick={() => loadDraft(draft.id)}
                      className="font-semibold text-sm truncate hover:text-yellow-400"
                    >
                      {draft.title || 'Untitled'}
                    </p>
                    <p className="text-xs text-white/50 mb-2">{draft.artist || 'No artist'}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/40">{draft.savedAt}</span>
                      <button
                        onClick={() => deleteDraft(draft.id)}
                        className="text-xs px-2 py-1 hover:bg-red-500/20 rounded text-red-300 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="glass-lg p-6">
              <h3 className="font-bold mb-4">Song Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Song Title"
                  value={song.title}
                  onChange={(e) => setSong({ ...song, title: e.target.value })}
                  className="bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
                />
                <input
                  type="text"
                  placeholder="Artist Name"
                  value={song.artist}
                  onChange={(e) => setSong({ ...song, artist: e.target.value })}
                  className="bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
                />
                <input
                  type="text"
                  placeholder="Album"
                  value={song.album}
                  onChange={(e) => setSong({ ...song, album: e.target.value })}
                  className="bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
                />
                <input
                  type="text"
                  placeholder="Genre"
                  value={song.genre}
                  onChange={(e) => setSong({ ...song, genre: e.target.value })}
                  className="bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
                />
              </div>
            </div>

            <div className="glass-lg p-6">
              <h3 className="font-bold mb-4">Lyrics</h3>
              <textarea
                value={song.lyrics}
                onChange={(e) => setSong({ ...song, lyrics: e.target.value })}
                placeholder="[Verse 1]
Paste your lyrics here...

[Chorus]
..."
                className="w-full h-96 bg-dark-bg border border-white/10 rounded px-4 py-4 text-white focus:border-yellow-400 outline-none resize-none font-mono text-sm"
              />
              <div className="flex justify-between items-center mt-4 text-sm text-white/60">
                <div className="space-x-4">
                  <span>{lineCount} lines</span>
                  <span>{wordCount} words</span>
                  <span>{song.lyrics.length} characters</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={saveDraft}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all"
              >
                Save Draft
              </button>
              <button
                onClick={exportAsJson}
                className="px-6 py-3 glass font-bold rounded-lg hover:bg-white/10 transition"
              >
                Export as JSON
              </button>
            </div>

            {saved && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                <p className="text-green-300">✓ Draft saved successfully!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
    }
