import React, { useState } from 'react';
import axios from "axios";
import './Create.css'; // Import your CSS file for styling

function Create() {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    axios.post("http://localhost:3001/add", { task: task })
    .then(result =>{
        location.reload()
    })
  };

  return (
    <div className="create-container">
      <input
        className="create-input"
        type="text"
        placeholder='Enter Task'
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="create-button" type="button" onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;
