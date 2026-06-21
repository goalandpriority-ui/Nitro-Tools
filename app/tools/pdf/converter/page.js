'use client'

import { useState } from 'react'

export default function PdfConverterPage() {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      setMessage(`File selected: ${uploadedFile.name}`)
    }
  }

  const downloadAsImage = () => {
    if (!file) return
    setMessage('PDF to Image conversion requires backend processing. Consider using online tools like CloudConvert or ILovePDF.')
  }

  const downloadAsText = () => {
    if (!file) return
    setMessage('PDF to Text extraction requires backend processing. Consider using online tools like CloudConvert or ILovePDF.')
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">PDF Converter</h1>
        <p className="text-white/70 mb-8">Convert PDFs to different formats (Beta)</p>

        <div className="glass-lg p-8 space-y-6">
          <label className="block">
            <div className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center cursor-pointer hover:border-yellow-400 transition">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="font-bold mb-2">Upload PDF</h3>
              <p className="text-white/60 text-sm mb-4">Click to select or drag and drop</p>
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

              <div className="space-y-3">
                <button
                  onClick={downloadAsImage}
                  className="w-full px-6 py-3 bg-yellow-400 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  Convert to Image
                </button>
                <button
                  onClick={downloadAsText}
                  className="w-full px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  Convert to Text
                </button>
              </div>
            </>
          )}

          {message && (
            <div className="bg-white/10 border border-white/20 rounded p-4 text-white/80 text-sm">
              {message}
            </div>
          )}

          <div className="glass p-4">
            <p className="text-sm text-white/70">
              💡 For production PDF conversion, integrate with:
              <br />• pdfjs-dist (PDF viewing)
              <br />• pdf-lib (PDF manipulation)
              <br />• cloudinary (Image conversion)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
            }
