'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CheckCircle, Zap, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

const features = {
  free: [
    '1 dispute case',
    'AI language neutralization',
    'AI mediation proposal',
    'PDF summary export',
    'Evidence upload (10MB/file)',
  ],
  pro: [
    'Unlimited dispute cases',
    'AI language neutralization',
    'AI mediation proposals',
    'Full AI arbitration resolutions',
    'PDF summary export',
    'Priority AI processing',
    'Evidence upload (50MB/file)',
    'Email support',
  ],
}

export function Pricing() {
  const [interval, setInterval] = useState<'month' | 'year'>('month')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleUpgrade = async () => {
    setLoading(true)
    try {
      const priceId =
        interval === 'month'
          ? process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID
          : process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID

      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, interval }),
      })

      if (res.status === 401) {
        router.push('/signup?redirect=/pricing')
        return
      }

      const { url } = await res.json()
      if (url) window.location.href = url
    } catch {
      toast.error('Failed to start checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-full text-slate-600 text-sm font-medium mb-4">
            Simple Pricing
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Start free. Upgrade when you need to.
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            One case for free. Unlimited for serious use.
          </p>
        </div>

        {/* Interval toggle */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setInterval('month')}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
              interval === 'month'
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setInterval('year')}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all relative ${
              interval === 'year'
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Yearly
            <span className="absolute -top-2.5 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              -21%
            </span>
          </button>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="mb-6">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Free
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">$0</span>
                <span className="text-slate-500 text-sm">/forever</span>
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Try the platform with one case.
              </p>
            </div>

            <Button variant="outline" size="lg" className="w-full mb-6" asChild>
              <a href="/signup">Get Started Free</a>
            </Button>

            <ul className="space-y-3">
              {features.free.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-slate-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="bg-gradient-to-br from-arbitrator-600 to-arbitrator-800 rounded-2xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Most Popular
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold text-arbitrator-200 uppercase tracking-wide mb-1">
                Pro
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">
                  ${interval === 'month' ? '19' : '15'}
                </span>
                <span className="text-arbitrator-200 text-sm">
                  /month{interval === 'year' ? ', billed yearly' : ''}
                </span>
              </div>
              <p className="text-sm text-arbitrator-200 mt-2">
                Unlimited cases for individuals & businesses.
              </p>
            </div>

            <Button
              size="lg"
              className="w-full mb-6 bg-white text-arbitrator-700 hover:bg-arbitrator-50 font-semibold"
              onClick={handleUpgrade}
              disabled={loading}
            >
              <Zap className="w-4 h-4" />
              {loading ? 'Redirecting…' : 'Upgrade to Pro'}
            </Button>

            <ul className="space-y-3">
              {features.pro.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-white/90">
                  <CheckCircle className="w-4 h-4 text-arbitrator-300 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust note */}
        <p className="text-center text-sm text-slate-400 mt-8">
          No contracts. Cancel anytime. Payments processed securely by Stripe.
        </p>
      </div>
    </section>
  )
}
