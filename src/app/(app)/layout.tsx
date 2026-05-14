import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/app/Sidebar'
import { MobileNav } from '@/components/app/MobileNav'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <Sidebar user={user} />

      {/* Mobile navigation */}
      <MobileNav />

      {/* Main content — offset for sidebar on desktop, top bar + bottom nav on mobile */}
      <main className="md:pl-64 pt-14 md:pt-0 pb-24 md:pb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
