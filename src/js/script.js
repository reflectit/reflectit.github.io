function applyDarkMode() {
   document.documentElement.setAttribute('data-bs-theme', 'dark');
   document.querySelector('nav').classList.add('navbar-dark', 'bg-dark');
   document.querySelector('nav').classList.remove('navbar-light', 'bg-light');
   document.body.classList.add('bg-dark', 'text-light');

   let sun = document.querySelector('.sun');
   let moon = document.querySelector('.moon');
   let checkbox = document.getElementById('checkbox');

   if (sun && moon) {
      sun.style.display = 'none';  
      moon.style.display = 'block';
   }

   if (checkbox) {
      checkbox.checked = true;
   }
}

function toggleDarkMode() {
   let theme = document.documentElement.getAttribute('data-bs-theme');
   let newTheme = theme === 'dark' ? 'light' : 'dark';
   document.documentElement.setAttribute('data-bs-theme', newTheme);
   
   let nav = document.querySelector('nav');
   let body = document.body;
   let sun = document.querySelector('.sun');
   let moon = document.querySelector('.moon');
   let checkbox = document.getElementById('checkbox');

   if (newTheme === 'dark') {
      if (nav) {
         nav.classList.add('navbar-dark', 'bg-dark');
         nav.classList.remove('navbar-light', 'bg-light');
      }
      body.classList.add('bg-dark', 'text-light');
      if (sun && moon) {
         sun.style.display = 'none';  
         moon.style.display = 'block'; 
      }
   } else {
      applyLightMode();
   }
}

function applyLightMode() {
   document.documentElement.setAttribute('data-bs-theme', 'light');

   let nav = document.querySelector('nav');
   let body = document.body;
   let sun = document.querySelector('.sun');
   let moon = document.querySelector('.moon');
   let checkbox = document.getElementById('checkbox');

   if (nav) {
      nav.classList.add('navbar-light', 'bg-light');
      nav.classList.remove('navbar-dark', 'bg-dark');
   }
   body.classList.remove('bg-dark', 'text-light');
   if (sun && moon) {
      sun.style.display = 'block';  
      moon.style.display = 'none';
   }
   if (checkbox) {
      checkbox.checked = false;  
   }
}

document.addEventListener('DOMContentLoaded', () => {
   applyDarkMode();

   let checkbox = document.getElementById('checkbox');
   if (checkbox) {
      checkbox.addEventListener('change', toggleDarkMode);
   }
});
