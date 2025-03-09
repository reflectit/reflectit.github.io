import { app } from "./firebase-config.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const alertContainer = document.getElementById("alertContainer");

  if (!signupForm || !alertContainer) return;

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  if (!emailInput || !passwordInput || !confirmPasswordInput) {
    console.error("Form inputs not found");
    return;
  }

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Clear previous alerts
    alertContainer.innerHTML = "";

    if (password !== confirmPassword) {
      displayAlert("danger", "Passwords do not match!");
      return;
    }

    if (!validateEmail(email)) {
      displayAlert("danger", "Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      displayAlert("danger", "Password must be at least 6 characters long.");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", user.uid), { email: user.email, createdAt: new Date().toISOString() });

      alert("Account created successfully!");
      location.href = "../auth/logins.html";
    } catch (error) {
      displayAlert("danger", `Error: ${error.message}`);
    }
  });

 function displayAlert(type, message) {
    const alert = document.createElement("div");
    alert.classList.add("alert", `alert-${type}`);
    alert.setAttribute("role", "alert");
    alert.innerHTML = message; // Only show the message
    alertContainer.appendChild(alert);
}


  // Validate email format using regular expression
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Capitalize the first letter of the alert type
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
});
