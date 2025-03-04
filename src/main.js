import "./components/notes-header.js";
import "./components/notes-list.js";
import "./components/notes-item.js";
import "./components/notes-form.js";
import './styles/style.css';
import { getNotes, addNote, deleteNote } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const colors = ["#afc9f2", "#E2E41E", "#c396ef", "#ffffff"];
  const notesList = document.querySelector("notes-list");

  try {
    const notes = await getNotes();

    const notesWithColors = notes.map((note) => ({
      ...note,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    notesList.setNotes(notesWithColors);
  } catch (error) {
    alert(`Gagal memuat catatan: ${error.message}`);
  }

  document.addEventListener("note-added", async (event) => {
    try {
      const newNote = await addNote(event.detail);
      notesList.addNote(newNote);
    } catch (error) {
      alert(`Gagal menambahkan catatan: ${error.message}`);
    }
  });

  document.addEventListener("note-deleted", async (event) => {
    try {
      await deleteNote(event.detail.id);
      notesList.removeNote(event.detail.id);
    } catch (error) {
      alert(`Gagal menghapus catatan: ${error.message}`);
    }
  });
});
