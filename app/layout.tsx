import type { Metadata } from 'next'
import { Sora } from 'next/font/google'
import ThemeProvider from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import AnimatedBackground from '@/components/AnimatedBackground'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
})

export const metadata: Metadata = {
  title: 'Isaac Michael Ndoka | Electronics & Computer Engineer',
  description:
    'Portfolio of Isaac Michael Ndoka — Electronics & Computer Engineer, Django Developer, and AI Enthusiast based in Malawi. Building practical tech solutions for Africa.',
  keywords: [
    'Isaac Michael Ndoka',
    'Isaac Ndoka',
    'Django Developer Malawi',
    'Electronics Engineer Malawi',
    'Full Stack Developer Malawi',
    'MUBAS',
    'Software Engineer Malawi',
  ],
  authors: [{ name: 'Isaac Michael Ndoka' }],
  creator: 'Isaac Michael Ndoka',

  openGraph: {
    type: 'website',
    url: 'https://isaac-portfolio-tan.vercel.app',
    title: 'Isaac Michael Ndoka | Electronics & Computer Engineer',
    description:
      'Electronics & Computer Engineer and Django Developer based in Malawi. Building modern software systems and practical tech solutions.',
    siteName: 'Isaac Michael Ndoka Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Isaac Michael Ndoka — Portfolio',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Isaac Michael Ndoka | Electronics & Computer Engineer',
    description:
      'Electronics & Computer Engineer and Django Developer based in Malawi.',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-[#0B1120] transition-colors duration-300 relative">
        <ThemeProvider>
          <AnimatedBackground />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}