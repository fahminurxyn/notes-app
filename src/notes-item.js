class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  setNote(value) {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          background:  ${value.color};
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
      <h5 class="note__title">${value.title}</h5>
      <p class="note__body">${value.body}</p>
      <small>${new Date(value.createdAt).toLocaleString()}</small>
    `;
  }
}
customElements.define("notes-item", NoteItem);
