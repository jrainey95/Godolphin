import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Logout from "./pages/Logout";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null); // Keep track of the logged-in user

  // Fetch user session on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/account", { withCredentials: true });
        setUser(response.data.user); // Set user if session exists
      } catch (error) {
        console.error("Not logged in", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/account" element={<Account user={user} />} />
        </Routes>
        {user && <Logout setUser={setUser} />}{" "}
        {/* Show Logout button if logged in */}
      </div>
    </Router>
  );
}

export default App;
