import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import SpendingChart from "./SpendingChart";
import AddExpenseModal from "./AddExpenseModal";
import axios from "axios";
import './Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [cards, setCards] = useState([]);  // State to store list of cards
  const [selectedCard, setSelectedCard] = useState("");  // State to track selected card
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchExpenses(userData.id);
      fetchCards(userData.id);  // Fetch cards when component mounts
    }
  }, []);

  const fetchExpenses = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/expenses/${userId}`);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchCards = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cards/${userId}`);  // Adjust endpoint for fetching cards
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const handleCardChange = (event) => {
    setSelectedCard(event.target.value);
  };

  const filteredExpenses = selectedCard ? expenses.filter(expense => expense.card === selectedCard) : expenses;

  return (
    <div className="dashboard">
      <Sidebar onAddExpense={() => setIsModalOpen(true)} />
      <div className="main-content">
        <h1>Welcome</h1>
        {user && (
          <>
            <p>Hello, {user.name}!</p>
            <div>
              {/* First Pie Chart with Dropdown */}
              <select value={selectedCard} onChange={handleCardChange}>
                <option value="">All Cards</option>
                {cards.map(card => (
                  <option key={card} value={card}>{card}</option>
                ))}
              </select>
              <SpendingChart data={filteredExpenses} />
            </div>
            <div>
              {/* Second Pie Chart */}
              <h2>Total Expenses</h2>
              <SpendingChart data={expenses} />
            </div>
          </>
        )}
      </div>
      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddExpense}
      />
    </div>
  );
}

export default Dashboard;
