'use client'

import { useState } from 'react'

export default function MetaTagGeneratorPage() {
  const [data, setData] = useState({
    title: 'My Awesome Website',
    description: 'This is a description of my website',
    keywords: 'web, design, development',
    author: 'Your Name',
    url: 'https://example.com',
    image: 'https://example.com/image.jpg',
  })

  const [generatedTags, setGeneratedTags] = useState('')

  const generateTags = () => {
    const tags = `<!-- SEO Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${data.description}">
<meta name="keywords" content="${data.keywords}">
<meta name="author" content="${data.author}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${data.url}">

<!-- Open Graph Meta Tags -->
<meta property="og:title" content="${data.title}">
<meta property="og:description" content="${data.description}">
<meta property="og:url" content="${data.url}">
<meta property="og:image" content="${data.image}">
<meta property="og:type" content="website">

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${data.title}">
<meta name="twitter:description" content="${data.description}">
<meta name="twitter:image" content="${data.image}">

<!-- Additional Meta Tags -->
<meta name="theme-color" content="#0F0F1E">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<title>${data.title}</title>`

    setGeneratedTags(tags)
  }

  const copyTags = () => {
    navigator.clipboard.writeText(generatedTags)
  }

  const downloadTags = () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(generatedTags))
    element.setAttribute('download', 'meta-tags.html')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Meta Tag Generator</h1>
        <p className="text-white/70 mb-8">Generate SEO meta tags for your website</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Input Form */}
          <div className="glass-lg p-6 space-y-4">
            <h2 className="text-lg font-bold mb-4">Website Information</h2>
            
            <div>
              <label className="block text-sm font-semibold mb-1">Page Title</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Description</label>
              <textarea
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                className="w-full h-20 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Keywords</label>
              <input
                type="text"
                value={data.keywords}
                onChange={(e) => setData({ ...data, keywords: e.target.value })}
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Author</label>
              <input
                type="text"
                value={data.author}
                onChange={(e) => setData({ ...data, author: e.target.value })}
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">URL</label>
              <input
                type="text"
                value={data.url}
                onChange={(e) => setData({ ...data, url: e.target.value })}
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Image URL</label>
              <input
                type="text"
                value={data.image}
                onChange={(e) => setData({ ...data, image: e.target.value })}
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
              />
            </div>

            <button
              onClick={generateTags}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Generate Meta Tags
            </button>
          </div>

          {/* Output */}
          <div className="glass-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Generated Tags</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyTags}
                  disabled={!generatedTags}
                  className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 transition"
                >
                  Copy
                </button>
                <button
                  onClick={downloadTags}
                  disabled={!generatedTags}
                  className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 transition"
                >
                  Download
                </button>
              </div>
            </div>
            <pre className="w-full h-96 bg-dark-bg border border-white/10 rounded p-4 overflow-y-auto text-white/80 text-xs font-mono whitespace-pre-wrap">
              {generatedTags || 'Meta tags will appear here...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
                  }
