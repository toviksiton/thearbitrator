'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { DebateResult, DebateRound } from '@/types'
import {
  ChevronDown,
  ChevronUp,
  Trophy,
  Handshake,
  Search,
  Swords,
  CheckCircle,
  XCircle,
  Minus,
} from 'lucide-react'

interface DebateDisplayProps {
  debate: DebateResult
}

function RoundCard({ round, index }: { round: DebateRound; index: number }) {
  const [expanded, setExpanded] = useState(false)

  const winnerIcon =
    round.winner === 'A' ? (
      <CheckCircle className="w-4 h-4 text-blue-600" />
    ) : round.winner === 'B' ? (
      <CheckCircle className="w-4 h-4 text-purple-600" />
    ) : (
      <Minus className="w-4 h-4 text-slate-400" />
    )

  const winnerLabel =
    round.winner === 'A'
      ? 'Party A wins round'
      : round.winner === 'B'
        ? 'Party B wins round'
        : 'Draw'

  const winnerColor =
    round.winner === 'A'
      ? 'bg-blue-50 text-blue-700 border-blue-200'
      : round.winner === 'B'
        ? 'bg-purple-50 text-purple-700 border-purple-200'
        : 'bg-slate-50 text-slate-600 border-slate-200'

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-slate-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
            {index + 1}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{round.topic}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${winnerColor}`}>
            {winnerIcon}
            {winnerLabel}
          </span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50/50 p-4 space-y-4">
          {/* Agent A */}
          <div className="bg-white rounded-xl border border-blue-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center text-xs font-bold text-blue-700">
                A
              </div>
              <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                Agent A · Arguing for Party A
              </p>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{round.agent_a_argument}</p>
          </div>

          {/* Agent B */}
          <div className="bg-white rounded-xl border border-purple-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center text-xs font-bold text-purple-700">
                B
              </div>
              <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide">
                Agent B · Arguing for Party B
              </p>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{round.agent_b_argument}</p>
          </div>

          {/* Judge verdict */}
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-amber-600" />
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                Judge's Verdict
              </p>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{round.judge_reasoning}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export function DebateDisplay({ debate }: DebateDisplayProps) {
  const [researchExpanded, setResearchExpanded] = useState(false)

  const verdictConfig = {
    A_wins: {
      label: 'Party A Wins',
      color: 'bg-blue-600',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: <Trophy className="w-5 h-5 text-blue-600" />,
    },
    B_wins: {
      label: 'Party B Wins',
      color: 'bg-purple-600',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      icon: <Trophy className="w-5 h-5 text-purple-600" />,
    },
    compromise: {
      label: 'Compromise',
      color: 'bg-amber-500',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      icon: <Handshake className="w-5 h-5 text-amber-600" />,
    },
  }

  const vc = verdictConfig[debate.verdict]

  return (
    <div className="space-y-6">
      {/* Score card */}
      <Card className={`border-2 ${vc.borderColor}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Swords className="w-5 h-5 text-slate-500" />
              <h3 className="font-semibold text-slate-900">Adversarial Debate Result</h3>
            </div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${vc.bgColor} ${vc.textColor} border ${vc.borderColor}`}>
              {vc.icon}
              {vc.label}
            </span>
          </div>

          {/* Score bars */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-medium text-blue-700">Party A — {debate.score_a} rounds</span>
              <span className="font-medium text-purple-700">{debate.score_b} rounds — Party B</span>
            </div>
            <div className="flex gap-1 h-3 rounded-full overflow-hidden bg-slate-100">
              {debate.rounds.map((r, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex-1 rounded-sm transition-colors',
                    r.winner === 'A'
                      ? 'bg-blue-500'
                      : r.winner === 'B'
                        ? 'bg-purple-500'
                        : 'bg-slate-300'
                  )}
                />
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <p className="text-xs text-slate-500">
                {debate.score_a >= 4
                  ? 'Party A won 4+ rounds — clear verdict'
                  : debate.score_b >= 4
                    ? 'Party B won 4+ rounds — clear verdict'
                    : 'Neither side reached 4/5 — compromise required'}
              </p>
            </div>
          </div>

          <div className={`rounded-xl p-4 ${vc.bgColor} border ${vc.borderColor}`}>
            <p className="text-sm text-slate-700 leading-relaxed">{debate.verdict_reasoning}</p>
          </div>
        </CardContent>
      </Card>

      {/* Research findings (collapsible) */}
      <Card className="border-slate-200">
        <button
          onClick={() => setResearchExpanded(!researchExpanded)}
          className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 rounded-xl transition-colors"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-500" />
            <CardTitle className="text-sm">Pre-Debate Research & Fact-Finding</CardTitle>
          </div>
          {researchExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {researchExpanded && (
          <CardContent className="pt-0 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                  Party A Key Claims
                </p>
                <ul className="space-y-1.5">
                  {debate.research.key_claims_a.map((claim, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-blue-400 mt-0.5 shrink-0">·</span>
                      {claim}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide">
                  Party B Key Claims
                </p>
                <ul className="space-y-1.5">
                  {debate.research.key_claims_b.map((claim, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-purple-400 mt-0.5 shrink-0">·</span>
                      {claim}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {debate.research.verifiable_facts.length > 0 && (
              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
                  Verifiable Facts
                </p>
                <ul className="space-y-1">
                  {debate.research.verifiable_facts.map((fact, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {debate.research.contradictions.length > 0 && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-2">
                  Contradictions Found
                </p>
                <ul className="space-y-1">
                  {debate.research.contradictions.map((c, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                      <XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                Domain Context
              </p>
              <p className="text-sm text-slate-700">{debate.research.domain_context}</p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* 5 Rounds */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Swords className="w-4 h-4 text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-900">5-Round Internal Debate</h3>
        </div>
        <div className="space-y-2">
          {debate.rounds.map((round, i) => (
            <RoundCard key={round.round} round={round} index={i} />
          ))}
        </div>
      </div>

      {/* Resolution guidance */}
      <div className="bg-arbitrator-50 border border-arbitrator-100 rounded-xl p-4">
        <p className="text-xs font-semibold text-arbitrator-700 uppercase tracking-wide mb-2">
          Resolution Guidance from Debate
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">{debate.resolution_guidance}</p>
      </div>
    </div>
  )
}
