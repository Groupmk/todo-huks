import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/header/header';
import Task from '../components/task/task';
import Footer from '../components/footer/footer';



const App = () => {
  const [maxId, setMaxId] = useState(100); 
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [tigger, setTrigger] = useState(false);
  const addNewTask = (label, minutes, seconds) => {
    
    const newSetTask = {
      id: maxId + 1, 
      label: label,
      done: false,
      createdDate: new Date(),
      timeBtn: false,
      minutes: minutes,
      seconds: seconds,
        
    };
    console.log(newSetTask);
    setTasks([...tasks, newSetTask]);
    setNewTask('');
    setMaxId(maxId + 1); 
    
  };  
  const onToggleDone = (id) => {
    setTasks(tasks.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          done: !item.done,
        };
      }
      return item;
    }));
  };

  const onToggleDestroy = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const setsFilter = (filter) => {
    setFilter(filter);
  };

  const filterTasks = (tasks) =>{
    switch (filter) {
    case 'all':
      return tasks;
    case 'active':
      return tasks.filter((item) => !item.done);
    case 'completed':
      return tasks.filter((item) => item.done);
    default:
      return tasks;
    }
  };
  const filteredTasks = filterTasks(tasks);
  const doneCount = filteredTasks.filter((item) => item.done).length;
  const clearDoneCount = () => {
    setTasks(tasks.filter((item) => !item.done));
  };
  const onToggleNewTask = (id, text,) => {
    setTasks(tasks.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          label: text,
        };
      }
      return item;
    }));
  };
  
  const onTriggerBtn = (id) => {
    // console.log(id);
    if(!tigger){
      setTrigger(true);
      ref.current = setInterval(()=>{
        setTasks((tasks) => {
          console.log('qqq');
          const idx = tasks.findIndex((item) => item.id === id);
          console.log(idx);
          if (idx === -1) {
            clearInterval( ref.current );
            setTrigger(false);
            return [...tasks];
          }
          const oldItem = tasks[idx];
          let newItem = {
            ...oldItem,
            seconds: oldItem.seconds - 1,
          };
          if (newItem.seconds < 0) {
            newItem = {...newItem, minutes: oldItem.minutes - 1, seconds: 59};
          }
          if (newItem.seconds === 0 && newItem.minutes === 0) {
            clearInterval( ref.current );
            setTrigger(false);
          }
          console.log(newItem);
          return [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)];
        });
      },1000);
    }
  };


  const ref = useRef();

  useEffect(() => {
    ref.current = 5;
  }, []);

  const pauseTimer = () => {
    clearInterval(ref.current);
    setTrigger(false);
  };
  
  return (
    <section className="todo-app">
      <Header newTask={newTask} 
        addNewTask={addNewTask} 
        setNewTask={setNewTask}
      
      />
      <section className="main">
        <Task tasks={filteredTasks} 
          onToggleDone={onToggleDone}
          onToggleDestroy={onToggleDestroy}
          onToggleNewTask={onToggleNewTask}
          onTriggerBtn={onTriggerBtn}
          pauseTimer={pauseTimer}
        />
        <Footer 
          filter={filter}
          setsFilter={setsFilter}
          doneCount={doneCount}
          onClearDoneCount={clearDoneCount}
        />
      </section>
    </section>
  );
};

export default App;
