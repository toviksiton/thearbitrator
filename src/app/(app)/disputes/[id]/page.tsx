import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { DisputeTimeline } from '@/components/app/DisputeTimeline'
import { MediationPanel } from '@/components/app/MediationPanel'
import { ResolutionDisplay } from '@/components/app/ResolutionDisplay'
import { DebateDisplay } from '@/components/app/DebateDisplay'
import { DisputeDetailClient } from '@/components/app/DisputeDetailClient'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  getStatusLabel,
  getStatusColor,
  getCategoryLabel,
  formatDate,
} from '@/lib/utils'
import type { Dispute, DisputeStatus, DisputeCategory, AIResolution, AIMediationProposal, DebateResult } from '@/types'
import { ArrowLeft, Scale, FileText, Paperclip, MessageSquare, Swords } from 'lucide-react'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data } = await supabase
    .from('disputes')
    .select('neutral_title, initiator_title')
    .eq('id', params.id)
    .single()

  return {
    title: data?.neutral_title || data?.initiator_title || 'Case Details',
  }
}

export default async function DisputePage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: dispute, error } = await supabase
    .from('disputes')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !dispute) notFound()

  // Check access
  const { data: participant } = await supabase
    .from('participants')
    .select('role')
    .eq('dispute_id', params.id)
    .eq('user_id', user.id)
    .single()

  const isInitiator = dispute.created_by === user.id
  const isRespondent = participant?.role === 'respondent'

  if (!isInitiator && !isRespondent) {
    redirect('/dashboard')
  }

  const currentRole = isInitiator ? 'initiator' : 'respondent'

  // Fetch evidence
  const { data: evidence } = await supabase
    .from('evidence')
    .select('*')
    .eq('dispute_id', params.id)
    .order('created_at', { ascending: true })

  // Fetch AI outputs
  const { data: aiOutputs } = await supabase
    .from('ai_outputs')
    .select('*')
    .eq('dispute_id', params.id)
    .order('created_at', { ascending: true })

  const neutralTitleOutput = aiOutputs?.find((o) => o.type === 'neutral_title')
  const mediationOutput = aiOutputs?.find((o) => o.type === 'mediation_proposal')
  const resolutionOutput = aiOutputs?.find((o) => o.type === 'resolution')
  const debateOutput = aiOutputs?.find((o) => o.type === 'debate')

  const displayTitle = dispute.neutral_title || dispute.initiator_title
  const mediationProposal = mediationOutput
    ? (JSON.parse(mediationOutput.content) as AIMediationProposal)
    : null
  const resolution = resolutionOutput
    ? (JSON.parse(resolutionOutput.content) as AIResolution)
    : null
  const debateResult = debateOutput
    ? (JSON.parse(debateOutput.content) as DebateResult)
    : null

  const initiatorEvidence = evidence?.filter((e) => e.role === 'initiator') ?? []
  const respondentEvidence = evidence?.filter((e) => e.role === 'respondent') ?? []

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <Link
          href="/dashboard"
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors mt-0.5"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h1 className="text-xl font-bold text-slate-900 leading-tight">
              {displayTitle}
            </h1>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(dispute.status as DisputeStatus)}`}
            >
              {getStatusLabel(dispute.status as DisputeStatus)}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>Case #{params.id.slice(0, 8).toUpperCase()}</span>
            {dispute.category && (
              <>
                <span>·</span>
                <span>{getCategoryLabel(dispute.category as DisputeCategory)}</span>
              </>
            )}
            <span>·</span>
            <span>Filed {formatDate(dispute.created_at)}</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview">
            <TabsList className="w-full">
              <TabsTrigger value="overview" className="flex-1">
                <FileText className="w-4 h-4 mr-1.5" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="evidence" className="flex-1">
                <Paperclip className="w-4 h-4 mr-1.5" />
                Evidence
              </TabsTrigger>
              {(dispute.status === 'mediation' || dispute.status === 'resolved' || mediationProposal) && (
                <TabsTrigger value="mediation" className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-1.5" />
                  Mediation
                </TabsTrigger>
              )}
              {debateResult && (
                <TabsTrigger value="debate" className="flex-1">
                  <Swords className="w-4 h-4 mr-1.5" />
                  Debate
                </TabsTrigger>
              )}
              {resolution && (
                <TabsTrigger value="resolution" className="flex-1">
                  <Scale className="w-4 h-4 mr-1.5" />
                  Resolution
                </TabsTrigger>
              )}
            </TabsList>

            {/* Overview tab */}
            <TabsContent value="overview" className="space-y-4">
              {/* Party A */}
              <Card className="border-slate-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center text-xs font-bold text-blue-700">
                      A
                    </div>
                    <CardTitle className="text-sm">
                      {isInitiator ? 'Your Submission' : 'Party A Submission'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Title</p>
                    <p className="text-sm font-medium text-slate-900">
                      {dispute.initiator_title}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Description</p>
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {dispute.initiator_description}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Desired Outcome</p>
                    <p className="text-sm text-slate-700">{dispute.initiator_desired_outcome}</p>
                  </div>
                  {dispute.initiator_compensation && (
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Requested Compensation</p>
                      <p className="text-sm font-medium text-slate-900">
                        ${dispute.initiator_compensation.toLocaleString()}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Party B */}
              {dispute.respondent_title ? (
                <Card className="border-slate-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center text-xs font-bold text-purple-700">
                        B
                      </div>
                      <CardTitle className="text-sm">
                        {!isInitiator ? 'Your Submission' : 'Party B Submission'}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Title</p>
                      <p className="text-sm font-medium text-slate-900">
                        {dispute.respondent_title}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Description</p>
                      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {dispute.respondent_description}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Desired Outcome</p>
                      <p className="text-sm text-slate-700">{dispute.respondent_desired_outcome}</p>
                    </div>
                    {dispute.respondent_compensation && (
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Requested Compensation</p>
                        <p className="text-sm font-medium text-slate-900">
                          ${dispute.respondent_compensation.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-dashed border-slate-200 bg-slate-50/50">
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-slate-400 mb-2">
                      Waiting for the other party to respond
                    </p>
                    <p className="text-xs text-slate-400">
                      Invitation sent to {dispute.respondent_email}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Neutral title from AI */}
              {dispute.neutral_title && neutralTitleOutput && (
                <div className="bg-arbitrator-50 border border-arbitrator-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="w-4 h-4 text-arbitrator-600" />
                    <p className="text-xs font-semibold text-arbitrator-700 uppercase tracking-wide">
                      AI Neutral Title
                    </p>
                  </div>
                  <p className="text-sm font-medium text-arbitrator-900">
                    {dispute.neutral_title}
                  </p>
                </div>
              )}

              {/* Action buttons for respondent */}
              {isRespondent && !dispute.respondent_title && (
                <Button variant="primary" size="lg" className="w-full" asChild>
                  <Link href={`/disputes/${params.id}/respond`}>
                    Submit Your Response
                  </Link>
                </Button>
              )}

              {/* Trigger AI processing */}
              {isInitiator && dispute.status === 'in_progress' && dispute.respondent_title && (
                <DisputeDetailClient disputeId={params.id} dispute={dispute as Dispute} />
              )}
            </TabsContent>

            {/* Evidence tab */}
            <TabsContent value="evidence" className="space-y-4">
              {initiatorEvidence.length > 0 && (
                <Card className="border-slate-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <span className="w-5 h-5 bg-blue-100 rounded text-xs font-bold text-blue-700 flex items-center justify-center">A</span>
                      Party A Evidence
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {initiatorEvidence.map((ev) => (
                      <a
                        key={ev.id}
                        href={ev.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-slate-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">
                            {ev.file_name}
                          </p>
                          <p className="text-xs text-slate-400">{ev.file_type}</p>
                        </div>
                      </a>
                    ))}
                  </CardContent>
                </Card>
              )}

              {respondentEvidence.length > 0 && (
                <Card className="border-slate-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <span className="w-5 h-5 bg-purple-100 rounded text-xs font-bold text-purple-700 flex items-center justify-center">B</span>
                      Party B Evidence
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {respondentEvidence.map((ev) => (
                      <a
                        key={ev.id}
                        href={ev.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-slate-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">
                            {ev.file_name}
                          </p>
                          <p className="text-xs text-slate-400">{ev.file_type}</p>
                        </div>
                      </a>
                    ))}
                  </CardContent>
                </Card>
              )}

              {initiatorEvidence.length === 0 && respondentEvidence.length === 0 && (
                <Card className="border-dashed border-slate-200">
                  <CardContent className="p-8 text-center">
                    <Paperclip className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">No evidence uploaded yet</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Debate tab */}
            {debateResult && (
              <TabsContent value="debate">
                <DebateDisplay debate={debateResult} />
              </TabsContent>
            )}

            {/* Mediation tab */}
            {mediationProposal && (
              <TabsContent value="mediation">
                <MediationPanel
                  disputeId={params.id}
                  proposal={mediationProposal}
                  currentUserRole={currentRole}
                  mediationResponse={dispute.mediation_response}
                  onResponse={() => {}}
                />
              </TabsContent>
            )}

            {/* Resolution tab */}
            {resolution && (
              <TabsContent value="resolution">
                <ResolutionDisplay
                  resolution={resolution}
                  neutralTitle={dispute.neutral_title || dispute.initiator_title}
                  onDownloadPDF={() => window.open(`/api/pdf/${params.id}`, '_blank')}
                  isDownloading={false}
                />
              </TabsContent>
            )}
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Timeline */}
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Case Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <DisputeTimeline
                status={dispute.status as DisputeStatus}
                createdAt={dispute.created_at}
              />
            </CardContent>
          </Card>

          {/* Case info */}
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Case Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Status</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(dispute.status as DisputeStatus)}`}
                >
                  {getStatusLabel(dispute.status as DisputeStatus)}
                </span>
              </div>
              {dispute.category && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Category</span>
                  <span className="text-slate-900 font-medium text-xs">
                    {getCategoryLabel(dispute.category as DisputeCategory)}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Filed</span>
                <span className="text-slate-900 font-medium text-xs">
                  {formatDate(dispute.created_at)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Your Role</span>
                <span className="text-slate-900 font-medium text-xs capitalize">
                  {currentRole}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Other Party</span>
                <span className="text-slate-900 font-medium text-xs">
                  {dispute.respondent_email}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
