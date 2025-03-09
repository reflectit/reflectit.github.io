import { app } from "./firebase-config.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

// Redirect if not logged in
document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      alert("You must log in first!");
      location.href = "../../auth/logins.html"; // Ensure correct path
    }
  });

  // Logout function
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await signOut(auth);
        alert("Logout successful!");
        location.href = "../../index.html";
      } catch (error) {
        console.error("Logout failed:", error.code, error.message);
      }
    });
  }
});
