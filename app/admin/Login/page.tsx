import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin');

  if (!isAdmin) {
    redirect('/admin/login');
  }

  return (
    <div style={{ padding: 20 }}>
      <form action="/api/admin-logout" method="POST">
        <button type="submit">Logout</button>
      </form>

      <h1>Admin Orders</h1>
      {/* orders list here */}
    </div>
  );
}
