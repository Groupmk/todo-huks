import React, { useState, useEffect } from 'react';
import Header from '../components/header/header';
import Task from '../components/task/task';
import Footer from '../components/footer/footer';

const App = () => {
  const [maxId, setMaxId] = useState(100);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [timers, setTimers] = useState([]);

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
    setTasks([...tasks, newSetTask]);
    setNewTask('');
    setMaxId(maxId + 1);
  };

  const onToggleDone = (id) => {
    setTasks(tasks.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const onToggleDestroy = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const setsFilter = (filter) => {
    setFilter(filter);
  };

  const filterTasks = (tasks) => {
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

  const onToggleNewTask = (id, text) => {
    setTasks(tasks.map((item) => (item.id === id ? { ...item, label: text } : item)));
  };

  const onToggleBtn = (id) => {
    setTasks(tasks.map((item) => 
      item.id === id ? { ...item, timeBtn: !item.timeBtn } : item
    ));
  };

  const onPauseTimer = (id) => {
    setTasks(tasks.map((item) => 
      item.id === id ? { ...item, timeBtn: false } : item
    ));
  };

  useEffect(() => {
    const timers = tasks.map((task) => {
      if (task.timeBtn) {
        return setInterval(() => {
          setTasks((tasks) => {
            const idx = tasks.findIndex((item) => item.id === task.id);
            if (idx === -1) {
              clearInterval(timers[idx]);
              return tasks;
            }
            const oldItem = tasks[idx];
            let newMinutes = oldItem.minutes;
            let newSeconds = oldItem.seconds - 1;
  
            if (newSeconds < 0) {
              if (newMinutes > 0) {
                newMinutes -= 1;
                newSeconds = 59;
              } else {
                newMinutes = 0;
                newSeconds = 0;
                clearInterval(timers[idx]); 
              }
            }
  
            const newItem = {
              ...oldItem,
              minutes: newMinutes,
              seconds: newSeconds,
            };
  
            return [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)];
          });
        }, 1000);
      }
      return null;
    });
  
    return () => {
      timers.forEach((timer) => clearInterval(timer));
    };
  }, [tasks]);
  
  
  return (
    <section className="todo-app">
      <Header newTask={newTask} addNewTask={addNewTask} setNewTask={setNewTask} />
      <section className="main">
        <Task
          tasks={filteredTasks}
          onToggleDone={onToggleDone}
          onToggleDestroy={onToggleDestroy}
          onToggleNewTask={onToggleNewTask}
          onToggleBtn={onToggleBtn}
          onPauseTimer={onPauseTimer}
        />
        <Footer filter={filter} setsFilter={setsFilter} doneCount={doneCount} onClearDoneCount={clearDoneCount} />
      </section>
    </section>
  );
};

export default App;
