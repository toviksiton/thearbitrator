import Link from 'next/link'
import { User, CreditCard, Shield, AlertTriangle } from 'lucide-react'

const tabs = [
  { href: '/settings/profile', label: 'Profile', icon: User },
  { href: '/settings/billing', label: 'Billing', icon: CreditCard },
  { href: '/settings/security', label: 'Security', icon: Shield },
  { href: '/settings/danger', label: 'Danger Zone', icon: AlertTriangle },
]

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your account and subscription</p>
      </div>

      {/* Tab nav */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-all whitespace-nowrap"
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </Link>
        ))}
      </div>

      {children}
    </div>
  )
}
