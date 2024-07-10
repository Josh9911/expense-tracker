import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ onAddExpense }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const handleDetailedReport = () => {
    navigate('/detailed_report');
  };

  return (
    <div className="sidebar">
      <h2>Expense Tracker</h2>
      <ul>
        <li><a href="#" onClick={onAddExpense}>Add Expense</a></li>
        <li><a href="#" onClick={handleDetailedReport}>Detailed Report</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Sidebar;
