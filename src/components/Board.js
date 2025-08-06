import Column from "./Column.js";
import DragController from "./DragController.js";
import { saveToStorage, loadFromStorage } from "../storage.js";

export default class Board {
  constructor(container) {
    this.container = container;
    this.columnsData = [
      { name: "Backlog", id: 0 },
      { name: "In Progress", id: 1 },
      { name: "Done", id: 2 },
    ];
    this.cards = loadFromStorage();

    this.element = document.createElement("div");
    this.element.className = "board";
    this.container.appendChild(this.element);

    this.columns = [];
    this.dragController = null;

    this.init();
    this.render();
    this.container.appendChild(this.element);

    this.dragController = new DragController(
      this.columns.map((col) => col.element),
      this.handleMoveCard.bind(this)
    );
  }

  init() {
    this.columnsData.forEach((col) => {
      const columnCards = this.cards.filter((c) => c.column === col.id);
      const column = new Column(
        col.name,
        columnCards,
        col.id,
        this.handleAddCard.bind(this),
        this.handleDeleteCard.bind(this),
        this.handleMoveCard.bind(this)
      );
      this.columns.push(column);
      this.element.appendChild(column.element);
    });
  }

  render() {
    this.columns.forEach((col) => {
      const columnCards = this.cards.filter(
        (c) => c.column === col.columnIndex
      );
      col.updateCards(columnCards);
    });
  }

  handleAddCard(text, column) {
    const newCard = {
      id: Date.now(),
      text,
      column,
    };
    this.cards.push(newCard);
    saveToStorage(this.cards);
    this.render();
  }

  handleDeleteCard(id) {
    this.cards = this.cards.filter((c) => c.id !== id);
    saveToStorage(this.cards);
    this.render();
  }

  handleMoveCard(id, newColumn, newIndex) {
    const card = this.cards.find((c) => c.id === id);
    if (!card) return;

    this.cards = this.cards.filter((c) => c.id !== id);

    const newCards = [];
    let indexInNewColumn = 0;

    this.columns.forEach((col) => {
      const columnCards = this.cards.filter(
        (c) => c.column === col.columnIndex
      );
      if (col.columnIndex === newColumn) {
        columnCards.splice(newIndex, 0, card);
      }
      columnCards.forEach((c) => {
        newCards.push({ ...c, column: col.columnIndex });
      });
    });

    this.cards = newCards;
    saveToStorage(this.cards);
    this.render();
  }
}
