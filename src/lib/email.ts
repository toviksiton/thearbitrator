import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM_EMAIL || 'disputes@thearbitrator.app'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://thearbitrator.app'

// ── Invite email ─────────────────────────────────────────────────────────────

export async function sendInviteEmail({
  to,
  disputeTitle,
  inviteToken,
  disputeId,
}: {
  to: string
  disputeTitle: string
  inviteToken: string
  disputeId: string
}) {
  const inviteUrl = `${APP_URL}/invite/${inviteToken}`

  return resend.emails.send({
    from: `The Arbitrator <${FROM}>`,
    to,
    subject: `You've been invited to respond to a dispute`,
    html: inviteEmailHtml({ disputeTitle, inviteUrl }),
  })
}

function inviteEmailHtml({
  disputeTitle,
  inviteUrl,
}: {
  disputeTitle: string
  inviteUrl: string
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

        <!-- Logo -->
        <tr><td style="padding-bottom:32px;text-align:center;">
          <div style="display:inline-flex;align-items:center;gap:10px;">
            <div style="width:36px;height:36px;background:#4f55ea;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:18px;">⚖</div>
            <span style="font-size:18px;font-weight:700;color:#1e293b;">The Arbitrator</span>
          </div>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:white;border-radius:16px;border:1px solid #e2e8f0;padding:40px;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
          <h1 style="font-size:22px;font-weight:700;color:#0f172a;margin:0 0 8px;">You've been invited to respond</h1>
          <p style="font-size:15px;color:#64748b;margin:0 0 24px;line-height:1.6;">
            The other party has opened a dispute case and is requesting your side of the story.
          </p>

          <!-- Case box -->
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;margin-bottom:28px;">
            <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#94a3b8;margin:0 0 4px;">Case</p>
            <p style="font-size:15px;font-weight:600;color:#1e293b;margin:0;">${disputeTitle}</p>
          </div>

          <!-- Points -->
          <ul style="margin:0 0 28px;padding:0;list-style:none;">
            ${[
              'Your response is completely private until both sides submit',
              'AI ensures both perspectives are heard fairly and objectively',
              'A neutral resolution is generated based on the facts presented',
            ]
              .map(
                (p) =>
                  `<li style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px;font-size:14px;color:#475569;">
                <span style="color:#4f55ea;font-size:16px;line-height:1.4;">✓</span>
                ${p}
              </li>`
              )
              .join('')}
          </ul>

          <!-- CTA -->
          <a href="${inviteUrl}" style="display:block;text-align:center;background:#4f55ea;color:white;font-size:15px;font-weight:600;padding:14px 24px;border-radius:12px;text-decoration:none;margin-bottom:16px;">
            View & Respond to Dispute
          </a>
          <p style="font-size:12px;color:#94a3b8;text-align:center;margin:0;">
            Or copy this link: <a href="${inviteUrl}" style="color:#4f55ea;">${inviteUrl}</a>
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding-top:24px;text-align:center;">
          <p style="font-size:12px;color:#94a3b8;margin:0;line-height:1.6;">
            This is a private dispute resolution platform.<br/>
            Your information is kept strictly confidential.<br/>
            <a href="${APP_URL}" style="color:#94a3b8;">thearbitrator.app</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ── Resolution ready email ────────────────────────────────────────────────────

export async function sendResolutionReadyEmail({
  to,
  disputeTitle,
  disputeId,
}: {
  to: string
  disputeTitle: string
  disputeId: string
}) {
  const caseUrl = `${APP_URL}/disputes/${disputeId}`

  return resend.emails.send({
    from: `The Arbitrator <${FROM}>`,
    to,
    subject: `Resolution ready: ${disputeTitle}`,
    html: resolutionEmailHtml({ disputeTitle, caseUrl }),
  })
}

function resolutionEmailHtml({
  disputeTitle,
  caseUrl,
}: {
  disputeTitle: string
  caseUrl: string
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
        <tr><td style="padding-bottom:32px;text-align:center;">
          <div style="display:inline-flex;align-items:center;gap:10px;">
            <div style="width:36px;height:36px;background:#4f55ea;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:18px;">⚖</div>
            <span style="font-size:18px;font-weight:700;color:#1e293b;">The Arbitrator</span>
          </div>
        </td></tr>

        <tr><td style="background:white;border-radius:16px;border:1px solid #e2e8f0;padding:40px;">
          <div style="width:48px;height:48px;background:#ecfdf5;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;font-size:24px;">✅</div>
          <h1 style="font-size:22px;font-weight:700;color:#0f172a;margin:0 0 8px;">Your resolution is ready</h1>
          <p style="font-size:15px;color:#64748b;margin:0 0 24px;line-height:1.6;">
            The AI has completed its analysis and generated a fair, objective resolution for your case.
          </p>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;margin-bottom:28px;">
            <p style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#94a3b8;margin:0 0 4px;">Case</p>
            <p style="font-size:15px;font-weight:600;color:#1e293b;margin:0;">${disputeTitle}</p>
          </div>

          <a href="${caseUrl}" style="display:block;text-align:center;background:#4f55ea;color:white;font-size:15px;font-weight:600;padding:14px 24px;border-radius:12px;text-decoration:none;">
            View Resolution & Download PDF
          </a>
        </td></tr>

        <tr><td style="padding-top:24px;text-align:center;">
          <p style="font-size:12px;color:#94a3b8;margin:0;">
            <a href="${APP_URL}" style="color:#94a3b8;">thearbitrator.app</a> — AI-powered dispute resolution
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ── Mediation proposal email ──────────────────────────────────────────────────

export async function sendMediationProposalEmail({
  to,
  disputeTitle,
  disputeId,
  proposalType,
}: {
  to: string
  disputeTitle: string
  disputeId: string
  proposalType: string
}) {
  const caseUrl = `${APP_URL}/disputes/${disputeId}`

  return resend.emails.send({
    from: `The Arbitrator <${FROM}>`,
    to,
    subject: `Mediation proposal ready — ${disputeTitle}`,
    html: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:40px 16px;background:#f8fafc;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:520px;margin:0 auto;background:white;border-radius:16px;border:1px solid #e2e8f0;padding:40px;">
    <h1 style="font-size:20px;font-weight:700;color:#0f172a;margin:0 0 12px;">A mediation proposal has been generated</h1>
    <p style="color:#64748b;font-size:14px;margin:0 0 20px;line-height:1.6;">
      The AI has proposed a <strong>${proposalType}</strong> to resolve your dispute: <strong>${disputeTitle}</strong>
    </p>
    <a href="${caseUrl}" style="display:block;text-align:center;background:#4f55ea;color:white;font-size:14px;font-weight:600;padding:12px 20px;border-radius:10px;text-decoration:none;">
      Review Mediation Proposal
    </a>
  </div>
</body></html>`,
  })
}
