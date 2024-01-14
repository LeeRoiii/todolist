// Home.jsx
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Create from './Create';
import './Home.css'; // Import your CSS file

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/get")
      .then(result => setTodos(result.data))
      .catch(err => console.error(err))
  }, []);

  return (
    <div className="home-container">
      <h1>Todo List</h1>
      <Create />
      <ul className="todo-list">
        {todos.length === 0
          ? <div className="no-record"><h4>No Record</h4></div>
          : todos.map(todo => (
            <li key={todo._id} className="todo-item">
              <div className="todo-text">{todo.task}</div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Home;
