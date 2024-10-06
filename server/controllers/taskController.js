const Task = require('../models/taskModel');

// Create a task
exports.createTask = async (req, res) =>{
    try{
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error : error.message});
    }
};

// Get all tasks
exports.getAllTasks = async (req, res) =>{
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error : error.message});
    }
};

// Get task by ID
exports.getTaskById = async (req, res) =>{
    try{
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found'});
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error : error.message});
    }
};

// Update task
exports.updateTask = async (req, res) =>{
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new : true});
        if (!task) return res.status(404).json({ message: 'Task not found'});
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error : error.message});
    }
};

// Delete task
exports.deleteTask = async(req, res) =>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message : 'Task not found'});
        res.status(200).json({ message : 'Task deleted successfully'});
    } catch (error) {
        res.status(500).json({ error : error.message});
    }
};