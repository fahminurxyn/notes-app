import gsap from "gsap";

class NotesList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._notes = [];
  }

  setNotes(value) {
    this._notes = value;
    this.render();
    this.animateInitialRender();
  }

  getRandomColor() {
    const colors = ["#afc9f2", "#E2E41E", "#c396ef", "#ffffff"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  addNote(note) {
    note.color = this.getRandomColor();
    this._notes.push(note);
    this.render();

    const lastNote =
      this.shadowRoot.querySelector(".notes-container").lastElementChild;
    this.animateNoteIn(lastNote);
  }

  removeNote(noteId) {
    const index = this._notes.findIndex((note) => note.id === noteId);
    if (index === -1) return;

    const notesContainer = this.shadowRoot.querySelector(".notes-container");
    const noteElements = notesContainer.querySelectorAll("notes-item");

    const noteElement = noteElements[index];

    gsap.to(noteElement, {
      opacity: 0,
      scale: 0.5,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        this._notes.splice(index, 1);
        this.render();
      },
    });
  }

  connectedCallback() {
    this.render();
  }

  animateInitialRender() {
    const noteElements = this.shadowRoot.querySelectorAll("notes-item");
    gsap.from(noteElements, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
    });
  }

  animateNoteIn(noteElement) {
    gsap.from(noteElement, {
      opacity: 0,
      y: 50,
      duration: 0.5,
      ease: "power2.out",
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
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
      </style>
      <h1>Your Notes</h1>
      <div class="notes-container"></div>
    `;

    const notesContainer = this.shadowRoot.querySelector(".notes-container");

    this._notes.forEach((note) => {
      const noteItem = document.createElement("notes-item");
      noteItem.setAttribute("note-data", JSON.stringify(note));
      notesContainer.appendChild(noteItem);
    });
  }
}

customElements.define("notes-list", NotesList);
