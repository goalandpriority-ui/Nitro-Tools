'use client'

import { useState, useRef } from 'react'

export default function ImageUpscalerPage() {
  const [image, setImage] = useState(null)
  const [scale, setScale] = useState(2)
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

  const upscaleImage = () => {
    if (!image) return

    const canvas = canvasRef.current
    const newWidth = image.width * scale
    const newHeight = image.height * scale

    canvas.width = newWidth
    canvas.height = newHeight

    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(image, 0, 0, newWidth, newHeight)

    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = `upscaled-${scale}x.png`
    link.click()
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Image Upscaler</h1>
        <p className="text-white/70 mb-8">Enlarge images with high quality</p>

        <div className="glass-lg p-8 space-y-6">
          <label className="block">
            <div className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center cursor-pointer hover:border-yellow-400 transition">
              <div className="text-4xl mb-4">🖼️</div>
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
                <label className="block text-sm font-semibold mb-2">Scale: {scale}x</label>
                <select
                  value={scale}
                  onChange={(e) => setScale(parseInt(e.target.value))}
                  className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
                >
                  <option value={2}>2x (200%)</option>
                  <option value={3}>3x (300%)</option>
                  <option value={4}>4x (400%)</option>
                  <option value={5}>5x (500%)</option>
                </select>
              </div>

              <button
                onClick={upscaleImage}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Upscale & Download
              </button>
            </>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  )
    }
