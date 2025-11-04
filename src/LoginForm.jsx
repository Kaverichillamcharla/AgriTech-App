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
      alert("Login successful: " + res.data.name);
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>
      <hr />
      <button
        onClick={() =>
          (window.location.href = "http://localhost:8080/oauth2/authorization/google")
        }
      >
        Login with Google
      </button>
      <br /><br />
      <button
        onClick={() =>
          (window.location.href = "http://localhost:8080/oauth2/authorization/github")
        }
      >
        Login with GitHub
      </button>
    </div>
  );
}
