import React, { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/register", {
        name,
        email,
        password,
      });
      alert(res.data || "✅ Registered successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error registering user");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button type="submit">Register</button>
        </form>

        <div className="oauth-section">
          <p>or register using</p>
          <a className="google-btn" href="http://localhost:8080/oauth2/authorization/google">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
            Sign up with Google
          </a>
        </div>
      </div>
    </div>
  );
}
