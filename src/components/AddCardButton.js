export default class AddCardButton {
  constructor(onClick) {
    this.element = document.createElement("button");
    this.element.className = "add-card-button";
    this.element.innerHTML = "➕ Add another card";
    this.element.addEventListener("click", (e) => {
      e.preventDefault();
      onClick();
    });
  }
}
