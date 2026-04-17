import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError('Unable to load tasks.');
    } finally {
      setLoading(false);
    }
  }

  async function addTask(title) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    if (!response.ok) {
      setError('Unable to add task.');
      return;
    }
    const task = await response.json();
    setTasks((prev) => [...prev, task]);
  }

  async function updateTask(id, updates) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!response.ok) {
      setError('Unable to update task.');
      return;
    }
    const updated = await response.json();
    setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
  }

  async function deleteTask(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      setError('Unable to delete task.');
      return;
    }
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <div className="app-shell">
      <header>
        <h1>Task Management App</h1>
        <p>Add, view, update, and delete your tasks.</p>
      </header>

      <TaskForm onAdd={addTask} />

      {error && <div className="message error">{error}</div>}
      {loading ? (
        <div className="message">Loading tasks...</div>
      ) : (
        <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
      )}
    </div>
  );
}

export default App;
