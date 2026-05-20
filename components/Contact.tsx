'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
};

const childVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

// Fallback contact info in case API fails
const defaultContactInfo = [
  { icon: '📧', label: 'Email', value: 'isaac@example.com', href: 'mailto:isaac@example.com' },
  { icon: '📱', label: 'Phone', value: '+265 123 456 789', href: null },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/isaac', href: 'https://linkedin.com/in/isaac' },
  { icon: '🐙', label: 'GitHub', value: 'github.com/isaac', href: 'https://github.com/isaac' },
];

export default function Contact() {
  const [contactInfo, setContactInfo] = useState(defaultContactInfo);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Fetch contact info (optional, but won't block the form)
  useEffect(() => {
    fetch('/api/content/contact/')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && Array.isArray(data) && data.length) setContactInfo(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-white dark:bg-[#0B1120] relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-cyan-600 dark:text-cyan-400 text-sm tracking-widest uppercase mb-2">Get in touch</p>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Contact</h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {/* Left side – contact info */}
          <motion.div variants={childVariants}>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Open to opportunities, collaborations, and interesting conversations. Reach out and I'll get back to you as soon as possible.
            </p>
            {loading && (
              <div className="text-slate-500 dark:text-slate-400 text-sm mb-4">Loading contact details...</div>
            )}
            <div className="space-y-4">
              {contactInfo.map(item => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center text-lg flex-shrink-0 transition-all group-hover:shadow-[0_0_8px_#3b82f6]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-slate-400 dark:text-slate-500 text-xs">{item.label}</p>
                    {item.href ? (
                      <motion.a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, color: '#06b6d4' }}
                        className="text-slate-700 dark:text-slate-300 text-sm hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors inline-block"
                      >
                        {item.value}
                      </motion.a>
                    ) : (
                      <p className="text-slate-700 dark:text-slate-300 text-sm">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side – contact form (ALWAYS visible) */}
          <motion.div
            variants={childVariants}
            className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-8 relative overflow-hidden"
            whileInView={{ boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {status === 'sending' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-4 right-4 flex gap-1"
                >
                  {[1, 2, 3, 4].map(i => (
                    <motion.div
                      key={i}
                      className="w-1 bg-blue-500 rounded-sm"
                      style={{ height: `${i * 5}px` }}
                      animate={{ height: [`${i * 5}px`, `${i * 8}px`, `${i * 5}px`] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              {['name', 'email', 'subject'].map(field => (
                <div key={field}>
                  <label className="text-slate-500 dark:text-slate-400 text-xs mb-1 block capitalize">{field}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={form[field as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={`Your ${field}`}
                    className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="text-slate-500 dark:text-slate-400 text-xs mb-1 block">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-white text-sm resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
              <motion.button
                onClick={handleSubmit}
                disabled={status === 'sending'}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-all relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">
                  {status === 'sending' ? 'Transmitting...' : status === 'success' ? '✓ Message sent' : status === 'error' ? '⚠️ Failed — try again' : 'Send Message'}
                </span>
                {status !== 'sending' && status !== 'success' && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}