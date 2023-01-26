// eslint-disable-next-line import/no-cycle
import { tasks } from './index.js';

// eslint-disable-next-line import/prefer-default-export
export const toggleTaskStatus = (taskIndex) => {
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
