//index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy; // Added LocalStrategy
const User = require('./Models/User');
const TodoModel = require('./Models/Todo');
const authRoutes = require('./Routes/auth');

const app = express();
const PORT = 3001;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Add session middleware for Passport.js
app.use(
  session({
    secret: 'Pogikopramis', // Replace with a strong and secure secret
    resave: true,
    saveUninitialized: true
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport LocalStrategy
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));



passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API endpoint to get all todos
app.get('/get', async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to update a todo by ID
app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Find and update the todo by ID
    const updatedTodo = await TodoModel.findByIdAndUpdate(id, { done: true }, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to add a new todo
app.post('/add', async (req, res) => {
  const { task, notes } = req.body;

  try {
    // Create a new todo
    const newTodo = await TodoModel.create({ task, notes });
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to delete a todo by ID
app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Find and delete the todo by ID
    const deletedTodo = await TodoModel.findByIdAndDelete(id);
    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Use authentication routes
app.use('/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});