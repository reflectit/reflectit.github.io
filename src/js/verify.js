import { app } from "./firebase-config.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = getFirestore(app);
document.addEventListener("DOMContentLoaded", async () => {
  const email = sessionStorage.getItem("verificationEmail");
  if (!email) {
    window.location.href = "../auth/signup";
    return;
  }

  const verifyForm = document.getElementById("verifyForm");
  const alertContainer = document.getElementById("alertContainer");

  verifyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const codeInput = document.getElementById("verificationCode").value;

    const userRef = doc(db, "users", email);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists() || userSnap.data().code !== codeInput) {
      return displayAlert("danger", "Invalid verification code.");
    }

    await updateDoc(userRef, { verified: true });

    displayAlert("success", "Email verified successfully!");
    setTimeout(() => {
      window.location.href = "../auth/login";
    }, 2000);
  });

  function displayAlert(type, message) {
    alertContainer.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
  }
});
