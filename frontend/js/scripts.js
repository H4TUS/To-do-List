const inputForm = document.querySelector('#input-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

let oldTaskTitle;

// Functions

// Function to toggle input adn edit forms
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

document.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname.endsWith('.html')) {
    const cleanUrl = window.location.pathname.replace('.html', '');
    window.history.replaceState(null, '', cleanUrl);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = './login.html';
  } else {
    fetch('http://localhost:3000/auth/validate-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          localStorage.removeItem('token');
          window.location.href = './login.html';
        }
      })
      .catch((error) => {
        console.error('Erro ao validar token:', error);
        localStorage.removeItem('token');
        window.location.href = './login.html';
      });
  }
});

// Back to login page event
document.addEventListener('click', (e) => {
  const targerEl = e.target;

  if (targerEl.classList.contains('fa-arrow-left')) {
    window.location.href = './login.html';
  }
});

// ADD TASK EVENT
inputForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const inputValue = taskInput.value;

  if (inputValue) {
    const response = await fetch('http://localhost:3000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: inputValue,
      }),
    });

    const data = await response.json();

    taskList.appendChild(contructorTask(data));
  }

  taskInput.value = '';
  taskInput.focus();
});

// DONE TASK EVENT
document.addEventListener('click', async (e) => {
  const targerEl = e.target;
  const parentEl = targerEl.closest('.task');
  let taskTitle;
  let taskId;

  if (parentEl && parentEl.querySelector('p')) {
    taskTitle = parentEl.querySelector('p').innerHTML;
    taskId = parentEl.getAttribute('data-id');
  }

  if (targerEl.classList.contains('complete-task')) {
    const isDone = parentEl.classList.contains('done');

    parentEl.classList.toggle('done');

    const response = await fetch(`http://localhost:3000/update/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        done: !isDone,
      }),
    });

    const data = await response.json();
    console.log(data);
  }
});

// DELETE TASK EVENT
document.addEventListener('click', async (e) => {
  const targerEl = e.target;
  const parentEl = targerEl.closest('.task');
  let taskId;

  if (parentEl) {
    taskId = parentEl.getAttribute('data-id');
  }

  if (
    targerEl.classList.contains('delete-task') ||
    targerEl.closest('.delete-task')
  ) {
    const response = await fetch(`http://localhost:3000/delete/${taskId}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    console.log(data);

    parentEl.remove();
  }
});

// OPEN EDIT FORM EVENT
document.addEventListener('click', async (e) => {
  const targerEl = e.target;
  const parentEl = targerEl.closest('.task');
  let taskTitle;

  if (parentEl && parentEl.querySelector('p')) {
    taskTitle = parentEl.querySelector('p').innerText;
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

// EDIT AND SAVE TASK EVENT
editForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  const tasks = document.querySelectorAll('.task');
  let taskId;

  tasks.forEach((task) => {
    const taskTitle = task.querySelector('p').innerText;

    if (taskTitle === oldTaskTitle) {
      taskId = task.getAttribute('data-id');
    }
  });

  if (editInputValue && taskId) {
    updateTask(editInputValue);

    const response = await fetch(`http://localhost:3000/update/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: editInputValue,
      }),
    });

    const data = await response.json();
    console.log(data);
  }

  toggleForms();
});

cancelEditBtn.addEventListener('click', (e) => {
  e.preventDefault();

  toggleForms();
});

const tasks = [];

// Function to all render tasks
async function renderTasks() {
  try {
    const response = await fetch('http://localhost:3000/get', {
      method: 'GET',
    });
    const data = await response.json();
    console.log(data);
    tasks.push(...data);
  } catch (error) {
    console.log(error);
  }

  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    taskList.appendChild(contructorTask(task));
  });
}

function contructorTask(task) {
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task');

  if (task.done === true) {
    taskContainer.classList.add('done');
  }

  taskContainer.setAttribute('data-id', task._id);

  const containerTitle = document.createElement('div');
  containerTitle.classList.add('container-title');

  const completeButton = document.createElement('button');
  completeButton.classList.add('complete-task');

  const taskTitle = document.createElement('p');
  taskTitle.innerText = task.description;

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

  taskContainer.appendChild(containerTitle);
  taskContainer.appendChild(containerButtons);

  return taskContainer;
}

renderTasks();
