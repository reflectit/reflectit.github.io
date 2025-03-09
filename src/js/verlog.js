import { app } from "./firebase-config.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  console.log("Auth state changed:", user);
  
  if (user) {
    console.log("User authenticated, redirecting...");
    location.href = "../secured/dashboard";
  } else {
    console.log("No user found, redirecting to login...");
    location.href = "../auth/login";
  }
});
