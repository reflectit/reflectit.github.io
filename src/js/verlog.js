import { app } from "./firebase-config.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("You must be logged in to access this page.");
    location.href = "auth/logins.html";
  } else {
    location.href = "secured/dashboards.html";
  }
});
