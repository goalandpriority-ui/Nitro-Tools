'use client'

import { useState } from 'react'

export default function IplStatsCalculatorPage() {
  const [runs, setRuns] = useState(50)
  const [balls, setBalls] = useState(40)
  const [wickets, setWickets] = useState(3)
  const [overs, setOvers] = useState(4)

  const strikeRate = balls > 0 ? ((runs / balls) * 100).toFixed(2) : 0
  const average = wickets > 0 ? (runs / wickets).toFixed(2) : 'N/A'
  const economyRate = overs > 0 ? (runs / overs).toFixed(2) : 0

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">IPL Stats Calculator</h1>
        <p className="text-white/70 mb-8">Calculate IPL cricket statistics instantly</p>

        <div className="glass-lg p-6 space-y-6 mb-8">
          <div>
            <label className="block text-sm font-semibold mb-2">Runs Scored</label>
            <input
              type="number"
              value={runs}
              onChange={(e) => setRuns(parseInt(e.target.value) || 0)}
              className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Balls Faced</label>
            <input
              type="number"
              value={balls}
              onChange={(e) => setBalls(parseInt(e.target.value) || 0)}
              className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Wickets (for Bowler)</label>
            <input
              type="number"
              value={wickets}
              onChange={(e) => setWickets(parseInt(e.target.value) || 0)}
              className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Overs Bowled (for Bowler)</label>
            <input
              type="number"
              value={overs}
              onChange={(e) => setOvers(parseInt(e.target.value) || 0)}
              step="0.1"
              className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-lg p-6">
            <h3 className="text-lg font-bold mb-4">Batting Stats</h3>
            <div className="space-y-3">
              <div className="bg-dark-bg p-3 rounded">
                <p className="text-white/60 text-sm">Strike Rate</p>
                <p className="text-2xl font-bold text-yellow-400">{strikeRate}</p>
                <p className="text-xs text-white/50 mt-1">Runs per 100 balls</p>
              </div>
              <div className="bg-dark-bg p-3 rounded">
                <p className="text-white/60 text-sm">Runs</p>
                <p className="text-2xl font-bold text-yellow-400">{runs}</p>
              </div>
            </div>
          </div>

          <div className="glass-lg p-6">
            <h3 className="text-lg font-bold mb-4">Bowling Stats</h3>
            <div className="space-y-3">
              <div className="bg-dark-bg p-3 rounded">
                <p className="text-white/60 text-sm">Economy Rate</p>
                <p className="text-2xl font-bold text-yellow-400">{economyRate}</p>
                <p className="text-xs text-white/50 mt-1">Runs per over</p>
              </div>
              <div className="bg-dark-bg p-3 rounded">
                <p className="text-white/60 text-sm">Average</p>
                <p className="text-2xl font-bold text-yellow-400">{average}</p>
                <p className="text-xs text-white/50 mt-1">Runs per wicket</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
                }
