'use client';

const products = [
  { id: 1, name: 'Notebook', price: 300 },
  { id: 2, name: 'Candle', price: 300 },
  { id: 3, name: 'Pen', price: 150 },
];

export default function Home() {

  async function handleBuy(product: { id: number }) {
    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // ✅ Redirect user to Stripe Checkout
        window.location.href = data.url;
      } else {
        alert('Something went wrong. No payment URL returned.');
      }
    } catch (error) {
      console.error(error);
      alert('Payment failed. Please try again.');
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Shop</h1>

      {products.map(product => (
        <div
          key={product.id}
          style={{
            border: '1px solid #ddd',
            padding: '16px',
            maxWidth: '220px',
            marginBottom: '12px'
          }}
        >
          <h2>{product.name}</h2>
          <p>₹{product.price}</p>

          <button
            onClick={() => handleBuy(product)}
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: '8px 12px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Buy
          </button>
        </div>
      ))}
    </div>
  );
}
