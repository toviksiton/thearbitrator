'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { CheckCircle, XCircle, MessageSquare, Loader2, Scale } from 'lucide-react'
import type { AIMediationProposal } from '@/types'

interface MediationPanelProps {
  disputeId: string
  proposal: AIMediationProposal
  currentUserRole: 'initiator' | 'respondent'
  mediationResponse: string | null
  onResponse: (response: 'accepted' | 'rejected' | 'counter') => void
}

export function MediationPanel({
  disputeId,
  proposal,
  currentUserRole,
  mediationResponse,
  onResponse,
}: MediationPanelProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showCounter, setShowCounter] = useState(false)
  const [counterProposal, setCounterProposal] = useState('')
  const supabase = createClient()

  const handleResponse = async (response: 'accepted' | 'rejected' | 'counter') => {
    setIsLoading(true)
    try {
      await supabase
        .from('disputes')
        .update({ mediation_response: response })
        .eq('id', disputeId)

      if (response === 'accepted') {
        await supabase
          .from('disputes')
          .update({ status: 'resolved' })
          .eq('id', disputeId)
        toast.success('Mediation accepted! Case resolved.')
      } else if (response === 'rejected') {
        await supabase
          .from('disputes')
          .update({ status: 'ai_processing' })
          .eq('id', disputeId)
        toast.info('Moving to AI arbitration...')
      } else {
        toast.success('Counter proposal submitted.')
      }

      onResponse(response)
    } catch {
      toast.error('Failed to submit response')
    } finally {
      setIsLoading(false)
      setShowCounter(false)
    }
  }

  if (mediationResponse) {
    const labels = {
      accepted: { label: 'Mediation Accepted', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
      rejected: { label: 'Mediation Rejected', icon: XCircle, color: 'text-red-600 bg-red-50 border-red-200' },
      counter: { label: 'Counter Proposed', icon: MessageSquare, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    }
    const info = labels[mediationResponse as keyof typeof labels]

    return (
      <div className={`flex items-center gap-3 p-4 rounded-xl border ${info.color}`}>
        <info.icon className="w-5 h-5 shrink-0" />
        <div>
          <p className="text-sm font-medium">{info.label}</p>
          <p className="text-xs opacity-75">This mediation proposal has been responded to.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Proposal */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Scale className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-semibold text-indigo-800">
            {proposal.proposal_type}
          </span>
        </div>
        <p className="text-sm text-indigo-700 mb-4 leading-relaxed">
          {proposal.description}
        </p>

        {proposal.terms.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">
              Proposed Terms
            </p>
            <ul className="space-y-1.5">
              {proposal.terms.map((term, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-indigo-700">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-indigo-500" />
                  {term}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-white/60 rounded-lg p-3 border border-indigo-200/50">
          <p className="text-xs text-indigo-600 font-medium mb-0.5">AI Rationale</p>
          <p className="text-xs text-indigo-700 leading-relaxed">{proposal.rationale}</p>
        </div>
      </div>

      {/* Counter form */}
      {showCounter && (
        <div className="space-y-3">
          <Label>Your counter-proposal</Label>
          <Textarea
            placeholder="Describe your alternative proposal..."
            value={counterProposal}
            onChange={(e) => setCounterProposal(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCounter(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleResponse('counter')}
              disabled={!counterProposal.trim() || isLoading}
            >
              {isLoading && <Loader2 className="w-3 h-3 animate-spin" />}
              Submit Counter
            </Button>
          </div>
        </div>
      )}

      {/* Action buttons */}
      {!showCounter && (
        <div className="flex gap-3">
          <Button
            variant="success"
            className="flex-1"
            onClick={() => handleResponse('accepted')}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            Accept Proposal
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowCounter(true)}
            disabled={isLoading}
          >
            <MessageSquare className="w-4 h-4" />
            Counter
          </Button>
          <Button
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50"
            onClick={() => handleResponse('rejected')}
            disabled={isLoading}
          >
            <XCircle className="w-4 h-4" />
            Reject
          </Button>
        </div>
      )}
    </div>
  )
}
