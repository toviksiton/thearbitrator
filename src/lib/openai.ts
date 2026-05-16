import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function neutralizeDispute(
  initiatorTitle: string,
  respondentTitle: string,
  initiatorDescription: string,
  respondentDescription: string
): Promise<{ neutral_title: string; objective_summary: string }> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are a neutral mediator assistant. Your role is to de-escalate disputes by removing emotional, accusatory, or biased language.

        You MUST respond with valid JSON only, no markdown, no explanation.

        Generate a neutral dispute title and an objective summary that:
        - Uses neutral, factual language
        - Acknowledges both parties fairly
        - Removes emotional or accusatory framing
        - Is concise and professional

        Response format:
        {
          "neutral_title": "Brief neutral title (max 10 words)",
          "objective_summary": "2-3 sentence objective summary of the dispute"
        }`,
      },
      {
        role: 'user',
        content: `Party A's title: "${initiatorTitle}"
Party A's description: "${initiatorDescription}"

Party B's title: "${respondentTitle}"
Party B's description: "${respondentDescription}"

Generate a neutral title and objective summary.`,
      },
    ],
    temperature: 0.3,
    max_tokens: 500,
    response_format: { type: 'json_object' },
  })

  const content = response.choices[0].message.content
  if (!content) throw new Error('No response from AI')

  return JSON.parse(content)
}

export async function classifyDispute(
  title: string,
  description: string
): Promise<{ category: string; confidence: number; reasoning: string }> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are a legal classification assistant. Classify disputes into categories.

        Categories: neighbor, workplace, consumer, financial, property, contract, family, other

        You MUST respond with valid JSON only.

        Response format:
        {
          "category": "one of the categories above",
          "confidence": 0.0-1.0,
          "reasoning": "Brief explanation of classification"
        }`,
      },
      {
        role: 'user',
        content: `Dispute title: "${title}"
Description: "${description}"

Classify this dispute.`,
      },
    ],
    temperature: 0.2,
    max_tokens: 300,
    response_format: { type: 'json_object' },
  })

  const content = response.choices[0].message.content
  if (!content) throw new Error('No response from AI')

  return JSON.parse(content)
}

export async function generateMediationProposal(dispute: {
  neutral_title: string
  category: string
  initiator_description: string
  initiator_desired_outcome: string
  initiator_compensation: number | null
  respondent_description: string
  respondent_desired_outcome: string
  respondent_compensation: number | null
}): Promise<{
  proposal_type: string
  description: string
  terms: string[]
  rationale: string
}> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are a professional mediator. Your goal is to propose fair compromise solutions before formal arbitration.

        Propose a mediation solution that:
        - Addresses both parties' core concerns
        - Is realistic and actionable
        - Minimizes further conflict
        - Is presented in a neutral, professional tone

        You MUST respond with valid JSON only.

        Response format:
        {
          "proposal_type": "e.g. Partial Refund, Shared Responsibility, Future Agreement",
          "description": "Clear description of the proposed solution (2-3 sentences)",
          "terms": ["Term 1", "Term 2", "Term 3"],
          "rationale": "Why this solution is fair to both parties (1-2 sentences)"
        }`,
      },
      {
        role: 'user',
        content: `Case: ${dispute.neutral_title}
Category: ${dispute.category}

Party A's position: ${dispute.initiator_description}
Party A's desired outcome: ${dispute.initiator_desired_outcome}
Party A's requested compensation: ${dispute.initiator_compensation ? `$${dispute.initiator_compensation}` : 'Not specified'}

Party B's position: ${dispute.respondent_description}
Party B's desired outcome: ${dispute.respondent_desired_outcome}
Party B's requested compensation: ${dispute.respondent_compensation ? `$${dispute.respondent_compensation}` : 'Not specified'}

