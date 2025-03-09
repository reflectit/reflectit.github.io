import { app } from "./firebase-config.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      alert("Logout successful!");
      location.href = "../../index.html";
    } catch (error) {
      console.error("Logout failed:", error.code, error.message);
    }
  });
});
