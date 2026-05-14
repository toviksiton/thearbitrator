import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('disputes')
    .select('*')
    .eq('created_by', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ disputes: data })
}

export async function POST(request: Request) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const {
    title,
    description,
    desired_outcome,
    compensation,
    respondent_email,
  } = body

  if (!title || !description || !desired_outcome || !respondent_email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { data: dispute, error } = await supabase
    .from('disputes')
    .insert({
      initiator_title: title,
      initiator_description: description,
      initiator_desired_outcome: desired_outcome,
      initiator_compensation: compensation || null,
      respondent_email,
      created_by: user.id,
      status: 'pending_response',
      invite_token: crypto.randomUUID(),
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Add initiator as participant
  await supabase.from('participants').insert({
    dispute_id: dispute.id,
    user_id: user.id,
    role: 'initiator',
    agreed_to_terms: true,
  })

  return NextResponse.json({ dispute }, { status: 201 })
}
