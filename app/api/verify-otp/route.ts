import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const otp = formData.get('otp');

  if (otp !== '123456') {
    return NextResponse.redirect(new URL('/verify?error=1', req.url));
  }

  // ✅ Create response
  const response = NextResponse.redirect(new URL('/orders', req.url));

  // ✅ Set cookie via headers
  response.cookies.set('user_session', 'logged_in', {
    httpOnly: true,
    path: '/',
  });

  return response;
}
