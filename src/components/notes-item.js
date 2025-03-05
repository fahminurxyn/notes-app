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

    const isArchived = noteData.archived;

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
        .icon-btn {
          position: absolute;
          top: 8px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 6px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 0.2s ease;
        }
        .icon-btn svg {
          width: 20px;
          height: 20px;
          stroke: #ffffff;
        }
        .delete-btn {
          right: 8px;
          background-color: #ff4d4f;
        }
        .archive-btn {
          right: 48px;
          background-color: #4caf50;
        }
        .unarchive-btn {
          right: 48px;
          background-color: #ffc107;
        }
      </style>
      <h5 class="note__title">${noteData.title}</h5>
      <p class="note__body">${noteData.body}</p>
      <small>${new Date(noteData.createdAt).toLocaleString()}</small>

      <button class="icon-btn delete-btn" title="Delete Note">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m1 0v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6h12Zm-5 4v6m-3-6v6m6-6v6"/></svg>
      </button>

      <button class="icon-btn ${isArchived ? "unarchive-btn" : "archive-btn"}" title="${isArchived ? "Unarchive" : "Archive"} Note">
        ${
          isArchived
            ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 8v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-3.6-3.6a2 2 0 0 0-1.4-.6H9a2 2 0 0 0-1.4.6L4 8m5 4h6m-3-3v6"/></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 8v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-3.6-3.6a2 2 0 0 0-1.4-.6H9a2 2 0 0 0-1.4.6L4 8m4 4h8"/></svg>`
        }
      </button>
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

    this.shadowRoot
      .querySelector(isArchived ? ".unarchive-btn" : ".archive-btn")
      .addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent(isArchived ? "note-unarchived" : "note-archived", {
            bubbles: true,
            composed: true,
            detail: { id: noteData.id },
          })
        );
      });
  }
}

customElements.define("notes-item", NoteItem);
