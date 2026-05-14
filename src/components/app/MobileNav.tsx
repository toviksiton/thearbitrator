'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, PlusCircle, Settings, LogOut, Scale } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

const navItems = [
  { href: '/dashboard', label: 'Cases', icon: LayoutDashboard },
  { href: '/disputes/new', label: 'New', icon: PlusCircle, primary: true },
  { href: '/settings/profile', label: 'Settings', icon: Settings },
]

export function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    toast.success('Signed out')
    router.push('/')
  }

  return (
    <>
      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-arbitrator-600 rounded-lg flex items-center justify-center">
            <Scale className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-slate-900 text-sm">The Arbitrator</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 safe-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href.split('/')[1] ? `/${item.href.split('/')[1]}` : item.href)

            if (item.primary) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center gap-0.5 px-5"
                >
                  <div className="w-12 h-12 bg-arbitrator-600 rounded-2xl flex items-center justify-center shadow-md shadow-arbitrator-200 -mt-5">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{item.label}</span>
                </Link>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 px-5 py-1 rounded-xl transition-colors',
                  isActive ? 'text-arbitrator-600' : 'text-slate-400'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
