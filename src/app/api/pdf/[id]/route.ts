import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { formatDate, getStatusLabel, getCategoryLabel } from '@/lib/utils'
import type { DisputeStatus, DisputeCategory, AIResolution, AIMediationProposal } from '@/types'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: dispute } = await supabase
    .from('disputes')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!dispute) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Verify access
  const { data: participant } = await supabase
    .from('participants')
    .select('role')
    .eq('dispute_id', params.id)
    .eq('user_id', user.id)
    .single()

  if (dispute.created_by !== user.id && !participant) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { data: aiOutputs } = await supabase
    .from('ai_outputs')
    .select('*')
    .eq('dispute_id', params.id)

  const resolutionOutput = aiOutputs?.find((o) => o.type === 'resolution')
  const mediationOutput = aiOutputs?.find((o) => o.type === 'mediation_proposal')

  const resolution: AIResolution | null = resolutionOutput
    ? JSON.parse(resolutionOutput.content)
    : null

  const mediationProposal: AIMediationProposal | null = mediationOutput
    ? JSON.parse(mediationOutput.content)
    : null

  // Generate HTML for PDF
  const html = generatePDFHtml({
    dispute,
    resolution,
    mediationProposal,
  })

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  })
}

function generatePDFHtml({
  dispute,
  resolution,
  mediationProposal,
}: {
  dispute: Record<string, unknown>
  resolution: AIResolution | null
  mediationProposal: AIMediationProposal | null
}) {
  const caseId = (dispute.id as string).slice(0, 8).toUpperCase()
  const status = getStatusLabel(dispute.status as DisputeStatus)
  const category = dispute.category
    ? getCategoryLabel(dispute.category as DisputeCategory)
    : 'General Dispute'
  const filedDate = formatDate(dispute.created_at as string)
  const title = (dispute.neutral_title as string) || (dispute.initiator_title as string)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Case Summary — ${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      color: #1e293b;
      line-height: 1.6;
      background: white;
      padding: 48px 64px;
      font-size: 13px;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 24px;
      border-bottom: 2px solid #e2e8f0;
      margin-bottom: 32px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .logo-icon {
      width: 36px;
      height: 36px;
      background: #4f55ea;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 800;
      font-size: 16px;
    }

    .logo-text {
      font-weight: 700;
      font-size: 16px;
      color: #1e293b;
    }

    .meta {
      text-align: right;
      color: #64748b;
      font-size: 11px;
      line-height: 1.7;
    }

    h1 {
      font-size: 22px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 8px;
      line-height: 1.3;
    }

    .subtitle {
      color: #64748b;
      font-size: 12px;
      margin-bottom: 32px;
    }

    .badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      background: #f1f5f9;
      color: #475569;
      margin-right: 8px;
    }

    .section {
      margin-bottom: 28px;
    }

    .section-title {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #94a3b8;
      margin-bottom: 12px;
      padding-bottom: 6px;
      border-bottom: 1px solid #f1f5f9;
    }

    .party-block {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 18px;
      margin-bottom: 16px;
    }

    .party-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      margin-bottom: 6px;
    }

    .party-title {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 10px;
    }

    .party-text {
      font-size: 12px;
      color: #475569;
      line-height: 1.7;
    }

    .resolution-box {
      background: #f0f4ff;
      border: 1px solid #c7d7fe;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 16px;
    }

    .resolution-title {
      font-size: 12px;
      font-weight: 700;
      color: #4244cf;
      margin-bottom: 10px;
    }

    .resolution-text {
      font-size: 12px;
      color: #3638a7;
      line-height: 1.7;
    }

    .final-rec {
      background: #1e293b;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 16px;
    }

    .final-rec-title {
      font-size: 11px;
      font-weight: 700;
      color: #94a3b8;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .final-rec-text {
      font-size: 13px;
      color: white;
      line-height: 1.7;
    }

    .args-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }

    .arg-block {
      background: #f8fafc;
      border-radius: 10px;
      padding: 14px;
      border: 1px solid #e2e8f0;
    }

    .arg-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      color: #94a3b8;
      margin-bottom: 8px;
    }

    .arg-item {
      font-size: 11px;
      color: #475569;
      margin-bottom: 5px;
      padding-left: 12px;
      position: relative;
    }

    .arg-item::before {
      content: '•';
      position: absolute;
      left: 0;
      color: #94a3b8;
    }

    .disclaimer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      font-size: 10px;
      color: #94a3b8;
      line-height: 1.6;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      font-size: 10px;
      color: #cbd5e1;
    }

    @media print {
      body { padding: 32px 48px; }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <div class="header">
    <div class="logo">
      <div class="logo-icon">⚖</div>
      <div class="logo-text">The Arbitrator</div>
    </div>
    <div class="meta">
      Case Reference: ${caseId}<br/>
      Date Issued: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}<br/>
      Status: ${status}
    </div>
  </div>

  <!-- Title -->
  <h1>${title}</h1>
  <div class="subtitle">
    <span class="badge">${category}</span>
    <span class="badge">Filed ${filedDate}</span>
    <span class="badge">${status}</span>
  </div>

  <!-- Parties -->
  <div class="section">
    <div class="section-title">Party Submissions</div>

    <div class="party-block">
      <div class="party-label">Party A — Initiator</div>
      <div class="party-title">${dispute.initiator_title as string}</div>
      <div class="party-text">${dispute.initiator_description as string}</div>
      <div style="margin-top: 10px; font-size: 11px; color: #64748b;">
        <strong>Desired Outcome:</strong> ${dispute.initiator_desired_outcome as string}
        ${dispute.initiator_compensation ? `<br/><strong>Compensation Sought:</strong> $${(dispute.initiator_compensation as number).toLocaleString()}` : ''}
      </div>
    </div>

    ${
      dispute.respondent_title
        ? `<div class="party-block">
      <div class="party-label">Party B — Respondent</div>
      <div class="party-title">${dispute.respondent_title as string}</div>
      <div class="party-text">${dispute.respondent_description as string}</div>
      <div style="margin-top: 10px; font-size: 11px; color: #64748b;">
        <strong>Desired Outcome:</strong> ${dispute.respondent_desired_outcome as string}
        ${dispute.respondent_compensation ? `<br/><strong>Compensation Sought:</strong> $${(dispute.respondent_compensation as number).toLocaleString()}` : ''}
      </div>
    </div>`
        : '<div class="party-block"><div class="party-text" style="color: #94a3b8;">Respondent has not submitted their response.</div></div>'
    }
  </div>

  ${
    mediationProposal
      ? `<div class="section">
    <div class="section-title">Mediation Attempt</div>
    <div class="party-block">
      <div class="party-label">${mediationProposal.proposal_type}</div>
      <div class="party-text">${mediationProposal.description}</div>
      <div style="margin-top: 10px;">
        ${mediationProposal.terms.map((t) => `<div class="arg-item">${t}</div>`).join('')}
      </div>
      <div style="margin-top: 10px; font-size: 11px; color: #64748b; font-style: italic;">
        Mediation outcome: ${dispute.mediation_response || 'Pending'}
      </div>
    </div>
  </div>`
      : ''
  }

  ${
    resolution
      ? `<div class="section">
    <div class="section-title">AI Arbitration Resolution</div>

    <div class="resolution-box">
      <div class="resolution-title">Case Summary</div>
      <div class="resolution-text">${resolution.summary}</div>
    </div>

    <div class="args-grid">
      <div class="arg-block">
        <div class="arg-label">Party A Key Arguments</div>
        ${resolution.key_arguments.initiator.map((a) => `<div class="arg-item">${a}</div>`).join('')}
      </div>
      <div class="arg-block">
        <div class="arg-label">Party B Key Arguments</div>
        ${resolution.key_arguments.respondent.map((a) => `<div class="arg-item">${a}</div>`).join('')}
      </div>
    </div>

    <div class="resolution-box">
      <div class="resolution-title">Responsibility Analysis</div>
      <div class="resolution-text">${resolution.responsibility_analysis}</div>
    </div>

    <div class="resolution-box" style="background: #f8fafc; border-color: #e2e8f0;">
      <div class="resolution-title" style="color: #475569;">Legal Considerations</div>
      <div class="resolution-text" style="color: #64748b;">${resolution.legal_considerations}</div>
    </div>

    ${
      resolution.suggested_compensation
        ? `<div class="resolution-box" style="background: #f0fdf4; border-color: #bbf7d0;">
      <div class="resolution-title" style="color: #16a34a;">Suggested Compensation</div>
      <div class="resolution-text" style="color: #166534;">${resolution.suggested_compensation}</div>
    </div>`
        : ''
    }

    <div class="final-rec">
      <div class="final-rec-title">Final Recommendation</div>
      <div class="final-rec-text">${resolution.final_recommendation}</div>
    </div>
  </div>`
      : ''
  }

  <!-- Disclaimer -->
  <div class="disclaimer">
    <strong>Important Disclaimer:</strong> This document is generated by The Arbitrator, an AI-powered dispute resolution platform. The resolution contained herein is advisory in nature and does not constitute legal advice, a court order, or a legally binding judgment. Parties are encouraged to seek independent legal counsel before taking action based on this resolution. The Arbitrator platform is not a law firm and does not establish an attorney-client relationship.
    <div class="footer">
      <span>Generated by The Arbitrator — thearbitrator.app</span>
      <span>Case #${caseId} — Confidential</span>
    </div>
  </div>

</body>
</html>`
}
