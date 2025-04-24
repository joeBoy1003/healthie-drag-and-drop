import { useState } from 'react'
import './App.css'
import { Task } from './types';
import Confetti from 'react-confetti';
import TaskComponent from './components/Task';

const initialTasks: Task[] = [
  { id: 1, title: 'Walk around' },
  { id: 2, title: 'Do exercise' },
  { id: 3, title: 'Write a note' },
];

function App() {
  const [todo, setTodo] = useState<Task[]>(initialTasks);
  const [doing, setDoing] = useState<Task[]>([]);
  const [done, setDone] = useState<Task[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleDrop = (task: Task, targetList: string) => {
    if (targetList === 'done') {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }

    const moveTask = (sourceList: Task[], targetList: Task[]) => {
      targetList.push(task);
      const updatedSourceList = sourceList.filter(item => item.id !== task.id);
      const res = { newSource: updatedSourceList, newTarget: targetList };
      console.log(res);
      return res;
    }

    switch(targetList) {
      case 'todo':
        const newTodo = moveTask(doing, todo);
        setTodo(newTodo.newTarget);
        setDoing(newTodo.newSource);
        break;
      case 'doing':
        const newDoing = moveTask(todo, doing);
        setDoing(newDoing.newTarget);
        setTodo(newDoing.newSource);
        break;
      case 'done':
        const newDone = moveTask(doing, done);
        setDone(newDone.newTarget);
        setDoing(newDone.newSource);
        break;
      default:
        break;
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold mb-4'>Task Manager</h1>
      <div className='flex min-w-[600px] space-x-4'>
        <div className='w-1/3 bg-gray-200 p-4 rounded'>
          <h2 className='text-xl font-semibold mb-2'>To Do</h2>
          {todo.map(task => (
            <TaskComponent 
              key={task.id} 
              task={task} 
              progress="todo" 
              onDrop={handleDrop}
            />
          ))}
        </div>
        
        <div className='w-1/3 bg-gray-200 p-4 rounded'>
          <h2 className='text-xl font-semibold mb-2'>Doing</h2>
          {doing.map(task => (
            <TaskComponent 
              key={task.id} 
              task={task} 
              progress="doing" 
              onDrop={handleDrop}
            />
          ))}
        </div>
        
        <div className='w-1/3 bg-gray-200 p-4 rounded'>
          <h2 className='text-xl font-semibold mb-2'>Done</h2>
          {done.map(task => (
            <TaskComponent 
              key={task.id} 
              task={task} 
              progress="done" 
              onDrop={handleDrop}
            />
          ))}
        </div>

        { showConfetti && <Confetti /> }
      </div>
    </div>
  )
}

export default App;
