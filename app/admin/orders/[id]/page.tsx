import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type Props = {
  params: {
    id: string;
  };
};

export default async function OrderDetailPage({ params }: Props) {
  // ✅ Admin auth
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin');

  if (!isAdmin) {
    redirect('/admin/login');
  }

  // ✅ Fetch single order
  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !order) {
    return (
      <div style={{ padding: 40, color: '#000' }}>
        ❌ Order not found
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
          maxWidth: 600,
          margin: '0 auto',
          background: '#fff',
          padding: 24,
          borderRadius: 8,
        }}
      >
        <a href="/admin/orders" style={{ textDecoration: 'underline' }}>
          ← Back to orders
        </a>

        <h1 style={{ marginTop: 16 }}>Order Details</h1>

        <Detail label="Order ID" value={order.id} />
        <Detail label="Product" value={order.product_name} />
        <Detail
          label="Amount"
          value={`₹${(order.amount / 100).toFixed(2)}`}
        />
        <Detail label="Currency" value={order.currency} />
        <Detail label="Status" value={order.status} />
        <Detail
          label="Created At"
          value={new Date(order.created_at).toLocaleString()}
        />
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        marginTop: 12,
        paddingBottom: 12,
        borderBottom: '1px solid #eee',
      }}
    >
      <strong>{label}:</strong>
      <div>{value}</div>
    </div>
  );
}
