function applyDarkMode() {
  let theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-bs-theme', theme);
  document.querySelector('nav').classList.toggle('navbar-dark', theme === 'dark');
  document.querySelector('nav').classList.toggle('bg-dark', theme === 'dark');
  document.querySelector('nav').classList.toggle('navbar-light', theme === 'light');
  document.querySelector('nav').classList.toggle('bg-light', theme === 'light');
  document.body.classList.toggle('bg-dark', theme === 'dark');
  document.body.classList.toggle('text-light', theme === 'dark');

  
  document.querySelector('.sun').style.display = theme === 'light' ? 'block' : 'none';
  document.querySelector('.moon').style.display = theme === 'dark' ? 'block' : 'none';
}

function toggleDarkMode() {
  let theme = document.documentElement.getAttribute('data-bs-theme');
  let newTheme = theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-bs-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  applyDarkMode();
}

document.getElementById('checkbox').addEventListener('change', toggleDarkMode);
applyDarkMode();
