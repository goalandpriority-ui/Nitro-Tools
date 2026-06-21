'use client'

import { useState } from 'react'

export default function PanValidatorPage() {
  const [pan, setPan] = useState('')
  const [result, setResult] = useState('')

  const validatePAN = () => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    const isValid = panRegex.test(pan.toUpperCase())

    if (pan.trim() === '') {
      setResult('Please enter a PAN number')
      return
    }

    if (isValid) {
      const parts = pan.toUpperCase()
      const info = {
        'AA': 'Association of Persons',
        'AB': 'Body of Individuals',
        'AC': 'Body Corporate',
        'AD': 'Local Authority',
        'AE': 'Religious and Charitable Institutions',
        'AF': 'Temporary Association',
        'AG': 'Special Economic Zone',
        'AH': 'Non Resident Individual',
        'AI': 'Artificial Juridical Person',
        'AJ': 'Startup',
        'BL': 'Body Corporate',
        'BT': 'Non-Individual',
        'CA': 'Company',
        'CB': 'Company',
        'CC': 'Company',
        'CD': 'Company',
        'CE': 'Company',
        'CF': 'Company',
        'CG': 'Company',
        'CH': 'Company',
        'CI': 'Company',
        'FI': 'Foreign Institution',
        'GE': 'Government Entities',
        'GH': 'Government',
        'GP': 'Govt. Partnership',
        'HL': 'Hindu Undivided Family',
        'HU': 'Hindu Undivided Family',
        'IF': 'Indian Fiduciary',
        'II': 'Importer',
        'IN': 'Individual',
        'PF': 'Person',
        'PI': 'Partnership Firm',
        'PN': 'Partnership Firm',
        'PT': 'Proprietary Firm',
        'TA': 'Trust',
        'TC': 'Trust',
        'TH': 'Trust',
        'TU': 'Trust',
      }

      const typeCode = parts.substring(0, 2)
      const panType = info[typeCode] || 'Unknown Type'

      setResult(`✅ Valid PAN Number\n\nDetails:\nPAN: ${parts}\nEntity Type: ${panType}`)
    } else {
      setResult('❌ Invalid PAN Number\n\nPAN format: AAAAA9999A\n- First 5 characters: Letters (A-Z)\n- Next 4 characters: Numbers (0-9)\n- Last character: Letter (A-Z)')
    }
  }

  const copyResult = () => {
    navigator.clipboard.writeText(result)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">PAN Validator</h1>
        <p className="text-white/70 mb-8">Validate Indian PAN numbers</p>

        <div className="glass-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">PAN Number</label>
            <input
              type="text"
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase())}
              placeholder="e.g., ABCDE1234F"
              maxLength="10"
              className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none font-mono text-lg"
            />
          </div>

          <button
            onClick={validatePAN}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            Validate PAN
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
        </div>
      </div>
    </div>
  )
              }
