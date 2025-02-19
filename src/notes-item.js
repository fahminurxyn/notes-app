class NotesItem extends HTMLElement {
  constructor() {
    super();

    this._item = {
      id: 0,
      title: "NEED_TITLE",
      body: "NEED_BODY",
      createdAt: "",
    };

    this._style = document.createElement("style");
  }

  setNote(value) {
    this._note = value;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
        note-item {
        padding: 1rem;
        display: block;
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
    `;
  }

  render() {
    this.updateStyle();
    this.setAttribute("data-id", this._note.id);

    this.innerHTML = `
       ${this._style.outerHTML}
      <h5 class="note__title">${this._note.title}</h5>
      <p class="note__body">${this._note.body}</p>
      <small>${new Date(this._note.createdAt).toLocaleString()}</small>
    `;
  }
}

customElements.define("note-item", NotesItem);
