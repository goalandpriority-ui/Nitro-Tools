'use client'

import { useState, useRef } from 'react'

export default function ImageResizerTool() {
  const [image, setImage] = useState(null)
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [quality, setQuality] = useState(80)
  const [aspectRatio, setAspectRatio] = useState(true)
  const [originalSize, setOriginalSize] = useState(0)
  const [newSize, setNewSize] = useState(0)
  const canvasRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          setImage(img)
          setWidth(img.width)
          setHeight(img.height)
          setOriginalSize(Math.round(file.size / 1024))
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const handleWidthChange = (e) => {
    const newWidth = parseInt(e.target.value)
    setWidth(newWidth)
    if (aspectRatio && image) {
      const newHeight = Math.round((newWidth * image.height) / image.width)
      setHeight(newHeight)
    }
  }

  const handleHeightChange = (e) => {
    const newHeight = parseInt(e.target.value)
    setHeight(newHeight)
    if (aspectRatio && image) {
      const newWidth = Math.round((newHeight * image.width) / image.height)
      setWidth(newWidth)
    }
  }

  const resizeImage = () => {
    if (!image) return

    const canvas = canvasRef.current
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, width, height)

    canvas.toBlob(
      (blob) => {
        setNewSize(Math.round(blob.size / 1024))
      },
      'image/jpeg',
      quality / 100
    )
  }

  const downloadImage = () => {
    if (!canvasRef.current) return

    const link = document.createElement('a')
    link.href = canvasRef.current.toDataURL('image/jpeg', quality / 100)
    link.download = `resized-${width}x${height}.jpg`
    link.click()
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Image Size Reducer</h1>
          <p className="text-lg text-white/70">Resize and compress images with ease</p>
        </div>

        <div className="glass-lg p-8 mb-8">
          <label className="block">
            <div className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center cursor-pointer hover:border-yellow-400 transition">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="font-bold mb-2">Upload Image</h3>
              <p className="text-white/60 mb-4">Click to select or drag and drop</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </label>
        </div>

        {image && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div className="glass-lg p-6">
                  <h3 className="font-bold mb-4">Dimensions</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Width (px)</label>
                    <input
                      type="number"
                      value={width}
                      onChange={handleWidthChange}
                      className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Height (px)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={handleHeightChange}
                      className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aspectRatio}
                      onChange={(e) => setAspectRatio(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Lock aspect ratio</span>
                  </label>
                </div>

                <div className="glass-lg p-6">
                  <h3 className="font-bold mb-4">Quality</h3>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-sm text-white/60 mt-2">{quality}%</p>
                </div>

                <button
                  onClick={resizeImage}
                  className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all"
                >
                  Resize Image
                </button>
              </div>

              <div className="glass-lg p-6">
                <h3 className="font-bold mb-4">Preview</h3>
                <canvas
                  ref={canvasRef}
                  className="w-full rounded-lg mb-4 bg-dark-bg border border-white/10"
                />
                {newSize > 0 && (
                  <div className="space-y-2 mb-4 text-sm">
                    <p>
                      <span className="text-white/60">Original:</span> {originalSize} KB
                    </p>
                    <p>
                      <span className="text-white/60">New:</span> {newSize} KB
                    </p>
                    <p className="text-yellow-400">
                      Saved: {Math.round((1 - newSize / originalSize) * 100)}%
                    </p>
                  </div>
                )}
                <button
                  onClick={downloadImage}
                  disabled={!newSize}
                  className="w-full px-6 py-2 bg-white/10 rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Download
                </button>
              </div>
            </div>
          </>
        )}

        <div className="glass p-6 max-w-2xl">
          <h3 className="font-bold mb-2">Tips:</h3>
          <ul className="text-sm text-white/70 space-y-1">
            <li>• Lower quality values = smaller file size</li>
            <li>• Standard web sizes: 1200x800, 800x600, 400x300</li>
            <li>• Lock aspect ratio to maintain proportions</li>
            <li>• Compress images before uploading to websites</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
