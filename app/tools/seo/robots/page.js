'use client'

import { useState } from 'react'

export default function RobotsTxtGeneratorPage() {
  const [allowAll, setAllowAll] = useState(true)
  const [disallowPaths, setDisallowPaths] = useState('/admin\n/private')
  const [sitemapUrl, setSitemapUrl] = useState('https://example.com/sitemap.xml')
  const [robotsTxt, setRobotsTxt] = useState('')

  const generateRobots = () => {
    let content = '# Robots.txt for your website\n\n'
    
    if (allowAll) {
      content += 'User-agent: *\n'
      content += 'Allow: /\n\n'
    } else {
      content += 'User-agent: *\n'
      content += 'Disallow: /\n\n'
    }

    if (disallowPaths.trim()) {
      content += 'User-agent: *\n'
      const paths = disallowPaths.split('\n').filter(p => p.trim())
      paths.forEach(path => {
        content += `Disallow: ${path.trim()}\n`
      })
      content += '\n'
    }

    content += '# Crawl delay (optional)\n'
    content += 'Crawl-delay: 1\n\n'

    if (sitemapUrl) {
      content += `# Sitemap\nSitemap: ${sitemapUrl}\n`
    }

    setRobotsTxt(content)
  }

  const copyRobots = () => {
    navigator.clipboard.writeText(robotsTxt)
  }

  const downloadRobots = () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(robotsTxt))
    element.setAttribute('download', 'robots.txt')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Robots.txt Generator</h1>
        <p className="text-white/70 mb-8">Create robots.txt file for your website</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-lg p-6 space-y-4">
            <div>
              <label className="flex items-center gap-2 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={allowAll}
                  onChange={(e) => setAllowAll(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="font-semibold">Allow all crawlers</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Disallow Paths (one per line)</label>
              <textarea
                value={disallowPaths}
                onChange={(e) => setDisallowPaths(e.target.value)}
                placeholder="/admin&#10;/private&#10;/temp"
                className="w-full h-32 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none resize-none font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Sitemap URL</label>
              <input
                type="text"
                value={sitemapUrl}
                onChange={(e) => setSitemapUrl(e.target.value)}
                placeholder="https://example.com/sitemap.xml"
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
              />
            </div>

            <button
              onClick={generateRobots}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Generate robots.txt
            </button>
          </div>

          <div className="glass-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">robots.txt</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyRobots}
                  disabled={!robotsTxt}
                  className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 transition"
                >
                  Copy
                </button>
                <button
                  onClick={downloadRobots}
                  disabled={!robotsTxt}
                  className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 transition"
                >
                  Download
                </button>
              </div>
            </div>
            <pre className="w-full h-72 bg-dark-bg border border-white/10 rounded p-4 overflow-y-auto text-white/80 text-xs font-mono whitespace-pre-wrap">
              {robotsTxt || 'robots.txt will appear here...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
                  }
