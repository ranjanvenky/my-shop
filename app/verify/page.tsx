export default async function VerifyPage({
    searchParams,
  }: {
    searchParams: Promise<{ phone?: string }>;
  }) {
    const params = await searchParams;
    const phone = params.phone ?? '';
  
    return (
      <div style={{ padding: 32 }}>
        <h1 style={{ color: '#000' }}>Verify OTP</h1>
  
        <form method="POST" action="/api/verify-otp">
          <input type="hidden" name="phone" value={phone} />
  
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            required
            style={{
              padding: 12,
              marginTop: 16,
              width: '100%',
              fontSize: 16,
              color: '#000',
            }}
          />
  
          <button
            type="submit"
            style={{
              marginTop: 16,
              padding: 12,
              width: '100%',
              fontSize: 16,
            }}
          >
            Verify
          </button>
        </form>
      </div>
    );
  }
  