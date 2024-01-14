// Example Create.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './Create.css';

function Create({ onTaskAdded }) {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');

  const handleAdd = async () => {
    try {
      if (task.trim() === '') {
        setError('Task cannot be empty');
        return;
      }

      const result = await axios.post("http://localhost:3001/add", { task: task });
      
      if (result.data.error) {
        setError(result.data.error);
      } else {
        onTaskAdded(); // Trigger a callback to update the task list
        setTask('');
        setError('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="create-container">
      <input
        className="create-input"
        type="text"
        placeholder='Enter Task'
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
          setError(''); // Clear error when input changes
        }}
      />
      <button className="create-button" type="button" onClick={handleAdd}>Add</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Create;
