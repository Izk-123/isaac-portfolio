'use client';
import { motion } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';

interface FooterData {
  copyright_text: string;
  built_with_text: string;
  links: { label: string; href: string }[];
}

export default function Footer() {
  const { data, loading, error } = useFetch<FooterData>('/api/content/footer/');

  if (loading) {
    return (
      <footer className="border-t border-slate-200 dark:border-white/10 py-8 px-6 bg-white dark:bg-[#0B1120]">
        <div className="max-w-6xl mx-auto text-center text-slate-500">Loading footer...</div>
      </footer>
    );
  }

  if (error || !data) {
    return (
      <footer className="border-t border-slate-200 dark:border-white/10 py-8 px-6 bg-white dark:bg-[#0B1120]">
        <div className="max-w-6xl mx-auto text-center text-red-500">Footer failed to load</div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 py-8 px-6 bg-white dark:bg-[#0B1120]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 dark:text-slate-500 text-sm">
          {data.copyright_text}
        </p>
        <p className="text-slate-400 dark:text-slate-600 text-xs">
          {data.built_with_text}
        </p>
        <div className="flex gap-4">
          {data.links.map(link => (
            <motion.div
              key={link.label}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-slate-500 hover:text-slate-800 dark:hover:text-white text-sm transition-colors inline-block"
              >
                {link.label}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </footer>
  );
}