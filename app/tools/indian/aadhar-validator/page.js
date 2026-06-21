'use client'

import { useState } from 'react'

export default function AadhaarValidatorPage() {
  const [aadhaar, setAadhaar] = useState('')
  const [result, setResult] = useState('')

  const validateAadhaar = () => {
    const aadhaarRegex = /^[0-9]{12}$/
    const isValid = aadhaarRegex.test(aadhaar.trim())

    if (aadhaar.trim() === '') {
      setResult('Please enter an Aadhaar number')
      return
    }

    if (isValid) {
      const masked = aadhaar.substring(0, 4) + ' XXXX XXXX ' + aadhaar.substring(8)
      setResult(`✅ Valid Aadhaar Number\n\nDetails:\nAadhaar: ${masked}\nLength: 12 digits\nFormat: Valid`)
    } else {
      setResult('❌ Invalid Aadhaar Number\n\nAadhaar format:\n- Must be 12 digits\n- Only numbers (0-9)\n- No spaces or special characters')
    }
  }

  const copyResult = () => {
    navigator.clipboard.writeText(result)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Aadhaar Validator</h1>
        <p className="text-white/70 mb-8">Validate Indian Aadhaar numbers</p>

        <div className="glass-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Aadhaar Number</label>
            <input
              type="text"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g., 123456789012"
              maxLength="12"
              className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none font-mono text-lg"
            />
          </div>

          <button
            onClick={validateAadhaar}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            Validate Aadhaar
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
