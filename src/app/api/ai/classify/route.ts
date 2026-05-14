import { createClient } from '@/lib/supabase/server'
import { classifyDispute } from '@/lib/openai'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { disputeId } = await request.json()

  const { data: dispute } = await supabase
    .from('disputes')
    .select('neutral_title, initiator_title, initiator_description, respondent_description')
    .eq('id', disputeId)
    .single()

  if (!dispute) {
    return NextResponse.json({ error: 'Dispute not found' }, { status: 404 })
  }

  try {
    const title = dispute.neutral_title || dispute.initiator_title
    const description = `${dispute.initiator_description} ${dispute.respondent_description || ''}`

    const result = await classifyDispute(title, description)

    // Update category
    await supabase
      .from('disputes')
      .update({ category: result.category })
      .eq('id', disputeId)

    // Save AI output
    await supabase.from('ai_outputs').insert({
      dispute_id: disputeId,
      type: 'classification',
      content: JSON.stringify(result),
      metadata: { model: 'gpt-4o' },
    })

    return NextResponse.json({ result })
  } catch (err) {
    console.error('Classification error:', err)
    return NextResponse.json(
      { error: 'Classification failed' },
      { status: 500 }
    )
  }
}
