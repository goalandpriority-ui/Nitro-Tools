'use client'

import { useState } from 'react'

export default function SitemapGeneratorPage() {
  const [urls, setUrls] = useState('https://example.com\nhttps://example.com/about\nhttps://example.com/blog\nhttps://example.com/contact')
  const [changeFreq, setChangeFreq] = useState('weekly')
  const [priority, setPriority] = useState('0.8')
  const [sitemap, setSitemap] = useState('')

  const generateSitemap = () => {
    const urlList = urls.split('\n').filter(url => url.trim())
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    urlList.forEach(url => {
      xml += '  <url>\n'
      xml += `    <loc>${url.trim()}</loc>\n`
      xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`
      xml += `    <changefreq>${changeFreq}</changefreq>\n`
      xml += `    <priority>${priority}</priority>\n`
      xml += '  </url>\n'
    })
    
    xml += '</urlset>'
    setSitemap(xml)
  }

  const copySitemap = () => {
    navigator.clipboard.writeText(sitemap)
  }

  const downloadSitemap = () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(sitemap))
    element.setAttribute('download', 'sitemap.xml')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Sitemap Generator</h1>
        <p className="text-white/70 mb-8">Create XML sitemaps for SEO</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-lg p-6 space-y-4">
            <h2 className="text-lg font-bold">URLs (one per line)</h2>
            <textarea
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              placeholder="https://example.com&#10;https://example.com/page1&#10;https://example.com/page2"
              className="w-full h-40 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none resize-none font-mono text-sm"
            />

            <div>
              <label className="block text-sm font-semibold mb-2">Change Frequency</label>
              <select
                value={changeFreq}
                onChange={(e) => setChangeFreq(e.target.value)}
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
              >
                <option value="always">Always</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="never">Never</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Priority (0.0 - 1.0)</label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
              />
            </div>

            <button
              onClick={generateSitemap}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Generate Sitemap
            </button>
          </div>

          <div className="glass-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">sitemap.xml</h2>
              <div className="flex gap-2">
                <button
                  onClick={copySitemap}
                  disabled={!sitemap}
                  className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 transition"
                >
                  Copy
                </button>
                <button
                  onClick={downloadSitemap}
                  disabled={!sitemap}
                  className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 transition"
                >
                  Download
                </button>
              </div>
            </div>
            <pre className="w-full h-96 bg-dark-bg border border-white/10 rounded p-4 overflow-y-auto text-white/80 text-xs font-mono whitespace-pre-wrap">
              {sitemap || 'Sitemap will appear here...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
    }
