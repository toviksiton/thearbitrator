import { createClient } from '@/lib/supabase/server'
import { generateMediationProposal } from '@/lib/openai'
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
    .select('*')
    .eq('id', disputeId)
    .single()

  if (!dispute) {
    return NextResponse.json({ error: 'Dispute not found' }, { status: 404 })
  }

  if (!dispute.respondent_title) {
    return NextResponse.json(
      { error: 'Both parties must submit' },
      { status: 400 }
    )
  }

  try {
    const proposal = await generateMediationProposal({
      neutral_title: dispute.neutral_title || dispute.initiator_title,
      category: dispute.category || 'other',
      initiator_description: dispute.initiator_description,
      initiator_desired_outcome: dispute.initiator_desired_outcome,
      initiator_compensation: dispute.initiator_compensation,
      respondent_description: dispute.respondent_description || '',
      respondent_desired_outcome: dispute.respondent_desired_outcome || '',
      respondent_compensation: dispute.respondent_compensation,
    })

    // Update dispute status to mediation
    await supabase
      .from('disputes')
      .update({ status: 'mediation' })
      .eq('id', disputeId)

    // Save AI output
    await supabase.from('ai_outputs').insert({
      dispute_id: disputeId,
      type: 'mediation_proposal',
      content: JSON.stringify(proposal),
      metadata: { model: 'gpt-4o' },
    })

    return NextResponse.json({ proposal })
  } catch (err) {
    console.error('Mediation error:', err)
    return NextResponse.json(
      { error: 'Mediation proposal generation failed' },
      { status: 500 }
    )
  }
}
