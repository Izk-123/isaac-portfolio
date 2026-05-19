'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
]

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
                ? 'bg-[#0B1120]/90 backdrop-blur-md border-b border-white/10'
                : 'bg-transparent'
            }`}>

            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                <Link href="/" className="text-white font-bold text-xl tracking-tight">
                    IMN
                </Link>

                <ul className="hidden md:flex gap-8">
                    {navLinks.map(link => (
                        <li key={link.label}>
                            <Link
                                href={link.href}
                                className="text-slate-300 hover:text-white transition-colors text-sm"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <Link
                    href="#contact"
                    className="hidden md:block bg-blue-600 hover:bg-blue-500
            text-white text-sm px-5 py-2 rounded-full transition-colors"
                >
                    Hire Me
                </Link>

                <button
                    className="md:hidden text-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? '✕' : '☰'}
                </button>

            </div>

            {menuOpen && (
                <div className="md:hidden bg-[#0B1120] border-t border-white/10 px-6 py-4">
                    {navLinks.map(link => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="block text-slate-300 hover:text-white py-2 text-sm"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}

        </nav>
    )
}