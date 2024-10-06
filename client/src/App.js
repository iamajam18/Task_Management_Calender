import logo from './logo.svg';
import './App.css';
import CreateTaskForm from './components/CreateTaskForm';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App">
      <CreateTaskForm />
      <TaskList />
    </div>
  );
}

export default App;


