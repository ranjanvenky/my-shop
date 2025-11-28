import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const phone = formData.get('phone');

  if (!phone) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const otp = '123456';
  console.log('✅ OTP for', phone, 'is', otp);

  const encodedPhone = encodeURIComponent(String(phone));

  const redirectUrl = new URL(`/verify?phone=${encodedPhone}`, req.url);

  return NextResponse.redirect(redirectUrl);
}
