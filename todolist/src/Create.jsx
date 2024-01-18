//Create.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './Create.css';

function Create({ onTaskAdded }) {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleAdd = async () => {
    try {
      if (task.trim() === '') {
        setError('Task cannot be empty');
        return;
      }

      const result = await axios.post("http://localhost:3001/add", {
        task: task,
        priority: priority,
        notes: notes
      });

      if (result.data.error) {
        setError(result.data.error);
      } else {
        onTaskAdded(); // Trigger a callback to update the task list
        setTask('');
        setPriority('');
        setNotes('');
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
          setError(''); 
        }}
      />

      <select
        className="create-input"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value=''>Select Priority</option>
        <option value='Low'>Low</option>
        <option value='Medium'>Medium</option>
        <option value='High'>High</option>
      </select>
      <textarea
        className="create-input"
        placeholder='Notes'
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button className="create-button" type="button" onClick={handleAdd}>Add</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Create;
