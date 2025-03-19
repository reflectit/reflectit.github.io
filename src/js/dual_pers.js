import { app, db } from "./firebase-config.js";  // Ensure correct import
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth(app);  // Firebase Auth initialization
const dualPersCollection = collection(db, "dualPerspectiveEntries");  // Firestore collection for dual perspective entries

// Add a new question block
document.getElementById("addQuestionButton").addEventListener("click", function() {
    const questionItem = document.createElement("div");
    questionItem.classList.add("questionItem");
    questionItem.innerHTML = `
        <label for="question">Question</label>
        <input type="text" name="question" placeholder="What’s going to happen?" required />

        <label for="currentSelf">Current Self</label>
        <input type="text" name="currentSelf" required />

        <label for="futureSelf">Future Self</label>
        <input type="text" name="futureSelf" required />

        <label for="futureDate">Future Date</label>
        <input type="date" name="futureDate" required />
    `;
    document.getElementById("questionsContainer").appendChild(questionItem);
});

// Save the dual perspective journal entry
document.getElementById("dualPerspectiveForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const date = document.getElementById("date").value;

    const questions = [];
    const questionItems = document.querySelectorAll(".questionItem");

    questionItems.forEach(item => {
        const question = item.querySelector("[name='question']").value;
        const currentSelf = item.querySelector("[name='currentSelf']").value;
        const futureSelf = item.querySelector("[name='futureSelf']").value;
        const futureDate = item.querySelector("[name='futureDate']").value;

        questions.push({
            question,
            currentSelf,
            futureSelf,
            futureDate
        });
    });

    if (!title || questions.length === 0) {
        alert("Please complete all fields.");
        return;
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                await addDoc(dualPersCollection, {
                    title,
                    date,
                    questions,
                    uid: user.uid
                });
                alert("Dual perspective entry saved!");
                document.getElementById("dualPerspectiveForm").reset(); // Clear form after submission
            } catch (error) {
                alert("Error saving entry: " + error.message);
            }
        } else {
            alert("Please log in to save entries.");
        }
    });
});

// Display saved entries
document.getElementById("viewEntriesBtn").addEventListener("click", async function() {
    const entriesContainer = document.getElementById("entriesContainer");
    entriesContainer.innerHTML = "";  // Clear existing entries

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const querySnapshot = await getDocs(dualPersCollection);
            const entries = querySnapshot.docs.filter(doc => doc.data().uid === user.uid);

            if (entries.length === 0) {
                entriesContainer.innerHTML = "<p>No entries found.</p>";
                return;
            }

            entries.forEach(doc => {
                const entry = doc.data();
                const entryDiv = document.createElement("div");
                entryDiv.classList.add("entry");

                entryDiv.innerHTML = `
                    <h3>${entry.title}</h3>
                    <p><strong>Date:</strong> ${entry.date}</p>
                    ${entry.questions.map(q => {
                        const currentDate = new Date().toISOString().split("T")[0]; // Today's date
                        const futureSelfVisibility = q.futureDate <= currentDate ? "visible" : "hidden";
                        return `
                            <div class="questionAnswer">
                                <p><strong>Question:</strong> ${q.question}</p>
                                <p><strong>Current Self:</strong> ${q.currentSelf}</p>
                                <p><strong>Future Self:</strong> <span style="visibility:${futureSelfVisibility}">${q.futureSelf}</span></p>
                                <p><strong>Future Date:</strong> ${q.futureDate}</p>
                            </div>
                        `;
                    }).join("")}
                `;
                entriesContainer.appendChild(entryDiv);
            });
        } else {
            alert("Please log in to view entries.");
        }
    });
});
