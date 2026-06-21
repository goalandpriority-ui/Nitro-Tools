'use client'

import { useState } from 'react'

export default function ResumeBuilderPage() {
  const [resume, setResume] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91-9876543210',
    headline: 'Full Stack Developer',
    summary: 'Experienced developer with 5+ years in web development',
    experience: 'XYZ Company - Full Stack Developer (2020-Present)',
    skills: 'JavaScript, React, Node.js, Python, SQL',
    education: 'B.Tech in Computer Science (2020)',
  })

  const [resumeOutput, setResumeOutput] = useState('')

  const generateResume = () => {
    const output = `
═════════════════════════════════════════════════════
                    ${resume.name.toUpperCase()}
═════════════════════════════════════════════════════

CONTACT INFORMATION
Email: ${resume.email}
Phone: ${resume.phone}

PROFESSIONAL HEADLINE
${resume.headline}

PROFESSIONAL SUMMARY
${resume.summary}

EXPERIENCE
${resume.experience}

SKILLS
${resume.skills}

EDUCATION
${resume.education}

═════════════════════════════════════════════════════
    Generated with Nitro Tools Resume Builder
═════════════════════════════════════════════════════
    `
    setResumeOutput(output)
  }

  const downloadResume = () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(resumeOutput))
    element.setAttribute('download', `${resume.name}-Resume.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const copyResume = () => {
    navigator.clipboard.writeText(resumeOutput)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Resume Builder</h1>
        <p className="text-white/70 mb-8">Create a professional resume</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="space-y-4">
            <div className="glass-lg p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={resume.name}
                  onChange={(e) => setResume({ ...resume, name: e.target.value })}
                  className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={resume.email}
                  onChange={(e) => setResume({ ...resume, email: e.target.value })}
                  className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Phone</label>
                <input
                  type="text"
                  value={resume.phone}
                  onChange={(e) => setResume({ ...resume, phone: e.target.value })}
                  className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Professional Headline</label>
                <input
                  type="text"
                  value={resume.headline}
                  onChange={(e) => setResume({ ...resume, headline: e.target.value })}
                  className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Professional Summary</label>
                <textarea
                  value={resume.summary}
                  onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                  className="w-full h-20 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Experience</label>
                <textarea
                  value={resume.experience}
                  onChange={(e) => setResume({ ...resume, experience: e.target.value })}
                  className="w-full h-20 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Skills</label>
                <input
                  type="text"
                  value={resume.skills}
                  onChange={(e) => setResume({ ...resume, skills: e.target.value })}
                  className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Education</label>
                <input
                  type="text"
                  value={resume.education}
                  onChange={(e) => setResume({ ...resume, education: e.target.value })}
                  className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none"
                />
              </div>

              <button
                onClick={generateResume}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Generate Resume
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="glass-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Resume Preview</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyResume}
                  disabled={!resumeOutput}
                  className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 transition"
                >
                  Copy
                </button>
                <button
                  onClick={downloadResume}
                  disabled={!resumeOutput}
                  className="px-3 py-1 text-sm bg-white/10 rounded hover:bg-white/20 disabled:opacity-50 transition"
                >
                  Download
                </button>
              </div>
            </div>
            <pre className="w-full h-96 bg-dark-bg border border-white/10 rounded p-4 overflow-y-auto text-white/80 text-xs font-mono whitespace-pre-wrap">
              {resumeOutput || 'Resume preview will appear here...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
                                              }
