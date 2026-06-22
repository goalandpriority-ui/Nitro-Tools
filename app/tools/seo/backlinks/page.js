'use client'

import { useState } from 'react'

export default function BacklinkCheckerPage() {
  const [url, setUrl] = useState('https://example.com')
  const [backlinks, setBacklinks] = useState([])
  const [loading, setLoading] = useState(false)

  const checkBacklinks = async () => {
    if (!url.trim()) return

    setLoading(true)
    setBacklinks([])

    try {
      // Demo data - in production use Ahrefs/Semrush/Moz API
      const demoBacklinks = [
        { domain: 'techblog.com', url: 'https://techblog.com/article-about-seo', authority: 42 },
        { domain: 'marketingtoday.io', url: 'https://marketingtoday.io/resources', authority: 38 },
        { domain: 'industry-news.net', url: 'https://industry-news.net/top-sites', authority: 35 },
        { domain: 'digitalagency.co', url: 'https://digitalagency.co/portfolio', authority: 41 },
        { domain: 'startup-hub.com', url: 'https://startup-hub.com/companies', authority: 39 },
      ]

      setTimeout(() => {
        setBacklinks(demoBacklinks)
        setLoading(false)
      }, 2000)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Backlink Checker</h1>
        <p className="text-white/70 mb-8">Check backlinks to your website</p>

        <div className="glass-lg p-6 space-y-6 mb-8">
          <div>
            <label className="block text-sm font-semibold mb-2">Website URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
            />
          </div>

          <button
            onClick={checkBacklinks}
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg disabled:opacity-50 transition-all"
          >
            {loading ? 'Checking Backlinks...' : 'Check Backlinks'}
          </button>
        </div>

        {backlinks.length > 0 && (
          <div className="glass-lg p-6">
            <h3 className="text-lg font-bold mb-4">Found {backlinks.length} Backlinks</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {backlinks.map((link, idx) => (
                <div key={idx} className="bg-dark-bg border border-white/10 rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:underline text-sm break-all"
                    >
                      {link.url}
                    </a>
                    <span className="bg-white/10 px-2 py-1 rounded text-xs whitespace-nowrap">
                      Authority: {link.authority}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm">From: {link.domain}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="glass p-6 mt-8">
          <p className="text-sm text-white/70">
            💡 This is a demo. For real backlink data, use:
            <br />• Ahrefs
            <br />• Semrush
            <br />• Moz
            <br />• SE Ranking
          </p>
        </div>
      </div>
    </div>
  )
                             }
