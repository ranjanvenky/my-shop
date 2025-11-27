import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const { error } = await supabase.from('orders').insert({
      stripe_session_id: session.id,
      product_name: session.metadata?.productName,
      amount: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_details?.email,
      payment_status: session.payment_status,
    });

    if (error) {
      console.error('❌ Failed to save order:', error);
    } else {
      console.log('✅ Order saved:', session.id);
    }
  }

  return NextResponse.json({ received: true });
}
