export default function LoginPage() {
    return (
      <div style={{ padding: 32 }}>
        <h1 style={{ color: 'white', fontSize: 24 }}>
          Login
        </h1>
  
        <form method="POST" action="/api/send-otp">
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
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
              cursor: 'pointer',
            }}
          >
            Send OTP
          </button>
        </form>
      </div>
    );
  }
  