'use client'

import { useState } from 'react'

export default function PdfSplitterPage() {
  const [file, setFile] = useState(null)
  const [startPage, setStartPage] = useState(1)
  const [endPage, setEndPage] = useState(5)
  const [message, setMessage] = useState('')

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      setMessage(`File selected: ${uploadedFile.name}`)
    }
  }

  const splitPdf = () => {
    if (!file) return
    setMessage(`⚙️ PDF splitting requires pdf-lib or PyPDF2.\n\nExtract pages ${startPage} to ${endPage}`)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">PDF Splitter</h1>
        <p className="text-white/70 mb-8">Extract pages from PDF files</p>

        <div className="glass-lg p-8 space-y-6">
          <label className="block">
            <div className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center cursor-pointer hover:border-yellow-400 transition">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="font-bold mb-2">Upload PDF</h3>
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

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Start Page</label>
                  <input
                    type="number"
                    value={startPage}
                    onChange={(e) => setStartPage(parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">End Page</label>
                  <input
                    type="number"
                    value={endPage}
                    onChange={(e) => setEndPage(parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
                  />
                </div>
              </div>

              <button
                onClick={splitPdf}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Split PDF
              </button>
            </>
          )}

          {message && (
            <div className="bg-white/10 border border-white/20 rounded p-4 text-white/80 text-sm whitespace-pre-line">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
            }
