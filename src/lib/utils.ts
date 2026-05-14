import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow } from 'date-fns'
import type { DisputeStatus, DisputeCategory } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'MMM d, yyyy')
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getStatusLabel(status: DisputeStatus): string {
  const labels: Record<DisputeStatus, string> = {
    pending_response: 'Awaiting Response',
    in_progress: 'In Progress',
    ai_processing: 'AI Processing',
    mediation: 'Mediation',
    resolved: 'Resolved',
    closed: 'Closed',
  }
  return labels[status] ?? status
}

export function getStatusColor(status: DisputeStatus): string {
  const colors: Record<DisputeStatus, string> = {
    pending_response: 'bg-amber-100 text-amber-800 border-amber-200',
    in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
    ai_processing: 'bg-purple-100 text-purple-800 border-purple-200',
    mediation: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    resolved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    closed: 'bg-slate-100 text-slate-600 border-slate-200',
  }
  return colors[status] ?? 'bg-slate-100 text-slate-600 border-slate-200'
}

export function getCategoryLabel(category: DisputeCategory): string {
  const labels: Record<DisputeCategory, string> = {
    neighbor: 'Neighbor Dispute',
    workplace: 'Workplace Dispute',
    consumer: 'Consumer Issue',
    financial: 'Financial Dispute',
    property: 'Property Dispute',
    contract: 'Contract Dispute',
    family: 'Family Matter',
    other: 'General Dispute',
  }
  return labels[category] ?? category
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '…'
}

export function generateInviteToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export function getDisputeStage(status: DisputeStatus): number {
  const stages: Record<DisputeStatus, number> = {
    pending_response: 1,
    in_progress: 2,
    ai_processing: 3,
    mediation: 4,
    resolved: 5,
    closed: 5,
  }
  return stages[status] ?? 1
}

export function fileSizeLabel(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
