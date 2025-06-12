// assets/js/auth.js
document.addEventListener('DOMContentLoaded', () => {
  const modal        = document.getElementById('auth-modal');
  const userIcon     = document.getElementById('user-icon');
  const closeBtn     = modal.querySelector('.close-btn');
  const loginForm    = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showRegLink  = document.getElementById('show-register');
  const showLogLink  = document.getElementById('show-login');

  userIcon.addEventListener('click', e => {
    e.preventDefault();
    modal.style.display = 'block';
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  });

  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  showRegLink.addEventListener('click', e => {
    e.preventDefault();
    loginForm.style.display    = 'none';
    registerForm.style.display = 'block';
  });
  showLogLink.addEventListener('click', e => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display    = 'block';
  });
});
