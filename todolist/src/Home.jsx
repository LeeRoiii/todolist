import React, { useState } from 'react';
import Create from './Create';
import './Home.css'; // Import your CSS file

function Home() {
  const [todos, setTodos] = useState([]);

  return (
    <div className="home-container">
      <h1>Todo List</h1>
      <Create />
      {todos.length === 0 ? (
        <div className="no-record">
          <h4>No Record</h4>
        </div>
      ) : (
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className="todo-item">
              {todo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
