import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { BillingClient } from './BillingClient'

export const metadata = { title: 'Billing — Settings' }

export default async function BillingPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, subscription_status, current_period_end, plan_interval, stripe_customer_id')
    .eq('id', user.id)
    .single()

  // Case usage
  const { count: totalCases } = await supabase
    .from('disputes')
    .select('*', { count: 'exact', head: true })
    .eq('created_by', user.id)

  return (
    <BillingClient
      profile={profile}
      totalCases={totalCases ?? 0}
      userEmail={user.email!}
    />
  )
}
