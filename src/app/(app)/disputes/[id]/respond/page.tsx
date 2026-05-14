'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AgreementModal } from '@/components/app/AgreementModal'
import { EvidenceUpload } from '@/components/app/EvidenceUpload'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, ArrowRight, Loader2, AlertCircle, CheckCircle, DollarSign } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function RespondPage() {
  const params = useParams()
  const router = useRouter()
  const disputeId = params.id as string
  const supabase = createClient()

  const [dispute, setDispute] = useState<Record<string, unknown> | null>(null)
  const [user, setUser] = useState<Record<string, unknown> | null>(null)
  const [showAgreement, setShowAgreement] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [form, setForm] = useState({
    title: '',
    description: '',
    desired_outcome: '',
    compensation: '',
  })

  const updateForm = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  useEffect(() => {
    const init = async () => {
      const { data: { user: u } } = await supabase.auth.getUser()
      if (!u) { router.push('/login'); return }
      setUser(u as unknown as Record<string, unknown>)

      const { data: d } = await supabase
        .from('disputes')
        .select('*')
        .eq('id', disputeId)
        .single()

      if (!d) { router.push('/dashboard'); return }
      if (d.respondent_title) { router.push(`/disputes/${disputeId}`); return }

      setDispute(d)
      setIsLoading(false)
    }
    init()
  }, [disputeId, router, supabase])

  const handleAgree = () => setShowAgreement(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const { error: updateError } = await supabase
        .from('disputes')
        .update({
          respondent_title: form.title,
          respondent_description: form.description,
          respondent_desired_outcome: form.desired_outcome,
          respondent_compensation: form.compensation ? parseFloat(form.compensation) : null,
          status: 'in_progress',
          invite_accepted_at: new Date().toISOString(),
        })
        .eq('id', disputeId)

      if (updateError) throw updateError

      // Add respondent as participant
      await supabase.from('participants').insert({
        dispute_id: disputeId,
        user_id: (user as Record<string, unknown>).id as string,
        role: 'respondent',
        agreed_to_terms: true,
      })

      toast.success('Your response has been submitted!')
      router.push(`/disputes/${disputeId}`)
    } catch (err) {
      console.error('Error submitting response:', err)
      setError('Failed to submit response. Please try again.')
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    if (currentStep === 1) return form.title.length > 5 && form.description.length > 20
    if (currentStep === 2) return form.desired_outcome.length > 10
    return true
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-arbitrator-500" />
      </div>
    )
  }

  if (showAgreement) {
    return <AgreementModal open={showAgreement} onAgree={handleAgree} />
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href={`/disputes/${disputeId}`}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Submit Your Response</h1>
          <p className="text-sm text-slate-500">Present your side of the dispute</p>
        </div>
      </div>

      {/* Context card */}
      {dispute && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6">
          <p className="text-xs text-slate-500 mb-1">You are responding to:</p>
          <p className="text-sm font-medium text-slate-900">
            {(dispute.neutral_title as string) || (dispute.initiator_title as string)}
          </p>
        </div>
      )}

      {/* Steps */}
      <div className="flex gap-2 mb-6">
        {['Your Story', 'Your Goal', 'Evidence'].map((step, i) => (
          <div key={step} className="flex items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep === i + 1
                  ? 'bg-arbitrator-100 text-arbitrator-700'
                  : currentStep > i + 1
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {currentStep > i + 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            <span className="text-xs font-medium hidden sm:block ml-2 text-slate-500">{step}</span>
            {i < 2 && <div className={`flex-1 h-px mx-2 ${currentStep > i + 1 ? 'bg-emerald-300' : 'bg-slate-200'}`} />}
          </div>
        ))}
      </div>

      <Card className="border-slate-200 shadow-sm">
        {currentStep === 1 && (
          <>
            <CardHeader>
              <CardTitle>Your perspective</CardTitle>
              <CardDescription>
                Describe the situation from your point of view. Be honest and specific. AI will neutralize emotional language.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="title">Your title for this case</Label>
                <Input
                  id="title"
                  placeholder="Brief description from your perspective"
                  value={form.title}
                  onChange={(e) => updateForm('title', e.target.value)}
                  maxLength={120}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="description">Your full account</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what happened from your point of view. Include relevant dates, context, and facts."
                  value={form.description}
                  onChange={(e) => updateForm('description', e.target.value)}
                  className="min-h-[160px]"
                  maxLength={3000}
                />
                <p className="text-xs text-slate-400">{form.description.length}/3000</p>
              </div>
            </CardContent>
          </>
        )}

        {currentStep === 2 && (
          <>
            <CardHeader>
              <CardTitle>What outcome do you seek?</CardTitle>
              <CardDescription>
                State what resolution you consider fair.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="outcome">Your desired outcome</Label>
                <Textarea
                  id="outcome"
                  placeholder="Describe what you believe would be a fair resolution."
                  value={form.desired_outcome}
                  onChange={(e) => updateForm('desired_outcome', e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="compensation">
                  Compensation sought{' '}
                  <span className="text-slate-400 font-normal text-xs">(optional)</span>
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="compensation"
                    type="number"
                    placeholder="0.00"
                    value={form.compensation}
                    onChange={(e) => updateForm('compensation', e.target.value)}
                    className="pl-10"
                    min={0}
                  />
                </div>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </>
        )}

        {currentStep === 3 && user && (
          <>
            <CardHeader>
              <CardTitle>Upload evidence</CardTitle>
              <CardDescription>
                Add supporting documents or photos. This is optional but helps the AI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EvidenceUpload
                disputeId={disputeId}
                uploadedBy={(user as Record<string, unknown>).id as string}
                role="respondent"
              />
            </CardContent>
          </>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((s) => s - 1)}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {currentStep < 3 ? (
          <Button
            variant="primary"
            onClick={() => setCurrentStep((s) => s + 1)}
            disabled={!canProceed()}
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            Submit Response
          </Button>
        )}
      </div>
    </div>
  )
}
