import { notFound } from 'next/navigation'
import Link from 'next/link'
import { TOOL_CATEGORIES, getToolsByCategory } from '@/lib/tools-config'

export async function generateStaticParams() {
  return Object.keys(TOOL_CATEGORIES).map(id => ({
    id,
  }))
}

export default function CategoryPage({ params }) {
  const { id } = params
  const category = TOOL_CATEGORIES[id]
  const tools = getToolsByCategory(id)

  if (!category) {
    notFound()
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <div className="text-6xl mb-4">{category.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
          <p className="text-lg text-white/70">{category.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => {
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
                <p className="text-sm text-white/60">{tool.description}</p>
              </Link>
            )
          })}
        </div>

        {tools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-white/50">No tools in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  )
          }
