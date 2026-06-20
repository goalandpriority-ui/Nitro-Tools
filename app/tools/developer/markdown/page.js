'use client'

import { useState } from 'react'

export default function MarkdownPreviewPage() {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Preview

## Features
- Live preview
- Easy formatting
- Copy to clipboard

### Code Example
\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`

**Bold text** and *italic text*

> This is a blockquote
`)

  const parseMarkdown = (md) => {
    let html = md
    
    // Headers
    html = html.replace(/^### (.*)/gim, '<h3>$1</h3>')
    html = html.replace(/^## (.*)/gim, '<h2>$1</h2>')
    html = html.replace(/^# (.*)/gim, '<h1>$1</h1>')
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    
    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>')
    
    // Line breaks
    html = html.replace(/\n/gim, '<br>')
    
    return html
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown)
  }

  const downloadMarkdown = () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(markdown))
    element.setAttribute('download', 'document.md')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Markdown Preview</h1>
        <p className="text-white/70 mb-8">Write and preview Markdown in real-time</p>

        <div className="flex gap-2 mb-8">
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 transition"
          >
            Copy
          </button>
          <button
            onClick={downloadMarkdown}
            className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 transition"
          >
            Download
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor */}
          <div className="glass-lg p-6">
            <h2 className="text-lg font-bold mb-4">Markdown</h2>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-96 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none resize-none font-mono text-sm"
            />
          </div>

          {/* Preview */}
          <div className="glass-lg p-6">
            <h2 className="text-lg font-bold mb-4">Preview</h2>
            <div className="w-full h-96 bg-dark-bg border border-white/10 rounded px-4 py-4 overflow-y-auto prose prose-invert max-w-none">
              <div
                className="text-white/80"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
