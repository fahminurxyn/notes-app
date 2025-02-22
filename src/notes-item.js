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
          border-radius: 4px;
          box-shadow: 0 0 2px 2px #33333377;
          background: #fff;
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
