'use client';
import { motion } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';

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

export default function Experience() {
  const { data: experiences, loading, error } = useFetch<ExperienceItem[]>('/api/content/experiences/');

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
    <section id="experience" className="py-24 px-6 bg-white dark:bg-[#0D1526]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-14">
          <p className="text-cyan-600 dark:text-cyan-400 text-sm tracking-widest uppercase mb-2">My journey</p>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Experience</h2>
        </div>

        <div className="relative pl-8">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-blue-300 dark:bg-blue-500/20" />

          {experiences.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative mb-8 last:mb-0"
            >
              <div
                className="absolute -left-8 top-4 w-4 h-4 rounded-full border-2 bg-white dark:bg-[#0D1526] flex items-center justify-center"
                style={{ borderColor: item.color }}
              >
                <span className="text-[8px]">{item.icon}</span>
              </div>
              <div className="bg-slate-100 dark:bg-white/5 rounded-2xl p-6 border border-slate-200 dark:border-white/10 hover:border-opacity-40 transition-colors">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}