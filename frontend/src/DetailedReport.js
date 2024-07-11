// DetailedReport.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DetailedReport.css'; // Ensure to create this CSS file for styling

const DetailedReport = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses(); // Fetch expenses when the component mounts
  }, []);

  const fetchExpenses = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('user')).id;
      const response = await axios.get(`http://localhost:5000/api/expenses/${userId}`);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  return (
    <div className="detailed-report">
      <h2>Expense Report</h2>
      <div className="expense-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Price</th>
              <th>Category</th>
              <th>Card</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense._id}>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>${expense.price.toFixed(2)}</td>
                <td>{expense.category}</td>
                <td>{expense.card}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailedReport;
