import { app } from "./firebase-config.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

// Get current page path
const currentPath = window.location.pathname;

// Only proceed with redirects if you're not already on the target page
onAuthStateChanged(auth, (user) => {
  console.log("Auth state changed:", user);

  if (user) {
    console.log("User authenticated, redirecting...");
    // Ensure that we don't redirect to the dashboard page if already there
    if (!currentPath.includes("/secured/dashboard")) {
      location.href = "../secured/dashboard"; // Redirect to dashboard if not on the dashboard page
    }
  } else {
    console.log("No user found, redirecting to login...");
    // Ensure that we don't redirect to the login page if already there
    if (!currentPath.includes("/auth/login")) {
      location.href = "../auth/login"; // Redirect to login page if not on the login page
    }
  }
});
