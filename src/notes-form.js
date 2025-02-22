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
    const title = this.shadowRoot.querySelector("#title");
    const body = this.shadowRoot.querySelector("#body");
    const errorMessage = this.shadowRoot.querySelector("#error-message");

    if (title.value.trim() === "" || body.value.trim() === "") {
      errorMessage.textContent = "Judul dan isi catatan tidak boleh kosong!";
      return;
    }

    errorMessage.textContent = "";
    const newNote = {
      id: Date.now().toString(),
      title: title.value,
      body: body.value,
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
        input, textarea {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1em;
        }
        .error-message {
          color: red;
          font-size: 0.9em;
          margin-top: 5px;
        }
        button {
          background-color: #4caf50;
          color: white;
          padding: 10px;
          border: none;
          cursor: pointer;
        }
        
        button:hover {
          background-color: #45a049;
        }
      </style>
      <form novalidate>
        <input type="text" id="title" placeholder="Judul Catatan" />
        <textarea id="body" placeholder="Isi Catatan"></textarea>
        <span id="error-message" class="error-message"></span>
        <button type="submit">Tambah Catatan</button>
      </form>
    `;
  }
}
customElements.define("notes-form", NoteForm);
