'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState, useRef, RefObject } from 'react'
import { useTheme } from 'next-themes'

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
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 15 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5 } },
}

const useTilt = (ref: RefObject<HTMLElement | null>) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave };
};

function ProjectCard({ project, isDark }: { project: Project; isDark: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt(cardRef);

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariants}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-200 group relative"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: isDark
            ? '0 0 20px rgba(59,130,246,0.5), inset 0 0 10px rgba(59,130,246,0.3)'
            : '0 0 15px rgba(59,130,246,0.3), inset 0 0 5px rgba(59,130,246,0.2)'
        }}
      />

      <div className={`bg-gradient-to-br ${project.gradient} h-36 flex items-center justify-center text-5xl relative`}>
        {project.emoji}
        <motion.div
          className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        />
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-slate-800 dark:text-white font-semibold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex gap-3">
          {project.demo && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={project.demo}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded-full transition-all duration-300 relative overflow-hidden group/btn inline-block"
              >
                <span className="relative z-10">Live Demo</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.6 }}
                />
              </Link>
            </motion.div>
          )}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={project.github}
              target="_blank"
              className="border border-slate-300 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/50 text-slate-700 dark:text-white text-xs px-4 py-2 rounded-full transition-colors inline-block"
            >
              GitHub
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

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
        setError('Unable to load projects right now. Please try again later.')
        setLoading(false)
      })
  }, [])

  if (!mounted) return null

  return (
    <section id="projects" className="py-24 px-6 bg-slate-50 dark:bg-[#0D1526] relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-cyan-600 dark:text-cyan-400 text-sm tracking-widest uppercase mb-2">Things I&apos;ve built</p>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Projects</h2>
        </motion.div>

        {loading && (
          <div className="text-slate-500 dark:text-slate-400 text-center py-12">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-slate-400 border-t-transparent mr-2" />
            Loading projects...
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 dark:text-red-400 text-lg mb-2">⚠️ {error}</p>
            <button onClick={() => window.location.reload()} className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white underline">Try refreshing the page</button>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="text-slate-500 dark:text-slate-400 text-center py-12">
            <p className="text-lg mb-2">🚧 No projects yet.</p>
            <p className="text-sm">Check back soon — I&apos;m always building something new.</p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} isDark={isDark} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}