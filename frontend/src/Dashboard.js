import React from "react";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : {};

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>This is your dashboard.</p>
    </div>
  );
}

export default Dashboard;