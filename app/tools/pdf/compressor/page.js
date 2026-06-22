'use client'

import { useState } from 'react'

export default function PdfCompressorPage() {
  const [file, setFile] = useState(null)
  const [quality, setQuality] = useState('medium')
  const [message, setMessage] = useState('')

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      const sizeMB = (uploadedFile.size / (1024 * 1024)).toFixed(2)
      setMessage(`File selected: ${uploadedFile.name}\nSize: ${sizeMB} MB`)
    }
  }

  const compressPdf = () => {
    if (!file) return
    const newSize = Math.round(file.size * (quality === 'high' ? 0.8 : quality === 'medium' ? 0.5 : 0.3))
    const reduction = (((file.size - newSize) / file.size) * 100).toFixed(1)
    setMessage(`⚙️ Compression simulation:\n\nOriginal: ${(file.size / (1024 * 1024)).toFixed(2)} MB\nCompressed: ${(newSize / (1024 * 1024)).toFixed(2)} MB\nReduction: ${reduction}%`)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">PDF Compressor</h1>
        <p className="text-white/70 mb-8">Reduce PDF file size</p>

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
                <label className="block text-sm font-semibold mb-2">Compression Quality</label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
                >
                  <option value="high">High (80% size)</option>
                  <option value="medium">Medium (50% size)</option>
                  <option value="low">Low (30% size)</option>
                </select>
              </div>

              <button
                onClick={compressPdf}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Compress PDF
              </button>
            </>
          )}

          {message && (
            <div className="bg-white/10 border border-white/20 rounded p-4 text-white/80 text-sm whitespace-pre-line">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
                    }
