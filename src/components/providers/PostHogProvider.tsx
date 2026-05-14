'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initAnalytics, pageview } from '@/lib/analytics'

function PostHogPageview() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      const url = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname
      pageview(url)
    }
  }, [pathname, searchParams])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAnalytics()
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageview />
      </Suspense>
      {children}
    </>
  )
}
