import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { app } from "./firebase-config.js"; // Ensure Firebase is initialized

const db = getFirestore(app);
const auth = getAuth();
const entriesCollection = collection(db, "entries");

// Save Entry to Firestore
document.getElementById("saveEntryBtn").addEventListener("click", async () => {
    const title = document.getElementById("entryTitle").value.trim();
    const mood = document.getElementById("entryMood").value;
    const text = document.getElementById("entryText").value.trim();
    const date = new Date().toLocaleString();

    if (!title || !text || mood === "Choose mood") {
        alert("Please complete all fields.");
        return;
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                await addDoc(entriesCollection, { title, mood, text, date, uid: user.uid });
                alert("Entry saved!");
                document.getElementById("entryTitle").value = "";
                document.getElementById("entryMood").value = "Choose mood";
                document.getElementById("entryText").value = "";
            } catch (error) {
                alert("Error saving entry: " + error.message);
            }
        } else {
            alert("Please log in to save entries.");
        }
    });
});

// Fetch and Display Entries
document.getElementById("viewEntriesBtn").addEventListener("click", async () => {
    let entriesList = document.getElementById("entriesList");
    entriesList.innerHTML = "";

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const querySnapshot = await getDocs(entriesCollection);
            let entries = querySnapshot.docs
                .filter(doc => doc.data().uid === user.uid) // Only show logged-in user's entries
                .map(doc => doc.data());

            if (entries.length === 0) {
                entriesList.innerHTML = "<li class='list-group-item text-center'>No entries found.</li>";
                return;
            }

            entries.forEach(entry => {
                let li = document.createElement("li");
                li.classList.add("list-group-item");
                li.innerHTML = `<strong>${entry.title}</strong> (${entry.mood})<br>${entry.text}<br><small>${entry.date}</small>`;
                entriesList.appendChild(li);
            });
        } else {
            alert("Please log in to view entries.");
        }
    });
});
