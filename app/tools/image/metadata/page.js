'use client'

import { useState } from 'react'

export default function ImageMetadataPage() {
  const [image, setImage] = useState(null)
  const [metadata, setMetadata] = useState(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          const meta = {
            fileName: file.name,
            fileSize: (file.size / 1024).toFixed(2) + ' KB',
            fileType: file.type,
            width: img.width + ' px',
            height: img.height + ' px',
            aspect: (img.width / img.height).toFixed(2),
            created: new Date(file.lastModified).toLocaleString(),
          }
          setMetadata(meta)
          setImage(img)
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const copyMetadata = () => {
    const text = Object.entries(metadata)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n')
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Image Metadata Viewer</h1>
        <p className="text-white/70 mb-8">View image properties and metadata</p>

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

          {metadata && (
            <>
              <div className="bg-dark-bg border border-white/10 rounded p-4">
                {image && (
                  <img
                    src={image.src}
                    alt="preview"
                    className="max-w-full max-h-64 mx-auto rounded"
                  />
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold">Metadata</h3>
                  <button
                    onClick={copyMetadata}
                    className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 transition"
                  >
                    Copy
                  </button>
                </div>
                {Object.entries(metadata).map(([key, value]) => (
                  <div key={key} className="flex justify-between bg-dark-bg p-3 rounded">
                    <span className="text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-mono text-yellow-400">{value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
                      }
