import "./styles/main.css";
import Board from "./components/Board.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  new Board(app);
});
