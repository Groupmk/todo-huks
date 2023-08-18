import React from 'react';
import TaskList from '../task-list/task-list';


const Task = function({
  tasks,
  onToggleDone,
  onToggleDestroy,
  onToggleNewTask,
  onToggleBtn,
  onPauseTimer,
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
        onToggleBtn={() => onToggleBtn(id)}
        onPauseTimer={() => onPauseTimer(id)}
      />
    );
  });
  return (
    <ul className="todo-list">{elements}</ul>
  );
};

export default Task;