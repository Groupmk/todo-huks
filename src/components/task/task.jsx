import React from 'react';
import TaskList from '../task-list/task-list';


const Task = function({
  tasks,
  onToggleDone,
  onToggleDestroy,
  onToggleNewTask,
  onTriggerBtn,
  pauseTimer,
}) {
  const elements = tasks.map((item) => {
    const { id, ...props } = item;
    return (
      <TaskList
        {...props}
        key={id}
        onToggleDone={() => onToggleDone(id)}
        onToggleDestroy={() => onToggleDestroy(id)}
        onToggleNewTask={(text) => onToggleNewTask(id, text)}
        minutes={item.minutes}
        seconds={item.seconds}
        onTriggerBtn={() => onTriggerBtn(id)}
        pauseTimer={() => pauseTimer()}
        toggleTimer
      />
    );
  });
  return (
    <ul className="todo-list">{elements}</ul>
  );
};

export default Task;