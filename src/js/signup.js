import { app } from "./firebase-config.js";
import { 
  getAuth, createUserWithEmailAndPassword, sendEmailVerification 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

const blockedDomains = [
  "reisuke.com", "tempmail.com", "mailinator.com", "guerrillamail.com",
  "10minutemail.com", "throwawaymail.com", "fakeinbox.com", "yopmail.com"
];

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const alertContainer = document.getElementById("alertContainer");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) return displayAlert("danger", "Passwords do not match!");
    if (!validateEmail(email)) return displayAlert("danger", "Invalid email format.");
    if (password.length < 6) return displayAlert("danger", "Password must be at least 6 characters.");
    if (isBlockedEmail(email)) return displayAlert("danger", "This email provider is not allowed.");

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Store user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        verified: false,
        createdAt: new Date().toISOString(),
      });

      // Send Firebase Email Verification
      await sendEmailVerification(user);

      alert("A verification email has been sent. Please check your inbox.");
      window.location.href = "verify.html";
    } catch (error) {
      displayAlert("danger", error.message);
    }
  });

  function displayAlert(type, message) {
    alertContainer.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isBlockedEmail(email) {
    return blockedDomains.some(domain => email.endsWith("@" + domain));
  }
});
