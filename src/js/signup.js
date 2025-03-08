import { app } from "./firebase-config.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  if (!signupForm) return;

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = signupForm;

    if (password.value !== confirmPassword.value) return alert("Passwords do not match!");

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email.value, password.value);
      await setDoc(doc(db, "users", user.uid), { email: user.email, createdAt: new Date().toISOString() });

      alert("Account created successfully!");
      location.href = "auth/logins.html";
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });
});
