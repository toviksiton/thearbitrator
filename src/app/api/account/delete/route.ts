import { createClient, createServiceClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function DELETE() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const serviceClient = createServiceClient()

  // Cancel Stripe subscription if any
  const { data: profile } = await serviceClient
    .from('profiles')
    .select('stripe_customer_id, subscription_id')
    .eq('id', user.id)
    .single()

  if (profile?.subscription_id) {
    try {
      await stripe.subscriptions.cancel(profile.subscription_id)
    } catch (err) {
      console.error('Failed to cancel subscription:', err)
    }
  }

  // Delete user data (cascade handles disputes, participants, evidence, ai_outputs)
  try {
    await serviceClient.auth.admin.deleteUser(user.id)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
