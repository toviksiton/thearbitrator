'use client'

import posthog from 'posthog-js'

export function initAnalytics() {
  if (
    typeof window === 'undefined' ||
    !process.env.NEXT_PUBLIC_POSTHOG_KEY ||
    process.env.NODE_ENV !== 'production'
  ) {
    return
  }

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    capture_pageview: false, // handled manually for SPA
    persistence: 'localStorage',
    autocapture: true,
    session_recording: {
      maskAllInputs: true, // protect sensitive dispute content
    },
  })
}

export function identify(userId: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  posthog.identify(userId, properties)
}

export function track(event: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  posthog.capture(event, properties)
}

export function pageview(url: string) {
  if (typeof window === 'undefined') return
  posthog.capture('$pageview', { $current_url: url })
}

export function reset() {
  if (typeof window === 'undefined') return
  posthog.reset()
}

// Typed events
export const events = {
  DISPUTE_CREATED: 'dispute_created',
  DISPUTE_RESPONDED: 'dispute_responded',
  AI_MEDIATION_STARTED: 'ai_mediation_started',
  MEDIATION_ACCEPTED: 'mediation_accepted',
  MEDIATION_REJECTED: 'mediation_rejected',
  RESOLUTION_GENERATED: 'resolution_generated',
  PDF_DOWNLOADED: 'pdf_downloaded',
  UPGRADE_CLICKED: 'upgrade_clicked',
  CHECKOUT_STARTED: 'checkout_started',
  SUBSCRIPTION_ACTIVATED: 'subscription_activated',
  INVITE_SENT: 'invite_sent',
  EVIDENCE_UPLOADED: 'evidence_uploaded',
} as const
