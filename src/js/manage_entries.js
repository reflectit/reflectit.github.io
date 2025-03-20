import { app, db } from './firebase-config.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc, getDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const auth = getAuth(app);
const entriesList = document.getElementById('entriesList');
const editModal = new bootstrap.Modal(document.getElementById('editModal'));
const saveEntryBtn = document.getElementById('saveEntryBtn');
const cancelEditBtn = document.getElementById('cancelBtn');
const deleteEntryBtn = document.getElementById('deleteEntryBtn');
let currentEntryId = null;

const fetchEntries = async (user) => {
    entriesList.innerHTML = '';

    const userEntriesCollection = collection(db, "entries");
    const querySnapshot = await getDocs(userEntriesCollection);

    const entries = querySnapshot.docs
        .filter(doc => doc.data().uid === user.uid)
        .map(doc => ({ id: doc.id, ...doc.data() }));

    entries.forEach(entry => {
        let li = document.createElement('li');
        li.classList.add('list-group-item');

        let entryDate = null;
        if (entry.updatedAt?.seconds) {
            entryDate = new Date(entry.updatedAt.seconds * 1000);
        } else if (entry.createdAt?.seconds) {
            entryDate = new Date(entry.createdAt.seconds * 1000);
        }

        entryDate = entryDate 
            ? entryDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) 
            : "Date not available";

        li.innerHTML = `
            <strong>${entry.title}</strong> (${entry.mood}) (${entryDate})<br>${entry.text}
            <button class="btn btn-info btn-sm float-end ms-2 editBtn" data-id="${entry.id}">Edit</button>
            <button class="btn btn-danger btn-sm float-end deleteBtn" data-id="${entry.id}">Delete</button>
        `;
        entriesList.appendChild(li);
    });

    document.querySelectorAll('.editBtn').forEach(button => {
        button.addEventListener('click', () => confirmEdit(button.getAttribute('data-id')));
    });

    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', () => deleteEntry(button.getAttribute('data-id')));
    });
};

onAuthStateChanged(auth, async (user) => {
    if (user) fetchEntries(user);
});

const confirmEdit = async (entryId) => {
    const docRef = doc(db, 'entries', entryId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const entry = docSnap.data();
        currentEntryId = entryId;

        document.getElementById('editTitle').value = entry.title;
        document.getElementById('editMood').value = entry.mood;
        document.getElementById('editText').value = entry.text;

        editModal.show();
    }
};

saveEntryBtn.addEventListener('click', async () => {
    const title = document.getElementById('editTitle').value.trim();
    const mood = document.getElementById('editMood').value;
    const text = document.getElementById('editText').value.trim();

    if (!title || !text || mood === 'Choose mood') {
        alert('Please complete all fields.');
        return;
    }

    const entryData = { 
        title, 
        mood, 
        text, 
        updatedAt: serverTimestamp(), 
        uid: auth.currentUser.uid
    };

    if (currentEntryId) {
        await updateDoc(doc(db, 'entries', currentEntryId), entryData);
    } else {
        await addDoc(collection(db, 'entries'), { ...entryData, createdAt: serverTimestamp() });
    }

    alert('Entry saved!');
    editModal.hide();
    currentEntryId = null;
    fetchEntries(auth.currentUser);
});

const deleteEntry = async (entryId) => {
    if (confirm("Are you sure you want to delete this entry?")) {
        await deleteDoc(doc(db, 'entries', entryId));
        alert('Entry deleted!');
        fetchEntries(auth.currentUser);
    }
};

cancelEditBtn.addEventListener('click', () => {
    editModal.hide();
    currentEntryId = null;
});

deleteEntryBtn.addEventListener('click', async () => {
    if (!currentEntryId) return;
    if (!confirm("Are you sure you want to delete this entry?")) return;

    await deleteDoc(doc(db, 'entries', currentEntryId));
    alert('Entry deleted!');

    editModal.hide();
    currentEntryId = null;
    fetchEntries(auth.currentUser);
});
