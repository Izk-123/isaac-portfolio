'use client';

import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* Thin glowing progress line at the top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      {/* Small glowing dot that follows the progress */}
      <motion.div
        className="fixed top-0 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_cyan] z-50"
        style={{ left: `calc(${scrollYProgress} * 100%)` }}
      />
    </>
  );
}