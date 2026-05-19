import type { Metadata } from 'next'
import { Sora } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
})

export const metadata: Metadata = {
  title: 'Isaac Michael Ndoka | Portfolio',
  description: 'Electronics & Computer Engineer | Django Developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${sora.variable} font-sans bg-[#0B1120] text-white antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}