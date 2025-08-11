export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleString();
}

export const sampleBoard = {
  columns: {
    todo: { id: 'todo', title: 'To Do', taskIds: [] },
    inprogress: { id: 'inprogress', title: 'In Progress', taskIds: [] },
    done: { id: 'done', title: 'Done', taskIds: [] }
  },
  columnOrder: ['todo', 'inprogress', 'done'],
  tasks: {}
};