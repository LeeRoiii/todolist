// Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';
import Create from './Create';
import TaskDetails from './TaskDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal'; // Import Modal from react-modal
import './Home.css';

Modal.setAppElement('#root'); // Set the root element for the modal

function Home() {
  const [todos, setTodos] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode')) || false;
  });
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to control the modal

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

  const openModal = (task) => {
    setSelectedTask(task);
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setSelectedTask(null);
    setModalIsOpen(false);
  }

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
                  <p className="priority">{todo.priority}</p>
                  <p className="notes">{todo.notes}</p>
                  <button onClick={() => openModal(todo)}>Details</button>
                </div>
                <div>
                  <span onClick={() => handleDelete(todo._id, todo.task)}><BsFillTrashFill className='icon' /></span>
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

      {/* Render TaskDetails component in a modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        {selectedTask && <TaskDetails task={selectedTask} />}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default Home;
