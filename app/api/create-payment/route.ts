// app/api/create-payment/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const PRODUCTS = [
  { id: 1, name: 'Notebook', price: 300 },
  { id: 2, name: 'Candle', price: 300 },
  { id: 3, name: 'Pen', price: 150 },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const productId = body.productId;
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
      metadata: {
        productName: product.name,
      },    
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: { name: product.name },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 });
  }
}
