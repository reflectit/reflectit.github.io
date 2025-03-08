import { app } from "./firebase-config.js"; // Correct relative path assuming the login.js is in the same folder
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      location.href = "../secured/dashboards.html";
    } catch (error) {
      console.error("Login failed:", error.code, error.message);
    }
  });
});
