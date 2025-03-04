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
          position: relative;
          overflow: hidden;
        }
        .note__title {
          font-size: 1.3em;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        .note__body {
          margin-bottom: 0.5rem;
        }
        small {
          font-size: 0.8em;
          color: #555;
        }
        .delete-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          background-color: #ff4d4f;
          color: white;
          border: none;
          padding: 6px 10px;
          font-size: 0.8em;
          cursor: pointer;
          border-radius: 5px;
          transition: background-color 0.2s ease;
        }
        .delete-btn:hover {
          background-color: #ff7875;
        }
      </style>
      <h5 class="note__title">${noteData.title}</h5>
      <p class="note__body">${noteData.body}</p>
      <small>${new Date(noteData.createdAt).toLocaleString()}</small>
      <button class="delete-btn">Delete</button>
    `;

    this.shadowRoot
      .querySelector(".delete-btn")
      .addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("note-deleted", {
            bubbles: true,
            composed: true,
            detail: { id: noteData.id },
          })
        );
      });
  }
}

customElements.define("notes-item", NoteItem);
