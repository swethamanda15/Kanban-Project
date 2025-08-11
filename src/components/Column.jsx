import React, { useCallback } from 'react';
import TaskCard from './TaskCard';

export default function Column({ column, tasks, onDropTask, onEditTask, onDeleteTask, onDragOverPlaceholder }) {

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    if (onDragOverPlaceholder) onDragOverPlaceholder(column.id);
  }, [column.id, onDragOverPlaceholder]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) onDropTask(taskId, column.id);
  }, [column.id, onDropTask]);

  return (
    <div className="column" onDragOver={handleDragOver} onDrop={handleDrop}>
      <h3>{column.title}</h3>
      <div className="task-list">
        {tasks.map(t => (
          <TaskCard key={t.id} task={t} onEdit={onEditTask} onDelete={onDeleteTask} />
        ))}
      </div>
    </div>
  );
}