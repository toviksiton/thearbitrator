import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
})

export const PLANS = {
  free: {
    name: 'Free',
    description: 'Try the platform',
    price: 0,
    cases: 1,
    features: [
      '1 dispute case',
      'AI neutralization',
      'AI mediation proposal',
      'PDF summary export',
      'Evidence upload',
    ],
  },
  pro: {
    name: 'Pro',
    description: 'For individuals & businesses',
    monthlyPriceId: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
    yearlyPriceId: process.env.STRIPE_PRO_YEARLY_PRICE_ID!,
    monthlyPrice: 19,
    yearlyPrice: 15,
    cases: Infinity,
    features: [
      'Unlimited dispute cases',
      'AI neutralization',
      'AI mediation proposals',
      'Full AI arbitration resolutions',
      'PDF summary export',
      'Priority AI processing',
      'Evidence upload (50MB/file)',
      'Email support',
    ],
  },
} as const

export type Plan = keyof typeof PLANS

export async function createOrRetrieveCustomer({
  userId,
  email,
}: {
  userId: string
  email: string
}): Promise<string> {
  // Check if customer already exists in profiles
  const { createServiceClient } = await import('@/lib/supabase/server')
  const supabase = createServiceClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', userId)
    .single()

  if (profile?.stripe_customer_id) {
    return profile.stripe_customer_id
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email,
    metadata: { supabase_user_id: userId },
  })

  // Save to profiles
  await supabase
    .from('profiles')
    .upsert({ id: userId, stripe_customer_id: customer.id })

  return customer.id
}

export async function getUserPlan(userId: string): Promise<Plan> {
  const { createServiceClient } = await import('@/lib/supabase/server')
  const supabase = createServiceClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, subscription_status, current_period_end')
    .eq('id', userId)
    .single()

  if (!profile) return 'free'

  const isActive =
    profile.subscription_status === 'active' ||
    profile.subscription_status === 'trialing'

  const notExpired = profile.current_period_end
    ? new Date(profile.current_period_end) > new Date()
    : false

  if (profile.plan === 'pro' && isActive && notExpired) return 'pro'
  return 'free'
}

export async function canCreateCase(userId: string): Promise<{
  allowed: boolean
  reason?: string
}> {
  const plan = await getUserPlan(userId)
  if (plan === 'pro') return { allowed: true }

  // Free plan: check case count
  const { createServiceClient } = await import('@/lib/supabase/server')
  const supabase = createServiceClient()

  const { count } = await supabase
    .from('disputes')
    .select('*', { count: 'exact', head: true })
    .eq('created_by', userId)

  if ((count ?? 0) >= PLANS.free.cases) {
    return {
      allowed: false,
      reason: `Free plan allows ${PLANS.free.cases} case. Upgrade to Pro for unlimited cases.`,
    }
  }

  return { allowed: true }
}
