'use client'

import { useState } from 'react'

export default function CoverLetterGeneratorPage() {
  const [data, setData] = useState({
    yourName: 'John Doe',
    jobTitle: 'Senior Software Engineer',
    company: 'Tech Company Inc',
    hiringManager: 'Jane Smith',
    keySkills: 'Full Stack Development, Team Leadership',
    experience: '5 years',
    achievements: 'Led 10+ successful projects',
  })

  const [letter, setLetter] = useState('')

  const generateLetter = () => {
    const letterText = `Dear ${data.hiringManager},

I am writing to express my strong interest in the ${data.jobTitle} position at ${data.company}. With ${data.experience} of professional experience and proven expertise in ${data.keySkills}, I am confident in my ability to contribute significantly to your team.

Throughout my career, I have demonstrated exceptional technical capabilities and leadership skills. My key achievement includes: ${data.achievements}

I am particularly drawn to ${data.company} because of your company's innovative approach and commitment to excellence. I am excited about the opportunity to bring my skills, experience, and passion to your organization.

I would welcome the opportunity to discuss how my background, skills, and enthusiasm can contribute to your team. Thank you for considering my application. I look forward to hearing from you soon.

Warm regards,
${data.yourName}`

    setLetter(letterText)
  }

  const copyLetter = () => {
    navigator.clipboard.writeText(letter)
  }

  const downloadLetter = () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(letter))
    element.setAttribute('download', `cover-letter-${data.yourName}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Cover Letter Generator</h1>
        <p className="text-white/70 mb-8">Generate professional cover letters</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="glass-lg p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  value={data.yourName}
                  onChange={(e) => setData({ ...data, yourName: e.target.value })}
                  className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Job Title</label>
                <input
                  type="text"
                  value={data.jobTitle}
                  onChange={(e) => setData({ ...data, jobTitle: e.target.value })}
                  className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Company Name</label>
                <input
                  type="text"
                  value={data.company}
                  onChange={(e) => setData({ ...data, company: e.target.value })}
                  className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Hiring Manager Name</label>
                <input
                  type="text"
                  value={data.hiringManager}
                  onChange={(e) => setData({ ...data, hiringManager: e.target.value })}
                  className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Key Skills</label>
                <input
                  type="text"
                  value={data.keySkills}
                  onChange={(e) => setData({ ...data, keySkills: e.target.value })}
                  className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Years of Experience</label>
                <input
                  type="text"
                  value={data.experience}
                  onChange={(e) => setData({ ...data, experience: e.target.value })}
                  className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Key Achievement</label>
                <textarea
                  value={data.achievements}
                  onChange={(e) => setData({ ...data, achievements: e.target.value })}
                  className="w-full h-20 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none resize-none text-sm"
                />
              </div>

              <button
                onClick={generateLetter}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Generate Cover Letter
              </button>
            </div>
          </div>

          <div className="glass-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Cover Letter Preview</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyLetter}
                  disabled={!letter}
                  className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 transition"
                >
                  Copy
                </button>
                <button
                  onClick={downloadLetter}
                  disabled={!letter}
                  className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 transition"
                >
                  Download
                </button>
              </div>
            </div>
            <pre className="w-full h-96 bg-dark-bg border border-white/10 rounded p-4 overflow-y-auto text-white/80 text-xs whitespace-pre-wrap">
              {letter || 'Cover letter will appear here...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
