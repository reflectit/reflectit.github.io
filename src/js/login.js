import { app } from "./firebase-config.js";
import { getAuth, setPersistence, browserLocalPersistence, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      location.href = "../secured/dashboard";
    } catch (error) {
      console.error("Login failed:", error.code, error.message);
    }
  });
});
