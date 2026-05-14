import Link from 'next/link'
import { Scale } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-arbitrator-600 rounded-lg flex items-center justify-center">
                <Scale className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white text-lg">
                The Arbitrator
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              A private, AI-powered platform for fair and structured dispute
              resolution. No courts. No bias. Just resolution.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-medium mb-4 text-sm">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/#how-it-works', label: 'How It Works' },
                { href: '/#features', label: 'Features' },
                { href: '/#faq', label: 'FAQ' },
                { href: '/signup', label: 'Start a Case' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4 text-sm">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
                { href: '/arbitration-terms', label: 'Arbitration Terms' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} The Arbitrator. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Not a substitute for legal counsel.</span>
            <span className="text-slate-600">·</span>
            <span>AI-assisted, human-reviewed process.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
