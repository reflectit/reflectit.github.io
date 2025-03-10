import { app } from "./firebase-config.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("saveEntryBtn").addEventListener("click", async () => {
    const title = document.getElementById("entryTitle").value.trim();
    const mood = document.getElementById("entryMood").value;
    const text = document.getElementById("entryText").value.trim();
    const date = new Date().toLocaleString();

    if (title === "" || text === "" || mood === "Choose mood") {
        alert("Please complete all fields before saving.");
        return;
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                await addDoc(collection(db, "entries"), {
                    userId: user.uid,
                    title,
                    mood,
                    text,
                    date
                });
                alert("Entry saved to Firebase!");
                document.getElementById("entryTitle").value = "";
                document.getElementById("entryMood").value = "Choose mood";
                document.getElementById("entryText").value = "";
            } catch (error) {
                console.error("Error saving entry:", error);
            }
        } else {
            alert("You must be logged in to save an entry.");
        }
    });
});
