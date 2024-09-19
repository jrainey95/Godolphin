import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make sure the URL matches your backend server URL
      const response = await axios.post("http://localhost:3000/register", {
        uname: username,
        pw: password,
      }, { withCredentials: true }); // Include credentials for session-based auth

      console.log(response.data);
      alert("Registration successful");
    } catch (error) {
      console.error("There was an error registering!", error);
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
