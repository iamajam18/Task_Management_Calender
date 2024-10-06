import { useState } from "react";
import axios from 'axios';

const CreateTaskForm = () => {
    const [task, setTask] = useState({ name: ''});

    const handleChange = (e) => {
        console.log(e.target.value);
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5002/tasks', task);
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };
 
    return (
        <form onSubmit={handleSubmit}>
            <input type = "text" name = "name" value = {task.name} onChange={handleChange} placeholder="Task name"/>
            <button type = "submit">Create task</button>
        </form>
    );
};

export default CreateTaskForm;