'use client'

import { motion } from 'framer-motion'

const skillCategories = [
    {
        icon: '💻',
        category: 'Software Development',
        color: '#2563EB',
        skills: ['Python', 'Django REST', 'JavaScript', 'React / Next.js', 'REST APIs'],
    },
    {
        icon: '⚡',
        category: 'Electronics Engineering',
        color: '#06B6D4',
        skills: ['Embedded Systems', 'Circuit Design', 'Networking', 'Instrumentation', 'Electronics'],
    },
    {
        icon: '🛠',
        category: 'Tools',
        color: '#7C3AED',
        skills: ['GitHub', 'VS Code', 'Cisco Packet Tracer', 'Linux', 'Postman'],
    },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Skills() {
    return (
        <section id="skills" className="py-24 px-6 bg-[#0B1120]">
            <div className="max-w-6xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-14"
                >
                    <p className="text-cyan-400 text-sm tracking-widest uppercase mb-2">
                        What I work with
                    </p>
                    <h2 className="text-4xl font-bold text-white">Skills</h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {skillCategories.map((cat) => (
                        <motion.div
                            key={cat.category}
                            variants={cardVariants}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6
                hover:border-blue-500/40 transition-colors cursor-default"
                        >
                            <div className="text-3xl mb-4">{cat.icon}</div>

                            <h3
                                className="text-sm font-semibold tracking-widest uppercase mb-4"
                                style={{ color: cat.color }}
                            >
                                {cat.category}
                            </h3>

                            <ul className="space-y-2">
                                {cat.skills.map((skill) => (
                                    <li
                                        key={skill}
                                        className="text-slate-400 text-sm py-1.5
                      border-b border-white/5 last:border-0"
                                    >
                                        {skill}
                                    </li>
                                ))}
                            </ul>

                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    )
}