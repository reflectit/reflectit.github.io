function applyDarkMode() {
   document.documentElement.setAttribute('data-bs-theme', 'dark');
   document.querySelector('nav').classList.add('navbar-dark', 'bg-dark');
   document.querySelector('nav').classList.remove('navbar-light', 'bg-light');
   document.body.classList.add('bg-dark', 'text-light');
   document.querySelector('.sun').style.display = 'none';  
   document.querySelector('.moon').style.display = 'block';
   document.getElementById('checkbox').checked = true;  
}

function toggleDarkMode() {
   let theme = document.documentElement.getAttribute('data-bs-theme');
   let newTheme = theme === 'dark' ? 'light' : 'dark';
   document.documentElement.setAttribute('data-bs-theme', newTheme);
   if (newTheme === 'dark') {
     document.querySelector('nav').classList.add('navbar-dark', 'bg-dark');
     document.querySelector('nav').classList.remove('navbar-light', 'bg-light');
     document.body.classList.add('bg-dark', 'text-light'); 
     document.querySelector('.moon').style.display = 'block'; 
   } else {
     applyLightMode();
   }
}

function applyLightMode() {
   document.documentElement.setAttribute('data-bs-theme', 'light');
   document.querySelector('nav').classList.add('navbar-light');
   document.querySelector('nav').classList.remove('navbar-dark', 'bg-dark');
   document.querySelector('nav').classList.add('bg-light');
   document.body.classList.remove('bg-dark', 'text-light');
   document.querySelector('.sun').style.display = 'block';  
   document.querySelector('.moon').style.display = 'none';
   document.getElementById('checkbox').checked = false;  
}

document.addEventListener('DOMContentLoaded', applyDarkMode);
document.getElementById('checkbox').addEventListener('change', toggleDarkMode);
