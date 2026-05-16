'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sparkles, Loader2, Swords } from 'lucide-react'
import { toast } from 'sonner'
import type { Dispute } from '@/types'

interface DisputeDetailClientProps {
  disputeId: string
  dispute: Dispute
}

export function DisputeDetailClient({ disputeId, dispute }: DisputeDetailClientProps) {
  const [isMediating, setIsMediating] = useState(false)
  const [isDebating, setIsDebating] = useState(false)
  const router = useRouter()

  const triggerMediation = async () => {
    setIsMediating(true)
    try {
      const neutralizeRes = await fetch('/api/ai/neutralize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disputeId }),
      })
      if (!neutralizeRes.ok) throw new Error('Neutralization failed')

      await fetch('/api/ai/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disputeId }),
      })

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
      setIsMediating(false)
    }
  }

  const triggerAdversarialDebate = async () => {
    setIsDebating(true)
    toast.info('Starting adversarial debate — 5 rounds of internal AI debate. This may take 1-2 minutes…', {
      duration: 8000,
    })

    try {
      // First neutralize and classify if not done
      await fetch('/api/ai/neutralize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disputeId }),
      })

      await fetch('/api/ai/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disputeId }),
      })

      // Run the full adversarial debate engine
      const res = await fetch('/api/ai/debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disputeId }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Debate failed')
      }

      const { debateResult } = await res.json()
      const verdict =
        debateResult.verdict === 'A_wins'
          ? `Party A wins (${debateResult.score_a}/5 rounds)`
          : debateResult.verdict === 'B_wins'
            ? `Party B wins (${debateResult.score_b}/5 rounds)`
            : 'No clear majority — compromise resolution applied'

      toast.success(`Debate complete: ${verdict}`)
      router.refresh()
    } catch (err) {
      console.error('Debate error:', err)
      toast.error(err instanceof Error ? err.message : 'Debate engine encountered an error.')
    } finally {
      setIsDebating(false)
    }
  }

  const isProcessing = isMediating || isDebating

  return (
    <div className="bg-gradient-to-br from-purple-50 to-arbitrator-50 border border-arbitrator-100 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-arbitrator-100 rounded-xl flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-arbitrator-600" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900 leading-tight">
            Both parties have responded
          </h3>
          <p className="text-xs text-slate-500">Choose how the AI should resolve this case</p>
        </div>
      </div>

      <div className="grid gap-3 mt-4">
        {/* Standard mediation */}
        <button
          onClick={triggerMediation}
          disabled={isProcessing}
          className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-arbitrator-300 hover:bg-arbitrator-50/30 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="w-8 h-8 bg-arbitrator-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            {isMediating ? (
              <Loader2 className="w-4 h-4 text-arbitrator-600 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-arbitrator-600" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {isMediating ? 'Analyzing…' : 'AI Mediation'}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              AI proposes a compromise. Both parties vote to accept or reject.
            </p>
          </div>
        </button>

        {/* Adversarial debate */}
        <button
          onClick={triggerAdversarialDebate}
          disabled={isProcessing}
          className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-purple-300 hover:bg-purple-50/30 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            {isDebating ? (
              <Loader2 className="w-4 h-4 text-purple-600 animate-spin" />
            ) : (
              <Swords className="w-4 h-4 text-purple-600" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {isDebating ? 'Running 5-round debate…' : 'Adversarial Debate (Recommended)'}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Two AI agents fight on each side over 5 rounds. Win 4/5 → victory. Otherwise → compromise.
              Includes fact-finding and argument strengthening.
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}
