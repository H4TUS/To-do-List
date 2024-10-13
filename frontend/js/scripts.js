const inputForm = document.querySelector('#input-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

let oldTaskTitle;

// Functions

const saveTodo = (text) => {
  const task = document.createElement('div');
  task.classList.add('task');

  const containerTitle = document.createElement('div');
  containerTitle.classList.add('container-title');

  const completeButton = document.createElement('button');
  completeButton.classList.add('complete-task');

  const taskTitle = document.createElement('p');
  taskTitle.innerText = text;

  containerTitle.appendChild(completeButton);
  containerTitle.appendChild(taskTitle);

  const containerButtons = document.createElement('div');

  const editButton = document.createElement('button');
  editButton.classList.add('edit-task');
  editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-task');
  deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';

  containerButtons.appendChild(editButton);
  containerButtons.appendChild(deleteButton);

  task.appendChild(containerTitle);
  task.appendChild(containerButtons);

  taskList.appendChild(task);
};

const toggleForms = () => {
  inputForm.classList.toggle('hide');
  taskList.classList.toggle('hide');
  editForm.classList.toggle('hide');
};

const updateTask = (text) => {
  const tasks = document.querySelectorAll('.task');

  tasks.forEach((task) => {
    let taskTitle = task.querySelector('p');

    if (taskTitle.innerText === oldTaskTitle) {
      taskTitle.innerText = text;
    }
  });
};

// Events

inputForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputValue = taskInput.value;

  if (inputValue) {
    taskList.classList.remove('hide');
    saveTodo(inputValue);
    taskInput.value = '';
    taskInput.focus();
  }
});

document.addEventListener('click', (e) => {
  const targerEl = e.target;
  const parentEl = targerEl.closest('.task');
  let taskTitle;

  if (parentEl && parentEl.querySelector('p')) {
    taskTitle = parentEl.querySelector('p').innerHTML;
  }

  if (targerEl.classList.contains('complete-task')) {
    if (parentEl.classList.contains('done')) {
      parentEl.classList.remove('done');
    } else {
      parentEl.classList.add('done');
    }
  }

  if (
    targerEl.classList.contains('delete-task') ||
    targerEl.closest('.delete-task')
  ) {
    parentEl.remove();
  }

  if (
    targerEl.classList.contains('edit-task') ||
    targerEl.closest('.edit-task')
  ) {
    toggleForms();
    editInput.value = taskTitle;
    oldTaskTitle = taskTitle;
  }
});

cancelEditBtn.addEventListener('click', (e) => {
  e.preventDefault();

  toggleForms();
});

editForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTask(editInputValue);
  }

  toggleForms();
});
