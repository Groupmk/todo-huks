import React, { useState } from 'react';

const TaskForm = function({ addNewTask }) {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [label, setLabel] = useState('');
  

  const onSubmit = (e) => {
    e.preventDefault();
    addNewTask(label,minutes,seconds);
    setMinutes('');
    setSeconds('');
    setLabel('');
  };
  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input className="new-todo" 
        type="text" placeholder="What needs to be done?" 
        value={label}
        onChange={(e) => {
          setLabel(e.target.value.trim());
        }}
        autoFocus/>
      <input
        className="new-todo-form__timer"
        type="number"
        placeholder="Min"
        name="minutes"
        value={minutes}
        required
        autoFocus
        onChange={(e) => setMinutes(Number(e.target.value))}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        placeholder="Sec"
        name="seconds"
        value={seconds}
        required
        autoFocus
        onChange={(e)=> setSeconds(Number(e.target.value))}
      />
      <button type='submit'></button>
    </form>
  );
};

export default TaskForm;