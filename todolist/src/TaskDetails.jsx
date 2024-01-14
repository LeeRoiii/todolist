// TaskDetails.jsx
import React from 'react';

function TaskDetails({ task }) {
  return (
    <div className="task-details">
      <h2>{task.task}</h2>
      <p><strong>Priority:</strong> {task.priority}</p>
      <p><strong>Notes:</strong> {task.notes}</p>
      {/* Add other details as needed */}
    </div>
  );
}

export default TaskDetails;
