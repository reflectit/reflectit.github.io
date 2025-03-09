function applyDarkMode() {
   document.documentElement.setAttribute('data-bs-theme', 'dark');
   document.querySelector('nav').classList.add('navbar-dark', 'bg-dark');
   document.querySelector('nav').classList.remove('navbar-light', 'bg-light');
   document.body.classList.add('bg-dark', 'text-light');

   let lightIcon = document.querySelector('.light-icon');
   let darkIcon = document.querySelector('.dark-icon');

   if (lightIcon && darkIcon) {
      lightIcon.style.display = 'none';
      darkIcon.style.display = 'block';
   }
}

function applyLightMode() {
   document.documentElement.setAttribute('data-bs-theme', 'light');
   document.querySelector('nav').classList.add('navbar-light', 'bg-light');
   document.querySelector('nav').classList.remove('navbar-dark', 'bg-dark');
   document.body.classList.remove('bg-dark', 'text-light');

   let lightIcon = document.querySelector('.light-icon');
   let darkIcon = document.querySelector('.dark-icon');

   if (lightIcon && darkIcon) {
      lightIcon.style.display = 'block';
      darkIcon.style.display = 'none';
   }
}

function toggleDarkMode() {
   let theme = document.documentElement.getAttribute('data-bs-theme');
   theme === 'dark' ? applyLightMode() : applyDarkMode();
}

document.addEventListener('DOMContentLoaded', () => {
   applyDarkMode();

   let checkbox = document.getElementById('checkbox');
   if (checkbox) {
      checkbox.addEventListener('change', toggleDarkMode);
   }
});
