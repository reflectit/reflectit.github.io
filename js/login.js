// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPcTIfGYQMjBa02BDbQ8fsOCZK5ASeCTA",
  authDomain: "reflect-it-57f45.firebaseapp.com",
  projectId: "reflect-it-57f45",
  storageBucket: "reflect-it-57f45.appspot.com",
  messagingSenderId: "26333738927",
  appId: "1:26333738927:web:0061534f4252a0b528a15a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Ensure the form exists before adding an event listener
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) {
    console.error("Login form not found!");
    return;
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // Authenticate user
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      window.location.href = "home.html"; // Redirect to home
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error("Login Error:", error);
    }
  });
});
