// Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';
import Create from './Create';
import './Home.css';

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/get")
      .then(result => setTodos(result.data))
      .catch(err => console.error(err));
  }, []);

  const handleEdit = (id) => {
    console.log('Edit clicked for id:', id);
    axios.put(`http://localhost:3001/update/${id}`, { done: true })
      .then(result => {
        console.log('Edit result:', result);
        location.reload();
      })
      .catch(err => console.error('Edit error:', err));
  }
  
  

  const handleDelete = (id) => {
    console.log('Delete clicked for id:', id);
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(result => {
        console.log('Delete result:', result);
        location.reload();
      })
      .catch(err => console.error('Delete error:', err));
  }

  return (
    <div className="home-container">
      <h1>Todo List</h1>
      <Create />
      <br />

      <ul className="todo-list">
        {todos.length === 0 ? (
          <div><h2>No Record</h2></div>
        ) : (
          todos.map(todo => (
            <div className='task' key={todo.id}>
              <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                {todo.done ? <BsFillCheckCircleFill className='icon' /> : <BsCircleFill className='icon' />}
                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
              </div>
              <div>
                <span onClick={() => handleDelete(todo._id)}><BsFillTrashFill className='icon' /></span>
              </div>
            </div>
          ))
        )}
      </ul>
    </div>
  );
}

export default Home;
