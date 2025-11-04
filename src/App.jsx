import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="navbar">
        <h2 className="brand">SSO Application</h2>
        <div>
          <Link to="/register" className="nav-link">Register</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </div>
      </div>

      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}
