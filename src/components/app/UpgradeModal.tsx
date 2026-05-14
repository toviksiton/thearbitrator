'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle, Zap, Loader2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

const proFeatures = [
  'Unlimited dispute cases',
  'Full AI arbitration resolutions',
  'Priority AI processing',
  'Unlimited evidence uploads',
]

interface UpgradeModalProps {
  open: boolean
  onClose: () => void
  reason?: string
}

export function UpgradeModal({ open, onClose, reason }: UpgradeModalProps) {
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async (interval: 'month' | 'year') => {
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

      const { url } = await res.json()
      if (url) window.location.href = url
    } catch {
      toast.error('Failed to start checkout')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="w-12 h-12 bg-arbitrator-100 rounded-xl flex items-center justify-center mb-3">
            <Sparkles className="w-6 h-6 text-arbitrator-600" />
          </div>
          <DialogTitle>Upgrade to Pro</DialogTitle>
          <DialogDescription>
            {reason || 'You\'ve reached the limit of the free plan.'}
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-2.5 my-4">
          {proFeatures.map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
              <CheckCircle className="w-4 h-4 text-arbitrator-500 shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div className="space-y-2">
          <Button
            variant="primary"
            className="w-full"
            onClick={() => handleUpgrade('month')}
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            Upgrade — $19/month
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleUpgrade('year')}
            disabled={loading}
          >
            Upgrade — $15/month, billed yearly
            <span className="ml-1.5 text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">
              Save 21%
            </span>
          </Button>
          <Button variant="ghost" className="w-full text-slate-500" onClick={onClose}>
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
