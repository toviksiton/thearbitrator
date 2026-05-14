'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sparkles, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import type { Dispute } from '@/types'

interface DisputeDetailClientProps {
  disputeId: string
  dispute: Dispute
}

export function DisputeDetailClient({ disputeId, dispute }: DisputeDetailClientProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const triggerAIProcessing = async () => {
    setIsProcessing(true)
    try {
      // 1. Neutralize
      const neutralizeRes = await fetch('/api/ai/neutralize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disputeId }),
      })
      if (!neutralizeRes.ok) throw new Error('Neutralization failed')

      // 2. Classify
      await fetch('/api/ai/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disputeId }),
      })

      // 3. Mediate
      const mediateRes = await fetch('/api/ai/mediate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disputeId }),
      })
      if (!mediateRes.ok) throw new Error('Mediation failed')

      toast.success('AI has analyzed both sides and proposed a mediation solution.')
      router.refresh()
    } catch (err) {
      console.error('AI processing error:', err)
      toast.error('AI processing encountered an error. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-arbitrator-50 border border-arbitrator-100 rounded-2xl p-6 text-center">
      <div className="w-12 h-12 bg-arbitrator-100 rounded-xl flex items-center justify-center mx-auto mb-3">
        <Sparkles className="w-6 h-6 text-arbitrator-600" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-1">
        Both parties have responded
      </h3>
      <p className="text-sm text-slate-500 mb-4">
        The AI can now analyze both perspectives, propose mediation, and generate a resolution.
      </p>
      <Button
        variant="primary"
        onClick={triggerAIProcessing}
        disabled={isProcessing}
        className="w-full"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            AI is processing…
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Start AI Mediation
          </>
        )}
      </Button>
    </div>
  )
}
