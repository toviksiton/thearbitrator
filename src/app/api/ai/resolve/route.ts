import { createClient } from '@/lib/supabase/server'
import { generateResolution } from '@/lib/openai'
import { aiRatelimit, checkRateLimit } from '@/lib/ratelimit'
import { sendResolutionReadyEmail } from '@/lib/email'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { success } = await checkRateLimit(aiRatelimit, `ai:${user.id}`)
  if (!success) {
    return NextResponse.json(
      { error: 'Too many AI requests. Please wait a minute.' },
      { status: 429 }
    )
  }

  const { disputeId } = await request.json()

  const { data: dispute } = await supabase
    .from('disputes')
    .select('*')
    .eq('id', disputeId)
    .single()

  if (!dispute) {
    return NextResponse.json({ error: 'Dispute not found' }, { status: 404 })
  }

  if (!dispute.respondent_title) {
    return NextResponse.json({ error: 'Both parties must submit' }, { status: 400 })
  }

  try {
    const resolution = await generateResolution({
      neutral_title: dispute.neutral_title || dispute.initiator_title,
      category: dispute.category || 'other',
      initiator_description: dispute.initiator_description,
      initiator_desired_outcome: dispute.initiator_desired_outcome,
      initiator_compensation: dispute.initiator_compensation,
      respondent_description: dispute.respondent_description || '',
      respondent_desired_outcome: dispute.respondent_desired_outcome || '',
      respondent_compensation: dispute.respondent_compensation,
      mediation_response: dispute.mediation_response,
    })

    await supabase
      .from('disputes')
      .update({ status: 'resolved' })
      .eq('id', disputeId)

    await supabase.from('ai_outputs').insert({
      dispute_id: disputeId,
      type: 'resolution',
      content: JSON.stringify(resolution),
      metadata: { model: 'gpt-4o' },
    })

    // Notify both parties
    const { data: participants } = await supabase
      .from('participants')
      .select('user_id')
      .eq('dispute_id', disputeId)

    if (participants) {
      for (const p of participants) {
        const { data: userData } = await supabase.auth.admin.getUserById(p.user_id)
        if (userData.user?.email) {
          sendResolutionReadyEmail({
            to: userData.user.email,
            disputeTitle: dispute.neutral_title || dispute.initiator_title,
            disputeId,
          }).catch(console.error)
        }
      }
    }

    return NextResponse.json({ resolution })
  } catch (err) {
    console.error('Resolution error:', err)
    return NextResponse.json({ error: 'Resolution generation failed' }, { status: 500 })
  }
}
