import React, { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });
      alert("✅ Login successful!");
      console.log("JWT Token:", res.data);
      localStorage.setItem("token", res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        <div className="oauth-section">
          <p>or login using</p>
          <a className="google-btn" href="http://localhost:8080/oauth2/authorization/google">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
            Sign in with Google
          </a>
        </div>
      </div>
    </div>
  );
}
