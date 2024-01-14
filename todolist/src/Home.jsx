// Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';
import Create from './Create';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

function Home() {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });

  useEffect(() => {
    axios.get("http://localhost:3001/get")
      .then(result => setTodos(result.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleEdit = async (id) => {
    try {
      const result = await axios.put(`http://localhost:3001/update/${id}`, { done: true });
      const updatedTodos = todos.map(todo => (todo._id === id ? { ...todo, done: true } : todo));
      setTodos(updatedTodos);
      showToast("Task marked as done!");
      console.log('Edit result:', result);
    } catch (err) {
      console.error('Edit error:', err);
    }
  }

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:3001/delete/${id}`);
      const updatedTodos = todos.filter(todo => todo._id !== id);
      setTodos(updatedTodos);
      showToast("Task deleted!");
      console.log('Delete result:', result);
    } catch (err) {
      console.error('Delete error:', err);
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleTaskAdded = () => {
    // Fetch updated tasks after a task is added
    axios.get("http://localhost:3001/get")
      .then(result => setTodos(result.data))
      .catch(err => console.error(err));
    showToast("Task added!");
  }

  const showToast = (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className={`home-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1>Todo List</h1>
      <Create onTaskAdded={handleTaskAdded} />
      <br />

      <div className="task-container">
        {todos.length === 0 ? (
          <div><h2>No Record</h2></div>
        ) : (
          <div className="tasks">
            {todos.map((todo, index) => (
              <div className='task' key={todo._id}>
                <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                  {todo.done ? <BsFillCheckCircleFill className='icon' /> : <BsCircleFill className='icon' />}
                  <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                </div>
                <div>
                  <span onClick={() => handleDelete(todo._id)}><BsFillTrashFill className='icon' /></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={toggleDarkMode} className="mode-toggle">
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      <ToastContainer />
    </div>
  );
}

export default Home;
