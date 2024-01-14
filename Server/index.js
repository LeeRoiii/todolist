const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.get('/get', async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(id, { done: true }, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/add', async (req, res) => {
    const { task,notes } = req.body;
  
    try {
      const newTodo = await TodoModel.create({ task, notes });
      res.json(newTodo);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id);
    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
