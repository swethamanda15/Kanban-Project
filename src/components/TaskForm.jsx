import React, { useState, useEffect } from 'react';
import { generateId } from '../utils/helpers';

export default function TaskForm({ onSubmit, onClose, initial = {}, columns }) {
  const [title, setTitle] = useState(initial.title || '');
  const [description, setDescription] = useState(initial.description || '');
  const [priority, setPriority] = useState(initial.priority || 'Low');
  const [columnId, setColumnId] = useState(initial.columnId || Object.keys(columns)[0]);

  useEffect(() => {
    setTitle(initial.title || '');
    setDescription(initial.description || '');
    setPriority(initial.priority || 'Low');
    setColumnId(initial.columnId || Object.keys(columns)[0]);
  }, [initial, columns]);

  function handleSubmit(e) {
    e.preventDefault();
    const now = new Date().toISOString();
    const task = {
      id: initial.id || generateId(),
      title,
      description,
      priority,
      createdAt: initial.createdAt || now
    };
    onSubmit(task, columnId);
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label>Title<input required value={title} onChange={(e) => setTitle(e.target.value)} /></label>
      <label>Description<textarea value={description} onChange={(e) => setDescription(e.target.value)} /></label>
      <label>Priority
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </label>
      <label>Column
        <select value={columnId} onChange={(e) => setColumnId(e.target.value)}>
          {Object.values(columns).map(col => (
            <option key={col.id} value={col.id}>{col.title}</option>
          ))}
        </select>
      </label>

      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}