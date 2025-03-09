import { app } from "./firebase-config.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      location.href = "../secured/dashboard"; // Redirect if logged in
    } else {
      location.href = "../auth/login"; // Redirect to login if not authenticated
    }
  });
});
