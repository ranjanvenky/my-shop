import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = formData.get('password');

  if (password === process.env.ADMIN_SECRET) {
    const res = NextResponse.redirect(
      new URL('/admin/orders', request.url),
      303 // 👈 THIS IS THE KEY
    );

    res.headers.set(
      'Set-Cookie',
      'admin=true; Path=/; HttpOnly; SameSite=Lax'
    );

    return res;
  }

  return NextResponse.redirect(
    new URL('/admin/login?error=1', request.url),
    303
  );
}
