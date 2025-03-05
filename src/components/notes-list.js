import gsap from "gsap";

class NotesList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._notes = [];
    this._isArchivedView = false; // Buat tahu lagi lihat archived atau unarchived
  }

  setNotes(value, isArchived = false) {
    this._notes = value;
    this._isArchivedView = isArchived;
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

    const lastNote = this.shadowRoot.querySelector(".notes-container").lastElementChild;
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
          margin-bottom: 12px;
          color: #f4f4f4;
          padding: 12px 35px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-actions {
          display: flex;
          gap: 12px;
        }
        button {
          background: none;
          border: none;
          cursor: pointer;
          color: #f4f4f4;
          font-size: 20px;
          transition: transform 0.2s ease;
        }
        button:hover {
          transform: scale(1.2);
        }
        .notes-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
          padding: 12px 35px;
        }
      </style>
      <h1>
        ${this._isArchivedView ? "Archived Notes" : "Your Notes"}
        <div class="header-actions">
          <button class="toggle-archived-btn" title="${this._isArchivedView ? "Kembali ke Notes Aktif" : "Lihat Arsip"}">
            ${this._isArchivedView ? this.renderIcon("notebook") : this.renderIcon("archive")}
          </button>
        </div>
      </h1>
      <div class="notes-container"></div>
    `;

    const notesContainer = this.shadowRoot.querySelector(".notes-container");

    this._notes.forEach((note) => {
      const noteItem = document.createElement("notes-item");
      noteItem.setAttribute("note-data", JSON.stringify(note));
      notesContainer.appendChild(noteItem);
    });

    this.shadowRoot.querySelector(".toggle-archived-btn").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("toggle-view", {
          bubbles: true,
          composed: true,
        })
      );
    });
  }

  renderIcon(type) {
    if (type === "archive") {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="4" rx="2"></rect>
          <path d="M5 8v12h14V8M10 12h4"></path>
        </svg>
      `;
    } else {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 19V5a2 2 0 012-2h12a2 2 0 012 2v14"></path>
          <path d="M16 3v16M8 3v16M4 8h4M4 12h4M4 16h4"></path>
        </svg>
      `;
    }
  }
}

customElements.define("notes-list", NotesList);
