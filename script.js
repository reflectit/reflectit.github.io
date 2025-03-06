import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPcTIfGYQMjBa02BDbQ8fsOCZK5ASeCTA",
  authDomain: "reflect-it-57f45.firebaseapp.com",
  projectId: "reflect-it-57f45",
  storageBucket: "reflect-it-57f45.appspot.com",
  messagingSenderId: "26333738927",
  appId: "1:26333738927:web:0061534f4252a0b528a15a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Sign up successful! You can now log in.");
    window.location.href = "login.html";
  } catch (error) {
    alert(error.message);
  }
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
