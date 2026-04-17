import TaskItem from './TaskItem';

function TaskList({ tasks, onUpdate, onDelete }) {
  if (!tasks.length) {
    return <div className="message">No tasks found. Add your first task.</div>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TaskList;
