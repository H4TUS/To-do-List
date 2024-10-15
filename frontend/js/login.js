const loginContainer = document.querySelector('#login-container');
const singInContaiener = document.querySelector('#sing-in-container');

// Function to toggle login and sing in containers
const toggleContainer = () => {
  loginContainer.classList.toggle('hide');
  singInContaiener.classList.toggle('hide');
};

document.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname.endsWith('.html')) {
    const cleanUrl = window.location.pathname.replace('.html', '');
    window.history.replaceState(null, '', cleanUrl);
  }
});

document.addEventListener('click', (e) => {
  const targerEl = e.target;

  if (targerEl.innerText == 'Login') {
    window.location.href = './home.html';
  }

  if (
    targerEl.innerText == 'Criar conta' ||
    targerEl.classList.contains('fa-arrow-left')
  ) {
    toggleContainer();
  }

  if (targerEl.classList.contains('confirm-btn')) {
    toggleContainer();
  }
});
