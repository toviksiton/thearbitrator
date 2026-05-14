'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  CreditCard,
  Zap,
  CheckCircle,
  Loader2,
  ExternalLink,
  Sparkles,
  Calendar,
} from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { toast } from 'sonner'
import { PLANS } from '@/lib/stripe'

interface Profile {
  plan: string | null
  subscription_status: string | null
  current_period_end: string | null
  plan_interval: string | null
  stripe_customer_id: string | null
}

interface BillingClientProps {
  profile: Profile | null
  totalCases: number
  userEmail: string
}

export function BillingClient({ profile, totalCases, userEmail }: BillingClientProps) {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')

  const [checkoutLoading, setCheckoutLoading] = useState<'month' | 'year' | null>(null)
  const [portalLoading, setPortalLoading] = useState(false)

  const isPro = profile?.plan === 'pro' && profile?.subscription_status === 'active'
  const isTrialing = profile?.subscription_status === 'trialing'
  const isPastDue = profile?.subscription_status === 'past_due'
  const freeLimit = PLANS.free.cases
  const usagePercent = Math.min((totalCases / freeLimit) * 100, 100)

  const handleCheckout = async (interval: 'month' | 'year') => {
    setCheckoutLoading(interval)
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
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch {
      toast.error('Failed to start checkout')
    } finally {
      setCheckoutLoading(null)
    }
  }

  const handlePortal = async () => {
    setPortalLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch {
      toast.error('Failed to open billing portal')
    } finally {
      setPortalLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {success && (
        <Alert variant="success">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Welcome to Pro! Your subscription is now active.
          </AlertDescription>
        </Alert>
      )}

      {isPastDue && (
        <Alert variant="warning">
          <AlertDescription>
            Your last payment failed. Please update your payment method to avoid service interruption.
          </AlertDescription>
        </Alert>
      )}

      {/* Current plan */}
      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your subscription details</CardDescription>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                isPro || isTrialing
                  ? 'bg-arbitrator-100 text-arbitrator-700'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {isPro ? 'Pro' : isTrialing ? 'Trial' : 'Free'}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isPro || isTrialing ? (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Billing interval</span>
                <span className="font-medium capitalize">
                  {profile?.plan_interval ?? 'monthly'}
                </span>
              </div>
              {profile?.current_period_end && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    {profile.subscription_status === 'canceled' ? 'Access until' : 'Renews on'}
                  </span>
                  <span className="font-medium">
                    {formatDate(profile.current_period_end)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Cases created</span>
                <span className="font-medium">{totalCases} (unlimited)</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">Cases used</span>
                  <span className="font-medium text-slate-900">
                    {totalCases} / {freeLimit}
                  </span>
                </div>
                <Progress value={usagePercent} className="h-2" />
                {totalCases >= freeLimit && (
                  <p className="text-xs text-amber-600 mt-1.5">
                    Free case limit reached. Upgrade to create more cases.
                  </p>
                )}
              </div>
            </div>
          )}

          {(isPro || isTrialing) && profile?.stripe_customer_id && (
            <Button
              variant="outline"
              onClick={handlePortal}
              disabled={portalLoading}
              className="w-full"
            >
              {portalLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ExternalLink className="w-4 h-4" />
              )}
              Manage Subscription & Invoices
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Upgrade section (for free users) */}
      {!isPro && !isTrialing && (
        <Card className="border-arbitrator-200 bg-gradient-to-br from-arbitrator-50 to-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-arbitrator-600" />
              <CardTitle>Upgrade to Pro</CardTitle>
            </div>
            <CardDescription>
              Unlimited cases, priority AI, and full arbitration resolutions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {PLANS.pro.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-arbitrator-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => handleCheckout('year')}
                disabled={!!checkoutLoading}
                className="flex-col h-auto py-3"
              >
                {checkoutLoading === 'year' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span className="font-bold text-slate-900">$15/mo</span>
                    <span className="text-xs text-slate-500 font-normal">billed yearly</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium mt-1">
                      Save 21%
                    </span>
                  </>
                )}
              </Button>
              <Button
                variant="primary"
                onClick={() => handleCheckout('month')}
                disabled={!!checkoutLoading}
                className="flex-col h-auto py-3"
              >
                {checkoutLoading === 'month' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span className="font-bold">$19/mo</span>
                    <span className="text-xs text-arbitrator-200 font-normal">billed monthly</span>
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-slate-400 text-center">
              No contracts · Cancel anytime · Powered by Stripe
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
