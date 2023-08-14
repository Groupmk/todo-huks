import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';



const TaskList = function(props) {
  const { label,
    onToggleDone,
    done,
    onToggleDestroy,
    onToggleNewTask,
    createdDate,
    updateInterval,
    minutes,
    seconds,
    onTriggerBtn,
    pauseTimer,
  } = props;
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(label);
  const [formatedDistance, setFormatedDistance] = useState('');

  

  const startEditing = () => {
    setEditing(true);
  };

  const finishEditing = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue === '') {
      onToggleNewTask(label); 
    } else {
      onToggleNewTask(trimmedValue);
    }

    setEditing(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      finishEditing();
    } else if (e.keyCode === 27) {
      setInputValue(label);
      setEditing(false);
    }
  };

  useEffect(() => {
    const updateFormattedDistance = () => {
      const formattedDistance = formatDistanceToNow(createdDate, { addSuffix: true });
      setFormatedDistance(formattedDistance);
    };

    updateFormattedDistance(); 

    const intervalId = setInterval(updateFormattedDistance, updateInterval);

    return () => {
      clearInterval(intervalId); 
    };
  }, [createdDate, updateInterval]);

  return (
    <li className={done ? 'completed' : 'description'}>
      {editing ? ( 
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={onToggleDone}
            checked={done}
          />
          <input 
            className="edit-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={finishEditing}
            onKeyDown={handleKeyPress}
            autoFocus 
          />
        </div>
      ) : (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={onToggleDone}
            checked={done}
          />
          <label>
            <span className="description">{label}</span>
            <span className="timer">
              <button className='icon icon-play' onClick={onTriggerBtn}></button>
                
              <button className='icon icon-pause' onClick={pauseTimer}></button>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="created">{formatedDistance}</span>
          </label>
          <button className="icon icon-edit" onClick={startEditing}></button>
          <button className="icon icon-destroy" onClick={onToggleDestroy}></button>
        </div>
      )}
    </li>
  );
};

export default TaskList;
