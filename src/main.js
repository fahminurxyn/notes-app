import "./notes-header.js";
import "./notes-list.js";
import "./notes-item.js";
import "./notes-form.js";

document.addEventListener("DOMContentLoaded", () => {
  const notesData = [];

  const notesList = document.querySelector("notes-list");
  notesList.setNotes(notesData);

  document.addEventListener("note-added", (event) => {
    notesData.push(event.detail);
    notesList.setNotes([...notesData]);
  });
});
