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
    <section id="about" className="py-24 px-6 bg-white dark:bg-[#0B1120]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-sm mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-400/10 border border-blue-500/20" />
              <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-blue-100 dark:from-blue-900/40 to-gray-100 dark:to-[#0B1120] flex items-center justify-center text-8xl">
                {data.profile_emoji}
              </div>
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white text-xs font-medium px-4 py-2 rounded-full border border-blue-400/30">
                {data.availability_badge}
              </div>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-cyan-600 dark:text-cyan-400 text-sm tracking-widest uppercase mb-3">
              {data.tagline}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {data.title_line1}<br />
              <span className="text-blue-600 dark:text-blue-400">{data.highlight_text}</span>
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              {data.paragraphs?.map((p, idx) => (
                <p key={idx}>{p.text}</p>
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
                  className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 hover:border-blue-500/30 transition-colors"
                >
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-xs">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              <a
                href="/isaac-ndoka-cv.pdf"
                download
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full transition-colors font-medium text-sm"
              >
                Download CV
              </a>
              <Link
                href="#contact"
                className="border border-slate-300 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/50 text-slate-800 dark:text-white px-6 py-3 rounded-full transition-colors text-sm"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}