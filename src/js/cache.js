import Card from "./card";

// Доделываю

const startCashe = () => {
  window.addEventListener("beforeunload", () => {
    const cardData = {};
    const cardsArray = Array.from(document.querySelectorAll(".card"));
    cardsArray.forEach((card) => {
      console.log(card.parentElement.id);
      if (
        card.firstElementChild.nextElementSibling.classList.contains(
          "close-cross"
        )
      ) {
        cardData[card.parentElement.id] = card.firstElementChild.textContent;
      } else {
        cardData[card.parentElement.id] = [
          card.firstChild.value,
          card.firstElementChild.nextElementSibling.value,
        ];
      }
      localStorage.setItem("cardData", JSON.stringify(cardData));
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const json = localStorage.getItem("cardData");
    let cardData;

    try {
      cardData = JSON.parse(json);
    } catch (error) {
      console.log(error);
    }
    if (cardData) {
      Object.keys(cardData).forEach((key) => {
        const card = new Card(
          document.querySelector(`#'${key}'`),
          cardData[key]
        );
        card.toColumn();
      });
    }
  });
};
export default startCashe;
