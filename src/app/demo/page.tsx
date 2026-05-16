import type { Metadata } from 'next'
import Link from 'next/link'
import { Scale, ArrowLeft, Zap, Shield, Globe } from 'lucide-react'
import { DemoWalkthrough } from '@/components/demo/DemoWalkthrough'

export const metadata: Metadata = {
  title: 'Live Demo — The Arbitrator',
  description: 'See the AI-powered adversarial dispute resolution engine in action. Watch two AI agents fight on each side, then issue a binding-grade verdict.',
}

const STATS = [
  { value: 'Minutes', label: 'to verdict', sub: 'vs. 6–18 months in court' },
  { value: '$19/mo', label: 'Pro plan', sub: 'vs. $15K–$300K arbitration' },
  { value: '4 / 5', label: 'majority rule', sub: 'Clear verdict or compromise' },
  { value: 'GPT-4o', label: 'powered', sub: '5-round adversarial debate' },
]

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-arbitrator-600 rounded-lg flex items-center justify-center">
              <Scale className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-slate-900 text-sm">The Arbitrator</span>
          </Link>
          <Link
            href="/signup"
            className="px-4 py-1.5 bg-arbitrator-600 text-white text-sm font-semibold rounded-lg hover:bg-arbitrator-700 transition-colors"
          >
            Get Early Access
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 pb-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-100 rounded-full text-xs font-semibold text-purple-700 mb-5">
            <Zap className="w-3 h-3" />
            Live Investor Demo — Real AI, Real Verdict
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
            Watch AI resolve a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-arbitrator-600 to-purple-600">
              $5,000 dispute
            </span>
            {' '}in minutes
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
            Two AI agents are assigned to each party. They research the facts, argue across 5 structured rounds,
            and a neutral judge issues a binding-grade verdict — no lawyers, no months of waiting.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white border border-slate-200 rounded-2xl px-4 py-4">
                <p className="text-xl font-black text-slate-900">{s.value}</p>
                <p className="text-xs font-semibold text-slate-600">{s.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Case context banner */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl px-6 py-4 text-left">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Demo Case</p>
            <p className="text-base font-bold text-slate-900 mb-1">Freelance Software Project Delivery and Payment Dispute</p>
            <p className="text-sm text-slate-500">
              Freelancer delivered a web app and was partially paid ($3,500 of $8,500). Client deployed it for 3 months, then refused the $5,000 balance claiming 3 features were missing. Freelancer seeks full payment; client seeks partial refund.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Walkthrough */}
      <section className="px-4 pb-16">
        <DemoWalkthrough />
      </section>

      {/* Trust section */}
      <section className="bg-white border-t border-slate-200 py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-3">Built for the $22B dispute resolution market</h2>
          <p className="text-slate-500 mb-10 max-w-xl mx-auto">
            Every year, hundreds of millions of disputes go unresolved because professional arbitration costs $15,000–$300,000. We solve this for $19/month.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-slate-50 rounded-2xl p-6">
              <Zap className="w-8 h-8 text-arbitrator-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-1">1000× Faster</h3>
              <p className="text-sm text-slate-500">Minutes to verdict vs. 6–18 months in traditional arbitration. No scheduling, no delays, no continuances.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6">
              <Shield className="w-8 h-8 text-arbitrator-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-1">Patent-Pending AI</h3>
              <p className="text-sm text-slate-500">The adversarial debate engine is a novel invention. Two AI advocates ensure even inarticulate parties get full representation.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6">
              <Globe className="w-8 h-8 text-arbitrator-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-1">Global Platform</h3>
              <p className="text-sm text-slate-500">Built with Hebrew RTL support. Targeting Israel first, then English-speaking markets and MENA — both completely underserved.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-slate-900 to-arbitrator-950 py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Scale className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Ready to discuss investment?
          </h2>
          <p className="text-slate-400 mb-8">
            We are raising a $1.5M seed round. Full business plan, technical deep dive, and patent strategy available.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:invest@thearbitrator.ai"
              className="px-7 py-3.5 bg-white text-slate-900 text-sm font-bold rounded-xl hover:bg-slate-100 transition-colors"
            >
              Contact for Investment Deck
            </a>
            <Link
              href="/signup"
              className="px-7 py-3.5 bg-arbitrator-500 text-white text-sm font-bold rounded-xl hover:bg-arbitrator-400 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
          <p className="text-xs text-slate-500 mt-6">
            The Arbitrator · AI-Powered Dispute Resolution · Seed Stage · 2024
          </p>
        </div>
      </section>
    </div>
  )
}
