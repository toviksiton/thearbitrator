'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Scale, Shield, FileText, AlertTriangle } from 'lucide-react'

interface AgreementModalProps {
  open: boolean
  onAgree: () => void
}

const agreementPoints = [
  {
    icon: FileText,
    title: 'Truthful Submission',
    description:
      'I confirm that all information I submit is truthful and accurate to the best of my knowledge. I will not submit fabricated evidence.',
  },
  {
    icon: Scale,
    title: 'AI-Assisted Resolution',
    description:
      'I understand that this platform uses AI to assist with mediation and resolution. The AI resolution is advisory, not legally binding by default.',
  },
  {
    icon: Shield,
    title: 'Private Arbitration Process',
    description:
      'I agree to engage in good faith in this private dispute resolution process and to respect the process\'s structure and timeline.',
  },
  {
    icon: AlertTriangle,
    title: 'Advisory Nature',
    description:
      'I acknowledge that The Arbitrator is not a court, not a law firm, and does not provide legal advice. For legal matters, I should consult a licensed attorney.',
  },
]

export function AgreementModal({ open, onAgree }: AgreementModalProps) {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(agreementPoints.length).fill(false)
  )

  const allChecked = checked.every(Boolean)

  const handleCheck = (index: number) => {
    const next = [...checked]
    next[index] = !next[index]
    setChecked(next)
  }

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="w-12 h-12 bg-arbitrator-50 rounded-xl flex items-center justify-center mb-3">
            <Scale className="w-6 h-6 text-arbitrator-600" />
          </div>
          <DialogTitle className="text-xl">Arbitration Agreement</DialogTitle>
          <DialogDescription>
            Before opening a case, please read and agree to the following terms.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          {agreementPoints.map((point, index) => (
            <label
              key={index}
              className={`flex gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                checked[index]
                  ? 'border-arbitrator-200 bg-arbitrator-50/50'
                  : 'border-slate-200 bg-slate-50 hover:bg-white'
              }`}
              onClick={() => handleCheck(index)}
            >
              <Checkbox
                checked={checked[index]}
                onCheckedChange={() => handleCheck(index)}
                className="mt-0.5 shrink-0"
              />
              <div>
                <div className="text-sm font-medium text-slate-900 mb-1">
                  {point.title}
                </div>
                <div className="text-xs text-slate-500 leading-relaxed">
                  {point.description}
                </div>
              </div>
            </label>
          ))}
        </div>

        <DialogFooter>
          <Button
            variant="primary"
            className="w-full"
            disabled={!allChecked}
            onClick={onAgree}
          >
            I Agree — Continue to Case
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
