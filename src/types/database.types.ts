export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      disputes: {
        Row: {
          id: string
          neutral_title: string | null
          category: string | null
          status: string
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
          mediation_response: string | null
          invite_token: string | null
          invite_accepted_at: string | null
        }
        Insert: {
          id?: string
          neutral_title?: string | null
          category?: string | null
          status?: string
          created_by: string
          created_at?: string
          updated_at?: string
          initiator_title: string
          initiator_description: string
          initiator_desired_outcome: string
          initiator_compensation?: number | null
          respondent_email: string
          respondent_title?: string | null
          respondent_description?: string | null
          respondent_desired_outcome?: string | null
          respondent_compensation?: number | null
          mediation_response?: string | null
          invite_token?: string | null
          invite_accepted_at?: string | null
        }
        Update: {
          id?: string
          neutral_title?: string | null
          category?: string | null
          status?: string
          created_by?: string
          created_at?: string
          updated_at?: string
          initiator_title?: string
          initiator_description?: string
          initiator_desired_outcome?: string
          initiator_compensation?: number | null
          respondent_email?: string
          respondent_title?: string | null
          respondent_description?: string | null
          respondent_desired_outcome?: string | null
          respondent_compensation?: number | null
          mediation_response?: string | null
          invite_token?: string | null
          invite_accepted_at?: string | null
        }
      }
      participants: {
        Row: {
          id: string
          dispute_id: string
          user_id: string
          role: string
          agreed_to_terms: boolean
          created_at: string
        }
        Insert: {
          id?: string
          dispute_id: string
          user_id: string
          role: string
          agreed_to_terms?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          dispute_id?: string
          user_id?: string
          role?: string
          agreed_to_terms?: boolean
          created_at?: string
        }
      }
      evidence: {
        Row: {
          id: string
          dispute_id: string
          uploaded_by: string
          file_url: string
          file_name: string
          file_type: string
          file_size: number
          role: string
          created_at: string
        }
        Insert: {
          id?: string
          dispute_id: string
          uploaded_by: string
          file_url: string
          file_name: string
          file_type: string
          file_size: number
          role: string
          created_at?: string
        }
        Update: {
          id?: string
          dispute_id?: string
          uploaded_by?: string
          file_url?: string
          file_name?: string
          file_type?: string
          file_size?: number
          role?: string
          created_at?: string
        }
      }
      ai_outputs: {
        Row: {
          id: string
          dispute_id: string
          type: string
          content: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          dispute_id: string
          type: string
          content: string
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          dispute_id?: string
          type?: string
          content?: string
          metadata?: Json | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
