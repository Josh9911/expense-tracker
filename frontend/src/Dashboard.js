import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import './dashboard.css';  // Import the CSS file for styling

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <h1>Welcome</h1>
        {user && (
          <>
            <p>Hello, {user.name}!</p>
            <p>This is your dashboard.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
