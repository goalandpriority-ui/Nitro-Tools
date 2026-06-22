'use client'

import { useState } from 'react'

export default function PdfMergerPage() {
  const [files, setFiles] = useState([])
  const [message, setMessage] = useState('')

  const handleFilesUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files)
    setFiles(uploadedFiles)
    setMessage(`${uploadedFiles.length} PDF file(s) selected`)
  }

  const mergePdfs = () => {
    if (files.length < 2) {
      setMessage('⚠️ Please upload at least 2 PDF files')
      return
    }
    setMessage('⚙️ PDF merging requires backend library like pdf-lib or PyPDF2.\n\nOnline alternatives:\n• ILovePDF.com\n• Smallpdf.com\n• PDFtk')
  }

  const removeFile = (idx) => {
    setFiles(files.filter((_, i) => i !== idx))
  }

  const moveFile = (idx, direction) => {
    const newFiles = [...files]
    if (direction === 'up' && idx > 0) {
      [newFiles[idx], newFiles[idx - 1]] = [newFiles[idx - 1], newFiles[idx]]
    } else if (direction === 'down' && idx < files.length - 1) {
      [newFiles[idx], newFiles[idx + 1]] = [newFiles[idx + 1], newFiles[idx]]
    }
    setFiles(newFiles)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">PDF Merger</h1>
        <p className="text-white/70 mb-8">Combine multiple PDFs into one</p>

        <div className="glass-lg p-8 space-y-6">
          <label className="block">
            <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center cursor-pointer hover:border-yellow-400 transition">
              <div className="text-4xl mb-2">📁</div>
              <h3 className="font-bold mb-1">Upload PDFs</h3>
              <p className="text-white/60 text-sm">Select multiple PDF files</p>
              <input
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFilesUpload}
                className="hidden"
              />
            </div>
          </label>

          {files.length > 0 && (
            <>
              <div className="space-y-2">
                <h3 className="font-bold">Files to Merge ({files.length})</h3>
                {files.map((file, idx) => (
                  <div key={idx} className="bg-dark-bg border border-white/10 rounded p-3 flex justify-between items-center">
                    <span className="text-sm">{idx + 1}. {file.name}</span>
                    <div className="flex gap-1">
                      {idx > 0 && (
                        <button
                          onClick={() => moveFile(idx, 'up')}
                          className="px-2 py-1 bg-white/10 rounded hover:bg-white/20 text-xs transition"
                        >
                          ↑
                        </button>
                      )}
                      {idx < files.length - 1 && (
                        <button
                          onClick={() => moveFile(idx, 'down')}
                          className="px-2 py-1 bg-white/10 rounded hover:bg-white/20 text-xs transition"
                        >
                          ↓
                        </button>
                      )}
                      <button
                        onClick={() => removeFile(idx)}
                        className="px-2 py-1 bg-red-500/20 rounded hover:bg-red-500/30 text-xs transition"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={mergePdfs}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Merge PDFs
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
