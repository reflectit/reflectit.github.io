import { app } from "./firebase-config.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);
const currentPath = window.location.pathname;

const publicPages = ["/home", "/auth/login", "/auth/signup"];

onAuthStateChanged(auth, (user) => {
  if (user) {
    if (!currentPath.includes("/secured/dashboard")) {
      location.href = "/secured/dashboard";
    }
  } else {
    if (!publicPages.some((page) => currentPath.includes(page))) {
      location.href = "/home"; 
    }
  }
});
