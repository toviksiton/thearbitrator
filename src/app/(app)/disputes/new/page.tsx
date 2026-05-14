'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AgreementModal } from '@/components/app/AgreementModal'
import { EvidenceUpload } from '@/components/app/EvidenceUpload'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  AlertCircle,
  FileText,
  User,
  Target,
  DollarSign,
  Mail,
  Paperclip,
  CheckCircle,
} from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

const steps = [
  { id: 1, label: 'Your Story', icon: FileText },
  { id: 2, label: 'Your Goal', icon: Target },
  { id: 3, label: 'Evidence', icon: Paperclip },
  { id: 4, label: 'Invite Party', icon: Mail },
]

export default function NewDisputePage() {
  const router = useRouter()
  const supabase = createClient()

  const [showAgreement, setShowAgreement] = useState(true)
  const [agreed, setAgreed] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [createdDisputeId, setCreatedDisputeId] = useState<string | null>(null)

  const [form, setForm] = useState({
    title: '',
    description: '',
    desired_outcome: '',
    compensation: '',
    respondent_email: '',
  })

  const updateForm = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleAgree = () => {
    setAgreed(true)
    setShowAgreement(false)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data: dispute, error: createError } = await supabase
        .from('disputes')
        .insert({
          initiator_title: form.title,
          initiator_description: form.description,
          initiator_desired_outcome: form.desired_outcome,
          initiator_compensation: form.compensation ? parseFloat(form.compensation) : null,
          respondent_email: form.respondent_email,
          created_by: user.id,
          status: 'pending_response',
          invite_token: crypto.randomUUID(),
        })
        .select()
        .single()

      if (createError) throw createError

      // Add initiator as participant
      await supabase.from('participants').insert({
        dispute_id: dispute.id,
        user_id: user.id,
        role: 'initiator',
        agreed_to_terms: true,
      })

      // Send invite via API route
      await fetch('/api/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dispute_id: dispute.id,
          respondent_email: form.respondent_email,
          invite_token: dispute.invite_token,
        }),
      })

      setCreatedDisputeId(dispute.id)
      toast.success('Case opened and invitation sent!')
      router.push(`/disputes/${dispute.id}`)
    } catch (err) {
      console.error('Error creating dispute:', err)
      setError('Failed to create case. Please try again.')
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    if (currentStep === 1) return form.title.length > 5 && form.description.length > 20
    if (currentStep === 2) return form.desired_outcome.length > 10
    if (currentStep === 3) return true
    if (currentStep === 4) return form.respondent_email.includes('@')
    return false
  }

  if (showAgreement) {
    return <AgreementModal open={showAgreement} onAgree={handleAgree} />
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/dashboard"
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Open a New Case</h1>
          <p className="text-sm text-slate-500">
            Step {currentStep} of {steps.length}
          </p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div
              className={`flex items-center gap-2 ${
                currentStep === step.id ? 'text-arbitrator-700' : currentStep > step.id ? 'text-emerald-600' : 'text-slate-300'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  currentStep === step.id
                    ? 'bg-arbitrator-100 text-arbitrator-700'
                    : currentStep > step.id
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {currentStep > step.id ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  step.id
                )}
              </div>
              <span className="text-xs font-medium hidden sm:block">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-px mx-3 ${
                  currentStep > step.id ? 'bg-emerald-300' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <Card className="border-slate-200 shadow-sm">
        {currentStep === 1 && (
          <>
            <CardHeader>
              <CardTitle>Describe your dispute</CardTitle>
              <CardDescription>
                Tell us what happened in your own words. Be specific and factual.
                Emotional language will be neutralized by AI — just be honest.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="title">
                  Case title{' '}
                  <span className="text-slate-400 font-normal text-xs">(your perspective)</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. Unpaid freelance invoice for website project"
                  value={form.title}
                  onChange={(e) => updateForm('title', e.target.value)}
                  maxLength={120}
                />
                <p className="text-xs text-slate-400">{form.title.length}/120</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">
                  Full description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the situation, what happened, and when it occurred. Include relevant dates, amounts, or agreements."
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
              <CardTitle>What do you want to achieve?</CardTitle>
              <CardDescription>
                State your desired outcome clearly. This helps the AI mediate effectively.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="outcome">Desired outcome</Label>
                <Textarea
                  id="outcome"
                  placeholder="e.g. I want to receive the full payment of $2,500 that was agreed upon in our contract."
                  value={form.desired_outcome}
                  onChange={(e) => updateForm('desired_outcome', e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="compensation">
                  Compensation amount{' '}
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
                    step={0.01}
                  />
                </div>
                <p className="text-xs text-slate-400">
                  Leave blank if you&apos;re not seeking monetary compensation.
                </p>
              </div>
            </CardContent>
          </>
        )}

        {currentStep === 3 && (
          <>
            <CardHeader>
              <CardTitle>Upload evidence</CardTitle>
              <CardDescription>
                Add supporting documents, photos, screenshots, or contracts. Evidence helps the AI make a fair assessment. This step is optional but recommended.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="info" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Your evidence is private and will only be shared with the AI and the other party after both sides have submitted their case.
                </AlertDescription>
              </Alert>

              {createdDisputeId ? (
                <EvidenceUpload
                  disputeId={createdDisputeId}
                  uploadedBy="current-user"
                  role="initiator"
                />
              ) : (
                <p className="text-sm text-slate-500 text-center py-8">
                  Evidence can be uploaded after the case is created. Continue to the next step.
                </p>
              )}
            </CardContent>
          </>
        )}

        {currentStep === 4 && (
          <>
            <CardHeader>
              <CardTitle>Invite the other party</CardTitle>
              <CardDescription>
                Enter the email of the other person involved in this dispute. They&apos;ll receive a secure invitation to present their side.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="respondent_email">Their email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="respondent_email"
                    type="email"
                    placeholder="otherparty@example.com"
                    value={form.respondent_email}
                    onChange={(e) => updateForm('respondent_email', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">What happens next:</strong>
                  {' '}They&apos;ll receive an email with a secure link. Once they accept and submit their perspective, the AI will analyze both sides and begin mediation.
                </p>
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

        {currentStep < steps.length ? (
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
            disabled={!canProceed() || isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            Open Case & Send Invite
          </Button>
        )}
      </div>
    </div>
  )
}
