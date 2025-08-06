import Card from "./Card.js";
import AddCardInput from "./AddCardInput.js";
import AddCardButton from "./AddCardButton.js";

export default class Column {
  constructor(name, cards, columnIndex, onCardAdd, onCardDelete, onCardMove) {
    this.name = name;
    this.cards = cards;
    this.columnIndex = columnIndex;
    this.onCardAdd = onCardAdd;
    this.onCardDelete = onCardDelete;
    this.onCardMove = onCardMove;

    this.element = document.createElement("div");
    this.element.className = "column";
    this.element.dataset.column = columnIndex;

    this.cardsContainer = document.createElement("div");
    this.cardsContainer.className = "cards";

    this.element.appendChild(document.createElement("h3")).textContent = name;
    this.element.appendChild(this.cardsContainer);

    this.addButton = new AddCardButton(() => this.showInput());
    this.element.appendChild(this.addButton.element);

    this.input = null;

    this.render();
  }

  render() {
    this.cardsContainer.innerHTML = "";
    this.cards.forEach((cardData) => {
      const card = new Card(
        cardData.text,
        () => this.onCardDelete(cardData.id),
        cardData.id
      );
      this.cardsContainer.appendChild(card.element);
    });
  }

  showInput() {
    if (this.input) return;

    this.input = new AddCardInput(
      (text) => {
        this.onCardAdd(text, this.columnIndex);
        this.removeInput();
      },
      () => this.removeInput()
    );

    this.element.insertBefore(this.input.element, this.addButton.element);
    this.input.focus();
  }

  removeInput() {
    if (this.input) {
      this.input.remove();
      this.input = null;
    }
  }

  updateCards(cards) {
    this.cards = cards;
    this.render();
  }
}
