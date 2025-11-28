import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('user_session');

  if (!session) {
    redirect('/login');
  }

  return (
    <h1 style={{ color: '#000' }}>
      ✅ Your Orders
    </h1>
  );
}
