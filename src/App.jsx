// import React, { useCallback, useMemo, useState } from 'react';
// import useLocalStorage from './hooks/useLocalStorage';
// import { sampleBoard, generateId } from './utils/helpers';
// import Column from './components/Column';
// import TaskForm from './components/TaskForm';
// import Modal from './components/Modal';

// export default function App() {
//   const [board, setBoard] = useLocalStorage('kanban-board', sampleBoard);
//   const [showForm, setShowForm] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [query, setQuery] = useState('');
//   const [filterPriority, setFilterPriority] = useState('All');
//   const [dark, setDark] = useLocalStorage('kanban-dark', false);

//   const tasksArray = useMemo(() => Object.values(board.tasks), [board.tasks]);

//   const filteredTaskIds = useMemo(() => {
//     return tasksArray
//       .filter(t => t.title.toLowerCase().includes(query.toLowerCase()))
//       .filter(t => (filterPriority === 'All' ? true : t.priority === filterPriority))
//       .map(t => t.id);
//   }, [tasksArray, query, filterPriority]);

//   const columnTasks = useMemo(() => {
//     const map = {};
//     Object.values(board.columns).forEach(col => {
//       map[col.id] = col.taskIds
//         .filter(id => filteredTaskIds.includes(id))
//         .map(id => board.tasks[id]);
//     });
//     return map;
//   }, [board, filteredTaskIds]);

//   const openNew = useCallback(() => { setEditing(null); setShowForm(true); }, []);
//   const closeForm = useCallback(() => setShowForm(false), []);

//   const handleSaveTask = useCallback((task, columnId) => {
//     setBoard(prev => {
//       const tasks = { ...prev.tasks, [task.id]: task };
//       const columns = { ...prev.columns };

//       // if new, add to column start
//       if (!prev.tasks[task.id]) {
//         columns[columnId] = { ...columns[columnId], taskIds: [task.id, ...columns[columnId].taskIds] };
//       }

//       return { ...prev, tasks, columns };
//     });
//     setShowForm(false);
//   }, [setBoard]);

//   const handleEditTask = useCallback((task) => {
//     setEditing(task);
//     setShowForm(true);
//   }, []);

//   const handleDeleteTask = useCallback((taskId) => {
//     setBoard(prev => {
//       const tasks = { ...prev.tasks };
//       delete tasks[taskId];
//       const columns = { ...prev.columns };
//       Object.keys(columns).forEach(cid => {
//         columns[cid] = { ...columns[cid], taskIds: columns[cid].taskIds.filter(id => id !== taskId) };
//       });
//       return { ...prev, tasks, columns };
//     });
//   }, [setBoard]);

//   const handleDropTask = useCallback((taskId, toColumnId) => {
//     setBoard(prev => {
//       const columns = { ...prev.columns };
//       // remove from old
//       Object.values(columns).forEach(col => {
//         col.taskIds = col.taskIds.filter(id => id !== taskId);
//       });
//       // insert at top of target
//       columns[toColumnId] = { ...columns[toColumnId], taskIds: [taskId, ...columns[toColumnId].taskIds] };
//       return { ...prev, columns };
//     });
//   }, [setBoard]);

//   const toggleDark = useCallback(() => setDark(d => !d), [setDark]);

//   return (
//     <div className={"app " + (dark ? 'dark' : '')}>
//       <header className="topbar">
//         <h1>Kanban Board</h1>
//         <div className="controls">
//           <input placeholder="Search by title" value={query} onChange={(e) => setQuery(e.target.value)} />
//           <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
//             <option>All</option>
//             <option>Low</option>
//             <option>Medium</option>
//             <option>High</option>
//           </select>
//           <button onClick={openNew}>+ New Task</button>
//           <button onClick={toggleDark}>{dark ? 'Light' : 'Dark'}</button>
//         </div>
//       </header>

//       <main className="board">
//         {board.columnOrder.map(colId => (
//           <Column
//             key={colId}
//             column={board.columns[colId]}
//             tasks={columnTasks[colId] || []}
//             onDropTask={handleDropTask}
//             onEditTask={handleEditTask}
//             onDeleteTask={handleDeleteTask}
//           />
//         ))}
//       </main>

