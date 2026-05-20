'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function SectionDivider() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-16" />;

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-[#0B1120] flex items-center justify-center border border-gray-200 dark:border-gray-800"
      >
        <span className="text-gray-400 dark:text-gray-600 text-sm">✦</span>
      </div>
    </div>
  );
}