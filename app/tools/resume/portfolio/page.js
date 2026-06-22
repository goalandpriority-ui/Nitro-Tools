'use client'

import { useState } from 'react'

export default function PortfolioShowcasePage() {
  const [portfolio, setPortfolio] = useState({
    name: 'John Doe',
    title: 'Full Stack Developer',
    bio: 'Creating beautiful web experiences',
    projects: [
      { name: 'E-commerce Platform', description: 'Built with React & Node.js', link: 'https://example.com' },
      { name: 'Mobile App', description: 'React Native app', link: 'https://example.com' },
    ],
  })

  const [showPreview, setShowPreview] = useState(false)

  const addProject = () => {
    setPortfolio({
      ...portfolio,
      projects: [...portfolio.projects, { name: '', description: '', link: '' }],
    })
  }

  const updateProject = (idx, field, value) => {
    const updated = [...portfolio.projects]
    updated[idx][field] = value
    setPortfolio({ ...portfolio, projects: updated })
  }

  const removeProject = (idx) => {
    setPortfolio({
      ...portfolio,
      projects: portfolio.projects.filter((_, i) => i !== idx),
    })
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Portfolio Showcase</h1>
        <p className="text-white/70 mb-8">Create your professional portfolio</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="glass-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Your Name</label>
              <input
                type="text"
                value={portfolio.name}
                onChange={(e) => setPortfolio({ ...portfolio, name: e.target.value })}
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Professional Title</label>
              <input
                type="text"
                value={portfolio.title}
                onChange={(e) => setPortfolio({ ...portfolio, title: e.target.value })}
                className="w-full bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Bio</label>
              <textarea
                value={portfolio.bio}
                onChange={(e) => setPortfolio({ ...portfolio, bio: e.target.value })}
                className="w-full h-20 bg-dark-bg border border-white/10 rounded px-4 py-2 text-white focus:border-yellow-400 outline-none resize-none text-sm"
              />
            </div>

            <h3 className="font-bold mt-6">Projects</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {portfolio.projects.map((proj, idx) => (
                <div key={idx} className="bg-dark-bg border border-white/10 rounded p-3 space-y-2">
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => updateProject(idx, 'name', e.target.value)}
                    placeholder="Project name"
                    className="w-full bg-dark-bg border border-white/10 rounded px-2 py-1 text-white outline-none text-xs"
                  />
                  <input
                    type="text"
                    value={proj.description}
                    onChange={(e) => updateProject(idx, 'description', e.target.value)}
                    placeholder="Description"
                    className="w-full bg-dark-bg border border-white/10 rounded px-2 py-1 text-white outline-none text-xs"
                  />
                  <input
                    type="text"
                    value={proj.link}
                    onChange={(e) => updateProject(idx, 'link', e.target.value)}
                    placeholder="Link"
                    className="w-full bg-dark-bg border border-white/10 rounded px-2 py-1 text-white outline-none text-xs"
                  />
                  <button
                    onClick={() => removeProject(idx)}
                    className="w-full px-2 py-1 bg-red-500/20 rounded text-xs hover:bg-red-500/30 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={addProject}
              className="w-full px-4 py-2 bg-white/10 rounded hover:bg-white/20 transition text-sm"
            >
              + Add Project
            </button>

            <button
              onClick={() => setShowPreview(!showPreview)}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              {showPreview ? 'Edit Mode' : 'Preview Portfolio'}
            </button>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="glass-lg p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4"></div>
                <h2 className="text-3xl font-bold">{portfolio.name}</h2>
                <p className="text-yellow-400 text-lg">{portfolio.title}</p>
                <p className="text-white/70 mt-2">{portfolio.bio}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Featured Projects</h3>
                <div className="space-y-3">
                  {portfolio.projects.map((proj, idx) => (
                    <a
                      key={idx}
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-dark-bg border border-white/10 rounded p-4 hover:border-yellow-400 transition"
                    >
                      <p className="font-semibold text-yellow-400">{proj.name}</p>
                      <p className="text-white/70 text-sm">{proj.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
