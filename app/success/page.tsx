'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type SessionData = {
  amount: number;
  currency: string;
  customerEmail?: string;
  paymentStatus: string;
};

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [data, setData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    fetch(`/api/checkout-session?session_id=${sessionId}`)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) return <p>Confirming payment...</p>;
  if (!data) return <p>Something went wrong.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>✅ Payment Successful</h1>

      <p>
        <strong>Amount:</strong> ₹{(data.amount / 100).toFixed(2)}
      </p>

      {data.customerEmail && (
        <p>
          <strong>Email:</strong> {data.customerEmail}
        </p>
      )}

      <p>
        <strong>Status:</strong> {data.paymentStatus}
      </p>
    </div>
  );
}
