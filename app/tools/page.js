'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { TOOLS, TOOL_CATEGORIES } from '@/lib/tools-config'

export default function ToolsPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)

  const filteredTools = useMemo(() => {
    let result = Object.values(TOOLS)

    if (search) {
      result = result.filter(tool =>
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (selectedCategory) {
      result = result.filter(tool => tool.category === selectedCategory)
    }

    return result
  }, [search, selectedCategory])

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Tools</h1>
          <p className="text-lg text-white/70">Find the right tool for your task</p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="glass-lg p-4">
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-lg outline-none placeholder-white/50"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === null
                  ? 'bg-yellow-400 text-white'
                  : 'glass hover:bg-white/10'
              }`}
            >
              All Categories
            </button>
            {Object.entries(TOOL_CATEGORIES).map(([id, category]) => (
              <button
                key={id}
                onClick={() => setSelectedCategory(id)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCategory === id
                    ? 'bg-yellow-400 text-white'
                    : 'glass hover:bg-white/10'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-white/70">
            {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => {
            const category = TOOL_CATEGORIES[tool.category]
            const isBuilding = tool.status === 'building'

            return (
              <Link
                key={tool.id}
                href={isBuilding ? tool.path : '#'}
                className={`glass-lg p-6 group transition-all duration-300 ${
                  isBuilding ? 'hover:scale-105 cursor-pointer' : 'opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{category.icon}</div>
                  {isBuilding ? (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded font-semibold">
                      Ready
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-white/10 text-white/50 text-xs rounded font-semibold">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h3 className={`text-lg font-bold mb-2 group-hover:text-yellow-400 transition ${
                  isBuilding ? '' : 'line-through'
                }`}>
                  {tool.name}
                </h3>
                <p className="text-sm text-white/60 mb-4">{tool.description}</p>
                <span className="text-xs text-white/50">{category.name}</span>
              </Link>
            )
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-white/50">No tools found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
                  }
