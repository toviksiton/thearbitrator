-- ==============================================
-- The Arbitrator — Initial Database Schema
-- ==============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================
-- DISPUTES TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS disputes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Neutral AI-generated fields
  neutral_title TEXT,
  category TEXT CHECK (category IN ('neighbor', 'workplace', 'consumer', 'financial', 'property', 'contract', 'family', 'other')),
  status TEXT NOT NULL DEFAULT 'pending_response'
    CHECK (status IN ('pending_response', 'in_progress', 'ai_processing', 'mediation', 'resolved', 'closed')),

  -- Initiator (Party A)
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  initiator_title TEXT NOT NULL,
  initiator_description TEXT NOT NULL,
  initiator_desired_outcome TEXT NOT NULL,
  initiator_compensation NUMERIC(12, 2),

  -- Respondent (Party B)
  respondent_email TEXT NOT NULL,
  respondent_title TEXT,
  respondent_description TEXT,
  respondent_desired_outcome TEXT,
  respondent_compensation NUMERIC(12, 2),

  -- Mediation
  mediation_response TEXT CHECK (mediation_response IN ('accepted', 'rejected', 'counter')),

  -- Invite
  invite_token TEXT UNIQUE,
  invite_accepted_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER disputes_updated_at
  BEFORE UPDATE ON disputes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ==============================================
-- PARTICIPANTS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dispute_id UUID NOT NULL REFERENCES disputes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('initiator', 'respondent')),
  agreed_to_terms BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(dispute_id, user_id)
);

-- ==============================================
-- EVIDENCE TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS evidence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dispute_id UUID NOT NULL REFERENCES disputes(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('initiator', 'respondent')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================
-- AI OUTPUTS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS ai_outputs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dispute_id UUID NOT NULL REFERENCES disputes(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('neutral_title', 'classification', 'mediation_proposal', 'resolution', 'summary')),
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================
-- INDEXES
-- ==============================================
CREATE INDEX IF NOT EXISTS disputes_created_by_idx ON disputes(created_by);
CREATE INDEX IF NOT EXISTS disputes_status_idx ON disputes(status);
CREATE INDEX IF NOT EXISTS disputes_invite_token_idx ON disputes(invite_token);
CREATE INDEX IF NOT EXISTS participants_dispute_id_idx ON participants(dispute_id);
CREATE INDEX IF NOT EXISTS participants_user_id_idx ON participants(user_id);
CREATE INDEX IF NOT EXISTS evidence_dispute_id_idx ON evidence(dispute_id);
CREATE INDEX IF NOT EXISTS ai_outputs_dispute_id_idx ON ai_outputs(dispute_id);
CREATE INDEX IF NOT EXISTS ai_outputs_type_idx ON ai_outputs(type);

-- ==============================================
-- ROW LEVEL SECURITY (RLS)
-- ==============================================

-- Enable RLS on all tables
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_outputs ENABLE ROW LEVEL SECURITY;

-- ---- DISPUTES POLICIES ----

-- Users can view disputes they created or participate in
CREATE POLICY "disputes_select_policy"
  ON disputes
  FOR SELECT
  USING (
    auth.uid() = created_by
    OR
    auth.uid() IN (
      SELECT user_id FROM participants WHERE dispute_id = disputes.id
    )
  );

-- Users can create disputes
CREATE POLICY "disputes_insert_policy"
  ON disputes
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- Initiator can update their dispute; respondent can update respondent fields
CREATE POLICY "disputes_update_policy"
  ON disputes
  FOR UPDATE
  USING (
    auth.uid() = created_by
    OR
    auth.uid() IN (
      SELECT user_id FROM participants WHERE dispute_id = disputes.id
    )
  );

-- ---- PARTICIPANTS POLICIES ----

CREATE POLICY "participants_select_policy"
  ON participants
  FOR SELECT
  USING (
    auth.uid() = user_id
    OR
    auth.uid() IN (
      SELECT created_by FROM disputes WHERE id = participants.dispute_id
    )
  );

CREATE POLICY "participants_insert_policy"
  ON participants
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ---- EVIDENCE POLICIES ----

CREATE POLICY "evidence_select_policy"
  ON evidence
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM participants WHERE dispute_id = evidence.dispute_id
    )
    OR
    auth.uid() IN (
      SELECT created_by FROM disputes WHERE id = evidence.dispute_id
    )
  );

CREATE POLICY "evidence_insert_policy"
  ON evidence
  FOR INSERT
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "evidence_delete_policy"
  ON evidence
  FOR DELETE
  USING (auth.uid() = uploaded_by);

-- ---- AI OUTPUTS POLICIES ----

CREATE POLICY "ai_outputs_select_policy"
  ON ai_outputs
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM participants WHERE dispute_id = ai_outputs.dispute_id
    )
    OR
    auth.uid() IN (
      SELECT created_by FROM disputes WHERE id = ai_outputs.dispute_id
    )
  );

-- Service role can insert AI outputs (API routes use service role)
CREATE POLICY "ai_outputs_insert_policy"
  ON ai_outputs
  FOR INSERT
  WITH CHECK (true); -- Controlled at application level

-- ==============================================
-- STORAGE BUCKETS
-- ==============================================

-- Create evidence storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'evidence',
  'evidence',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf', 'text/plain']
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS
CREATE POLICY "evidence_storage_select"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'evidence');

CREATE POLICY "evidence_storage_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'evidence'
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "evidence_storage_delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'evidence'
    AND auth.uid() IS NOT NULL
  );

-- ==============================================
-- FUNCTIONS
-- ==============================================

-- Function to get dispute with full details
CREATE OR REPLACE FUNCTION get_dispute_with_details(p_dispute_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_dispute JSONB;
  v_participants JSONB;
  v_evidence JSONB;
  v_ai_outputs JSONB;
BEGIN
  SELECT to_jsonb(d.*) INTO v_dispute
  FROM disputes d
  WHERE d.id = p_dispute_id;

  SELECT jsonb_agg(to_jsonb(p.*)) INTO v_participants
  FROM participants p
  WHERE p.dispute_id = p_dispute_id;

  SELECT jsonb_agg(to_jsonb(e.*)) INTO v_evidence
  FROM evidence e
  WHERE e.dispute_id = p_dispute_id;

  SELECT jsonb_agg(to_jsonb(a.*)) INTO v_ai_outputs
  FROM ai_outputs a
  WHERE a.dispute_id = p_dispute_id;

  RETURN v_dispute
    || jsonb_build_object('participants', COALESCE(v_participants, '[]'::jsonb))
    || jsonb_build_object('evidence', COALESCE(v_evidence, '[]'::jsonb))
    || jsonb_build_object('ai_outputs', COALESCE(v_ai_outputs, '[]'::jsonb));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
