// Import Firebase services
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAPcTIfGYQMjBa02BDbQ8fsOCZK5ASeCTA",
  authDomain: "reflect-it-57f45.firebaseapp.com",
  projectId: "reflect-it-57f45",
  storageBucket: "reflect-it-57f45.appspot.com", // FIXED storageBucket
  messagingSenderId: "26333738927",
  appId: "1:26333738927:web:0061534f4252a0b528a15a",
  measurementId: "G-QVWE3CJSV6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handle Sign-Up
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      username: username,
      createdAt: new Date()
    });

    alert("Sign-up successful!");
    window.location.href = "home.html"; // Redirect
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("Email is already in use.");
    } else if (error.code === "auth/weak-password") {
      alert("Password should be at least 6 characters.");
    } else {
      alert(error.message);
    }
  }
});
