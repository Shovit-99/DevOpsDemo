// Base TaskList Component - Initial Version (Template Repository)
// In Scenario 2, Dev A and Dev B will concurrently modify this file

import React from 'react';

export default function TaskList({ tasks, onToggleStatus, onDeleteTask }) {
  if (!tasks || tasks.length === 0) {
    return <div className="no-tasks">No tasks found. Create a new task to get started!</div>;
  }

  // --- MERGE CONFLICT ZONE (Scenario 2) ---
  const [searchQuery, setSearchQuery] = React.useState('');
  const displayedTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // --- END ZONE ---

  return (
    <div className="task-list-container">
      <div className="search-bar" style={{ marginBottom: '15px' }}>
        <input 
          type="text" 
          placeholder="Search active tasks..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <h3>Active Tasks ({displayedTasks.length})</h3>
      <div className="task-grid">
        {displayedTasks.map(task => (
          <div key={task.id} className={`task-card status-${task.status.toLowerCase()}`}>
            <div className="task-header">
              <span className={`badge priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
              <span className="task-id">#{task.id}</span>
            </div>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <div className="task-actions">
              <button onClick={() => onToggleStatus(task.id)}>
                Mark {task.status === 'Completed' ? 'Pending' : 'Completed'}
              </button>
              <button className="btn-delete" onClick={() => onDeleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

