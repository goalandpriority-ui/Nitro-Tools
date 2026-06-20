'use client'

import { useState } from 'react'

export default function ColorPickerPage() {
  const [color, setColor] = useState('#FCD34D')
  const [format, setFormat] = useState('hex')

  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()
  }

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null
  }

  const getRgbString = () => {
    const rgb = hexToRgb(color)
    return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : ''
  }

  const getHslString = () => {
    const rgb = hexToRgb(color)
    if (!rgb) return ''
    let r = rgb.r / 255
    let g = rgb.g / 255
    let b = rgb.b / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Color Picker</h1>
        <p className="text-white/70 mb-8">Convert and pick colors easily</p>

        <div className="glass-lg p-8 space-y-6">
          {/* Color Picker Input */}
          <div>
            <label className="block text-sm font-semibold mb-4">Pick a Color</label>
            <div className="flex gap-4 items-center">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-24 h-24 rounded cursor-pointer border-2 border-white/10"
              />
              <div
                className="w-24 h-24 rounded border-2 border-white/10"
                style={{ backgroundColor: color }}
              />
            </div>
          </div>

          {/* Color Values */}
          <div className="space-y-3">
            {/* HEX */}
            <div className="flex justify-between items-center p-3 bg-dark-bg rounded">
              <div>
                <p className="text-xs text-white/50">HEX</p>
                <p className="font-mono text-white">{color}</p>
              </div>
              <button
                onClick={() => copyToClipboard(color)}
                className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 transition"
              >
                Copy
              </button>
            </div>

            {/* RGB */}
            <div className="flex justify-between items-center p-3 bg-dark-bg rounded">
              <div>
                <p className="text-xs text-white/50">RGB</p>
                <p className="font-mono text-white">{getRgbString()}</p>
              </div>
              <button
                onClick={() => copyToClipboard(getRgbString())}
                className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 transition"
              >
                Copy
              </button>
            </div>

            {/* HSL */}
            <div className="flex justify-between items-center p-3 bg-dark-bg rounded">
              <div>
                <p className="text-xs text-white/50">HSL</p>
                <p className="font-mono text-white">{getHslString()}</p>
              </div>
              <button
                onClick={() => copyToClipboard(getHslString())}
                className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 transition"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
                  }
