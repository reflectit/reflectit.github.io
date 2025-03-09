import { app } from "./firebase-config.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

// Check the current page and prevent redirection from login page
const currentPath = window.location.pathname;

onAuthStateChanged(auth, (user) => {
  console.log("Auth state changed:", user);

  if (user) {
    console.log("User authenticated, redirecting...");
    if (currentPath !== "/secured/dashboard") {
      location.href = "../secured/dashboard";
    }
  } else {
    console.log("No user found, redirecting to login...");
    if (currentPath !== "/auth/login") {
      location.href = "../auth/login";
    }
  }
});
