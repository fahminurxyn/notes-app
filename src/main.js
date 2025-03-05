import "./components/notes-header.js";
import "./components/notes-list.js";
import "./components/notes-item.js";
import "./components/notes-form.js";
import "./components/notes-loading.js";
import "./styles/style.css";
import Swal from "sweetalert2";
import {
  getNotes,
  getArchivedNotes,
  addNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const colors = ["#afc9f2", "#E2E41E", "#c396ef", "#ffffff"];
  const notesList = document.querySelector("notes-list");

  const loadingIndicator = document.createElement("notes-loading");
  document.body.appendChild(loadingIndicator);

  try {
    const notes = await getNotes();

    const notesWithColors = notes.map((note) => ({
      ...note,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    notesList.setNotes(notesWithColors);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `Gagal menampilkan catatan: ${error.message}`,
    });
  } finally {
    loadingIndicator.remove();
  }

  document.querySelector("notes-list").addEventListener("toggle-view", async () => {
    const notesList = document.querySelector("notes-list");
  
    const loadingIndicator = document.createElement("notes-loading");
    document.body.appendChild(loadingIndicator);
  
    try {
      if (notesList._isArchivedView) {
        const unarchivedNotes = await getNotes();
        const notesWithColors = unarchivedNotes.map((note) => ({
          ...note,
          color: colors[Math.floor(Math.random() * colors.length)],
        }));
        notesList.setNotes(notesWithColors, false);
      } else {
        const archivedNotes = await getArchivedNotes();
        const notesWithColors = archivedNotes.map((note) => ({
          ...note,
          color: colors[Math.floor(Math.random() * colors.length)],
        }));
        notesList.setNotes(notesWithColors, true);
      }
    } catch (error) {
      alert(`Gagal memuat catatan: ${error.message}`);
    } finally {
      loadingIndicator.remove();
    }
  });
  
  

  document.addEventListener("note-added", async (event) => {
    const loadingIndicator = document.createElement("notes-loading");
    document.body.appendChild(loadingIndicator);
    
    try {
      const newNote = await addNote(event.detail);
      notesList.addNote(newNote);

      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Catatan berhasil ditambahkan!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Gagal menambahkan catatan: ${error.message}`,
      });
    } finally {
      loadingIndicator.remove();
    }
  });

  document.addEventListener("note-deleted", async (event) => {
    const loadingIndicator = document.createElement("notes-loading");
    document.body.appendChild(loadingIndicator);

    try {
      await deleteNote(event.detail.id);
      notesList.removeNote(event.detail.id);

      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Catatan berhasil dihapus!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Gagal menghapus catatan: ${error.message}`,
      });
    } finally {
      loadingIndicator.remove();
    }
  });

  document.addEventListener("note-archived", async (event) => {
    const loadingIndicator = document.createElement("notes-loading");
    document.body.appendChild(loadingIndicator);

    try {
      await archiveNote(event.detail.id);
      notesList.removeNote(event.detail.id);
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Catatan berhasil arsipkan!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Gagal mengarsipkan catatan: ${error.message}`,
      });
    } finally {
      loadingIndicator.remove();
    }
  });

  document.addEventListener("note-unarchived", async (event) => {
    const loadingIndicator = document.createElement("notes-loading");
    document.body.appendChild(loadingIndicator);

    try {
      await unarchiveNote(event.detail.id);
      const notes = await getNotes();
      notesList.setNotes(
        notes.map((note) => ({
          ...note,
          color: colors[Math.floor(Math.random() * colors.length)],
        }))
      );

      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Catatan berhasil dikembalikan!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Gagal mengembalikan catatan: ${error.message}`,
      });
    } finally {
      loadingIndicator.remove();
    }
  });
});
