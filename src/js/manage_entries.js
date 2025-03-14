import { app, db } from './firebase-config.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const auth = getAuth(app);
const entriesList = document.getElementById('entriesList');
const editModal = new bootstrap.Modal(document.getElementById('editModal'));
const saveEntryBtn = document.getElementById('saveEntryBtn');
const deleteEntryBtn = document.getElementById('deleteEntryBtn');
const cancelEditBtn = document.createElement('button'); // Create Cancel Button
cancelEditBtn.className = "btn btn-secondary";
cancelEditBtn.textContent = "Cancel";
document.querySelector('.modal-body').appendChild(cancelEditBtn);

let currentEntryId = null;

// Fetch and display entries
const fetchEntries = async (user) => {
  entriesList.innerHTML = ''; // Clear previous entries

  const userEntriesCollection = collection(db, "entries");
  const querySnapshot = await getDocs(userEntriesCollection);

  const entries = querySnapshot.docs
    .filter(doc => doc.data().uid === user.uid)
    .map(doc => ({ id: doc.id, ...doc.data() }));

  entries.forEach(entry => {
    let li = document.createElement('li');
    li.classList.add('list-group-item');
    const entryDate = new Date(entry.updatedAt || entry.createdAt).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    });

    li.innerHTML = `
      <strong>${entry.title}</strong> (${entry.mood}) (${entryDate})<br>${entry.text}
      <button class="btn btn-info btn-sm float-end ms-2 editBtn" data-id="${entry.id}">Edit</button>
      <button class="btn btn-danger btn-sm float-end deleteBtn" data-id="${entry.id}">Delete</button>
    `;
    entriesList.appendChild(li);
  });

  // Attach event listeners
  document.querySelectorAll('.editBtn').forEach(button => {
    button.addEventListener('click', () => confirmEdit(button.getAttribute('data-id')));
  });

  document.querySelectorAll('.deleteBtn').forEach(button => {
    button.addEventListener('click', () => deleteEntry(button.getAttribute('data-id')));
  });
};

// Ensure `fetchEntries` runs only once when the user logs in
onAuthStateChanged(auth, async (user) => {
  if (!user) return;
  fetchEntries(user);
});

// Confirm before editing
const confirmEdit = async (entryId) => {
  if (!confirm("Are you sure you want to edit this entry?")) return;

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
    title, mood, text, updatedAt: new Date().toISOString(), uid: auth.currentUser.uid
  };

  if (currentEntryId) {
    const docRef = doc(db, 'entries', currentEntryId);
    await updateDoc(docRef, entryData);
  } else {
    await addDoc(collection(db, 'entries'), entryData);
  }

  alert('Entry saved!');
  editModal.hide();
  fetchEntries(auth.currentUser);
});

// Cancel edit
cancelEditBtn.addEventListener('click', () => {
  editModal.hide();
  currentEntryId = null;
});

// Delete entry
const deleteEntry = async (entryId) => {
  if (!confirm("Are you sure you want to delete this entry?")) return;

  await deleteDoc(doc(db, 'entries', entryId));
  alert('Entry deleted!');
  fetchEntries(auth.currentUser);
};
