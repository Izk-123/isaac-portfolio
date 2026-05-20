'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ThemeToggle from '@/components/ThemeToggle'

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
]

// Animation variants
const linkVariants = {
    hover: { scale: 1.05, color: '#3b82f6', transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
}

const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0 0 12px rgba(59,130,246,0.5)' },
    tap: { scale: 0.95 },
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300
            ${scrolled
                ? 'bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10'
                : 'bg-transparent'
            }`}>
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="text-slate-800 dark:text-white font-bold text-xl tracking-tight">
                    IMN
                </Link>

                <ul className="hidden md:flex gap-8">
                    {navLinks.map(link => (
                        <li key={link.label}>
                            <motion.div
                                variants={linkVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <Link
                                    href={link.href}
                                    className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors text-sm"
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="hidden md:block"
                    >
                        <Link
                            href="#contact"
                            className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-5 py-2 rounded-full transition-colors block"
                        >
                            Hire Me
                        </Link>
                    </motion.div>
                </div>

                <button
                    className="md:hidden text-slate-800 dark:text-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? '✕' : '☰'}
                </button>
            </div>

            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden bg-white dark:bg-[#0B1120] border-t border-slate-200 dark:border-white/10 px-6 py-4"
                >
                    {navLinks.map(link => (
                        <motion.div
                            key={link.label}
                            variants={linkVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Link
                                href={link.href}
                                className="block text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-2 text-sm"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </nav>
    )
}