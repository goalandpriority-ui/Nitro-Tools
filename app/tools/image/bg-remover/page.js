'use client'

import { useState } from 'react'

export default function BackgroundRemoverPage() {
  const [image, setImage] = useState(null)
  const [message, setMessage] = useState('')

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          setImage(img)
          setMessage('Image loaded successfully!')
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const removeBackground = () => {
    setMessage('⚙️ Background removal requires AI processing.\n\nUse services like:\n• remove.bg (Free API)\n• Photoshop\n• GIMP\n• Online tools')
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Background Remover</h1>
        <p className="text-white/70 mb-8">Remove background from images</p>

        <div className="glass-lg p-8 space-y-6">
          <label className="block">
            <div className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center cursor-pointer hover:border-yellow-400 transition">
              <div className="text-4xl mb-4">🎨</div>
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
              <div className="bg-dark-bg border border-white/10 rounded p-4">
                <img src={image.src} alt="preview" className="max-w-full max-h-64 mx-auto rounded" />
              </div>

              <button
                onClick={removeBackground}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Remove Background
              </button>
            </>
          )}

          {message && (
            <div className="bg-white/10 border border-white/20 rounded p-4 text-white/80 text-sm whitespace-pre-line">
              {message}
            </div>
          )}

          <div className="glass p-4">
            <p className="text-sm text-white/70">
              💡 Best free options:
              <br />• remove.bg API
              <br />• Photoshop
              <br />• GIMP (open source)
              <br />• Canva Pro
            </p>
          </div>
        </div>
      </div>
    </div>
  )
            }
