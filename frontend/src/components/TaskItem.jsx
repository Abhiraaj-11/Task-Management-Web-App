import { useState } from 'react';

function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  function handleToggle() {
    onUpdate(task.id, { completed: !task.completed });
  }

  function handleSave() {
    if (!title.trim()) return;
    onUpdate(task.id, { title: title.trim() });
    setEditing(false);
  }

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-main">
        <button className="toggle" onClick={handleToggle} aria-label="Toggle complete">
          {task.completed ? '✓' : '○'}
        </button>

        {editing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="edit-input"
          />
        ) : (
          <span>{task.title}</span>
        )}
      </div>

      <div className="task-actions">
        {editing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={() => setEditing(true)}>Edit</button>
        )}
        <button className="delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
