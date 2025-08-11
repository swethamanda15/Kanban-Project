// import React, { useState, memo, useCallback } from 'react';
// import { formatDate } from '../utils/helpers';

// function TaskCard({ task, onEdit, onDelete, draggableProps }) {
//   const [open, setOpen] = useState(false);

//   const toggle = useCallback(() => setOpen(o => !o), []);

//   return (
//     <div
//       className={`task-card priority-${task.priority.toLowerCase()}`}
//       draggable
//       onDragStart={(e) => {
//         e.dataTransfer.setData('text/plain', task.id);
//       }}
//       {...draggableProps}
//     >
//       <div className="task-head" onClick={toggle}>
//         <strong>{task.title}</strong>
//         <span className="meta">{formatDate(task.createdAt)}</span>
//       </div>
//       {open && (
//         <div className="task-body">
//           <p>{task.description}</p>
//           <div className="task-actions">
//             <button onClick={() => onEdit(task)}>Edit</button>
//             <button className="btn-danger" onClick={() => onDelete(task.id)}>Delete</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default memo(TaskCard);

import React, { useState, memo, useCallback } from 'react';
import { formatDate } from '../utils/helpers';

function TaskCard({ task, onEdit, onDelete, draggableProps }) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen(o => !o), []);

  return (
    <div
      className={`task-card priority-${task.priority.toLowerCase()} ${open ? 'open' : ''}`}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', task.id);
      }}
      {...draggableProps}
    >
      <div className="task-head" onClick={toggle} role="button" tabIndex={0}>
        <div className="task-title">
          <strong>{task.title}</strong>
          <span className="meta">{formatDate(task.createdAt)}</span>
        </div>
        <span className="toggle-icon">{open ? '▲' : '▼'}</span>
      </div>

      <div
        className="task-body-wrapper"
        style={{
          maxHeight: open ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease'
        }}
      >
        <div className="task-body">
          <p>{task.description}</p>
          <div className="task-actions">
            <button onClick={(e) => { e.stopPropagation(); onEdit(task); }}>Edit</button>
            <button
              className="btn-danger"
              onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(TaskCard);
