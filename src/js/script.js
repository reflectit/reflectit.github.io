import { app } from "./firebase-config.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const alertMessage = document.getElementById("alertMessage");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const usernameInput = document.getElementById("username");

  if (!signupForm || !alertMessage || !emailInput || !passwordInput || !confirmPasswordInput || !usernameInput) return;

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const username = usernameInput.value;

    // Validate username
    if (username.length < 3 || username.length > 20) {
      showAlert("Username must be between 3 and 20 characters.");
      return;
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      showAlert("Please enter a valid email address.");
      return;
    }

    // Validate password strength (at least 8 characters, one number, one uppercase letter)
    const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      showAlert("Password must be at least 8 characters long, contain a number and an uppercase letter.");
      return;
    }

    // Password mismatch
    if (password !== confirmPassword) {
      showAlert("Passwords do not match!");
      return;
    }

    try {
      // Create user
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: username,
        createdAt: new Date().toISOString()
      });

      alert("Account created successfully!");
      location.href = "../auth/logins.html";
    } catch (error) {
      showAlert(error.message);
    }
  });

  function showAlert(message) {
    alertMessage.classList.remove("d-none");
    alertMessage.textContent = message;
  }
});
