import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Store user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: email,
            createdAt: new Date()
        });

        alert("Account created successfully!");
        window.location.href = "./home";
    } catch (error) {
        alert("Error: " + error.message);
    }
});


function applyDarkMode() {
  document.documentElement.setAttribute('data-bs-theme', 'dark');
  document.querySelector('nav').classList.add('navbar-dark', 'bg-dark');
  document.querySelector('nav').classList.remove('navbar-light', 'bg-light');
  document.body.classList.add('bg-dark', 'text-light');
  document.querySelector('.sun').style.display = 'none';  
  document.querySelector('.moon').style.display = 'block';
  document.getElementById('checkbox').checked = true;  
}

function toggleDarkMode() {
  let theme = document.documentElement.getAttribute('data-bs-theme');
  let newTheme = theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-bs-theme', newTheme);
  if (newTheme === 'dark') {
    document.querySelector('nav').classList.add('navbar-dark', 'bg-dark');
    document.querySelector('nav').classList.remove('navbar-light', 'bg-light');
    document.body.classList.add('bg-dark', 'text-light');
    document.querySelector('.sun').style.display = 'none';  
    document.querySelector('.moon').style.display = 'block'; 
  } else {
    applyLightMode();
  }
}

function applyLightMode() {
  document.documentElement.setAttribute('data-bs-theme', 'light');
  document.querySelector('nav').classList.add('navbar-light');
  document.querySelector('nav').classList.remove('navbar-dark', 'bg-dark');
  document.querySelector('nav').classList.add('bg-light');
  document.body.classList.remove('bg-dark', 'text-light');
  document.querySelector('.sun').style.display = 'block';  
  document.querySelector('.moon').style.display = 'none';
  document.getElementById('checkbox').checked = false;  
}

document.addEventListener('DOMContentLoaded', applyDarkMode);
document.getElementById('checkbox').addEventListener('change', toggleDarkMode);
