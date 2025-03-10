import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAPcTIfGYQMjBa02BDbQ8fsOCZK5ASeCTA",
  authDomain: "reflect-it-57f45.firebaseapp.com",
  projectId: "reflect-it-57f45",
  storageBucket: "reflect-it-57f45.appspot.com",
  messagingSenderId: "26333738927",
  appId: "1:26333738927:web:0061534f4252a0b528a15a",
  measurementId: "G-QVWE3CJSV6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore with the 'app' instance

export { app, db }; // Export both the app and db
