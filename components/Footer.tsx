export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 px-6 bg-[#0B1120]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row
        items-center justify-between gap-4">

        <p className="text-slate-500 text-sm">
          © 2026 <span className="text-white font-medium">Isaac Michael Ndoka</span>
        </p>

        <p className="text-slate-600 text-xs">
          Built with Next.js · Tailwind CSS · Framer Motion
        </p>

        <div className="flex gap-4">
          {[
            { label: 'GitHub',   href: 'https://github.com/Izk-123'  },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/isaac-ndoka' },
            { label: 'Email',    href: 'mailto:isaacndoka7@gmail.com'          },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

      </div>
    </footer>
  )
}