import { createClient } from '@/lib/supabase/server'
import { runAdversarialDebate, generateResolution } from '@/lib/openai'
import { aiRatelimit, checkRateLimit } from '@/lib/ratelimit'
import { sendResolutionReadyEmail } from '@/lib/email'
import { NextResponse } from 'next/server'

export const maxDuration = 120

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

  if (!dispute.respondent_title || !dispute.respondent_description) {
    return NextResponse.json({ error: 'Both parties must submit before debate' }, { status: 400 })
  }

  // Check user is a participant
  const { data: participant } = await supabase
    .from('participants')
    .select('role')
    .eq('dispute_id', disputeId)
    .eq('user_id', user.id)
    .single()

  const isInitiator = dispute.created_by === user.id
  if (!isInitiator && !participant) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  // Mark as processing
  await supabase
    .from('disputes')
    .update({ status: 'ai_processing' })
    .eq('id', disputeId)

  try {
    const disputeContext = {
      neutral_title: dispute.neutral_title || dispute.initiator_title,
      category: dispute.category || 'other',
      initiator_description: dispute.initiator_description,
      initiator_desired_outcome: dispute.initiator_desired_outcome,
      initiator_compensation: dispute.initiator_compensation,
      respondent_description: dispute.respondent_description,
      respondent_desired_outcome: dispute.respondent_desired_outcome || '',
      respondent_compensation: dispute.respondent_compensation,
      mediation_response: dispute.mediation_response,
    }

    // Run the full 5-round adversarial debate
    const debateResult = await runAdversarialDebate(disputeContext)

    // Save debate output
    await supabase.from('ai_outputs').insert({
      dispute_id: disputeId,
      type: 'debate',
      content: JSON.stringify(debateResult),
      metadata: {
        model: 'gpt-4o',
        score_a: debateResult.score_a,
        score_b: debateResult.score_b,
        verdict: debateResult.verdict,
      },
    })

    // Generate final resolution informed by debate outcome
    const resolutionContext = {
      ...disputeContext,
      // Inject debate guidance into mediation context field
      mediation_response: dispute.mediation_response,
    }

    // Build a debate-enhanced resolution prompt override via a modified call
    const resolution = await generateResolution({
      ...resolutionContext,
      // Pass debate verdict as context through a note in mediation_response
      mediation_response: `${dispute.mediation_response ? `Mediation ${dispute.mediation_response}. ` : ''}DEBATE VERDICT: ${debateResult.verdict.replace('_', ' ')} (A won ${debateResult.score_a}/5 rounds, B won ${debateResult.score_b}/5). ${debateResult.verdict_reasoning} Guidance: ${debateResult.resolution_guidance}`,
    })

    // Save resolution
    await supabase.from('ai_outputs').insert({
      dispute_id: disputeId,
      type: 'resolution',
      content: JSON.stringify(resolution),
      metadata: {
        model: 'gpt-4o',
        informed_by_debate: true,
        debate_verdict: debateResult.verdict,
        score_a: debateResult.score_a,
        score_b: debateResult.score_b,
      },
    })

    // Mark dispute as resolved
    await supabase
      .from('disputes')
      .update({ status: 'resolved' })
      .eq('id', disputeId)

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

    return NextResponse.json({ debateResult, resolution })
  } catch (err) {
    console.error('Debate engine error:', err)

    // Revert status on error
    await supabase
      .from('disputes')
      .update({ status: 'in_progress' })
      .eq('id', disputeId)

    return NextResponse.json({ error: 'Debate engine failed' }, { status: 500 })
  }
}
