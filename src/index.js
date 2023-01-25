import './style.css';

const taskList = document.querySelector('.container2');
if (taskList) {
  const tasks = [
    { description: 'wash the dishes', completed: false, index: 1 },
    { description: 'complete To Do list', completed: false, index: 2 },
  ];

  const populateList = () => {
    tasks
      .sort((a, b) => a.index - b.index)
      .forEach((task) => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        const taskDescription = document.createElement('span');
        taskDescription.innerHTML = task.description;
        const taskActions = document.createElement('div');
        taskActions.innerHTML = '...';
        listItem.appendChild(checkbox);
        listItem.appendChild(taskDescription);
        listItem.appendChild(taskActions);
        taskList.appendChild(listItem);
      });
  };

  document.addEventListener('DOMContentLoaded', populateList);
}