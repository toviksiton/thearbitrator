import { createServiceClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { dispute_id, respondent_email, invite_token } = body

  if (!dispute_id || !respondent_email || !invite_token) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const inviteUrl = `${appUrl}/invite/${invite_token}`

  // Using Supabase's built-in email for now
  // In production, integrate with Resend or SendGrid
  const supabase = createServiceClient()

  const { error } = await supabase.auth.admin.inviteUserByEmail(respondent_email, {
    data: {
      dispute_id,
      invite_token,
      role: 'respondent',
    },
    redirectTo: `${appUrl}/auth/callback?next=/disputes/${dispute_id}/respond`,
  })

  if (error) {
    // Fallback: the invite link is stored in DB, user can share manually
    console.warn('Email invite failed, storing token:', error.message)
  }

  // Store the invite URL in the dispute for manual sharing
  await supabase
    .from('disputes')
    .update({ invite_token })
    .eq('id', dispute_id)

  return NextResponse.json({
    success: true,
    invite_url: inviteUrl,
    message: 'Invitation processed',
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
