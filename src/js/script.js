import { app } from "./firebase-config.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      location.href = "../secured/dashboard";
    }
  });
});

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
     document.querySelector('.sun').style.display = 'none';  
     document.querySelector('.moon').style.display = 'block'; 
   } else {
     applyLightMode();
   }
} // <-- MISSING CLOSING BRACE ADDED HERE

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
