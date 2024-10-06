const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    dueDate: {
        type: Date,
        // required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in progress', 'completed'],
        default: 'pending',
    },
    assignedUser: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Create task model
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;