v// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase configuration (replace with your actual config)
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
const db = getFirestore(app);

// Form submission event
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form values
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    // Create user with email & password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: email,
      createdAt: new Date()
    });

    alert("Account created successfully!");
    window.location.href = "login.html"; // Redirect to login page
  } catch (error) {
    alert(error.message); // Show error if sign-up fails
  }
});
