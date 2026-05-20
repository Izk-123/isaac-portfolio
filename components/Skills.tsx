'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

interface SkillCategory {
  id: number
  icon: string
  category: string
  color: string
  skills: string[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
}

export default function Skills() {
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills/`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        setCategories(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError('Could not load skills right now. Please try again later.')
        setLoading(false)
      })
  }, [])

  if (!mounted) return null

  return (
    <section id="skills" className="py-24 px-6 bg-white dark:bg-[#0B1120] relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-cyan-600 dark:text-cyan-400 text-sm tracking-widest uppercase mb-2">What I work with</p>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Skills</h2>
        </motion.div>

        {loading && (
          <div className="text-slate-500 dark:text-slate-400 text-center py-12">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-slate-400 border-t-transparent mr-2" />
            Loading skills...
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 dark:text-red-400 text-lg mb-2">⚠️ {error}</p>
            <button onClick={() => window.location.reload()} className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white underline">Try refreshing the page</button>
          </div>
        )}

        {!loading && !error && categories.length === 0 && (
          <div className="text-slate-500 dark:text-slate-400 text-center py-12">
            <p className="text-lg mb-2">🛠️ No skills listed yet.</p>
            <p className="text-sm">Check back soon for updates.</p>
          </div>
        )}

        {!loading && !error && categories.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {categories.map(cat => (
              <motion.div
                key={cat.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setHoveredId(cat.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 transition-all duration-300 cursor-default relative overflow-hidden"
              >
                {hoveredId === cat.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isDark ? 0.3 : 0.15 }}
                  >
                    <svg width="100%" height="40" className="absolute bottom-0">
                      <motion.path
                        d="M0,20 Q10,5 20,20 T40,20 T60,20 T80,20 T100,20 T120,20 T140,20 T160,20 T180,20 T200,20"
                        fill="none"
                        stroke={cat.color}
                        strokeWidth="1.5"
                        animate={{
                          d: [
                            "M0,20 Q10,5 20,20 T40,20 T60,20 T80,20 T100,20 T120,20 T140,20 T160,20 T180,20 T200,20",
                            "M0,20 Q10,35 20,20 T40,20 T60,20 T80,20 T100,20 T120,20 T140,20 T160,20 T180,20 T200,20",
                            "M0,20 Q10,5 20,20 T40,20 T60,20 T80,20 T100,20 T120,20 T140,20 T160,20 T180,20 T200,20",
                          ],
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </svg>
                  </motion.div>
                )}

                <div className="text-3xl mb-4">{cat.icon}</div>
                <h3 className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: cat.color }}>
                  {cat.category}
                </h3>
                <ul className="space-y-2">
                  {cat.skills.map(skill => (
                    <li
                      key={skill}
                      className="text-slate-600 dark:text-slate-400 text-sm py-1.5 border-b border-slate-200 dark:border-white/5 last:border-0 flex justify-between items-center"
                    >
                      <span>{skill}</span>
                      {hoveredId === cat.id && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-[10px] font-mono text-blue-500 dark:text-blue-400"
                        >
                          {Math.floor(Math.random() * 100)} kHz
                        </motion.span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}