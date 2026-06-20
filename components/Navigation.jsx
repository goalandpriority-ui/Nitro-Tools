'use client'

import Link from 'next/link'
import { useState } from 'react'
import { getAllCategories } from '@/lib/tools-config'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const categories = getAllCategories()

  return (
    <nav className="glass-lg fixed top-0 left-0 right-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">⚡</span>
            <span className="font-bold text-lg bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Nitro Tools
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-3 py-2 text-sm hover:text-yellow-400 transition">
              Home
            </Link>
            <div className="relative group">
              <button className="px-3 py-2 text-sm hover:text-yellow-400 transition">
                Tools
              </button>
              <div className="absolute left-0 mt-0 w-48 glass opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 top-full">
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.id}`}
                    className="block px-4 py-2 text-sm hover:text-yellow-400 border-b border-white/10 last:border-b-0"
                  >
                    {cat.icon} {cat.name} ({cat.toolCount})
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/tools" className="px-3 py-2 text-sm hover:text-yellow-400 transition">
              All Tools
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:text-yellow-400 transition"
          >
            <span className="text-2xl">{isOpen ? '✕' : '☰'}</span>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-white/10 py-4 space-y-2">
            <Link href="/" className="block px-3 py-2 text-sm hover:text-yellow-400">
              Home
            </Link>
            <Link href="/tools" className="block px-3 py-2 text-sm hover:text-yellow-400">
              All Tools
            </Link>
            <div className="border-t border-white/10 pt-2">
              <p className="px-3 text-xs font-semibold text-white/50 py-2">Categories</p>
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.id}`}
                  className="block px-3 py-2 text-sm hover:text-yellow-400 border-l-2 border-transparent hover:border-yellow-400"
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
