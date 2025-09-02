export default function LoginPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Login</h1>
      <form action="/dashboard" method="POST">
        <div>
          <label >Email:</label>
          <input type="email" id="email" name="email" />
        </div>

        <div>
          <label >Password:</label>
          <input type="password" id="password" name="password" />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>

      <p>
        <a href="/forgot-password">Forgot Password?</a>
      </p>
    </main>
  );
}
