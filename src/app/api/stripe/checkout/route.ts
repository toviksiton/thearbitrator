import { createClient } from '@/lib/supabase/server'
import { stripe, createOrRetrieveCustomer } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { priceId, interval } = await request.json()

  if (!priceId) {
    return NextResponse.json({ error: 'priceId required' }, { status: 400 })
  }

  try {
    const customerId = await createOrRetrieveCustomer({
      userId: user.id,
      email: user.email!,
    })

    const appUrl = process.env.NEXT_PUBLIC_APP_URL

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/settings/billing?success=true`,
      cancel_url: `${appUrl}/pricing?canceled=true`,
      subscription_data: {
        metadata: { supabase_user_id: user.id },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
