import './style.css';
import { toggleTaskStatus } from './status.js';

const taskList = document.querySelector('.container2');

// Initialize tasks array
export let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to add a new task
const addTask = (description) => {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to delete a task
const deleteTask = (index) => {
  tasks.splice(index, 1);
  tasks = tasks.map((task, i) => ({ ...task, index: i + 1 }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to edit a task
const editTask = (index, newDescription) => {
  tasks[index].description = newDescription;
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to populate the list on the page
const populateList = () => {
  taskList.innerHTML = '';
  tasks
    .sort((a, b) => a.index - b.index)
    .forEach((task, i) => {
      const listItem = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.checked = tasks[i].completed;
      const taskDescription = document.createElement('span');
      taskDescription.innerHTML = task.description;
      const taskActions = document.createElement('div');
      const editBtn = document.createElement('button');
      editBtn.innerHTML = 'Edit';
      editBtn.addEventListener('click', () => {
        const newDesc = prompt('Enter new task description:');
        if (newDesc) {
          editTask(i, newDesc);
          populateList();
        }
      });
      checkbox.addEventListener('change', () => {
toggleTaskStatus(i);
populateList();
});
      
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = 'Delete';
      deleteBtn.addEventListener('click', () => {
        deleteTask(i);
        populateList();
      });
      taskActions.appendChild(editBtn);
      taskActions.appendChild(deleteBtn);
      listItem.appendChild(checkbox);
      listItem.appendChild(taskDescription);
      listItem.appendChild(taskActions);
      taskList.appendChild(listItem);
    });
};

document.addEventListener('DOMContentLoaded', () => {
  populateList();
  const clearCompleted = document.querySelector('.complete-btn');
clearCompleted.addEventListener('click', () => {
    tasks = tasks.filter((task) => !task.completed);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    populateList();
});

  // Add event listener for add task button
  const addTaskBtn = document.querySelector('.add-btn');
  addTaskBtn.addEventListener('click', () => {
    const taskDesc = document.querySelector('#task-input').value;
    if (taskDesc) {
      addTask(taskDesc);
      document.querySelector('#task-input').value = '';
      populateList();
    }
  });
});
