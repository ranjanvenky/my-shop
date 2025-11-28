// app/admin/orders/page.tsx

export default async function OrdersPage({
    searchParams,
  }: {
    searchParams: Promise<{ key?: string }>;
  }) {
    const { key } = await searchParams;
  
    if (key !== process.env.ADMIN_SECRET) {
      return (
        <div style={{ padding: 40 }}>
          <h2>Access denied</h2>
        </div>
      );
    }
  
    return (
      <div style={{ padding: 40 }}>
        <h1>Orders</h1>
        {/* orders table here */}
      </div>
    );
  }
  