import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin');

  if (!isAdmin) {
    redirect('/admin/login');
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f7f7f8',
        padding: '40px 20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          background: '#ffffff',
          padding: 24,
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <h1 style={{ margin: 0 }}>Admin Orders</h1>

          {/* LOGOUT */}
          <form action="/api/admin-logout" method="POST">
            <button
              type="submit"
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid #ddd',
                background: '#f5f5f5',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </form>
        </div>

        {/* PLACEHOLDER FOR ORDERS */}
        <div
          style={{
            padding: 40,
            color: '#666',
            border: '1px dashed #ddd',
            borderRadius: 6,
            textAlign: 'center',
          }}
        >
          Orders will appear here ✅
        </div>
      </div>
    </div>
  );
}
