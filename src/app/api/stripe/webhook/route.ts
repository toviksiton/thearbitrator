import { stripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type Stripe from 'stripe'

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createServiceClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.CheckoutSession
        if (session.mode === 'subscription') {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          )
          await updateSubscription(supabase, subscription)
        }
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription
        await updateSubscription(supabase, subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (profile) {
          await supabase
            .from('profiles')
            .update({
              subscription_status: 'canceled',
              plan: 'free',
              subscription_id: null,
              current_period_end: null,
            })
            .eq('id', profile.id)
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        await supabase
          .from('profiles')
          .update({ subscription_status: 'past_due' })
          .eq('stripe_customer_id', customerId)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            invoice.subscription as string
          )
          await updateSubscription(supabase, subscription)
        }
        break
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }

  return NextResponse.json({ received: true })
}

async function updateSubscription(
  supabase: ReturnType<typeof createServiceClient>,
  subscription: Stripe.Subscription
) {
  const customerId = subscription.customer as string
  const priceId = subscription.items.data[0]?.price.id
  const interval = subscription.items.data[0]?.price.recurring?.interval

  const isActive =
    subscription.status === 'active' || subscription.status === 'trialing'

  await supabase
    .from('profiles')
    .update({
      subscription_id: subscription.id,
      subscription_status: subscription.status,
      plan: isActive ? 'pro' : 'free',
      plan_interval: interval ?? null,
      current_period_end: new Date(
        subscription.current_period_end * 1000
      ).toISOString(),
    })
    .eq('stripe_customer_id', customerId)
}
