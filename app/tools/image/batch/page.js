'use client'

import { useState } from 'react'

export default function ImageBatchProcessorPage() {
  const [files, setFiles] = useState([])
  const [operation, setOperation] = useState('resize')
  const [quality, setQuality] = useState(80)

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files)
    setFiles(uploadedFiles)
  }

  const processBatch = () => {
    if (files.length === 0) return

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height

          const ctx = canvas.getContext('2d')

          if (operation === 'resize') {
            canvas.width = img.width * 0.8
            canvas.height = img.height * 0.8
          } else if (operation === 'grayscale') {
            ctx.drawImage(img, 0, 0)
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            const data = imageData.data
            for (let i = 0; i < data.length; i += 4) {
              const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
              data[i] = data[i + 1] = data[i + 2] = avg
            }
            ctx.putImageData(imageData, 0, 0)
          }

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

          const link = document.createElement('a')
          link.href = canvas.toDataURL('image/jpeg', quality / 100)
          link.download = `processed-${file.name}`
          link.click()
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Image Batch Processor</h1>
        <p className="text-white/70 mb-8">Process multiple images at once</p>

        <div className="glass-lg p-6 space-y-6">
          <label className="block">
            <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center cursor-pointer hover:border-yellow-400 transition">
              <div className="text-4xl mb-2">📁</div>
              <h3 className="font-bold mb-1">Upload Multiple Images</h3>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </label>

          {files.length > 0 && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-2">Operation</label>
                <select
                  value={operation}
                  onChange={(e) => setOperation(e.target.value)}
                  className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
                >
                  <option value="resize">Resize (80%)</option>
                  <option value="grayscale">Convert to Grayscale</option>
                </select>
              </div>

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

              <div className="bg-dark-bg border border-white/10 rounded p-3 max-h-32 overflow-y-auto">
                <p className="text-sm font-semibold mb-2">Files: {files.length}</p>
                <div className="space-y-1 text-xs text-white/70">
                  {files.map((f, idx) => (
                    <p key={idx}>• {f.name}</p>
                  ))}
                </div>
              </div>

              <button
                onClick={processBatch}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Process All Images
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
