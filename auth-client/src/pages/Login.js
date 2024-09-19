import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    try {
      await axios.post(
        "http://localhost:3000/login", // Specify the full backend URL if needed
        { uname: username, pw: password },
        { withCredentials: true } // Include credentials for session cookies
      );

      const response = await axios.get("http://localhost:3000/account", {
        withCredentials: true,
      });
      setUser(response.data.user);
      navigate("/account");
    } catch (error) {
      console.error("Error logging in", error);
      setError("Invalid username or password"); // Set error message for display
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
    </div>
  );
}

export default Login;
