const form = document.getElementById('loginForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const btn = form.querySelector('.btn-primary');

  // remove previous error
  document.querySelector('.error-msg')?.remove();

  if (!email || !password) {
    showError('completa todos los campos');
    return;
  }

  // simulate async login
  btn.textContent = 'conectando...';
  btn.classList.add('loading');

  setTimeout(() => {
    btn.textContent = 'entrar';
    btn.classList.remove('loading');
    showError('credenciales incorrectas'); // demo: always fails
  }, 1400);
});

function showError(msg) {
  const el = document.createElement('p');
  el.className = 'error-msg visible';
  el.textContent = msg;
  form.insertBefore(el, form.querySelector('.links'));
}
