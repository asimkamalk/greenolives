import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { url } from "../../assets/assets";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Allow hardcoded admin login without calling backend
      if (
        email === "newgreenolivesofficial@gmail.com" &&
        password === "admin@go123"
      ) {
        localStorage.setItem("adminToken", "local-admin");
        setToken("local-admin");
        navigate("/");
        return;
      }

      const response = await fetch(`${url}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        setToken(data.token);
        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Welcome to New Green Olives Dashboard</h1>
      <div className="login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
