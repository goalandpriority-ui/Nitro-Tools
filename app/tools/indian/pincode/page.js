'use client'

import { useState } from 'react'

export default function PinCodeLookupPage() {
  const [pincode, setPincode] = useState('')
  const [result, setResult] = useState('')

  const pincodeDatabase = {
    '110001': { city: 'New Delhi', state: 'Delhi', region: 'Central Delhi' },
    '400001': { city: 'Mumbai', state: 'Maharashtra', region: 'South Mumbai' },
    '560001': { city: 'Bangalore', state: 'Karnataka', region: 'Central Bangalore' },
    '700001': { city: 'Kolkata', state: 'West Bengal', region: 'Central Kolkata' },
    '600001': { city: 'Chennai', state: 'Tamil Nadu', region: 'Central Chennai' },
    '500001': { city: 'Hyderabad', state: 'Telangana', region: 'Central Hyderabad' },
    '380001': { city: 'Ahmedabad', state: 'Gujarat', region: 'Central Ahmedabad' },
    '411001': { city: 'Pune', state: 'Maharashtra', region: 'Central Pune' },
    '201301': { city: 'Noida', state: 'Uttar Pradesh', region: 'Greater Noida' },
    '122001': { city: 'Faridabad', state: 'Haryana', region: 'Industrial Area' },
  }

  const lookupPinCode = () => {
    if (!pincode.trim()) {
      setResult('Please enter a pin code')
      return
    }

    const data = pincodeDatabase[pincode.trim()]
    if (data) {
      setResult(`✅ Pin Code Found\n\nCity: ${data.city}\nState: ${data.state}\nRegion: ${data.region}`)
    } else {
      setResult(`ℹ️ Pin Code: ${pincode}\n\nNote: This is a demo with limited data.\nFor complete India pin code lookup, try:\n- India Post Official Site\n- Pincode.in\n- PincodeSearch.com`)
    }
  }

  const copyResult = () => {
    navigator.clipboard.writeText(result)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Pin Code Lookup</h1>
        <p className="text-white/70 mb-8">Find city details from Indian pin codes</p>

        <div className="glass-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Pin Code</label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="e.g., 110001"
              maxLength="6"
              className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none font-mono text-lg"
            />
          </div>

          <button
            onClick={lookupPinCode}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            Lookup Pin Code
          </button>

          {result && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">Result</h3>
                <button
                  onClick={copyResult}
                  className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 transition"
                >
                  Copy
                </button>
              </div>
              <div className="bg-dark-bg border border-white/10 rounded p-4 text-white/80 whitespace-pre-line">
                {result}
              </div>
            </div>
          )}

          <div className="glass p-4 text-sm text-white/70">
            <p className="font-semibold mb-2">Demo Pin Codes:</p>
            <div className="space-y-1">
              <p>• 110001 - Delhi</p>
              <p>• 400001 - Mumbai</p>
              <p>• 560001 - Bangalore</p>
              <p>• 600001 - Chennai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
    }
