import { app } from "./firebase-config.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-functions.js";

const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);
const sendVerificationEmail = httpsCallable(functions, "sendVerificationEmail");

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

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const verificationCode = generateCode();
      
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        code: verificationCode,
        verified: false,
        createdAt: new Date().toISOString(),
      });

      await sendVerificationEmail({ email, code: verificationCode });

      sessionStorage.setItem("verificationEmail", email);
      window.location.href = "verify.html";
    } catch (error) {
      displayAlert("danger", error.message);
    }
  });

  function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  function displayAlert(type, message) {
    alertContainer.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
