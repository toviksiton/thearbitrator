import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  getStatusLabel,
  getStatusColor,
  getCategoryLabel,
  formatRelativeTime,
  truncate,
} from '@/lib/utils'
import type { Dispute, DisputeStatus, DisputeCategory } from '@/types'
import { ArrowRight, User, Calendar } from 'lucide-react'

interface DisputeCardProps {
  dispute: Dispute
  currentUserId: string
}

export function DisputeCard({ dispute, currentUserId }: DisputeCardProps) {
  const isInitiator = dispute.created_by === currentUserId
  const displayTitle = dispute.neutral_title || dispute.initiator_title

  return (
    <Link href={`/disputes/${dispute.id}`}>
      <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group border-slate-200">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-arbitrator-700 transition-colors line-clamp-1">
                {truncate(displayTitle, 65)}
              </h3>
              {dispute.category && (
                <p className="text-xs text-slate-500">
                  {getCategoryLabel(dispute.category as DisputeCategory)}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(dispute.status as DisputeStatus)}`}
              >
                {getStatusLabel(dispute.status as DisputeStatus)}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-arbitrator-400 transition-colors" />
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">
            {truncate(dispute.initiator_description, 120)}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {isInitiator ? 'You opened this case' : 'You were invited'}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatRelativeTime(dispute.created_at)}
            </span>
            {dispute.respondent_email && (
              <span className="ml-auto text-slate-400">
                vs. {dispute.respondent_email.split('@')[0]}
              </span>
            )}
          </div>

          {/* Stage indicator */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1">
              {[
                { key: 'submit', label: 'Filed' },
                { key: 'respond', label: 'Response' },
                { key: 'ai', label: 'AI Analysis' },
                { key: 'mediate', label: 'Mediation' },
                { key: 'resolved', label: 'Resolved' },
              ].map((stage, i) => {
                const statusOrder = [
                  'pending_response',
                  'in_progress',
                  'ai_processing',
                  'mediation',
                  'resolved',
                ]
                const currentIndex = statusOrder.indexOf(dispute.status)
                const isDone = i <= currentIndex
                const isCurrent = i === currentIndex

                return (
                  <div key={stage.key} className="flex items-center flex-1">
                    <div
                      className={`flex-1 h-1 rounded-full transition-colors ${
                        isDone ? 'bg-arbitrator-500' : 'bg-slate-100'
                      } ${isCurrent ? 'bg-arbitrator-400' : ''}`}
                    />
                    {i < 4 && (
                      <div
                        className={`w-2 h-2 rounded-full mx-0.5 ${
                          isDone ? 'bg-arbitrator-500' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
