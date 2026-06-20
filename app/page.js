import Link from 'next/link'
import { getAllCategories } from '@/lib/tools-config'

export default function Home() {
  const categories = getAllCategories()

  return (
    <div className="pt-20 pb-16">
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            All Tools You Need
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-2xl mx-auto">
          Lyrics editor, PDF tools, image processing, developer utilities, and more. Everything in one place.
        </p>
        <Link
          href="/tools"
          className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 text-lg"
        >
          Explore All Tools →
        </Link>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="group glass-lg p-6 hover:scale-105 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition">
                {category.name}
              </h3>
              <p className="text-sm text-white/60 mb-4">{category.description}</p>
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-semibold">
                {category.toolCount} tools
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Nitro Tools?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-8 text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Super Fast</h3>
            <p className="text-white/70">All processing happens locally in your browser. No uploads, no waiting.</p>
          </div>
          <div className="glass p-8 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2">Private & Secure</h3>
            <p className="text-white/70">Your data never leaves your device. Complete privacy guaranteed.</p>
          </div>
          <div className="glass p-8 text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold mb-2">Beautiful UI</h3>
            <p className="text-white/70">Modern glassmorphism design that's easy to use and looks great.</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="glass-lg p-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">47+</div>
              <p className="text-white/70">Powerful Tools</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">8</div>
              <p className="text-white/70">Tool Categories</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-500 mb-2">100%</div>
              <p className="text-white/70">Free Forever</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