Propose a fair mediation solution.`,
      },
    ],
    temperature: 0.4,
    max_tokens: 800,
    response_format: { type: 'json_object' },
  })

  const content = response.choices[0].message.content
  if (!content) throw new Error('No response from AI')

  return JSON.parse(content)
}

const DEBATE_ROUND_TOPICS = [
  { round: 1, topic: 'Factual Accuracy', focus: 'Which party\'s factual claims are more accurate and better supported?' },
  { round: 2, topic: 'Fairness & Equity', focus: 'Whose position is fairer and more equitable given the circumstances?' },
  { round: 3, topic: 'Precedent & Standards', focus: 'Which position better aligns with common standards, norms, or precedent in this type of dispute?' },
  { round: 4, topic: 'Evidence & Proof', focus: 'Who provides stronger evidence and more credible proof for their claims?' },
  { round: 5, topic: 'Good Faith & Reasonableness', focus: 'Which party has acted in better faith and with greater reasonableness throughout?' },
]

export async function researchDispute(dispute: {
  category: string
  neutral_title: string
  initiator_description: string
  initiator_desired_outcome: string
  respondent_description: string
  respondent_desired_outcome: string
}): Promise<{
  key_claims_a: string[]
  key_claims_b: string[]
  verifiable_facts: string[]
  contradictions: string[]
  domain_context: string
}> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are a forensic dispute analyst. Your job is to deeply research a dispute before arbitration begins.

        Analyze both parties' submissions and:
        1. Identify the core factual claims each party makes
        2. Note verifiable facts (things that can be objectively confirmed)
        3. Spot contradictions or inconsistencies between the two accounts
        4. Provide domain context (what usually happens in this type of dispute)

        Be thorough and impartial. Your analysis will inform 5 rounds of internal debate.

        You MUST respond with valid JSON only.

        Response format:
        {
          "key_claims_a": ["Claim 1", "Claim 2", "Claim 3"],
          "key_claims_b": ["Claim 1", "Claim 2", "Claim 3"],
          "verifiable_facts": ["Fact 1", "Fact 2"],
          "contradictions": ["Contradiction 1", "Contradiction 2"],
          "domain_context": "What typically governs disputes of this category and what standards apply"
        }`,
      },
      {
        role: 'user',
        content: `Dispute: ${dispute.neutral_title}
Category: ${dispute.category}

Party A claims: ${dispute.initiator_description}
Party A wants: ${dispute.initiator_desired_outcome}

Party B claims: ${dispute.respondent_description}
Party B wants: ${dispute.respondent_desired_outcome}

Research this dispute thoroughly.`,
      },
    ],
    temperature: 0.2,
    max_tokens: 1000,
    response_format: { type: 'json_object' },
  })

  const content = response.choices[0].message.content
  if (!content) throw new Error('No research response from AI')
  return JSON.parse(content)
}

