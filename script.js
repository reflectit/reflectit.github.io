import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Firebase config  
const firebaseConfig = {
  apiKey: "YOUR_SECURED_API_KEY",
  authDomain: "reflect-it-57f45.firebaseapp.com",
  projectId: "reflect-it-57f45",
  storageBucket: "reflect-it-57f45.appspot.com",
  messagingSenderId: "26333738927",
  appId: "1:26333738927:web:d81bdc3a3d3bb7c028a15a",
  measurementId: "G-JQVPKLQQ5Q"
};

// Initialize Firebase  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
  }

  createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          alert("Account created successfully!");
          window.location.href = "./home"; // Redirect after signup
      })
      .catch((error) => {
          alert("Error: " + error.message);
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
