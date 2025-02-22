class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot
      .querySelector("form")
      .addEventListener("submit", this.submitHandler.bind(this));
  }

  submitHandler(event) {
    event.preventDefault();
    const title = this.shadowRoot.querySelector("#title").value;
    const body = this.shadowRoot.querySelector("#body").value;
    const newNote = {
      id: Date.now().toString(),
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };
    document.dispatchEvent(new CustomEvent("note-added", { detail: newNote }));
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        form {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px;
        }
      </style>
      <form>
        <input type="text" id="title" placeholder="Judul Catatan" required />
        <textarea id="body" placeholder="Isi Catatan" required></textarea>
        <button type="submit">Tambah Catatan</button>
      </form>
    `;
  }
}
customElements.define("note-form", NoteForm);
