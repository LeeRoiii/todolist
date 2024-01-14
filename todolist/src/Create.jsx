import React, { useState } from "react";
import "./Create.css"; // Import your CSS file for styling

function Create() {
  const [task, setTask] = useState("");

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    // Add your logic here to handle the addition of the task
    console.log("Task added:", task);
    // You can further enhance this function based on your requirements
  };

  return (
    <div className="create-container">
      <input
        type="text"
        name="name"
        placeholder="Add a new task..."
        value={task}
        onChange={handleTaskChange}
        className="create-input"
      />
      <button type="button" onClick={handleAddTask} className="create-button">
        Add
      </button>
    </div>
  );
}

export default Create;
