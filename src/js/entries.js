import { app } from "./firebase-config.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const db = getFirestore(app);
const auth = getAuth(app);

export async function saveEntry(title, mood, text) {
    const user = auth.currentUser;
    if (!user) {
        alert("You must be logged in to save entries.");
        return;
    }

    try {
        await addDoc(collection(db, "journals"), {
            ownerId: user.uid,
            title: title,
            mood: mood,
            content: text,
            createdAt: new Date().toISOString()
        });
        alert("Entry saved!");
    } catch (error) {
        console.error("Error saving entry:", error);
    }
}

export async function getEntries() {
    const user = auth.currentUser;
    if (!user) {
        alert("You must be logged in to view entries.");
        return [];
    }

    try {
        const q = query(collection(db, "journals"), where("ownerId", "==", user.uid));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error retrieving entries:", error);
        return [];
    }
}
