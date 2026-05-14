import { createServiceClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Scale, ArrowRight, Shield, CheckCircle } from 'lucide-react'

export default async function InvitePage({
  params,
}: {
  params: { token: string }
}) {
  const supabase = createServiceClient()

  // Look up the dispute by invite token
  const { data: dispute } = await supabase
    .from('disputes')
    .select('id, neutral_title, initiator_title, status, respondent_email')
    .eq('invite_token', params.token)
    .single()

  if (!dispute) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Scale className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            Invalid Invitation
          </h1>
          <p className="text-slate-500 text-sm mb-6">
            This invitation link is invalid or has already been used.
          </p>
          <Button variant="outline" asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (dispute.status !== 'pending_response') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            Response Already Submitted
          </h1>
          <p className="text-slate-500 text-sm">
            This dispute already has a response. The case is now being processed.
          </p>
        </div>
      </div>
    )
  }

  const displayTitle = dispute.neutral_title || dispute.initiator_title

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-arbitrator-600 rounded-lg flex items-center justify-center">
            <Scale className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-slate-900">The Arbitrator</span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Invite card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-br from-arbitrator-50 to-slate-50 p-6 border-b border-slate-200">
              <div className="w-12 h-12 bg-white border border-arbitrator-100 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <Scale className="w-6 h-6 text-arbitrator-600" />
              </div>
              <h1 className="text-xl font-bold text-slate-900 mb-1">
                You&apos;ve been invited to respond
              </h1>
              <p className="text-sm text-slate-500">
                The other party has opened a dispute case and is requesting your response.
              </p>
            </div>

            <div className="p-6">
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 mb-6">
                <p className="text-xs text-slate-500 mb-1 font-medium">Case</p>
                <p className="text-sm font-semibold text-slate-900">{displayTitle}</p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { icon: Shield, text: 'Your response is completely private until both sides submit' },
                  { icon: CheckCircle, text: 'AI will ensure both perspectives are heard fairly' },
                  { icon: Scale, text: 'A neutral resolution is generated based on the facts' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-arbitrator-50 rounded flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-3 h-3 text-arbitrator-600" />
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Button variant="primary" size="lg" className="w-full" asChild>
                  <Link href={`/login?redirect=/disputes/${dispute.id}/respond`}>
                    Sign In to Respond
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link href={`/signup?redirect=/disputes/${dispute.id}/respond`}>
                    Create Account & Respond
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-4">
            This is a private dispute resolution platform.
            Your information is kept confidential.
          </p>
        </div>
      </div>
    </div>
  )
}
