//Todo.js
const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low',
  },
  notes: {
    type: String,
  },
});

const TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = TodoModel;
