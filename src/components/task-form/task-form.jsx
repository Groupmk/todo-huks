import React, { useState, useRef } from 'react';

const TaskForm = function({ addNewTask }) {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [label, setLabel] = useState('');
  
  const secondsInputRef = useRef(null);
  

  const onSubmit = (e) => {
    e.preventDefault();
    addNewTask(label, minutes, seconds);
    setMinutes('');
    setSeconds('');
    setLabel('');
  };

  const handleSecondsChange = (e) => {
    const newSeconds = e.target.value;
    if (newSeconds === '' || (Number(newSeconds) >= 0 && Number(newSeconds) <= 59)) {
      setSeconds(newSeconds);
    }
  };

  const handleMinutesChange = (e) => {
    const newMinutes = e.target.value;
    if (newMinutes === '' || (Number(newMinutes) >= 0)) {
      setMinutes(newMinutes);
      if (newMinutes.length === 2) {
        secondsInputRef.current.focus();
      }
    }
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        type="text"
        placeholder="What needs to be done?"
        value={label}
        onChange={(e) => {
          setLabel(e.target.value.trim());
        }}
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        type="number"
        placeholder="Min"
        name="minutes"
        value={minutes}
        required
        onChange={handleMinutesChange}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        placeholder="Sec"
        name="seconds"
        value={seconds}
        required
        ref={secondsInputRef}
        onChange={handleSecondsChange}
      />
      <button type="submit"></button>
    </form>
  );
};

export default TaskForm;
