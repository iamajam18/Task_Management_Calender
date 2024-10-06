import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';  // Import react-calendar
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import './TaskList.css';  // Custom CSS file for additional styling


const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskById, setTaskById] = useState(null);
    const [taskId, setTaskId] = useState('');
    const [updateTaskData, setUpdateTaskData] = useState({
        name: '',
        description: '',
        status: 'pending'
    });
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get('http://localhost:5002/tasks');
                setTasks(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:5002/tasks/${id}`);
          setTasks(tasks.filter((task) => task._id !== id));  // Update task list after deletion
        } catch (error) {
          console.error(error);
        }
      };
      

    const handleGetTaskById = async () => {
        try {
            const res = await axios.get(`http://localhost:5002/tasks/${taskId}`);
            setTaskById(res.data);
            setUpdateTaskData({
                name: res.data.name,
                description: res.data.description,
                status: res.data.status
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5002/tasks/${taskId}`, updateTaskData);
            setTasks(tasks.map(task => task._id === taskId ? res.data : task));
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setUpdateTaskData({
            ...updateTaskData,
            [e.target.name]: e.target.value
        });
    };

    // Filter tasks by selected date
    const tasksForSelectedDate = tasks.filter(task => {
        return new Date(task.dueDate).toDateString() === selectedDate.toDateString();
    });

    return (
        <div className="task-container">
            <h1>Calendar Task Manager</h1>

            {/* Calendar UI */}
            <div className="calendar-container">
                <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                />
            </div>

            <h2>Tasks for {selectedDate.toDateString()}</h2>
            <ul className="task-list">
                {tasksForSelectedDate.map((task) => (
                    <li key={task._id} className="task-item">
                        <span>{task.name}</span>
                        <button onClick={() => handleDelete(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <div className="task-actions">
                <h3>Get Task by ID</h3>
                <input 
                    type="text" 
                    value={taskId} 
                    onChange={(e) => setTaskId(e.target.value)} 
                    placeholder="Enter Task ID"
                />
                <button onClick={handleGetTaskById}>Get Task</button>

                {taskById && (
                    <form onSubmit={handleUpdateTask}>
                        <h3>Update Task</h3>
                        <input
                            type="text"
                            name="name"
                            value={updateTaskData.name}
                            onChange={handleChange}
                            placeholder="Task name"
                        />
                        <input
                            type="text"
                            name="description"
                            value={updateTaskData.description}
                            onChange={handleChange}
                            placeholder="Task description"
                        />
                        <select
                            name="status"
                            value={updateTaskData.status}
                            onChange={handleChange}
                        >
                            <option value="pending">Pending</option>
                            <option value="in progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <button type="submit">Update Task</button>
                    </form>
                )}
            </div>
        </div>
    );
};


export default TaskList;
