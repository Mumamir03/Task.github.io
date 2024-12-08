const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Middleware for authentication
const auth = require('../middleware/auth');

// Create a task
router.post('/', auth, async (req, res) => {
  const { title, description, deadline, priority } = req.body;
  try {
    const task = new Task({ userId: req.user.id, title, description, deadline, priority });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
  const { title, description, deadline, priority } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, deadline, priority },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
