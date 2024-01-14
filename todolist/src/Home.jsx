//Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill, BsMoon, BsSun } from 'react-icons/bs';
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
    const confirmEdit = window.confirm("Are you sure you want to mark this task as done?");
    
    if (!confirmEdit) {
      return;
    }
  
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
  

  const handleDelete = async (id, task) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${task}"?`);

    if (!confirmDelete) {
      return;
    }

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
        <div className={`task ${todo.priority.toLowerCase()}`} key={todo._id}>
          <div className='task-info' onClick={() => handleEdit(todo._id)}>
            <div>
              <h3 className={todo.done ? "line_through" : ""}>Task name: {todo.task}</h3>
              <p>Details: {todo.notes}</p>
            </div>
            <div className="icons-container">
            {todo.done ? (
            <BsFillCheckCircleFill className='icon done' />
            ) : (
              <BsFillTrashFill className='icon trash' onClick={() => handleDelete(todo._id, todo.task)} />
            )}
            <BsFillTrashFill className='icon trash' onClick={() => handleDelete(todo._id, todo.task)} />
      
            </div>
          </div>
        </div>
      ))}


          </div>
        )}
      </div>

      <button onClick={toggleDarkMode} className="mode-toggle">
        {darkMode ? <BsSun /> : <BsMoon />}
      </button>

      <ToastContainer />
    </div>
  );
}

export default Home;
