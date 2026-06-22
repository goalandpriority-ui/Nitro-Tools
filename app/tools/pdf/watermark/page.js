'use client'

import { useState } from 'react'

export default function PdfWatermarkPage() {
  const [file, setFile] = useState(null)
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL')
  const [opacity, setOpacity] = useState(0.3)
  const [message, setMessage] = useState('')

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      setMessage(`File selected: ${uploadedFile.name}`)
    }
  }

  const addWatermark = () => {
    if (!file) return
    setMessage(`⚙️ Adding watermark "${watermarkText}" with ${Math.round(opacity * 100)}% opacity`)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">PDF Watermark</h1>
        <p className="text-white/70 mb-8">Add text watermark to PDF files</p>

        <div className="glass-lg p-8 space-y-6">
          <label className="block">
            <div className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center cursor-pointer hover:border-yellow-400 transition">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="font-bold mb-2">Upload PDF</h3>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </label>

          {file && (
            <>
              <div className="bg-dark-bg border border-white/10 rounded p-4">
                <p className="text-white/80">Selected: {file.name}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Watermark Text</label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Opacity: {Math.round(opacity * 100)}%</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={addWatermark}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Add Watermark
              </button>
            </>
          )}

          {message && (
            <div className="bg-white/10 border border-white/20 rounded p-4 text-white/80 text-sm">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
                    }
