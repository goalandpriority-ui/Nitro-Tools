'use client'

import { useState } from 'react'

export default function UuidGeneratorPage() {
  const [uuids, setUuids] = useState([])
  const [count, setCount] = useState(1)

  const generateUUIDs = () => {
    const newUuids = []
    for (let i = 0; i < parseInt(count); i++) {
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
      newUuids.push(uuid)
    }
    setUuids(newUuids)
  }

  const copyAll = () => {
    const text = uuids.join('\n')
    navigator.clipboard.writeText(text)
  }

  const downloadUUIDs = () => {
    const text = uuids.join('\n')
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', 'uuids.txt')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">UUID Generator</h1>
        <p className="text-white/70 mb-8">Generate unique UUIDs (v4) instantly</p>

        <div className="glass-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">How many UUIDs?</label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              min="1"
              max="100"
              className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
            />
          </div>

          <button
            onClick={generateUUIDs}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            Generate UUIDs
          </button>

          {uuids.length > 0 && (
            <>
              <div className="space-y-3">
                <h3 className="font-bold">Generated UUIDs:</h3>
                <div className="bg-dark-bg border border-white/10 rounded p-4 max-h-60 overflow-y-auto">
                  {uuids.map((uuid, idx) => (
                    <div key={idx} className="text-sm text-white/80 font-mono mb-2 break-all">
                      {uuid}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={copyAll}
                  className="flex-1 px-4 py-2 bg-white/10 rounded hover:bg-white/20 transition"
                >
                  Copy All
                </button>
                <button
                  onClick={downloadUUIDs}
                  className="flex-1 px-4 py-2 bg-white/10 rounded hover:bg-white/20 transition"
                >
                  Download
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
                }
