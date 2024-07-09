import React, { useState } from 'react';
import axios from 'axios';
import './AddExpenseModal.css';

const AddExpenseModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    date: '',
    price: '',
    category: '',
    card: ''  // New field for card
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem('user')).id;

    try {
      const response = await axios.post('http://localhost:5000/api/expenses/', { ...formData, userId });
      onSave(response.data.expense);
      onClose();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="card">Card:</label>
            <input type="text" id="card" name="card" value={formData.card} onChange={handleChange} required />
          </div>
          <button type="submit">Add Expense</button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
