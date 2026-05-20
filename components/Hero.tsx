'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { useTheme } from 'next-themes';

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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [glitch, setGlitch] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  
  const roles = data?.typed_roles?.map(r => r.role) || [];

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const particleCount = isDesktop ? 20 : 0;
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; duration: number }>>([]);
  useEffect(() => {
    if (!isDesktop) return;
    const newParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 3 + Math.random() * 5,
    }));
    setParticles(newParticles);
  }, [isDesktop, particleCount]);

  if (loading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0B1120]">
        <div className="text-slate-500 dark:text-slate-400">Loading hero...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0B1120]">
        <div className="text-red-500 dark:text-red-400 text-center">
          <p>⚠️ Failed to load hero content.</p>
          <button onClick={() => window.location.reload()} className="mt-4 text-sm text-slate-500 underline">Try again</button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center bg-transparent px-6 relative overflow-hidden">
      {isDesktop && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
                backgroundColor: isDark ? 'rgba(0, 200, 255, 0.25)' : 'rgba(0, 100, 200, 0.15)',
                boxShadow: isDark ? '0 0 3px cyan' : 'none',
              }}
              animate={{ y: [0, -20, 0], x: [0, 10, -5, 0], opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto w-full pt-24 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.1 }}
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
          <span className="text-blue-600 dark:text-blue-500 relative inline-block">
            {data.name_line2}
            <motion.span
              className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl md:text-2xl text-cyan-800 dark:text-cyan-300 font-medium mb-6 h-10 flex items-center"
        >
          <span className={glitch ? 'animate-pulse' : ''} style={{ textShadow: glitch ? (isDark ? '2px 0 red, -2px 0 blue' : '1px 0 red, -1px 0 blue') : 'none' }}>
            {displayed}
          </span>
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="ml-1 text-cyan-400">_</motion.span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-slate-800 dark:text-slate-300 text-lg max-w-xl mb-10 leading-relaxed"
        >
          {data.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex gap-4 flex-wrap"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={data.primary_cta_link}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full transition-colors font-medium relative overflow-hidden group inline-block"
            >
              <span className="relative z-10">{data.primary_cta}</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.6 }}
              />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={data.secondary_cta_link}
              className="border border-slate-300 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/50 text-slate-800 dark:text-white px-8 py-3 rounded-full transition-colors font-medium inline-block"
            >
              {data.secondary_cta}
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20 animate-pulse" />
      </div>
    </section>
  );
}