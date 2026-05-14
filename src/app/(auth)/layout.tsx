import Link from 'next/link'
import { Scale } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 border-b border-slate-200 bg-white">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-arbitrator-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <Scale className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-slate-900 text-lg">
            The Arbitrator
          </span>
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-4 text-center text-xs text-slate-400 border-t border-slate-200">
        By continuing, you agree to our{' '}
        <Link href="/terms" className="underline hover:text-slate-600">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="underline hover:text-slate-600">
          Privacy Policy
        </Link>
        .
      </footer>
    </div>
  )
}
