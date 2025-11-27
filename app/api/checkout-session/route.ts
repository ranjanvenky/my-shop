import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Missing session_id' },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      amount: session.amount_total,
      currency: session.currency,
      customerEmail: session.customer_details?.email,
      paymentStatus: session.payment_status,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Invalid session' },
      { status: 500 }
    );
  }
}
