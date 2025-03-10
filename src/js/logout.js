import { app } from "./firebase-config.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

// Redirect if not logged in or handle login redirect on page load
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // If not logged in and on a page that requires login, redirect to login page
      if (currentPath !== "/auth/logins.html" && currentPath !== "/auth/signup.html") {
        alert("You must log in first!");
        location.href = "../../auth/logins.html"; // Ensure correct path
      }
    } else {
      // If logged in, prevent access to login page and redirect to dashboard
      if (currentPath === "/auth/logins.html" || currentPath === "/auth/signup.html") {
        location.href = "../../secured/dashboard"; // Redirect to dashboard if logged in
      }
    }
  });

  // Logout function
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await signOut(auth);
        location.href = "../../auth/login"; // Redirect to homepage after logout
      } catch (error) {
        console.error("Logout failed:", error.code, error.message);
      }
    });
  }
});
