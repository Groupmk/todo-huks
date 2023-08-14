import React from 'react';
import TaskFilter from '../task-filter/task-filter';
const Footer = function ({setsFilter, filter, doneCount, onClearDoneCount }) {
  return(
    <footer className="footer">
      <span className="todo-count"> completed {doneCount}</span>
      <TaskFilter 
        setsFilter={setsFilter}
        filter={filter}
        onClearDoneCount={onClearDoneCount}
      />
    </footer>
  );
};

export default Footer;