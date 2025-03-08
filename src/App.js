HEAD
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

import React, { useState } from 'react';
import { FaUserCircle, FaBoxOpen, FaCog } from 'react-icons/fa';

const App = () => {
  // Example state for user profile and listings
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    imageUrl: 'https://www.gravatar.com/avatar/00000000000000000000000000000000',
  });

  const [listings, setListings] = useState([
    { id: 1, title: 'Item 1', description: 'Description of item 1' },
    { id: 2, title: 'Item 2', description: 'Description of item 2' },
    { id: 3, title: 'Item 3', description: 'Description of item 3' },
    { id: 4, title: 'Item 4', description: 'Description of item 4' },
  ]);
55e9f31 (Updated user dashboard with new changes)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 h-full bg-gradient-to-b from-indigo-600 to-indigo-800 text-white p-6 shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <FaUserCircle className="text-6xl" />
        </div>
HEAD
      </nav>
      <Routes>
        <Route path="/login" element={<AuthPage isLogin={true} setUser={setUser} />} />
        <Route path="/signup" element={<AuthPage isLogin={false} setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>

        <ul className="space-y-4">
          <li>
            <a href="#profile" className="text-lg font-medium hover:text-indigo-300 transition-all">
              Profile
            </a>
          </li>
          <li>
            <a href="#listings" className="text-lg font-medium hover:text-indigo-300 transition-all">
              My Listings
            </a>
          </li>
          <li>
            <a href="#orders" className="text-lg font-medium hover:text-indigo-300 transition-all">
              Orders
            </a>
          </li>
          <li>
            <a href="#settings" className="text-lg font-medium hover:text-indigo-300 transition-all">
              Settings
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">User Profile Dashboard</h1>

        {/* Profile Section */}
        <div id="profile" className="bg-white p-8 rounded-2xl shadow-lg mb-10">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">Profile</h2>
          <div className="flex items-center mb-4">
            <img
              src={profile.imageUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-indigo-600 mr-6"
            />
            <div>
              <h3 className="text-2xl font-medium text-gray-800">{profile.name}</h3>
              <p className="text-lg text-gray-600">{profile.email}</p>
            </div>
          </div>
          <button className="mt-4 py-3 px-6 bg-indigo-600 text-white rounded-full text-lg font-semibold hover:bg-indigo-700 focus:outline-none transition-all">
            Edit Profile
          </button>
        </div>

        {/* My Listings Section */}
        <div id="listings" className="bg-white p-8 rounded-2xl shadow-lg mb-10">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">My Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <FaBoxOpen className="text-5xl text-indigo-600 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">{listing.title}</h3>
                <p className="text-lg text-gray-600 mb-4">{listing.description}</p>
                <button className="py-2 px-5 bg-green-600 text-white rounded-full text-lg font-semibold hover:bg-green-700 focus:outline-none transition-all">
                  Edit Listing
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
 55e9f31 (Updated user dashboard with new changes)
  );
}

export default App;