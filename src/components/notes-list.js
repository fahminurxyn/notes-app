class NotesList extends HTMLElement {
  constructor() {
    super();
    this._notes = [];
    this._style = document.createElement("style");
  }

  setNotes(value) {
    this._notes = value;
    this.render();
  }

  getRandomColor() {
    const colors = ["#afc9f2", "#E2E41E", "#c396ef", "#ffffff"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  addNote(note) {
    note.color = this.getRandomColor();
    this._notes.push(note);
    this.render();
  }

  removeNote(noteId) {
    this._notes = this._notes.filter(note => note.id !== noteId);
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
        :host {
          display: block;
        }

        h1 {
          margin-bottom: 20px;
          color: #f4f4f4;
          padding: 12px 35px;
        }

        .notes-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
          padding: 12px 35px;
        }
      `;
  }

  render() {
    this.updateStyle();
    this.innerHTML = "";
    this.appendChild(this._style);

    const title = document.createElement("h1");
    title.textContent = "Your Notes";
    this.appendChild(title);

    const notesContainer = document.createElement("div");
    notesContainer.classList.add("notes-container");

    this._notes.forEach((note) => {
      const noteItem = document.createElement("notes-item");
      noteItem.setAttribute("note-data", JSON.stringify(note));
      notesContainer.appendChild(noteItem);
    });

    this.appendChild(notesContainer);
  }
}

customElements.define("notes-list", NotesList);
