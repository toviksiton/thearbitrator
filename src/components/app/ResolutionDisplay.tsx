'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Scale, Download, AlertCircle, CheckCircle, Info } from 'lucide-react'
import type { AIResolution } from '@/types'

interface ResolutionDisplayProps {
  resolution: AIResolution
  neutralTitle: string
  onDownloadPDF: () => void
  isDownloading: boolean
}

export function ResolutionDisplay({
  resolution,
  neutralTitle,
  onDownloadPDF,
  isDownloading,
}: ResolutionDisplayProps) {
  const confidenceColors = {
    high: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    low: 'bg-red-100 text-red-700 border-red-200',
  }

  return (
    <div className="space-y-4" id="resolution-content">
      {/* Header */}
      <div className="bg-gradient-to-br from-arbitrator-50 to-slate-50 border border-arbitrator-100 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-arbitrator-100 rounded-xl flex items-center justify-center">
              <Scale className="w-5 h-5 text-arbitrator-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-arbitrator-600 uppercase tracking-wide">
                AI Arbitration Resolution
              </p>
              <p className="text-sm font-semibold text-slate-900">{neutralTitle}</p>
            </div>
          </div>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
              confidenceColors[resolution.confidence_level]
            }`}
          >
            {resolution.confidence_level.charAt(0).toUpperCase() +
              resolution.confidence_level.slice(1)}{' '}
            Confidence
          </span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">{resolution.summary}</p>
      </div>

      {/* Key Arguments */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-blue-700 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center text-xs font-bold">A</span>
              Party A Arguments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {resolution.key_arguments.initiator.map((arg, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 shrink-0" />
                  {arg}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-purple-700 flex items-center gap-2">
              <span className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center text-xs font-bold">B</span>
              Party B Arguments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {resolution.key_arguments.respondent.map((arg, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 shrink-0" />
                  {arg}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Analysis sections */}
      {[
        {
          title: 'Responsibility Analysis',
          content: resolution.responsibility_analysis,
          icon: AlertCircle,
          color: 'text-amber-600 bg-amber-50 border-amber-100',
        },
        {
          title: 'Legal Considerations',
          content: resolution.legal_considerations,
          icon: Info,
          color: 'text-slate-600 bg-slate-50 border-slate-200',
        },
      ].map(({ title, content, icon: Icon, color }) => (
        <div key={title} className={`rounded-xl border p-4 ${color}`}>
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-4 h-4" />
            <p className="text-sm font-semibold">{title}</p>
          </div>
          <p className="text-sm leading-relaxed">{content}</p>
        </div>
      ))}

      {/* Compensation */}
      {resolution.suggested_compensation && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <p className="text-sm font-semibold text-emerald-800">Suggested Compensation</p>
          </div>
          <p className="text-sm text-emerald-700">{resolution.suggested_compensation}</p>
        </div>
      )}

      {/* Final recommendation */}
      <div className="bg-arbitrator-900 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Scale className="w-5 h-5 text-arbitrator-300" />
          <p className="text-sm font-semibold text-white">Final Recommendation</p>
        </div>
        <p className="text-sm text-arbitrator-200 leading-relaxed">
          {resolution.final_recommendation}
        </p>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-slate-400 text-center leading-relaxed px-4">
        This resolution is AI-generated and advisory in nature. It does not constitute legal advice. Both parties are encouraged to review this with a licensed attorney before taking action.
      </p>

      {/* Download */}
      <Button
        variant="outline"
        className="w-full"
        onClick={onDownloadPDF}
        disabled={isDownloading}
      >
        <Download className="w-4 h-4" />
        {isDownloading ? 'Generating PDF…' : 'Download PDF Summary'}
      </Button>
    </div>
  )
}
