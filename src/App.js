import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";

// Mock authentication function
const fakeAuth = {
  isAuthenticated: false,
  login(username, password, cb) {
    if (username === "admin" && password === "password") {
      this.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify({ username }));
      cb();
    } else {
      alert("Invalid credentials");
    }
  },
  logout(cb) {
    this.isAuthenticated = false;
    localStorage.removeItem("user");
    cb();
  },
};

// Login Component
const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    fakeAuth.login(username, password, () => {
      setUser({ username });
    });
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Login</h2>
      <form onSubmit={handleLogin}>
        <input className="border p-2 w-full my-2" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input className="border p-2 w-full my-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Login</button>
      </form>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ user, setUser }) => {
  if (!user) return <Navigate to="/login" />;

  const handleLogout = () => {
    fakeAuth.logout(() => setUser(null));
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Welcome, {user.username}!</h2>
      <button className="bg-red-500 text-white px-4 py-2 rounded mt-4" onClick={handleLogout}>Logout</button>
    </div>
  );
};

// Main App Component
const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <Link to="/">Home</Link>
        {user ? <Link to="/dashboard">Dashboard</Link> : <Link to="/login">Login</Link>}
      </nav>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
        <Route path="/" element={<h1 className="text-center text-2xl">Welcome to the Donation Platform</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
