-- ==============================================
-- Profiles & Billing Schema
-- ==============================================

-- User profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  -- Billing
  stripe_customer_id TEXT UNIQUE,
  subscription_id TEXT UNIQUE,
  subscription_status TEXT DEFAULT 'inactive'
    CHECK (subscription_status IN ('active', 'trialing', 'past_due', 'canceled', 'incomplete', 'inactive')),
  plan TEXT NOT NULL DEFAULT 'free'
    CHECK (plan IN ('free', 'pro')),
  plan_interval TEXT CHECK (plan_interval IN ('month', 'year')),
  current_period_end TIMESTAMPTZ,
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Updated_at trigger for profiles
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Index for Stripe lookups
CREATE INDEX IF NOT EXISTS profiles_stripe_customer_idx ON profiles(stripe_customer_id);

-- Add case_count helper view
CREATE OR REPLACE VIEW user_case_counts AS
SELECT
  created_by AS user_id,
  COUNT(*) FILTER (WHERE status NOT IN ('resolved', 'closed')) AS active_cases,
  COUNT(*) AS total_cases
FROM disputes
GROUP BY created_by;
