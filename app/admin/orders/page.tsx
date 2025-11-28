import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default async function OrdersPage() {
  // ✅ Auth check
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin');

  if (!isAdmin) {
    redirect('/admin/login');
  }

  // ✅ Fetch orders
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div style={{ padding: 40 }}>
        ❌ Failed to load orders
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f7f7f8',
        padding: '40px 20px',
        fontFamily: 'system-ui, sans-serif',
color: '#000',

      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          background: '#fff',
          padding: 24,
          borderRadius: 8,
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <h1>Admin Orders</h1>

          <form action="/api/admin-logout" method="POST">
            <button>Logout</button>
          </form>
        </div>

        {/* EMPTY STATE */}
        {orders.length === 0 && (
          <div style={{ color: '#666' }}>
            No orders yet.
          </div>
        )}

        {/* TABLE */}
        {orders.length > 0 && (
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
            }}
          >
            <thead>
              <tr style={{ background: '#f0f0f0' }}>
                <th style={th}>Order ID</th>
                <th style={th}>Product</th>
                <th style={th}>Amount</th>
                <th style={th}>Status</th>
                <th style={th}>Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
<td style={td}>
  <a
    href={`/admin/orders/${order.id}`}
    style={{ color: '#000', textDecoration: 'underline' }}
  >
    {order.id.slice(0, 8)}
  </a>
</td>
                  <td style={td}>{order.product_name}</td>
                  <td style={td}>
                    ₹{(order.amount / 100).toFixed(2)}
                  </td>
                  <td style={td}>{order.status}</td>
                  <td style={td}>
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const th = {
  textAlign: 'left' as const,
  padding: '10px',
  borderBottom: '1px solid #ddd',
};

const td = {
  padding: '10px',
  borderBottom: '1px solid #eee',
};
