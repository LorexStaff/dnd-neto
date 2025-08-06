export default class DeleteButton {
  constructor(onClick) {
    this.element = document.createElement("button");
    this.element.className = "delete-btn";
    this.element.setAttribute("aria-label", "Delete card");
    this.element.innerHTML = "×";
    this.element.addEventListener("click", (e) => {
      e.stopPropagation();
      onClick();
    });
  }
}
