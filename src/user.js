import display from './ui.js';

const refreshIcon = document.querySelector('.refresh');
const addBtn = document.querySelector('.add-btn');
const newTask = document.querySelector('.input');

const addTask = (task) => {
  let listData = JSON.parse(localStorage.getItem('tasks')) || [];
  if (!listData) {
    listData = [
      {
        description: task,
        completed: false,
        index: 1,
      },
    ];
  } else {
    listData.push({
      description: task,
      completed: false,
      index: listData.length + 1,
    });
  }
  localStorage.setItem('tasks', JSON.stringify(listData));
  display();
};

addBtn.addEventListener('click', () => {
  if (newTask.value) addTask(newTask.value);
  newTask.value = '';
  display();
});

refreshIcon.addEventListener('click', () => {
  const listData = [];
  localStorage.setItem('tasks', JSON.stringify(listData));
  display();
});

window.addEventListener('load', () => {
  if (localStorage.getItem('tasks')) {
    display();
  }
});
