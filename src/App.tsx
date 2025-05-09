import { useCallback, useState } from 'react'
import './App.css'
import { DragDropResult, Progress, Task } from './types';
import Confetti from 'react-confetti';
import DropZone from './components/DropZone';
import AddForm from './components/AddForm';

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
  
  const [count, setCount] = useState(initialTasks.length);
  const [input, setInput] = useState<string>('');
  let temp: DragDropResult;

  const handleDrop = useCallback(
    (task: Task, targetList: string) => {
      const moveTask = (sourceList: Task[], targetList: Task[]) => {
        targetList.push(task);
        const updatedSourceList = sourceList.filter(item => item.id !== task.id);
        temp = { newSource: updatedSourceList, newTarget: targetList };
        console.log("task", task);
        console.log("targetList", targetList);
        console.log("sourceList", sourceList);
        console.log("res", temp);
        return temp;
      }

      switch (targetList) {
        case Progress.TODO:
          const isDone = done.some(item => item.id === task.id);

          if(isDone) {
            temp = moveTask(done, todo);
            setDone(temp.newSource);
          } else if(doing.some(item => item.id === task.id)) {
            temp = moveTask(doing, todo);
            setDoing(temp.newSource);
          } else return;
          setTodo(temp.newTarget);
          break;

        case Progress.DOING:
          const isTodo = todo.some(item => item.id === task.id);

          if(isTodo) {
            temp = moveTask(todo, doing);
            setTodo(temp.newSource);
          } else if(done.some(item => item.id === task.id)) {
            temp = moveTask(done, doing);
            setDone(temp.newSource);
          } else return;
          setDoing(temp.newTarget);
          break;

        case Progress.DONE:
          const isDoing = doing.some(item => item.id === task.id);

          if(isDoing) {
            temp = moveTask(doing, done);
            setDoing(temp.newSource);
          } else if(todo.some(item => item.id === task.id)) {
            temp = moveTask(todo, done);
            setTodo(temp.newSource);
          } else return;
          setDone(temp.newTarget);
          break;

        default:
          break;
      }

      if (targetList === Progress.DONE) {
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      }
    }, [todo, doing, done]
  );

  const handleAddTask = (e: any) => {
    e.preventDefault();
    const newTask = {
      id: count + 1,
      title: input,
    };
    setInput('');
    setTodo((prev) => [...prev, newTask]);
    setCount(count + 1);
  };

  const handleChange = (e: any) => {
    setInput(e.target.value);
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold mb-4'>Task Manager</h1>
      <AddForm
        input={input}
        onAddTask={handleAddTask}
        onChange={handleChange}
      />
      <div className='flex min-w-[600px] space-x-4'>
        <DropZone onDrop={handleDrop} progress={Progress.TODO} tasks={todo} />
        <DropZone onDrop={handleDrop} progress={Progress.DOING} tasks={doing} />
        <DropZone onDrop={handleDrop} progress={Progress.DONE} tasks={done} />
      </div>

      {showConfetti && <Confetti />}
    </div>
  )
}

export default App;
