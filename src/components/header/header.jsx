import React from 'react';
import TaskForm from '../task-form/task-form';

const Header = function ({ newTask, addNewTask, setNewTask,minutes, onChangeMinutes, seconds, onChangeSeconds, setMinutes, setSeconds }) {
    
  return (
    <header className="header">
      <TaskForm newTask={newTask} 
        addNewTask={addNewTask}
        setNewTask={setNewTask}
        onChangeMinutes={onChangeMinutes}
        onChangeSeconds={onChangeSeconds}
        minutes={minutes}
        seconds={seconds}
        setMinutes={setMinutes}
        setSeconds={setSeconds} />
    </header>
  );
};
export default Header;
