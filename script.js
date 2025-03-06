import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get email from input field
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;

  // Email link action settings
  const actionCodeSettings = {
    url: "https://reflect-it.xyz/login", // Redirect after clicking email link
    handleCodeInApp: true,
  };

  // Send sign-in email link
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      alert("Sign-in link sent to your email.");
      localStorage.setItem("emailForSignIn", email); // Store email for later use
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

// Handle Email Link Sign-In
if (isSignInWithEmailLink(auth, window.location.href)) {
  let email = localStorage.getItem("emailForSignIn");
  if (!email) {
    email = prompt("Enter your email to confirm sign-in:");
  }

  signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
      alert("Signed in successfully!");
      localStorage.removeItem("emailForSignIn"); // Clear stored email
      window.location.href = "home.html"; // Redirect after login
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

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
