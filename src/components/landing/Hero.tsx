'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, Clock, Scale } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-arbitrator-50/30" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

      {/* Decorative blobs */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-arbitrator-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-slate-200 rounded-full blur-3xl opacity-30" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-arbitrator-50 border border-arbitrator-100 rounded-full text-arbitrator-700 text-sm font-medium mb-8 animate-fade-in">
            <Shield className="w-4 h-4" />
            AI-Powered · Private · Neutral
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6 animate-fade-in text-balance">
            Resolve disputes{' '}
            <span className="gradient-text">fairly</span>
            <br />
            with AI.
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in text-balance">
            A private, structured platform where both sides present their case.
            Our AI mediates calmly, neutralizes emotional language, and delivers
            a fair resolution — without lawyers, without courts.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in">
            <Button size="xl" variant="primary" asChild className="w-full sm:w-auto">
              <Link href="/signup">
                Start a Case
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/#how-it-works">See How It Works</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in">
            {[
              { icon: Scale, value: 'Neutral', label: 'AI judgment' },
              { icon: Clock, value: '< 24h', label: 'Average resolution' },
              { icon: Shield, value: '100%', label: 'Private & secure' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="w-10 h-10 bg-arbitrator-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-arbitrator-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview card */}
        <div className="mt-20 max-w-3xl mx-auto animate-slide-up">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-300" />
                <div className="w-3 h-3 rounded-full bg-amber-300" />
                <div className="w-3 h-3 rounded-full bg-green-300" />
              </div>
              <div className="flex-1 bg-white rounded-lg px-3 py-1 text-xs text-slate-400 border border-slate-200">
                thearbitrator.app/disputes/case-2024-001
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-arbitrator-100 rounded-lg flex items-center justify-center">
                  <Scale className="w-4 h-4 text-arbitrator-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Payment dispute — Freelance project</div>
                  <div className="text-xs text-slate-500">AI Neutral Title Generated</div>
                </div>
                <div className="ml-auto px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                  Resolved
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800">
                <div className="font-medium mb-1">AI Resolution</div>
                <div className="text-emerald-700 leading-relaxed">
                  Based on the project timeline and deliverables presented by both parties,
                  a partial payment of 70% is recommended, with the remaining balance
                  contingent on agreed milestone completion.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
