import "./notes-list.js";
import "./notes-item.js";
import "./notes-form.js";

document.addEventListener("DOMContentLoaded", () => {
  const notesData = [
    {
      id: "notes-jT-jjsyz61J8XKiI",
      title: "Welcome to Notes, Dimas!",
      body: "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
      createdAt: "2022-07-28T10:03:12.594Z",
      archived: false,
    },
  ];

  const notesList = document.querySelector("notes-list");
  notesList.setNotes(notesData);

  document.addEventListener("note-added", (event) => {
    notesData.push(event.detail);
    notesList.setNotes([...notesData]);
  });
});
