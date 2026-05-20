'use client';
import { motion } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface ExperienceItem {
  id: number;
  role: string;
  organization: string;
  period: string;
  description: string;
  icon: string;
  color: string;
  bg_color: string;
  text_color: string;
  tags: { tag: string }[];
}

const sectionVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

export default function Experience() {
  const { data: experiences, loading, error } = useFetch<ExperienceItem[]>('/api/content/experiences/');
  const [activeId, setActiveId] = useState<number | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="py-24 text-center bg-white dark:bg-[#0D1526]">
        <div className="text-slate-500 dark:text-slate-400">Loading experience...</div>
      </div>
    );
  }

  if (error || !experiences) {
    return (
      <div className="py-24 text-center bg-white dark:bg-[#0D1526]">
        <p className="text-red-500 dark:text-red-400">⚠️ Failed to load experience.</p>
      </div>
    );
  }

  if (experiences.length === 0) {
    return (
      <div className="py-24 text-center bg-white dark:bg-[#0D1526]">
        <p className="text-slate-500 dark:text-slate-400">No experience entries yet.</p>
      </div>
    );
  }

  return (
    <section id="experience" className="py-24 px-6 bg-white dark:bg-[#0D1526] relative">
      <div className="max-w-3xl mx-auto">
        <div className="mb-14">
          <p className="text-cyan-600 dark:text-cyan-400 text-sm tracking-widest uppercase mb-2">My journey</p>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Experience</h2>
        </div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="relative pl-8"
        >
          {/* Animated timeline bus line */}
          <motion.div
            className="absolute left-[7px] top-2 bottom-2 w-px overflow-hidden"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.2, ease: 'anticipate' }}
          >
            <div className="absolute inset-0 bg-blue-300 dark:bg-blue-500/20" />
            <motion.div
              className="absolute top-0 left-0 w-full h-2"
              style={{ backgroundColor: isDark ? '#3b82f6' : '#2563eb' }}
              animate={{ y: ['0%', '100%', '0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute top-1/3 left-0 w-full h-1"
              style={{ backgroundColor: isDark ? '#06b6d4' : '#0891b2' }}
              animate={{ y: ['0%', '100%', '0%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 0.5 }}
            />
          </motion.div>

          {experiences.map((item, i) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              viewport={{ once: false, amount: 0.3 }}
              className="relative mb-8 last:mb-0"
              onHoverStart={() => setActiveId(item.id)}
              onHoverEnd={() => setActiveId(null)}
            >
              {/* Timeline node */}
              <div
                className="absolute -left-8 top-4 w-4 h-4 rounded-full border-2 bg-white dark:bg-[#0D1526] flex items-center justify-center"
                style={{ borderColor: item.color }}
              >
                <motion.div
                  className="absolute w-6 h-6 rounded-full"
                  style={{ borderColor: item.color }}
                  animate={activeId === item.id ? { scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-[8px]">{item.icon}</span>
              </div>

              <motion.div
                className="bg-slate-100 dark:bg-white/5 rounded-2xl p-6 border border-slate-200 dark:border-white/10 transition-all duration-300 relative overflow-hidden"
                animate={activeId === item.id ? { borderColor: item.color, boxShadow: `0 0 15px ${item.color}40` } : {}}
              >
                {activeId === item.id && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isDark ? 0.1 : 0.05 }}
                  >
                    {[...Array(8)].map((_, idx) => (
                      <motion.div
                        key={idx}
                        className="absolute h-px"
                        style={{
                          backgroundColor: isDark ? '#3b82f6' : '#2563eb',
                          top: `${10 + idx * 10}%`,
                          left: 0,
                          right: 0,
                        }}
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1, delay: idx * 0.1, repeat: Infinity }}
                      />
                    ))}
                  </motion.div>
                )}

                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-slate-800 dark:text-white font-semibold text-base leading-snug">
                    {item.role}
                  </h3>
                  <span
                    className="text-xs px-3 py-1 rounded-full flex-shrink-0"
                    style={{ background: item.bg_color, color: item.text_color }}
                  >
                    {item.period}
                  </span>
                </div>
                <p className="text-sm font-medium mb-3" style={{ color: item.color }}>
                  {item.organization}
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags?.map(tag => (
                    <span
                      key={tag.tag}
                      className="text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20"
                    >
                      {tag.tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}