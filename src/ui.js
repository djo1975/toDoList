const display = () => {
  const listData = JSON.parse(localStorage.getItem('tasks')) || [];
  const list = document.querySelector('.container2');
  list.innerHTML = '';
  if (listData.length > 0) {
    listData.forEach((task) => {
      const { description, index } = task;
      list.innerHTML += `
    <li class="task-container">
    <div class="task">
    <div class="task-text">
    <input type="checkbox" id="${index}" class="check-box" name="task"/><del class="input-text" contenteditable="false">${description}</del>
    </div>
    <div class="edit-icon "></div>
    <i class="trash trash-btn fa fa-trash" aria-hidden="true"></i>
    </div>
    <hr class="list-line" />
    </li>
    `;
      const tasks = document.querySelectorAll('.task-container');
      const inputTexts = document.querySelectorAll('.input-text');
      const editBtns = document.querySelectorAll('.edit-icon');
      let trashBtns = document.querySelectorAll('.trash-btn');
      const checkBoxes = document.querySelectorAll('input[type=checkbox]');

      editBtns.forEach((editBtn, index) => {
        editBtn.addEventListener('click', () => {
          editBtn.classList.add('hide');
          tasks[index].classList.add('edit-mode');
          trashBtns[index].classList.remove('trash');
          inputTexts[index].contentEditable = 'true';
          inputTexts[index].setAttribute('contenteditable', 'true');
          localStorage.setItem('tasks', JSON.stringify(listData));
        });
      });

      inputTexts.forEach((inputText, index) => {
        inputText.addEventListener(
          'input',
          () => {
            listData[index].description = inputText.textContent;
            localStorage.setItem('tasks', JSON.stringify(listData));
          },
          false,
        );
      });

      checkBoxes.forEach((checkBox, index) => {
        if (listData[index].completed === true) {
          checkBox.checked = true;
          inputTexts[index].previousElementSibling.disabled = true;
        }

        checkBox.addEventListener('change', () => {
          listData[index].completed = true;
          inputTexts[index].disabled = true;
          inputTexts[index].previousElementSibling.disabled = true;
          localStorage.setItem('tasks', JSON.stringify(listData));
        });
      });

      trashBtns.forEach((trashBtn, index) => {
        trashBtn.addEventListener('click', () => {
          const indexRem = listData.findIndex(
            (task) => task.description === inputTexts[index].textContent,
          );
          listData.splice(indexRem, 1);
          listData.forEach((taskDay, indexDay) => {
            taskDay.index = indexDay + 1;
          });
          localStorage.setItem('tasks', JSON.stringify(listData));
          trashBtn.parentNode.parentNode.remove();
        });
        trashBtns = document.querySelectorAll('.trash-btn');
      });
    });
  }
};
export default display;