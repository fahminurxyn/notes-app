class NotesHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
          header {
            text-align: center;
            background-color: #323433;
            padding: 15px;
          }
          h1 {
            margin: 0;
            color: #f4f4f4;
            font-weight: bold;
          }
        </style>
        <header>
          <h1>Your Notes</h1>
        </header>
      `;
  }
}

customElements.define("notes-header", NotesHeader);
