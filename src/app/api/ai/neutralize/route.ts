import { createClient } from '@/lib/supabase/server'
import { neutralizeDispute } from '@/lib/openai'
import { aiRatelimit, checkRateLimit } from '@/lib/ratelimit'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Rate limiting
  const { success, remaining } = await checkRateLimit(aiRatelimit, `ai:${user.id}`)
  if (!success) {
    return NextResponse.json(
      { error: 'Too many AI requests. Please wait a minute before retrying.' },
      { status: 429, headers: { 'X-RateLimit-Remaining': String(remaining) } }
    )
  }

  const { disputeId } = await request.json()

  if (!disputeId) {
    return NextResponse.json({ error: 'disputeId required' }, { status: 400 })
  }

  const { data: dispute, error: fetchError } = await supabase
    .from('disputes')
    .select('*')
    .eq('id', disputeId)
    .single()

  if (fetchError || !dispute) {
    return NextResponse.json({ error: 'Dispute not found' }, { status: 404 })
  }

  if (!dispute.respondent_title) {
    return NextResponse.json(
      { error: 'Both parties must submit before AI processing' },
      { status: 400 }
    )
  }

  try {
    const result = await neutralizeDispute(
      dispute.initiator_title,
      dispute.respondent_title,
      dispute.initiator_description,
      dispute.respondent_description || ''
    )

    await supabase
      .from('disputes')
      .update({ neutral_title: result.neutral_title, status: 'ai_processing' })
      .eq('id', disputeId)

    await supabase.from('ai_outputs').insert({
      dispute_id: disputeId,
      type: 'neutral_title',
      content: JSON.stringify(result),
      metadata: { model: 'gpt-4o' },
    })

    return NextResponse.json({ result })
  } catch (err) {
    console.error('Neutralization error:', err)
    return NextResponse.json({ error: 'AI neutralization failed' }, { status: 500 })
  }
}
