export type DisputeStatus =
  | 'pending_response'
  | 'in_progress'
  | 'ai_processing'
  | 'mediation'
  | 'resolved'
  | 'closed'

export type DisputeCategory =
  | 'neighbor'
  | 'workplace'
  | 'consumer'
  | 'financial'
  | 'property'
  | 'contract'
  | 'family'
  | 'other'

export type ParticipantRole = 'initiator' | 'respondent'

export type AIOutputType =
  | 'neutral_title'
  | 'classification'
  | 'mediation_proposal'
  | 'resolution'
  | 'summary'

export type MediationResponse = 'accepted' | 'rejected' | 'counter'

export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
}

export interface Dispute {
  id: string
  neutral_title: string | null
  category: DisputeCategory | null
  status: DisputeStatus
  created_by: string
  created_at: string
  updated_at: string
  initiator_title: string
  initiator_description: string
  initiator_desired_outcome: string
  initiator_compensation: number | null
  respondent_email: string
  respondent_title: string | null
  respondent_description: string | null
  respondent_desired_outcome: string | null
  respondent_compensation: number | null
  mediation_response: MediationResponse | null
  invite_token: string | null
  invite_accepted_at: string | null
}

export interface Participant {
  id: string
  dispute_id: string
  user_id: string
  role: ParticipantRole
  agreed_to_terms: boolean
  created_at: string
}

export interface Evidence {
  id: string
  dispute_id: string
  uploaded_by: string
  file_url: string
  file_name: string
  file_type: string
  file_size: number
  role: ParticipantRole
  created_at: string
}

export interface AIOutput {
  id: string
  dispute_id: string
  type: AIOutputType
  content: string
  metadata: Record<string, unknown> | null
  created_at: string
}

export interface DisputeWithDetails extends Dispute {
  participants?: Participant[]
  evidence?: Evidence[]
  ai_outputs?: AIOutput[]
  initiator_user?: User
  respondent_user?: User | null
}

export interface AIResolution {
  summary: string
  key_arguments: {
    initiator: string[]
    respondent: string[]
  }
  responsibility_analysis: string
  legal_considerations: string
  suggested_compensation: string | null
  final_recommendation: string
  confidence_level: 'high' | 'medium' | 'low'
}

export interface AIMediationProposal {
  proposal_type: string
  description: string
  terms: string[]
  rationale: string
}

export interface CreateDisputeInput {
  title: string
  description: string
  desired_outcome: string
  compensation?: number
  respondent_email: string
}

export interface RespondToDisputeInput {
  title: string
  description: string
  desired_outcome: string
  compensation?: number
}
