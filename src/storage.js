export const saveToStorage = (cards) => {
  localStorage.setItem("trello-cards", JSON.stringify(cards));
};

export const loadFromStorage = () => {
  const saved = localStorage.getItem("trello-cards");
  return saved ? JSON.parse(saved) : [];
};
