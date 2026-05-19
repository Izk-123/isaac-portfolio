'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const roles = [
  'Electronics & Computer Engineer',
  'Django Developer',
  'AI Enthusiast',
  'Problem Solver',
]

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0  },
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const current = roles[roleIndex]

    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() =>
          setDisplayed(current.slice(0, displayed.length + 1))
        , 60)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 1800)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() =>
          setDisplayed(displayed.slice(0, -1))
        , 30)
        return () => clearTimeout(t)
      } else {
        setRoleIndex(i => (i + 1) % roles.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, roleIndex])

  return (
    <section className="min-h-screen flex items-center bg-[#0B1120] px-6">
      <div className="max-w-6xl mx-auto w-full pt-24">

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-cyan-400 text-sm tracking-widest uppercase mb-4"
        >
          👋 Hello, I'm
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight"
        >
          Isaac Michael<br />
          <span className="text-blue-500">Ndoka</span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl md:text-2xl text-cyan-300 font-medium mb-6 h-8"
        >
          {displayed}<span className="animate-pulse">|</span>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-slate-400 text-lg max-w-xl mb-10 leading-relaxed"
        >
          I build modern software systems, engineering solutions,
          and practical technologies that solve real-world challenges.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex gap-4 flex-wrap"
        >
          <Link
            href="#projects"
            className="bg-blue-600 hover:bg-blue-500 text-white
              px-8 py-3 rounded-full transition-colors font-medium"
          >
            View Projects
          </Link>
          <Link
            href="#contact"
            className="border border-white/20 hover:border-white/50
              text-white px-8 py-3 rounded-full transition-colors font-medium"
          >
            Contact Me
          </Link>
        </motion.div>

      </div>
    </section>
  )
}