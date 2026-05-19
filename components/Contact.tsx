'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const contactInfo = [
  { icon: '✉',  label: 'Email',    value: 'isaac@example.com',      href: 'mailto:isaac@example.com' },
  { icon: '📍', label: 'Location', value: 'Blantyre, Malawi',       href: null },
  { icon: '💼', label: 'LinkedIn', value: '/in/isaac-ndoka',        href: 'https://linkedin.com/in/isaac-ndoka' },
  { icon: '🐙', label: 'GitHub',   value: 'github.com/yourusername', href: 'https://github.com/yourusername' },
]

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', subject: '', message: ''
  })
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 px-6 bg-[#0B1120]">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-cyan-400 text-sm tracking-widest uppercase mb-2">
            Get in touch
          </p>
          <h2 className="text-4xl font-bold text-white">Contact</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-slate-400 leading-relaxed mb-8">
              Open to opportunities, collaborations, and
              interesting conversations. Reach out and I'll
              get back to you as soon as possible.
            </p>

            <div className="space-y-4">
              {contactInfo.map(item => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10
                    border border-blue-500/20 flex items-center
                    justify-center text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-300 text-sm hover:text-cyan-400 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-slate-300 text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <div className="space-y-4">
              {([
                { name: 'name',    label: 'Name',    type: 'text',  placeholder: 'Isaac Ndoka'        },
                { name: 'email',   label: 'Email',   type: 'email', placeholder: 'isaac@email.com'     },
                { name: 'subject', label: 'Subject', type: 'text',  placeholder: 'What is this about?' },
              ] as const).map(field => (
                <div key={field.name}>
                  <label className="text-slate-400 text-xs mb-1 block">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full bg-white/5 border border-white/10
                      rounded-xl px-4 py-3 text-white text-sm
                      placeholder:text-slate-600 focus:outline-none
                      focus:border-blue-500/50 transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="text-slate-400 text-xs mb-1 block">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full bg-white/5 border border-white/10
                    rounded-xl px-4 py-3 text-white text-sm resize-none
                    placeholder:text-slate-600 focus:outline-none
                    focus:border-blue-500/50 transition-colors"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={status === 'sending'}
                className="w-full bg-blue-600 hover:bg-blue-500
                  disabled:opacity-50 text-white font-medium py-3
                  rounded-xl transition-colors"
              >
                {status === 'sending' ? 'Sending...'
                  : status === 'success' ? 'Message sent ✓'
                  : status === 'error'   ? 'Failed — try again'
                  : 'Send Message'}
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}