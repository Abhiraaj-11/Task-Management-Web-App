const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 5000;
const DATA_PATH = path.join(__dirname, 'data', 'tasks.json');

app.use(cors());
app.use(express.json());

async function readTasks() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
      await fs.writeFile(DATA_PATH, '[]');
      return [];
    }
    throw error;
  }
}

async function writeTasks(tasks) {
  await fs.writeFile(DATA_PATH, JSON.stringify(tasks, null, 2), 'utf8');
}

app.get('/tasks', async (req, res) => {
  const tasks = await readTasks();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ message: 'Task title is required' });
  }

  const tasks = await readTasks();
  const newTask = {
    id: Date.now().toString(),
    title: title.trim(),
    completed: false
  };

  tasks.push(newTask);
  await writeTasks(tasks);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const tasks = await readTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (title !== undefined) {
    tasks[taskIndex].title = String(title).trim();
  }
  if (completed !== undefined) {
    tasks[taskIndex].completed = Boolean(completed);
  }

  await writeTasks(tasks);
  res.json(tasks[taskIndex]);
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const tasks = await readTasks();
  const filtered = tasks.filter((task) => task.id !== id);

  if (filtered.length === tasks.length) {
    return res.status(404).json({ message: 'Task not found' });
  }

  await writeTasks(filtered);
  res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => {
  console.log(`Task manager API running on http://localhost:${PORT}`);
});
