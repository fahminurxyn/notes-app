class NotesHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  attachEventListeners() {
    const buttons = this.shadowRoot.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', (event) => {
        const filter = event.target.dataset.filter;
        this.dispatchEvent(new CustomEvent('filter-changed', {
          bubbles: true,
          composed: true,
          detail: { filter }
        }));
      });
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        header {
          text-align: center;
          background-color: #323433;
          padding: 15px;
          color: #f4f4f4;
        }
        h1 {
          margin: 0;
          font-weight: bold;
        }
        .filter-buttons {
          margin-top: 10px;
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        button {
          padding: 8px 16px;
          cursor: pointer;
          border: none;
          border-radius: 5px;
          background-color: #f4f4f4;
          color: #323433;
          font-weight: bold;
        }
        button.active {
          background-color: #e6a800;
          color: white;
        }
      </style>
      <header>
        <h1>Your Notes</h1>
        <div class="filter-buttons">
          <button data-filter="active" class="active">Catatan Aktif</button>
          <button data-filter="archived">Catatan Arsip</button>
        </div>
      </header>
    `;
  }
}

customElements.define("notes-header", NotesHeader);
