const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

// Create a task
router.post('/', TaskController.createTask);

// Get all tasks
router.get('/', TaskController.getAllTasks);

// Get a task by ID
router.get('/:id', TaskController.getTaskById);

// Update a task 
router.put('/:id', TaskController.updateTask);

// Delete a task
router.delete('/:id', TaskController.deleteTask);

module.exports = router;