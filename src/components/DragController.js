export default class DragController {
  constructor(columns, onMoveCard) {
    this.columns = columns;
    this.onMoveCard = onMoveCard;

    this.grabbedCard = null;
    this.clone = null;
    this.mouseOffsetX = 0;
    this.mouseOffsetY = 0;

    this.onGrab = this.onGrab.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onDrop = this.onDrop.bind(this);

    document.addEventListener("card-grab", this.onGrab);
  }

  onGrab(e) {
    const { card, clientX, clientY } = e.detail;
    this.grabbedCard = card.element;

    const rect = this.grabbedCard.getBoundingClientRect();

    this.mouseOffsetX = clientX - rect.left;
    this.mouseOffsetY = clientY - rect.top;

    this.clone = document.createElement("div");
    this.clone.className = "card-placeholder";
    this.clone.style.width = `${rect.width}px`;
    this.clone.style.height = `${rect.height}px`;
    this.clone.style.marginBottom = `${rect.height > 0 ? "8px" : "0"}`;

    this.grabbedCard.before(this.clone);

    this.grabbedCard.classList.add("dragged");
    this.grabbedCard.style.position = "fixed";
    this.grabbedCard.style.zIndex = "1000";
    this.grabbedCard.style.width = `${rect.width}px`;
    this.grabbedCard.style.height = `${rect.height}px`;
    this.grabbedCard.style.top = `${clientY - this.mouseOffsetY}px`;
    this.grabbedCard.style.left = `${clientX - this.mouseOffsetX}px`;

    document.addEventListener("mousemove", this.onMove);
    document.addEventListener("mouseup", this.onDrop);
    document.body.style.cursor = "grabbing";
  }

  onMove(e) {
    e.preventDefault();

    this.grabbedCard.style.left = `${e.clientX - this.mouseOffsetX}px`;
    this.grabbedCard.style.top = `${e.clientY - this.mouseOffsetY}px`;

    const underElement = document.elementFromPoint(e.clientX, e.clientY);
    if (!underElement) return;

    const targetCard = underElement.closest(".card");
    const currentColumn = underElement.closest(".column");

    if (targetCard && targetCard !== this.grabbedCard && currentColumn) {
      const rect = targetCard.getBoundingClientRect();
      const middleY = rect.top + rect.height / 2;

      if (e.clientY < middleY) {
        targetCard.before(this.clone);
      } else {
        targetCard.after(this.clone);
      }
    } else if (currentColumn) {
      const cardsContainer = currentColumn.querySelector(".cards");
      cardsContainer.appendChild(this.clone);
    }
  }

  onDrop() {
    if (!this.grabbedCard || !this.clone) return;

    this.clone.before(this.grabbedCard);

    this.clone.remove();

    this.grabbedCard.classList.remove("dragged");
    this.grabbedCard.style.position = "";
    this.grabbedCard.style.zIndex = "";
    this.grabbedCard.style.width = "";
    this.grabbedCard.style.height = "";
    this.grabbedCard.style.top = "";
    this.grabbedCard.style.left = "";

    const newColumn = this.grabbedCard.closest(".column");
    const columnIndex = parseInt(newColumn.dataset.column);
    const cardsContainer = newColumn.querySelector(".cards");
    const index = Array.from(cardsContainer.children).indexOf(this.grabbedCard);

    this.onMoveCard(parseInt(this.grabbedCard.dataset.id), columnIndex, index);

    this.grabbedCard = null;
    this.clone = null;
    document.removeEventListener("mousemove", this.onMove);
    document.removeEventListener("mouseup", this.onDrop);
    document.body.style.cursor = "";
  }
}
