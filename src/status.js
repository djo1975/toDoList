import { tasks } from './index.js';

export const toggleTaskStatus = (taskIndex) => {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

