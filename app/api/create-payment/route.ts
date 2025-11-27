import { NextResponse } from 'next/server';

const PRODUCTS = [
  { id: 1, name: 'Notebook', price: 300 },
  { id: 2, name: 'Candle', price: 300 },
  { id: 3, name: 'Pen', price: 150 },
];

export async function POST(request: Request) {
  const body = await request.json();
  const productId = body.productId;

  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: `Preparing payment for ${product.name}`,
    amount: product.price
  });
}
