'use client'

import { useState, useRef } from 'react'

export default function ImageCropperPage() {
  const [image, setImage] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 200, height: 200 })
  const imageRef = useRef(null)
  const canvasRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          setImage(img)
          setCrop({ x: 0, y: 0, width: img.width / 2, height: img.height / 2 })
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const cropImage = () => {
    if (!image) return

    const canvas = canvasRef.current
    canvas.width = crop.width
    canvas.height = crop.height

    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height)

    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = 'cropped-image.png'
    link.click()
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Image Cropper</h1>
        <p className="text-white/70 mb-8">Crop your images easily</p>

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
              <div className="space-y-2">
                <label className="block text-sm font-semibold">X Position: {crop.x}</label>
                <input
                  type="range"
                  min="0"
                  max={image.width - crop.width}
                  value={crop.x}
                  onChange={(e) => setCrop({ ...crop, x: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold">Y Position: {crop.y}</label>
                <input
                  type="range"
                  min="0"
                  max={image.height - crop.height}
                  value={crop.y}
                  onChange={(e) => setCrop({ ...crop, y: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold">Width: {crop.width}px</label>
                <input
                  type="range"
                  min="50"
                  max={image.width}
                  value={crop.width}
                  onChange={(e) => setCrop({ ...crop, width: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold">Height: {crop.height}px</label>
                <input
                  type="range"
                  min="50"
                  max={image.height}
                  value={crop.height}
                  onChange={(e) => setCrop({ ...crop, height: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <button
                onClick={cropImage}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Crop & Download
              </button>
            </>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  )
                    }
