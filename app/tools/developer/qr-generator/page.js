'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function QrGeneratorPage() {
  const [text, setText] = useState('https://nitrotools.com')
  const [qrCode, setQrCode] = useState('')
  const [size, setSize] = useState(300)

  const generateQR = () => {
    if (!text) return
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`
    setQrCode(url)
  }

  const downloadQR = () => {
    const link = document.createElement('a')
    link.href = qrCode
    link.download = 'qrcode.png'
    link.click()
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">QR Code Generator</h1>
        <p className="text-white/70 mb-8">Create QR codes from text or URLs</p>

        <div className="glass-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Text or URL</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or URL..."
              className="w-full h-24 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Size: {size}x{size} px</label>
            <input
              type="range"
              min="100"
              max="500"
              step="50"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <button
            onClick={generateQR}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            Generate QR Code
          </button>

          {qrCode && (
            <div className="text-center space-y-4">
              <div className="bg-white p-4 rounded-lg inline-block">
                <img src={qrCode} alt="QR Code" width={size} height={size} />
              </div>
              <button
                onClick={downloadQR}
                className="w-full px-6 py-2 bg-white/10 rounded hover:bg-white/20 transition"
              >
                Download QR Code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
                                                                     }
