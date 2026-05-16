'use client'

import { useState, useEffect, useRef } from 'react'
import { DEMO_DISPUTE, DEMO_DEBATE, DEMO_RESOLUTION } from './DemoData'
import { DebateDisplay } from '@/components/app/DebateDisplay'
import { cn } from '@/lib/utils'
import {
  Scale,
  FileText,
  Sparkles,
  Swords,
  Trophy,
  ChevronRight,
  CheckCircle,
  Clock,
  DollarSign,
  User,
  ArrowRight,
  Download,
} from 'lucide-react'

const STEPS = [
  { id: 'submit', label: 'Submissions', icon: FileText },
  { id: 'neutralize', label: 'AI Neutralization', icon: Sparkles },
  { id: 'debate', label: '5-Round Debate', icon: Swords },
  { id: 'verdict', label: 'Verdict', icon: Trophy },
  { id: 'resolution', label: 'Resolution', icon: Scale },
]

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10 overflow-x-auto pb-2">
      {STEPS.map((step, i) => {
        const done = i < currentStep
        const active = i === currentStep
        return (
          <div key={step.id} className="flex items-center">
            <div className={cn(
              'flex flex-col items-center gap-1.5 px-2',
            )}>
              <div className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 border-2',
                done
                  ? 'bg-arbitrator-600 border-arbitrator-600'
                  : active
                    ? 'bg-white border-arbitrator-600 shadow-lg shadow-arbitrator-100'
                    : 'bg-white border-slate-200'
              )}>
                {done ? (
                  <CheckCircle className="w-4 h-4 text-white" />
                ) : (
                  <step.icon className={cn(
                    'w-4 h-4',
                    active ? 'text-arbitrator-600' : 'text-slate-300'
                  )} />
                )}
              </div>
              <span className={cn(
                'text-xs font-medium whitespace-nowrap',
                active ? 'text-arbitrator-700' : done ? 'text-slate-500' : 'text-slate-300'
              )}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn(
                'w-8 h-0.5 mb-5 transition-all duration-700',
                i < currentStep ? 'bg-arbitrator-400' : 'bg-slate-200'
              )} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function TypingText({ text, speed = 18 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
        return
      }
      setDisplayed(text.slice(0, i + 1))
      i++
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <span>
      {displayed}
      {!done && <span className="inline-block w-0.5 h-4 bg-arbitrator-500 ml-0.5 animate-pulse" />}
    </span>
  )
}

function SubmitStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-slate-900">Two parties, one platform</h3>
        <p className="text-sm text-slate-500 mt-1">Each side submits their version independently</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Party A */}
        <div className="border-2 border-blue-200 bg-blue-50/40 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">A</div>
            <span className="text-sm font-semibold text-blue-900">Freelancer (Party A)</span>
          </div>
          <p className="text-xs font-medium text-slate-500 mb-1">Their title</p>
          <p className="text-sm font-semibold text-red-600 mb-3 italic">&ldquo;{DEMO_DISPUTE.initiator_title}&rdquo;</p>
          <p className="text-xs font-medium text-slate-500 mb-1">Their account</p>
          <p className="text-sm text-slate-700 leading-relaxed line-clamp-4">{DEMO_DISPUTE.initiator_description}</p>
          <div className="mt-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Seeks ${DEMO_DISPUTE.initiator_compensation?.toLocaleString()}</span>
          </div>
        </div>

        {/* Party B */}
        <div className="border-2 border-purple-200 bg-purple-50/40 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-white">B</div>
            <span className="text-sm font-semibold text-purple-900">Client (Party B)</span>
          </div>
          <p className="text-xs font-medium text-slate-500 mb-1">Their title</p>
          <p className="text-sm font-semibold text-orange-600 mb-3 italic">&ldquo;{DEMO_DISPUTE.respondent_title}&rdquo;</p>
          <p className="text-xs font-medium text-slate-500 mb-1">Their account</p>
          <p className="text-sm text-slate-700 leading-relaxed line-clamp-4">{DEMO_DISPUTE.respondent_description}</p>
          <div className="mt-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">Counter-seeks ${DEMO_DISPUTE.respondent_compensation?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 bg-arbitrator-600 text-white text-sm font-semibold rounded-xl hover:bg-arbitrator-700 transition-colors shadow-lg shadow-arbitrator-200"
        >
          Start AI Analysis
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function NeutralizeStep({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<'loading' | 'done'>('loading')

  useEffect(() => {
    const t = setTimeout(() => setPhase('done'), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-slate-900">AI Neutralization Engine</h3>
        <p className="text-sm text-slate-500 mt-1">Emotional language removed. Shared neutral frame established.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-red-100 bg-red-50/60 p-4">
          <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">Before — Party A</p>
          <p className="text-sm text-red-800 italic line-through opacity-60">&ldquo;He stole my code and never paid me!!!&rdquo;</p>
        </div>
        <div className="rounded-2xl border border-orange-100 bg-orange-50/60 p-4">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-2">Before — Party B</p>
          <p className="text-sm text-orange-800 italic line-through opacity-60">&ldquo;Work was incomplete and unusable&rdquo;</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-arbitrator-200" />
        <div className="w-9 h-9 bg-arbitrator-100 rounded-full flex items-center justify-center">
          <Sparkles className={cn('w-4 h-4 text-arbitrator-600', phase === 'loading' && 'animate-pulse')} />
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-arbitrator-200" />
      </div>

      {phase === 'loading' ? (
        <div className="bg-arbitrator-50 border border-arbitrator-100 rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-arbitrator-600">
            <div className="w-2 h-2 bg-arbitrator-400 rounded-full animate-bounce [animation-delay:0ms]" />
            <div className="w-2 h-2 bg-arbitrator-400 rounded-full animate-bounce [animation-delay:150ms]" />
            <div className="w-2 h-2 bg-arbitrator-400 rounded-full animate-bounce [animation-delay:300ms]" />
            <span className="ml-1 font-medium">Neutralizing…</span>
          </div>
        </div>
      ) : (
        <div className="bg-arbitrator-50 border-2 border-arbitrator-200 rounded-2xl p-5 animate-in fade-in duration-500">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-arbitrator-600" />
            <p className="text-xs font-semibold text-arbitrator-700 uppercase tracking-wide">Neutral Title (Binding)</p>
          </div>
          <p className="text-base font-bold text-slate-900 mb-3">
            <TypingText text={DEMO_DISPUTE.neutral_title!} speed={25} />
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Both parties now operate under this shared, neutral framing. The AI uses this — not the original emotional titles — for all subsequent analysis.
          </p>
        </div>
      )}

      {phase === 'done' && (
        <div className="flex justify-center pt-1 animate-in fade-in duration-300">
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white text-sm font-semibold rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
          >
            <Swords className="w-4 h-4" />
            Start 5-Round Debate
          </button>
        </div>
      )}
    </div>
  )
}

function DebateStep({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<'loading' | 'done'>('loading')

  useEffect(() => {
    const t = setTimeout(() => setPhase('done'), 2800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-slate-900">Adversarial Debate Engine</h3>
        <p className="text-sm text-slate-500 mt-1">Two AI agents fight on each side. Neutral judge scores each round.</p>
      </div>

      {phase === 'loading' ? (
        <div className="space-y-3">
          {DEMO_DEBATE.rounds.map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            >
              <div className="w-8 h-8 bg-slate-100 rounded-full" />
              <div className="flex-1">
                <div className="h-3 bg-slate-100 rounded w-1/3 mb-2" />
                <div className="h-2 bg-slate-100 rounded w-2/3" />
              </div>
            </div>
          ))}
          <div className="text-center text-sm text-slate-400 py-2 animate-pulse">
            AI agents debating across 5 dimensions…
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500">
          <DebateDisplay debate={DEMO_DEBATE} />
          <div className="flex justify-center pt-4">
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-600 transition-colors shadow-lg shadow-amber-200"
            >
              <Trophy className="w-4 h-4" />
              See Verdict
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function VerdictStep({ onNext }: { onNext: () => void }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-slate-900">The 4/5 Rule Applied</h3>
        <p className="text-sm text-slate-500 mt-1">Party A won 4 rounds. The threshold is met.</p>
      </div>

      {/* Score visual */}
      <div className="bg-white border-2 border-blue-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg shadow-blue-200">
              <span className="text-2xl font-black text-white">{DEMO_DEBATE.score_a}</span>
            </div>
            <p className="text-sm font-semibold text-blue-700">Party A</p>
            <p className="text-xs text-slate-400">Freelancer</p>
          </div>

          <div className="text-center px-6">
            <div className="flex gap-1 mb-2 justify-center">
              {DEMO_DEBATE.rounds.map((r, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-4 h-8 rounded-sm transition-all',
                    r.winner === 'A' ? 'bg-blue-500' : r.winner === 'B' ? 'bg-purple-500' : 'bg-slate-200'
                  )}
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
            <p className="text-xs text-slate-400">5 rounds</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl font-black text-purple-400">{DEMO_DEBATE.score_b}</span>
            </div>
            <p className="text-sm font-semibold text-purple-400">Party B</p>
            <p className="text-xs text-slate-400">Client</p>
          </div>
        </div>

        {show && (
          <div className="text-center animate-in zoom-in duration-500">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-base font-bold rounded-full shadow-lg shadow-blue-300">
              <Trophy className="w-5 h-5" />
              Party A Wins — Clear Verdict (4/5)
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Chief Arbitrator Reasoning</p>
        <p className="text-sm text-slate-700 leading-relaxed">{DEMO_DEBATE.verdict_reasoning}</p>
      </div>

      <div className="bg-arbitrator-50 border border-arbitrator-100 rounded-2xl p-4">
        <p className="text-xs font-semibold text-arbitrator-600 uppercase tracking-wide mb-1">Resolution Guidance</p>
        <p className="text-sm text-slate-700">{DEMO_DEBATE.resolution_guidance}</p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 bg-arbitrator-600 text-white text-sm font-semibold rounded-xl hover:bg-arbitrator-700 transition-colors shadow-lg shadow-arbitrator-200"
        >
          <Scale className="w-4 h-4" />
          View Full Resolution
        </button>
      </div>
    </div>
  )
}

function ResolutionStep() {
  const r = DEMO_RESOLUTION

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-slate-900">Official Resolution</h3>
        <p className="text-sm text-slate-500 mt-1">Structured verdict ready for download and execution</p>
      </div>

      {/* Verdict banner */}
      <div className="bg-gradient-to-r from-blue-600 to-arbitrator-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Scale className="w-5 h-5 opacity-80" />
          <p className="text-xs font-semibold uppercase tracking-widest opacity-80">The Arbitrator — Official Ruling</p>
        </div>
        <p className="text-base font-bold leading-snug">{DEMO_DISPUTE.neutral_title}</p>
        <div className="mt-3 flex items-center gap-2">
          <div className="bg-white/20 rounded-lg px-3 py-1">
            <p className="text-xs font-bold">VERDICT: PARTY A WINS</p>
          </div>
          <div className="bg-white/20 rounded-lg px-3 py-1">
            <p className="text-xs font-bold">CONFIDENCE: HIGH</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Case Summary</p>
        <p className="text-sm text-slate-700 leading-relaxed">{r.summary}</p>
      </div>

      {/* Key arguments */}
      <div className="grid md:grid-cols-2 gap-3">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">Party A — Key Arguments</p>
          <ul className="space-y-1.5">
            {r.key_arguments.initiator.map((a, i) => (
              <li key={i} className="flex gap-2 text-xs text-slate-700">
                <CheckCircle className="w-3 h-3 text-blue-400 mt-0.5 shrink-0" />{a}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
          <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide mb-2">Party B — Key Arguments</p>
          <ul className="space-y-1.5">
            {r.key_arguments.respondent.map((a, i) => (
              <li key={i} className="flex gap-2 text-xs text-slate-700">
                <ChevronRight className="w-3 h-3 text-purple-400 mt-0.5 shrink-0" />{a}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Compensation */}
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          <p className="text-sm font-bold text-green-900">Ordered Compensation</p>
        </div>
        <p className="text-2xl font-black text-green-700 mb-1">$3,900</p>
        <p className="text-xs text-slate-600">{r.suggested_compensation}</p>
      </div>

      {/* Final recommendation */}
      <div className="bg-slate-900 rounded-2xl p-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-wide opacity-60 mb-2">Final Recommendation</p>
        <p className="text-sm leading-relaxed opacity-90">{r.final_recommendation}</p>
      </div>

      {/* Download CTA */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors">
          <Download className="w-4 h-4" />
          Download PDF Summary
        </button>
        <a
          href="/signup"
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-arbitrator-600 text-white text-sm font-semibold rounded-xl hover:bg-arbitrator-700 transition-colors shadow-lg shadow-arbitrator-200"
        >
          Resolve your own dispute
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

export function DemoWalkthrough() {
  const [step, setStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const goNext = () => {
    setStep(s => Math.min(s + 1, STEPS.length - 1))
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto">
      <StepIndicator currentStep={step} />

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100 p-6 sm:p-8 min-h-[500px]">
        {step === 0 && <SubmitStep onNext={goNext} />}
        {step === 1 && <NeutralizeStep onNext={goNext} />}
        {step === 2 && <DebateStep onNext={goNext} />}
        {step === 3 && <VerdictStep onNext={goNext} />}
        {step === 4 && <ResolutionStep />}
      </div>

      {step < STEPS.length - 1 && (
        <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Resolved in minutes
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            No lawyers needed
          </div>
          <div className="flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5" />
            Neutral AI verdict
          </div>
        </div>
      )}
    </div>
  )
}
