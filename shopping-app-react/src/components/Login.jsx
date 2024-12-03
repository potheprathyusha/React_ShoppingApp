import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Import styles

// Mock users
const mockUsers = [
  { id: 1, username: "john", password: "1234" },
  { id: 2, username: "jane", password: "5678" },
  { id: 3, username: "admin", password: "admin" },
];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
      dispatch(login({ username: loggedInUser }));
      navigate("/products"); // Redirect to the products page if the user is logged in
    }
  }, [dispatch, navigate]);

  const handleLogin = () => {
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      dispatch(login({ username: user.username }));
      localStorage.setItem("username", user.username); // Store the username in localStorage
      navigate("/products"); // Navigate to the products page
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        {error && <p className="login-error">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
