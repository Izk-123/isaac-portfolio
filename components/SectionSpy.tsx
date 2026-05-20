'use client';

import { useEffect, useState } from 'react';

export default function SectionSpy() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            // Optionally dispatch a custom event that Navbar can listen to
            window.dispatchEvent(new CustomEvent('sectionchange', { detail: entry.target.id }));
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return null;
}