export async function runDebateRound(dispute: {
  neutral_title: string
  category: string
  initiator_description: string
  initiator_desired_outcome: string
  respondent_description: string
  respondent_desired_outcome: string
}, research: {
  key_claims_a: string[]
  key_claims_b: string[]
  verifiable_facts: string[]
  contradictions: string[]
  domain_context: string
}, roundConfig: { round: number; topic: string; focus: string },
previousRounds: Array<{ round: number; topic: string; winner: string; judge_reasoning: string }>
): Promise<{
  round: number
  topic: string
  agent_a_argument: string
  agent_b_argument: string
  winner: 'A' | 'B' | 'draw'
  judge_reasoning: string
}> {
  const priorContext = previousRounds.length > 0
    ? `Prior rounds summary:\n${previousRounds.map(r => `Round ${r.round} (${r.topic}): Winner = ${r.winner}. ${r.judge_reasoning}`).join('\n')}`
    : 'This is the first round.'

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are running Round ${roundConfig.round} of 5 in an internal adversarial arbitration debate.

        TOPIC: ${roundConfig.topic}
        FOCUS QUESTION: ${roundConfig.focus}

        You must generate three things in a single response:
        1. Agent A's argument — forcefully and intelligently advocating for Party A on this specific topic
        2. Agent B's argument — forcefully and intelligently advocating for Party B on this specific topic
        3. A neutral judge's verdict: who won this round and why

        Each agent knows the full case and prior rounds. They argue strategically.
        If a party expressed themselves poorly, the agent helps articulate what they actually meant.

        The judge must be strict and pick a clear winner unless arguments are truly equal.

        You MUST respond with valid JSON only.

        Response format:
        {
          "agent_a_argument": "Full argument for Party A on this round's topic (3-5 sentences)",
          "agent_b_argument": "Full argument for Party B on this round's topic (3-5 sentences)",
          "winner": "A" | "B" | "draw",
          "judge_reasoning": "Why this winner was chosen (2-3 sentences)"
        }`,
      },
      {
        role: 'user',
        content: `CASE: ${dispute.neutral_title} (${dispute.category})

RESEARCH FINDINGS:
- Party A's key claims: ${research.key_claims_a.join('; ')}
- Party B's key claims: ${research.key_claims_b.join('; ')}
- Verified facts: ${research.verifiable_facts.join('; ')}
- Contradictions found: ${research.contradictions.join('; ')}
- Domain context: ${research.domain_context}

PARTY A FULL SUBMISSION: ${dispute.initiator_description}
PARTY A DESIRED OUTCOME: ${dispute.initiator_desired_outcome}

PARTY B FULL SUBMISSION: ${dispute.respondent_description}
PARTY B DESIRED OUTCOME: ${dispute.respondent_desired_outcome}

${priorContext}

Now argue Round ${roundConfig.round}: ${roundConfig.topic} — ${roundConfig.focus}`,
      },
    ],
    temperature: 0.5,
    max_tokens: 1200,
    response_format: { type: 'json_object' },
  })

  const content = response.choices[0].message.content
  if (!content) throw new Error('No debate round response from AI')

  const parsed = JSON.parse(content)
  return {
    round: roundConfig.round,
    topic: roundConfig.topic,
    agent_a_argument: parsed.agent_a_argument,
    agent_b_argument: parsed.agent_b_argument,
    winner: parsed.winner,
    judge_reasoning: parsed.judge_reasoning,
  }
}

export async function runAdversarialDebate(dispute: {
  neutral_title: string
  category: string
  initiator_description: string
  initiator_desired_outcome: string
  initiator_compensation: number | null
  respondent_description: string
  respondent_desired_outcome: string
  respondent_compensation: number | null
  mediation_response: string | null
}): Promise<{
  research: {
    key_claims_a: string[]
    key_claims_b: string[]
    verifiable_facts: string[]
    contradictions: string[]
    domain_context: string
  }
  rounds: Array<{
    round: number
    topic: string
    agent_a_argument: string
    agent_b_argument: string
    winner: 'A' | 'B' | 'draw'
    judge_reasoning: string
  }>
  score_a: number
  score_b: number
  verdict: 'A_wins' | 'B_wins' | 'compromise'
  verdict_reasoning: string
  resolution_guidance: string
}> {
  // Phase 1: Research
  const research = await researchDispute({
    category: dispute.category,
    neutral_title: dispute.neutral_title,
    initiator_description: dispute.initiator_description,
    initiator_desired_outcome: dispute.initiator_desired_outcome,
    respondent_description: dispute.respondent_description,
    respondent_desired_outcome: dispute.respondent_desired_outcome,
  })

  // Phase 2: 5 debate rounds (sequential — each informs the next)
  const rounds: Array<{
    round: number
    topic: string
    agent_a_argument: string
    agent_b_argument: string
    winner: 'A' | 'B' | 'draw'
    judge_reasoning: string
  }> = []

  for (const roundConfig of DEBATE_ROUND_TOPICS) {
    const previousRounds = rounds.map(r => ({
      round: r.round,
      topic: r.topic,
      winner: r.winner,
      judge_reasoning: r.judge_reasoning,
    }))

    const result = await runDebateRound(dispute, research, roundConfig, previousRounds)
    rounds.push(result)
  }

  // Phase 3: Tally scores
  const score_a = rounds.filter(r => r.winner === 'A').length
  const score_b = rounds.filter(r => r.winner === 'B').length

  // 4/5 rule
  const verdict: 'A_wins' | 'B_wins' | 'compromise' =
    score_a >= 4 ? 'A_wins' : score_b >= 4 ? 'B_wins' : 'compromise'

  // Phase 4: Final verdict reasoning
  const verdictResponse = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are the Chief Arbitrator issuing a final verdict after 5 rounds of internal debate.

        Synthesize the debate results into a final verdict explanation and resolution guidance.

        You MUST respond with valid JSON only.

        Response format:
        {
          "verdict_reasoning": "Why the overall verdict was reached based on the 5 rounds (3-4 sentences)",
          "resolution_guidance": "Specific guidance for the final resolution — what outcome should be awarded, any compensation adjustments, conditions (3-4 sentences)"
        }`,
      },
      {
        role: 'user',
        content: `Case: ${dispute.neutral_title}
Verdict: ${verdict.replace('_', ' ')}
Score: Party A won ${score_a}/5 rounds, Party B won ${score_b}/5 rounds

Round results:
${rounds.map(r => `Round ${r.round} (${r.topic}): Winner = ${r.winner}. ${r.judge_reasoning}`).join('\n')}

Party A wants: ${dispute.initiator_desired_outcome}${dispute.initiator_compensation ? ` ($${dispute.initiator_compensation})` : ''}
Party B wants: ${dispute.respondent_desired_outcome}${dispute.respondent_compensation ? ` ($${dispute.respondent_compensation})` : ''}

Write the verdict reasoning and resolution guidance.`,
      },
    ],
    temperature: 0.3,
    max_tokens: 600,
    response_format: { type: 'json_object' },
  })

  const verdictContent = verdictResponse.choices[0].message.content
  if (!verdictContent) throw new Error('No verdict response from AI')
  const { verdict_reasoning, resolution_guidance } = JSON.parse(verdictContent)

  return {
    research,
    rounds,
    score_a,
    score_b,
    verdict,
    verdict_reasoning,
    resolution_guidance,
  }
}

