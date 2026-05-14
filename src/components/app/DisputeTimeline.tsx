import { formatDate } from '@/lib/utils'
import { CheckCircle, Circle, Clock } from 'lucide-react'
import type { DisputeStatus } from '@/types'

interface TimelineStep {
  key: string
  label: string
  description: string
  statuses: DisputeStatus[]
}

const timelineSteps: TimelineStep[] = [
  {
    key: 'filed',
    label: 'Case Filed',
    description: 'Case created and invitation sent to the other party.',
    statuses: ['pending_response', 'in_progress', 'ai_processing', 'mediation', 'resolved', 'closed'],
  },
  {
    key: 'responded',
    label: 'Response Received',
    description: 'The other party has submitted their perspective.',
    statuses: ['in_progress', 'ai_processing', 'mediation', 'resolved', 'closed'],
  },
  {
    key: 'ai_analysis',
    label: 'AI Analysis',
    description: 'AI is neutralizing language and classifying the dispute.',
    statuses: ['ai_processing', 'mediation', 'resolved', 'closed'],
  },
  {
    key: 'mediation',
    label: 'Mediation Attempt',
    description: 'AI proposes compromise solutions before arbitration.',
    statuses: ['mediation', 'resolved', 'closed'],
  },
  {
    key: 'resolved',
    label: 'Resolution',
    description: 'Final AI arbitration decision delivered.',
    statuses: ['resolved', 'closed'],
  },
]

interface DisputeTimelineProps {
  status: DisputeStatus
  createdAt: string
}

export function DisputeTimeline({ status, createdAt }: DisputeTimelineProps) {
  const getCurrentStepIndex = () => {
    const order: DisputeStatus[] = [
      'pending_response',
      'in_progress',
      'ai_processing',
      'mediation',
      'resolved',
    ]
    return order.indexOf(status)
  }

  const currentIndex = getCurrentStepIndex()

  return (
    <div className="relative">
      {timelineSteps.map((step, index) => {
        const isDone = step.statuses.includes(status) && index < currentIndex
        const isCurrent =
          (status === 'pending_response' && index === 0) ||
          (status === 'in_progress' && index === 1) ||
          (status === 'ai_processing' && index === 2) ||
          (status === 'mediation' && index === 3) ||
          (['resolved', 'closed'].includes(status) && index === 4)
        const isPending = !isDone && !isCurrent

        return (
          <div key={step.key} className="flex gap-4 relative">
            {/* Connector line */}
            {index < timelineSteps.length - 1 && (
              <div
                className={`absolute left-[11px] top-6 bottom-0 w-px ${
                  isDone ? 'bg-emerald-300' : 'bg-slate-200'
                }`}
                style={{ top: '28px', height: 'calc(100% - 4px)' }}
              />
            )}

            {/* Icon */}
            <div className="shrink-0 w-6 flex items-start justify-center pt-0.5">
              {isDone ? (
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              ) : isCurrent ? (
                <Clock className="w-5 h-5 text-arbitrator-500 animate-pulse" />
              ) : (
                <Circle className="w-5 h-5 text-slate-300" />
              )}
            </div>

            {/* Content */}
            <div className={`pb-6 ${isPending ? 'opacity-40' : ''}`}>
              <p
                className={`text-sm font-medium mb-0.5 ${
                  isDone
                    ? 'text-emerald-700'
                    : isCurrent
                    ? 'text-arbitrator-700'
                    : 'text-slate-400'
                }`}
              >
                {step.label}
                {isCurrent && (
                  <span className="ml-2 text-xs font-normal bg-arbitrator-100 text-arbitrator-600 px-2 py-0.5 rounded-full">
                    Current
                  </span>
                )}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
