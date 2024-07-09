const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://josh:josh@cluster0.nonalel.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Expense schema
const expenseSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  card: { type: String, required: true }  // Add card field
});


const Expense = mongoose.model('Expense', expenseSchema);

// Routes
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = password; // await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found:', email);
      return res.status(404).json({ error: 'User not found' });
    }

    // Direct comparison with stored password (plaintext for demonstration, not recommended)
    if (password !== user.password) {
      console.log('Invalid credentials for user:', email);
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    console.log('Login successful for user:', email);
    const userData = { id: user._id, name: user.name, email: user.email };
    res.json({ message: 'Login successful', user: userData });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Error logging in user' });
  }
});

// Add an expense
app.post('/api/expenses', async (req, res) => {
  const { userId, date, price, category, card } = req.body;

  try {
    const newExpense = new Expense({ userId, date, price, category, card });
    await newExpense.save();
    res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
    console.log('Expense added', newExpense)
  } catch (error) {
    res.status(500).json({ error: 'Error adding expense' });
  }
});

// Get expenses for a user
app.get('/api/expenses/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const expenses = await Expense.find({ userId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching expenses' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
