import DeleteButton from "./DeleteButton.js";

export default class Card {
  constructor(text, onDelete, id) {
    this.text = text;
    this.onDelete = onDelete;
    this.id = id;

    this.element = document.createElement("div");
    this.element.className = "card";
    this.element.dataset.id = id;

    this.render();
    this.bindEvents();
  }

  render() {
    this.element.innerHTML = "";
    const textEl = document.createElement("div");
    textEl.className = "card-text";
    textEl.textContent = this.text;
    this.element.appendChild(textEl);

    const deleteBtn = new DeleteButton(this.onDelete);
    this.element.appendChild(deleteBtn.element);
  }

  bindEvents() {
    this.element.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("delete-btn")) return;
      e.preventDefault();
      document.dispatchEvent(
        new CustomEvent("card-grab", {
          detail: { card: this, clientX: e.clientX, clientY: e.clientY },
        })
      );
    });
  }
}
