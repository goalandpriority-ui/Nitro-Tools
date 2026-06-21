'use client'

import { useState, useRef } from 'react'

export default function ImageConverterPage() {
  const [image, setImage] = useState(null)
  const [format, setFormat] = useState('png')
  const [quality, setQuality] = useState(80)
  const canvasRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          setImage(img)
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const convertImage = () => {
    if (!image) return

    const canvas = canvasRef.current
    canvas.width = image.width
    canvas.height = image.height

    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0)

    const mimeType = {
      jpg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      gif: 'image/gif',
    }[format]

    const link = document.createElement('a')
    link.href = canvas.toDataURL(mimeType, format === 'jpg' ? quality / 100 : undefined)
    link.download = `converted.${format}`
    link.click()
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Image Converter</h1>
        <p className="text-white/70 mb-8">Convert images to different formats</p>

        <div className="glass-lg p-8 space-y-6">
          <label className="block">
            <div className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center cursor-pointer hover:border-yellow-400 transition">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="font-bold mb-2">Upload Image</h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </label>

          {image && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-2">Convert to Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
                >
                  <option value="png">PNG</option>
                  <option value="jpg">JPG</option>
                  <option value="webp">WebP</option>
                  <option value="gif">GIF</option>
                </select>
              </div>

              {format === 'jpg' && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Quality: {quality}%</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}

              <button
                onClick={convertImage}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Download Converted Image
              </button>
            </>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  )
                  }
