import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Redirect to sign-in page
    navigate('/signin');
  };

  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Sidebar;