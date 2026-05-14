import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DisputeCard } from '@/components/app/DisputeCard'
import { PlusCircle, Scale, Clock, CheckCircle, Inbox } from 'lucide-react'
import type { Dispute, DisputeStatus } from '@/types'

export const metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Fetch disputes where user is initiator
  const { data: myDisputes } = await supabase
    .from('disputes')
    .select('*')
    .eq('created_by', user.id)
    .order('created_at', { ascending: false })

  // Fetch disputes where user is respondent (via participants table)
  const { data: participantRows } = await supabase
    .from('participants')
    .select('dispute_id')
    .eq('user_id', user.id)
    .eq('role', 'respondent')

  const respondentDisputeIds = participantRows?.map((p) => p.dispute_id) ?? []

  const { data: respondentDisputes } = respondentDisputeIds.length > 0
    ? await supabase
        .from('disputes')
        .select('*')
        .in('id', respondentDisputeIds)
        .order('created_at', { ascending: false })
    : { data: [] }

  const allDisputes: Dispute[] = [
    ...(myDisputes ?? []),
    ...(respondentDisputes ?? []),
  ] as Dispute[]

  const activeDisputes = allDisputes.filter((d) =>
    ['pending_response', 'in_progress', 'ai_processing', 'mediation'].includes(d.status)
  )
  const resolvedDisputes = allDisputes.filter((d) =>
    ['resolved', 'closed'].includes(d.status)
  )
  const pendingResponse = allDisputes.filter(
    (d) => d.status === 'pending_response'
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Your Cases
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {allDisputes.length === 0
              ? 'No active cases'
              : `${allDisputes.length} case${allDisputes.length !== 1 ? 's' : ''} total`}
          </p>
        </div>
        <Button variant="primary" asChild>
          <Link href="/disputes/new">
            <PlusCircle className="w-4 h-4" />
            New Case
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          {
            icon: Scale,
            label: 'Active',
            value: activeDisputes.length,
            color: 'text-blue-600 bg-blue-50',
          },
          {
            icon: Clock,
            label: 'Awaiting Response',
            value: pendingResponse.length,
            color: 'text-amber-600 bg-amber-50',
          },
          {
            icon: CheckCircle,
            label: 'Resolved',
            value: resolvedDisputes.length,
            color: 'text-emerald-600 bg-emerald-50',
          },
        ].map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
          >
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{value}</div>
            <div className="text-sm text-slate-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {allDisputes.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Inbox className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            No cases yet
          </h2>
          <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
            Start a new case to resolve a dispute fairly with AI mediation.
          </p>
          <Button variant="primary" asChild>
            <Link href="/disputes/new">
              <PlusCircle className="w-4 h-4" />
              Open Your First Case
            </Link>
          </Button>
        </div>
      )}

      {/* Active disputes */}
      {activeDisputes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Active Cases
          </h2>
          <div className="space-y-3">
            {activeDisputes.map((dispute) => (
              <DisputeCard
                key={dispute.id}
                dispute={dispute}
                currentUserId={user.id}
              />
            ))}
          </div>
        </div>
      )}

      {/* Resolved disputes */}
      {resolvedDisputes.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Resolved Cases
          </h2>
          <div className="space-y-3">
            {resolvedDisputes.map((dispute) => (
              <DisputeCard
                key={dispute.id}
                dispute={dispute}
                currentUserId={user.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
