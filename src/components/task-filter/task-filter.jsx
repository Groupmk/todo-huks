import React from 'react';

const TaskFilter = function(props) {
  const { setsFilter, filter, onClearDoneCount } = props;
  return (
    <>
      <ul className="filters">
        <li>
          <button className={filter === 'all' ? 'selected' : ''} onClick={() => setsFilter('all')}>
            All
          </button>
        </li>
        <li>
          <button className={filter === 'active' ? 'selected' : ''} onClick={() => setsFilter('active')}>
            Active
          </button>
        </li>
        <li>
          <button className={filter === 'completed' ? 'selected' : ''} onClick={() => setsFilter('completed')}>
            Completed
          </button>
        </li>
      </ul>
      <button className="clear-completed" onClick={onClearDoneCount}>
        Clear completed
      </button>
    </>
  );
};

export default TaskFilter;
