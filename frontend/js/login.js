const loginContainer = document.querySelector('#login-container');
const signInContaiener = document.querySelector('#sign-in-container');
const requestEmailContainer = document.querySelector(
  '#request-email-container'
);
const changePasswordContainer = document.querySelector(
  '#change-password-container'
);
const confirmNewPasswordContainer = document.querySelector(
  '#confirm-new-password-container'
);
const loginBtn = document.querySelector('#login-btn');

// Function to toggle between login and sign-in containers
const toggleContainer = () => {
  loginContainer.classList.toggle('hide');
  signInContaiener.classList.toggle('hide');
};

// Function to toggle between request email and change password containers
const toggleEmailContainer = () => {
  loginContainer.classList.toggle('hide');
  requestEmailContainer.classList.toggle('hide');
};

// Function to toggle between request email and change password containers
const toggleChangePasswordContainer = () => {
  requestEmailContainer.classList.toggle('hide');
  changePasswordContainer.classList.toggle('hide');
};

// Function to toggle between confirm new password and change password containers
const toggleConfirmNewPasswordContainer = () => {
  changePasswordContainer.classList.toggle('hide');
  confirmNewPasswordContainer.classList.toggle('hide');
};

document.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname.endsWith('.html')) {
    const cleanUrl = window.location.pathname.replace('.html', '');
    window.history.replaceState(null, '', cleanUrl);
  }
});

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
});

document.addEventListener('click', (e) => {
  const targetEl = e.target;

  if (targetEl.textContent == 'Esqueceu a senha?') {
    toggleEmailContainer();
  }

  if (
    targetEl.textContent == 'Criar conta' ||
    (targetEl.classList.contains('fa-arrow-left') &&
      targetEl.closest('#sign-in-container'))
  ) {
    toggleContainer();
    signInContaiener.querySelectorAll('input').forEach((input) => {
      input.value = '';
    });
  }

  if (
    targetEl.classList.contains('fa-arrow-left') &&
    targetEl.closest('#request-email-container')
  ) {
    toggleEmailContainer();
  }

  if (
    targetEl.textContent == 'Login' &&
    targetEl.closest('#confirm-new-password-container')
  ) {
    confirmNewPasswordContainer.classList.toggle('hide');
    loginContainer.classList.toggle('hide');
  }
});

const registerUser = async (name, email, password, confirmPassword) => {
  try {
    const response = await fetch('http://localhost:3000/auth/register/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      toggleContainer();
      signInContaiener.querySelectorAll('input').forEach((input) => {
        input.value = '';
      });
    } else {
      alert(data.mensage || 'Erro ao registrar o usuário');
    }
  } catch (error) {
    console.error('Erro ao registrar:', error);
  }
};

document
  .querySelector('#sign-in-container form')
  .addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.querySelector(
      'input[placeholder="Escreva seu nome"]'
    ).value;
    const email = e.target.querySelector(
      'input[placeholder="Escreva seu email"]'
    ).value;
    const password = e.target.querySelector(
      'input[placeholder="Escreva sua senha"]'
    ).value;
    const confirmPassword = e.target.querySelector(
      'input[placeholder="Escreva sua senha novamente"]'
    ).value;
    registerUser(name, email, password, confirmPassword);
  });

const loginUser = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      console.log(data.token);
      window.location.href = './home.html';
    } else {
      alert(data.mensage || 'Erro ao fazer login');
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
};

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const form = document.querySelector('#login-container form');

  const email = form.querySelector(
    'input[placeholder="Escreva seu email"]'
  ).value;
  const password = form.querySelector(
    'input[placeholder="Escreva sua senha"]'
  ).value;

  loginUser(email, password);
});

let userId;

const requestPasswordReset = async (email) => {
  try {
    const response = await fetch('http://localhost:3000/auth/request-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (response.ok) {
      userId = data.userId;
      toggleChangePasswordContainer();
    } else {
      alert(data.message || 'Erro ao verificar email');
    }
  } catch (error) {
    console.error('Erro ao verificar email:', error);
  }
};

document
  .querySelector('#request-email-container form')
  .addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector(
      'input[placeholder="Escreva seu email"]'
    ).value;

    e.target.querySelector('input[placeholder="Escreva seu email"]').value = '';
    requestPasswordReset(email);
  });

const changePassword = async (userId, newPassword, confirmPassword) => {
  try {
    const response = await fetch('http://localhost:3000/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        newPassword,
        confirmPassword,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      toggleConfirmNewPasswordContainer();
    } else {
      alert(data.message || 'Erro ao alterar senha');
    }
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
  }
};

document
  .querySelector('#change-password-container form')
  .addEventListener('submit', (e) => {
    e.preventDefault();
    const newPassword = e.target.querySelector(
      'input[placeholder="Digite sua nova senha"]'
    ).value;
    const confirmPassword = e.target.querySelector(
      'input[placeholder="Redigite sua nova senha"]'
    ).value;

    changePassword(userId, newPassword, confirmPassword);
  });
