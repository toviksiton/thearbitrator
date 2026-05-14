import type { Metadata, Viewport } from 'next'
import { Inter, Assistant } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { PostHogProvider } from '@/components/providers/PostHogProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const assistant = Assistant({
  subsets: ['hebrew', 'latin'],
  variable: '--font-assistant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'The Arbitrator — AI-Powered Dispute Resolution',
    template: '%s | The Arbitrator',
  },
  description:
    'Resolve disputes fairly and efficiently with AI-powered mediation and arbitration. Neutral, private, and professional.',
  keywords: [
    'dispute resolution',
    'arbitration',
    'mediation',
    'AI arbitrator',
    'conflict resolution',
    'online mediation',
  ],
  authors: [{ name: 'The Arbitrator' }],
  creator: 'The Arbitrator',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'The Arbitrator — AI-Powered Dispute Resolution',
    description: 'Resolve disputes fairly and efficiently with AI-powered mediation.',
    siteName: 'The Arbitrator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Arbitrator — AI-Powered Dispute Resolution',
    description: 'Resolve disputes fairly and efficiently with AI-powered mediation.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${assistant.variable}`}>
      <body className="min-h-screen bg-slate-50 antialiased">
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
