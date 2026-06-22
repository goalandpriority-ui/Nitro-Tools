'use client'

import { useState, useEffect } from 'react'

export default function StatsPage() {
  const [stats, setStats] = useState({
    totalTools: 47,
    completedTools: 26,
    lyricsTools: 7,
    pdfTools: 7,
    imageTools: 7,
    developerTools: 8,
    aiTools: 4,
    seoTools: 5,
    resumeTools: 3,
    indianTools: 5,
  })

  useEffect(() => {
    // Update stats from config in production
    setStats(prev => ({
      ...prev,
      completedTools: 26,
    }))
  }, [])

  const completionPercentage = Math.round((stats.completedTools / stats.totalTools) * 100)

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Nitro Tools Dashboard</h1>
        <p className="text-white/70 mb-12">Complete suite of 47+ free online tools</p>

        {/* Overall Progress */}
        <div className="glass-lg p-8 mb-12">
          <div className="mb-6">
            <div className="flex justify-between items-end mb-3">
              <h2 className="text-2xl font-bold">Overall Completion</h2>
              <span className="text-3xl font-bold text-yellow-400">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-dark-bg rounded-full h-6">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-6 rounded-full transition-all"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-dark-bg p-4 rounded">
              <p className="text-white/60 text-sm">Completed Tools</p>
              <p className="text-3xl font-bold text-yellow-400">{stats.completedTools}</p>
            </div>
            <div className="bg-dark-bg p-4 rounded">
              <p className="text-white/60 text-sm">Total Tools</p>
              <p className="text-3xl font-bold">{stats.totalTools}</p>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(stats)
            .filter(([key]) => key !== 'totalTools' && key !== 'completedTools')
            .map(([category, count]) => (
              <div key={category} className="glass-lg p-6">
                <h3 className="font-bold mb-4 capitalize">{category.replace(/([A-Z])/g, ' $1')}</h3>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold text-yellow-400">{count}</div>
                  <div className="text-right">
                    <div className="text-sm text-white/60">Tools</div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Coming Soon */}
        <div className="glass mt-12 p-8">
          <h3 className="text-xl font-bold mb-4">🚀 Coming Soon</h3>
          <p className="text-white/70">
            {stats.totalTools - stats.completedTools} more tools in development including advanced PDF editing, image AI enhancement, and more lyrics tools!
          </p>
        </div>
      </div>
    </div>
  )
                }
