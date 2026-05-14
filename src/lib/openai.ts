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
