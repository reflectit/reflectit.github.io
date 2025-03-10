import { app } from "./firebase-config.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      if (currentPath !== "auth/login" && currentPath !== "/auth/signup") {
        alert("You must log in first!");
        location.href = "../../auth/login";
      }
    } else {
      if (currentPath === "/auth/login" || currentPath === "/auth/signup") {
        location.href = "../../secured/dashboard";
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
