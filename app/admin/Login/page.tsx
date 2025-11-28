// app/admin/login/page.tsx
import { redirect } from 'next/navigation';

export default function AdminLoginPage() {
  async function login(formData: FormData) {
    'use server';

    const password = formData.get('password');

    if (password === process.env.ADMIN_SECRET) {
      redirect('/admin/orders');
    }

    redirect('/admin/login?error=1');
  }

  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <h2>Admin Login</h2>

      <form action={login}>
        <input
          type="password"
          name="password"
          placeholder="Admin password"
          required
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
