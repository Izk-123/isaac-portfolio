'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const projects = [
  {
    title:       'MUBAS AI Chatbot',
    description: 'Bilingual AI assistant for students and staff at MUBAS.',
    emoji:       '🤖',
    gradient:    'from-blue-900/60 to-[#0B1120]',
    tags:        ['Django', 'Python', 'AI'],
    github:      'https://github.com/yourusername/mubas-chatbot',
    demo:        '#',
  },
  {
    title:       'MUBAS Trade Hub',
    description: 'Peer-to-peer student marketplace for buying and selling.',
    emoji:       '🛒',
    gradient:    'from-emerald-900/60 to-[#0B1120]',
    tags:        ['Next.js', 'Django', 'REST'],
    github:      'https://github.com/yourusername/trade-hub',
    demo:        '#',
  },
  {
    title:       'Network Infrastructure',
    description: 'Enterprise networking design using Cisco Packet Tracer.',
    emoji:       '📡',
    gradient:    'from-purple-900/60 to-[#0B1120]',
    tags:        ['Cisco', 'Networking'],
    github:      'https://github.com/yourusername/network-design',
    demo:        null,
  },
  {
    title:       'Smart Engineering',
    description: 'Embedded systems and electronics engineering solutions.',
    emoji:       '⚡',
    gradient:    'from-amber-900/60 to-[#0B1120]',
    tags:        ['Embedded', 'C', 'Hardware'],
    github:      'https://github.com/yourusername/smart-engineering',
    demo:        null,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-[#0D1526]">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-cyan-400 text-sm tracking-widest uppercase mb-2">
            Things I&apos;ve built
          </p>
          <h2 className="text-4xl font-bold text-white">Projects</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="bg-white/5 border border-white/10 rounded-2xl
                overflow-hidden hover:border-blue-500/40 transition-colors group"
            >
              <div className={`bg-gradient-to-br ${project.gradient}
                h-36 flex items-center justify-center text-5xl`}>
                {project.emoji}
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full
                        bg-blue-500/10 text-blue-300 border border-blue-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-white font-semibold text-lg mb-2
                  group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-5">
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
                    className="border border-white/20 hover:border-white/50
                      text-white text-xs px-4 py-2 rounded-full transition-colors"
                  >
                    GitHub
                  </Link>
                </div>
              </div>

            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  )
}