export async function generateResolution(dispute: {
  neutral_title: string
  category: string
  initiator_description: string
  initiator_desired_outcome: string
  initiator_compensation: number | null
  respondent_description: string
  respondent_desired_outcome: string
  respondent_compensation: number | null
  mediation_response: string | null
}): Promise<{
  summary: string
  key_arguments: { initiator: string[]; respondent: string[] }
  responsibility_analysis: string
  legal_considerations: string
  suggested_compensation: string | null
  final_recommendation: string
  confidence_level: 'high' | 'medium' | 'low'
}> {
  const mediationContext =
    dispute.mediation_response === 'rejected'
      ? 'Note: Mediation was attempted but rejected by one or both parties.'
      : dispute.mediation_response === 'counter'
        ? 'Note: Mediation was attempted. A counter-proposal was made but not agreed upon.'
        : ''

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are a professional AI arbitrator. Generate a structured, fair, and objective resolution for a dispute.

        Your resolution must be:
        - Neutral and objective
        - Based solely on the facts presented
        - Professional and legal in tone
        - Fair to both parties
        - Clear and actionable

        You MUST respond with valid JSON only.

        Response format:
        {
          "summary": "2-3 sentence case summary",
          "key_arguments": {
            "initiator": ["Key argument 1", "Key argument 2", "Key argument 3"],
            "respondent": ["Key argument 1", "Key argument 2", "Key argument 3"]
          },
          "responsibility_analysis": "Objective analysis of responsibility (2-3 sentences)",
          "legal_considerations": "Relevant legal principles or considerations (1-2 sentences)",
          "suggested_compensation": "Specific compensation recommendation or null if not applicable",
          "final_recommendation": "Clear final recommendation (2-3 sentences)",
          "confidence_level": "high|medium|low"
        }`,
      },
      {
        role: 'user',
        content: `Case: ${dispute.neutral_title}
Category: ${dispute.category}
${mediationContext}

Party A's position: ${dispute.initiator_description}
Party A's desired outcome: ${dispute.initiator_desired_outcome}
Party A's requested compensation: ${dispute.initiator_compensation ? `$${dispute.initiator_compensation}` : 'Not specified'}

Party B's position: ${dispute.respondent_description}
Party B's desired outcome: ${dispute.respondent_desired_outcome}
Party B's requested compensation: ${dispute.respondent_compensation ? `$${dispute.respondent_compensation}` : 'Not specified'}

Generate a fair and objective resolution.`,
      },
    ],
    temperature: 0.3,
    max_tokens: 1500,
    response_format: { type: 'json_object' },
  })

  const content = response.choices[0].message.content
  if (!content) throw new Error('No response from AI')

  return JSON.parse(content)
}
