import { createServiceClient } from '@/lib/supabase/server'
import { sendInviteEmail } from '@/lib/email'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { dispute_id, respondent_email, invite_token } = body

  if (!dispute_id || !respondent_email || !invite_token) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = createServiceClient()

  // Get dispute title for the email
  const { data: dispute } = await supabase
    .from('disputes')
    .select('neutral_title, initiator_title')
    .eq('id', dispute_id)
    .single()

  const disputeTitle =
    dispute?.neutral_title || dispute?.initiator_title || 'Dispute case'

  // Store token
  await supabase
    .from('disputes')
    .update({ invite_token })
    .eq('id', dispute_id)

  // Send branded email via Resend
  try {
    await sendInviteEmail({
      to: respondent_email,
      disputeTitle,
      inviteToken: invite_token,
      disputeId: dispute_id,
    })
  } catch (emailErr) {
    // Log but don't fail — invite URL still works
    console.error('Invite email failed:', emailErr)
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  return NextResponse.json({
    success: true,
    invite_url: `${appUrl}/invite/${invite_token}`,
    message: 'Invitation sent',
  })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Token required' }, { status: 400 })
  }

  const supabase = createServiceClient()

  const { data: dispute } = await supabase
    .from('disputes')
    .select('id, neutral_title, initiator_title, status')
    .eq('invite_token', token)
    .single()

  if (!dispute) {
    return NextResponse.json({ error: 'Invalid or expired invite' }, { status: 404 })
  }

  return NextResponse.json({ dispute })
}
