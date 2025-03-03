import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "./logo.png"; // Add a logo image in the public folder or import it from assets

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <img src={logo} alt="Logo" className="mx-auto w-20 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">Login</h2>
        <form onSubmit={handleLogin} className="mt-4">
          <input className="border p-2 w-full my-2 rounded" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input className="border p-2 w-full my-2 rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-2 hover:bg-blue-600" type="submit">Login</button>
        </form>
      </div>
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <FaUserCircle className="text-5xl text-gray-600 mx-auto" />
        <h2 className="text-2xl font-bold mt-4">Welcome, {user.username}!</h2>
        <button className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-red-600" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

// Home Component
const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
    <img src={logo} alt="Logo" className="w-32 mb-4" />
    <h1 className="text-3xl font-bold text-gray-700">Welcome to the Donation Platform</h1>
    <p className="text-gray-600 mt-2">Connecting donors, charities, and individuals in need.</p>
  </div>
);

// Main App Component
const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <Router>
      <nav className="p-4 bg-blue-600 text-white flex justify-between shadow-lg">
        <Link to="/" className="text-lg font-bold">Donation Platform</Link>
        <div>
          {user ? <Link to="/dashboard" className="mr-4">Dashboard</Link> : <Link to="/login">Login</Link>}
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
