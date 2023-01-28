import display from './ui.js';

const clearCom = document.querySelector('.complete-btn');

clearCom.addEventListener('click', () => {
  let listData = JSON.parse(localStorage.getItem('tasks')) || [];
  if (listData) {
    listData = listData.filter((task) => !task.completed);
  }
  listData.forEach((taskDay, indexDay) => {
    taskDay.index = indexDay + 1;
  });
  localStorage.setItem('tasks', JSON.stringify(listData));
  display();
});