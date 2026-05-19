'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Project {
  id: number
  title: string
  description: string
  emoji: string
  gradient: string
  tags: string[]
  github: string
  demo: string | null
  order: number
  created_at: string
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        setProjects(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError(
          'Unable to load projects right now. Please try again later.'
        )
        setLoading(false)
      })
  }, [])

  return (
    <section id="projects" className="py-24 px-6 bg-slate-50 dark:bg-[#0D1526]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-cyan-600 dark:text-cyan-400 text-sm tracking-widest uppercase mb-2">
            Things I&apos;ve built
          </p>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Projects</h2>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="text-slate-500 dark:text-slate-400 text-center py-12">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-slate-400 border-t-transparent mr-2" />
            Loading projects...
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 dark:text-red-400 text-lg mb-2">⚠️ {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white underline transition-colors"
            >
              Try refreshing the page
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-slate-500 dark:text-slate-400 text-center py-12">
            <p className="text-lg mb-2">🚧 No projects yet.</p>
            <p className="text-sm">
              Check back soon — I&apos;m always building something new.
            </p>
          </div>
        )}

        {/* Projects grid */}
        {!loading && !error && projects.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {projects.map(project => (
              <motion.article
                key={project.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl
                  overflow-hidden hover:border-blue-500/40 transition-colors group"
              >
                <div
                  className={`bg-gradient-to-br ${project.gradient}
                  h-36 flex items-center justify-center text-5xl`}
                >
                  {project.emoji}
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full
                          bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-slate-800 dark:text-white font-semibold text-lg mb-2
                    group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>

                  <div className="flex gap-3">
                    {project.demo && (
                      <Link
                        href={project.demo}
                        className="bg-blue-600 hover:bg-blue-500 text-white
                          text-xs px-4 py-2 rounded-full transition-colors"
                      >
                        Live Demo
                      </Link>
                    )}
                    <Link
                      href={project.github}
                      target="_blank"
                      className="border border-slate-300 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/50
                        text-slate-700 dark:text-white text-xs px-4 py-2 rounded-full transition-colors"
                    >
                      GitHub
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}