//       {showForm && (
//         <Modal onClose={closeForm}>
//           <TaskForm
//             onSubmit={handleSaveTask}
//             onClose={closeForm}
//             initial={editing || {}}
//             columns={board.columns}
//           />
//         </Modal>
//       )}

//     </div>
//   );
// }

import React, { useCallback, useMemo, useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { sampleBoard } from './utils/helpers';
import Column from './components/Column';
import TaskForm from './components/TaskForm';
import Modal from './components/Modal';

export default function App() {
  const [board, setBoard] = useLocalStorage('kanban-board', sampleBoard);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [dark, setDark] = useLocalStorage('kanban-dark', false);

  // Apply dark mode to <body>
  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [dark]);

  const tasksArray = useMemo(() => Object.values(board.tasks), [board.tasks]);

  const filteredTaskIds = useMemo(() => {
    return tasksArray
      .filter(t => t.title.toLowerCase().includes(query.toLowerCase()))
      .filter(t => (filterPriority === 'All' ? true : t.priority === filterPriority))
      .map(t => t.id);
  }, [tasksArray, query, filterPriority]);

  const columnTasks = useMemo(() => {
    const map = {};
    Object.values(board.columns).forEach(col => {
      map[col.id] = col.taskIds
        .filter(id => filteredTaskIds.includes(id))
        .map(id => board.tasks[id]);
    });
    return map;
  }, [board, filteredTaskIds]);

  const openNew = useCallback(() => { setEditing(null); setShowForm(true); }, []);
  const closeForm = useCallback(() => setShowForm(false), []);

  const handleSaveTask = useCallback((task, columnId) => {
    setBoard(prev => {
      const tasks = { ...prev.tasks, [task.id]: task };
      const columns = { ...prev.columns };

      if (!prev.tasks[task.id]) {
        columns[columnId] = { ...columns[columnId], taskIds: [task.id, ...columns[columnId].taskIds] };
      }

      return { ...prev, tasks, columns };
    });
    setShowForm(false);
  }, [setBoard]);

  const handleEditTask = useCallback((task) => {
    setEditing(task);
    setShowForm(true);
  }, []);

  const handleDeleteTask = useCallback((taskId) => {
    setBoard(prev => {
      const tasks = { ...prev.tasks };
      delete tasks[taskId];
      const columns = { ...prev.columns };
      Object.keys(columns).forEach(cid => {
        columns[cid] = { ...columns[cid], taskIds: columns[cid].taskIds.filter(id => id !== taskId) };
      });
      return { ...prev, tasks, columns };
    });
  }, [setBoard]);

  const handleDropTask = useCallback((taskId, toColumnId) => {
    setBoard(prev => {
      const columns = { ...prev.columns };
      Object.values(columns).forEach(col => {
        col.taskIds = col.taskIds.filter(id => id !== taskId);
      });
      columns[toColumnId] = { ...columns[toColumnId], taskIds: [taskId, ...columns[toColumnId].taskIds] };
      return { ...prev, columns };
    });
  }, [setBoard]);

  const toggleDark = useCallback(() => setDark(d => !d), [setDark]);

  return (
    <div className={"app " + (dark ? 'dark' : '')}>
      <header className="topbar">
        <h1>Kanban Board</h1>
        <div className="controls">
          <input placeholder="Search by title" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button onClick={openNew}>+ New Task</button>
          <button onClick={toggleDark}>{dark ? 'Light' : 'Dark'}</button>
        </div>
      </header>

      <main className="board">
        {board.columnOrder.map(colId => (
          <Column
            key={colId}
            column={board.columns[colId]}
            tasks={columnTasks[colId] || []}
            onDropTask={handleDropTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </main>

      {showForm && (
        <Modal onClose={closeForm}>
          <TaskForm
            onSubmit={handleSaveTask}
            onClose={closeForm}
            initial={editing || {}}
            columns={board.columns}
          />
        </Modal>
      )}
    </div>
  );
}
