import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import logo from "./logo.svg";
import "./index.css";


const fakeAuth = {
  isAuthenticated: false,
  users: {},
  signup(username, password, cb) {
    if (!this.users[username]) {
      this.users[username] = password;
      localStorage.setItem("users", JSON.stringify(this.users));
      cb();
    } else {
      alert("User already exists");
    }
  },
  login(username, password, cb) {
    if (this.users[username] === password) {
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

const AuthPage = ({ isLogin, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      fakeAuth.login(username, password, () => setUser({ username }));
    } else {
      fakeAuth.signup(username, password, () => alert("Signup successful!"));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.img src={logo} alt="Logo" className="w-16 fixed top-4 right-4 animate-pulse" />
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 text-center">
        <h2 className="text-2xl font-bold text-gray-700">{isLogin ? "Login" : "Signup"}</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input className="border p-2 w-full my-2 rounded" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input className="border p-2 w-full my-2 rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-2 hover:bg-blue-600" type="submit">{isLogin ? "Login" : "Signup"}</button>
        </form>
        <Link to={isLogin ? "/signup" : "/login"} className="text-blue-500 mt-4 block">
          {isLogin ? "Create an account" : "Already have an account? Login"}
        </Link>
      </div>
    </div>
  );
};

const Dashboard = ({ user, setUser }) => {
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <FaUserCircle className="text-5xl text-gray-600 mx-auto" />
        <h2 className="text-2xl font-bold mt-4">Welcome, {user.username}!</h2>
        <button className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-red-600" onClick={() => fakeAuth.logout(() => setUser(null))}>Logout</button>
      </motion.div>
    </div>
  );
};

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
    <motion.img src={logo} alt="Logo" className="w-24 animate-pulse" />
    <h1 className="text-3xl font-bold text-gray-700">Welcome to Donation Platform</h1>
    <p className="text-gray-600 mt-2">Charity Pulse: Connecting donors, charities, and individuals in need.</p>
    <div className="mt-4">
      <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">Login</Link>
      <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Signup</Link>
    </div>
  </div>
);

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  fakeAuth.users = JSON.parse(localStorage.getItem("users")) || {};

  return (
    <Router>
      <nav className="p-4 bg-blue-600 text-white flex justify-between shadow-lg">
        <Link to="/" className="text-lg font-bold">Donation Platform</Link>
        <div>
          {user ? <Link to="/dashboard" className="mr-4">Dashboard</Link> : <Link to="/login">Login</Link>}
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={<AuthPage isLogin={true} setUser={setUser} />} />
        <Route path="/signup" element={<AuthPage isLogin={false} setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;