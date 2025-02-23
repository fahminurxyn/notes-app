class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return ["note-data"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "note-data") {
      this.render();
    }
  }

  render() {
    const noteData = JSON.parse(this.getAttribute("note-data"));
    if (!noteData) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          background: ${noteData.color};
          color: #111111;
          text-align: left;
        }
        .note__title {
          font-size: 1.3em;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        .note__body {
          margin-bottom: 0.5rem;
        }
      </style>
      <h5 class="note__title">${noteData.title}</h5>
      <p class="note__body">${noteData.body}</p>
      <small>${new Date(noteData.createdAt).toLocaleString()}</small>
    `;
  }
}

customElements.define("notes-item", NoteItem);