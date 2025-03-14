import { app, db } from './firebase-config.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const auth = getAuth(app);
const entriesCollection = collection(db, 'entries');
let currentEntryId = null;

const entriesList = document.getElementById('entriesList');
const editModal = new bootstrap.Modal(document.getElementById('editModal'));
const saveEntryBtn = document.getElementById('saveEntryBtn');
const deleteEntryBtn = document.getElementById('deleteEntryBtn');

const fetchEntries = async () => {
  entriesList.innerHTML = ''; // Clear list

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      console.log("No user is signed in.");
      return;
    }

    const querySnapshot = await getDocs(entriesCollection);
    const entries = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(entry => entry.uid === user.uid); // Show only current user's entries

    entries.forEach(entry => {
      let li = document.createElement('li');
      li.classList.add('list-group-item');
      li.innerHTML = `
        <strong>${entry.title}</strong> (${entry.mood})<br>${entry.text}
        <button class="btn btn-info btn-sm float-end ms-2 editBtn" data-id="${entry.id}">Edit</button>
        <button class="btn btn-danger btn-sm float-end deleteBtn" data-id="${entry.id}">Delete</button>
      `;
      entriesList.appendChild(li);
    });

    // Attach event listeners for edit and delete buttons
    document.querySelectorAll('.editBtn').forEach(button => {
      button.addEventListener('click', () => editEntry(button.getAttribute('data-id')));
    });

    document.querySelectorAll('.deleteBtn').forEach(button => {
      button.addEventListener('click', () => deleteEntry(button.getAttribute('data-id')));
    });
  });
};

// Call fetchEntries after the script loads
fetchEntries();
// Edit entry
const editEntry = async (entryId) => {
  const docRef = doc(db, 'entries', entryId);
  const docSnap = await getDocs(docRef);

  if (docSnap.exists()) {
    const entry = docSnap.data();
    currentEntryId = entryId;

    document.getElementById('editTitle').value = entry.title;
    document.getElementById('editMood').value = entry.mood;
    document.getElementById('editText').value = entry.text;

    editModal.show();
  }
};

// Save or update entry
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
    updatedAt: new Date().toLocaleString(),
    uid: auth.currentUser.uid // Add uid
  };

  if (currentEntryId) {
    // Update entry
    const docRef = doc(db, 'entries', currentEntryId);
    await updateDoc(docRef, entryData);
  } else {
    // Create new entry
    await addDoc(entriesCollection, entryData);
  }

  alert('Entry saved!');
  editModal.hide();
  fetchEntries(); // Refresh entries
});


// Delete entry
deleteEntryBtn.addEventListener('click', async () => {
  if (currentEntryId) {
    const docRef = doc(db, 'entries', currentEntryId);
    await deleteDoc(docRef);
    alert('Entry deleted!');
    editModal.hide();
    fetchEntries(); // Refresh entries
  }
});

// Initial fetch of entries
fetchEntries();
