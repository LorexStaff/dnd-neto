export default class AddCardInput {
  constructor(onAdd, onCancel) {
    this.onAdd = onAdd;
    this.onCancel = onCancel;
    this.element = document.createElement("div");
    this.element.className = "add-card-input";

    this.render();
    this.bindEvents();
  }

  render() {
    this.element.innerHTML = `
      <textarea
        class="add-card-textarea"
        placeholder="Enter a title for this card..."
        autofocus
      ></textarea>
      <div class="add-card-actions">
        <button type="button" class="add-card-submit">Add card</button>
        <button type="button" class="add-card-cancel">×</button>
      </div>
    `;
  }

  bindEvents() {
    const textarea = this.element.querySelector(".add-card-textarea");
    const submitBtn = this.element.querySelector(".add-card-submit");
    const cancelBtn = this.element.querySelector(".add-card-cancel");

    submitBtn.addEventListener("click", () => {
      const text = textarea.value.trim();
      if (text) {
        this.onAdd(text);
      }
    });

    cancelBtn.addEventListener("click", () => {
      this.onCancel();
    });

    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submitBtn.click();
      }
      if (e.key === "Escape") {
        cancelBtn.click();
      }
    });
  }

  focus() {
    this.element.querySelector(".add-card-textarea").focus();
  }

  remove() {
    this.element.remove();
  }
}
