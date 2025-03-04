const colors = ["#afc9f2", "#E2E41E", "#c396ef", "#ffffff"];
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
      color: colors[Math.floor(Math.random() * colors.length)],
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
          padding: 12px 35px;
        }
        h1 {
          text-align: left;
          padding-left: 35px
        }
        label {
          font-size: 18px;
          font-weight: 500;
        }
        input, textarea {
          padding: 20px;
          border: none;
          border-radius: 20px;
          font-size: 1em;
          background-color: #323433;
          color: white;
        }
        .error-message {
          color: red;
          font-size: 0.9em;
          margin-top: 5px;
        }
        button {
          background-color: #b1a5e9;
          color: white;
          padding: 20px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          font-size: 20px;
          font-weight: 700;
        }
        
        button:hover {
          background-color:rgb(129, 120, 169);
        }
      </style>
      <h1>Create Your Notes... </h1>
      <form novalidate>
        <label for="title">Notes Title</label>
        <input type="text" id="title" placeholder="Create Your Title for Notes..." />
        <label for="title">Notes Description</label>
        <textarea id="body" placeholder="Fill Your Description for your Notes..."></textarea>
        <span id="error-message" class="error-message"></span>
        <button type="submit">Tambah Catatan</button>
      </form>
    `;
  }
}
customElements.define("notes-form", NoteForm);
