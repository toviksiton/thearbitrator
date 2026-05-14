import Link from 'next/link'
import { Scale, ArrowLeft } from 'lucide-react'

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 bg-arbitrator-600 rounded-lg flex items-center justify-center">
              <Scale className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-slate-900">The Arbitrator</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">{children}</main>

      <footer className="border-t border-slate-200 px-6 py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} The Arbitrator. All rights reserved.
      </footer>
    </div>
  )
}
