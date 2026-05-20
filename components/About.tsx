'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useFetch } from '@/hooks/useFetch';

interface AboutData {
  tagline: string;
  title_line1: string;
  title_line2: string;
  highlight_text: string;
  profile_emoji: string;
  availability_badge: string;
  paragraphs: { text: string }[];
  stats: { number: string; label: string }[];
}

const sectionVariants = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(4px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function About() {
  const { data, loading, error } = useFetch<AboutData>('/api/content/about/');

  if (loading) {
    return (
      <div className="py-24 text-center bg-white dark:bg-[#0B1120]">
        <div className="text-slate-500 dark:text-slate-400">Loading about...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="py-24 text-center bg-white dark:bg-[#0B1120]">
        <p className="text-red-500 dark:text-red-400">⚠️ Failed to load about content.</p>
      </div>
    );
  }

  return (
    <section id="about" className="py-24 px-6 bg-white dark:bg-[#0B1120] relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          {/* Left side – profile emoji (unchanged) */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-sm mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-400/10 border border-blue-500/20" />
              <motion.div
                className="relative w-full h-full rounded-2xl bg-gradient-to-br from-blue-100 dark:from-blue-900/40 to-gray-100 dark:to-[#0B1120] flex items-center justify-center text-8xl"
                animate={{ boxShadow: ['0 0 0px rgba(0,150,255,0)', '0 0 20px rgba(0,150,255,0.5)', '0 0 0px rgba(0,150,255,0)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {data.profile_emoji}
              </motion.div>
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white text-xs font-medium px-4 py-2 rounded-full border border-blue-400/30">
                {data.availability_badge}
              </div>
            </div>
          </div>

          {/* Right side – content (unchanged) */}
          <div>
            <p className="text-cyan-600 dark:text-cyan-400 text-sm tracking-widest uppercase mb-3">
              {data.tagline}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {data.title_line1}<br />
              <span className="text-blue-600 dark:text-blue-400">{data.highlight_text}</span>
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              {data.paragraphs?.map((p, idx) => (
                <motion.p key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                  {p.text}
                </motion.p>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {data.stats?.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: '#3b82f6' }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 transition-all duration-300 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1 relative">{stat.number}</div>
                  <div className="text-slate-500 dark:text-slate-400 text-xs relative">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="/isaac-ndoka-cv.pdf"
                  download
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full transition-colors font-medium text-sm inline-block relative overflow-hidden group"
                >
                  <span className="relative z-10">Download CV</span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.6 }}
                  />
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#contact"
                  className="border border-slate-300 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/50 text-slate-800 dark:text-white px-6 py-3 rounded-full transition-colors text-sm inline-block"
                >
                  Get in touch
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}