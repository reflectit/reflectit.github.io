import { app } from "./js/firebase-config.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm.email.value, password = loginForm.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      location.href = "home.html";
    } catch (error) {
      console.error("Login failed:", error.code, error.message);
    }
  });
});
