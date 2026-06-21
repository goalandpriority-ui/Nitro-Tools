'use client'

import { useState } from 'react'

export default function TrainSeatAnalyzerPage() {
  const [seatType, setSeatType] = useState('3ac')
  const [layout, setLayout] = useState(null)

  const seatLayouts = {
    '3ac': {
      name: '3AC (Third AC)',
      bays: 16,
      layout: [
        { side: 'Left', seats: ['LB1', 'MB1', 'UB1'] },
        { side: 'Right', seats: ['RB1', 'SB1', 'UB1'] },
      ],
      info: 'Three-tier berth, Budget friendly',
      price: '₹500-1500',
    },
    '2ac': {
      name: '2AC (Second AC)',
      bays: 16,
      layout: [
        { side: 'Left', seats: ['LB1', 'UB1'] },
        { side: 'Right', seats: ['RB1', 'SB1'] },
      ],
      info: 'Two-tier berth, More comfortable',
      price: '₹1000-2500',
    },
    '1ac': {
      name: '1AC (First AC)',
      bays: 8,
      layout: [{ side: 'Cabin', seats: ['Bed 1', 'Bed 2'] }],
      info: 'Private cabin, Most luxurious',
      price: '₹3000-5000',
    },
    'sleeper': {
      name: 'Sleeper Class',
      bays: 16,
      layout: [
        { side: 'Left', seats: ['LB', 'MB', 'UB'] },
        { side: 'Right', seats: ['RB', 'SB', 'UB'] },
      ],
      info: 'Three-tier berth, Most economical',
      price: '₹300-800',
    },
  }

  const handleAnalyze = () => {
    setLayout(seatLayouts[seatType])
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Train Seat Analyzer</h1>
        <p className="text-white/70 mb-8">Understand Indian Railway seat layouts</p>

        <div className="glass-lg p-6 space-y-6 mb-8">
          <div>
            <label className="block text-sm font-semibold mb-2">Select Seat Type</label>
            <select
              value={seatType}
              onChange={(e) => setSeatType(e.target.value)}
              className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
            >
              <option value="1ac">1AC (First AC)</option>
              <option value="2ac">2AC (Second AC)</option>
              <option value="3ac">3AC (Third AC)</option>
              <option value="sleeper">Sleeper Class</option>
            </select>
          </div>

          <button
            onClick={handleAnalyze}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            Show Layout
          </button>
        </div>

        {layout && (
          <div className="space-y-6">
            <div className="glass-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{layout.name}</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-white/60 text-sm">Information</p>
                  <p className="text-lg">{layout.info}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Approximate Price</p>
                  <p className="text-lg text-yellow-400">{layout.price}</p>
                </div>
              </div>
            </div>

            <div className="glass-lg p-6">
              <h3 className="text-xl font-bold mb-4">Seat Layout (Bay View)</h3>
              <div className="space-y-4">
                {layout.layout.map((bay, idx) => (
                  <div key={idx} className="bg-dark-bg rounded p-4">
                    <p className="font-semibold mb-2">{bay.side} Side:</p>
                    <div className="flex gap-2 flex-wrap">
                      {bay.seats.map((seat, sidx) => (
                        <div
                          key={sidx}
                          className="px-4 py-2 bg-white/10 rounded font-mono text-sm border border-white/20"
                        >
                          {seat}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-6">
              <h4 className="font-bold mb-2">Seat Abbreviations:</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• LB = Lower Berth (Left)</li>
                <li>• RB = Right Lower Berth</li>
                <li>• MB = Middle Berth</li>
                <li>• UB = Upper Berth</li>
                <li>• SB = Side Berth</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
    }
