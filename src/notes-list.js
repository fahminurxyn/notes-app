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

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
        notes-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
          padding: 16px;
        }
      `;
  }

  render() {
    this.updateStyle();
    this.innerHTML = "";
    this.appendChild(this._style);

    this._notes.forEach((note) => {
      const noteItem = document.createElement("notes-item");
      noteItem.setNote(note);
      this.appendChild(noteItem);
    });
  }
}
customElements.define("notes-list", NotesList);
