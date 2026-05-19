'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';

interface HeroData {
  greeting: string;
  name_line1: string;
  name_line2: string;
  highlight_text: string;
  description: string;
  primary_cta: string;
  primary_cta_link: string;
  secondary_cta: string;
  secondary_cta_link: string;
  typed_roles: { role: string }[];
}

export default function Hero() {
  const { data, loading, error } = useFetch<HeroData>('/api/content/hero/');
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  // Safe access – ensure typed_roles exists
  const roles = data?.typed_roles?.map(r => r.role) || [];

  // Typing animation effect – only if roles exist
  useEffect(() => {
    if (roles.length === 0) return;
    const current = roles[roleIndex];
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
        return () => clearTimeout(t);
      } else {
        setRoleIndex(i => (i + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIndex, roles]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0B1120]">
        <div className="text-slate-500 dark:text-slate-400">Loading hero...</div>
      </div>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0B1120]">
        <div className="text-red-500 dark:text-red-400 text-center">
          <p>⚠️ Failed to load hero content.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 text-sm text-slate-500 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center bg-white dark:bg-[#0B1120] px-6">
      <div className="max-w-6xl mx-auto w-full pt-24">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-cyan-600 dark:text-cyan-400 text-sm tracking-widest uppercase mb-4"
        >
          {data.greeting}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-4 leading-tight"
        >
          {data.name_line1}<br />
          <span className="text-blue-600 dark:text-blue-500">{data.name_line2}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl md:text-2xl text-cyan-700 dark:text-cyan-300 font-medium mb-6 h-8"
        >
          {displayed}<span className="animate-pulse">|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mb-10 leading-relaxed"
        >
          {data.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex gap-4 flex-wrap"
        >
          <Link
            href={data.primary_cta_link}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full transition-colors font-medium"
          >
            {data.primary_cta}
          </Link>
          <Link
            href={data.secondary_cta_link}
            className="border border-slate-300 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/50 text-slate-800 dark:text-white px-8 py-3 rounded-full transition-colors font-medium"
          >
            {data.secondary_cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}