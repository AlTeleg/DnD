import Card from "./card";

// Доделываю

const startCashe = () => {
  window.addEventListener("beforeunload", () => {
    const cardData = {};
    const cardsArray = Array.from(document.querySelectorAll(".card"));
    cardsArray.forEach((card) => {
      if (
        card.firstElementChild.nextElementSibling.classList.contains(
          "close-cross"
        )
      ) {
        cardData[cardsArray.indexOf(card)] = [card.parentElement.id, card.firstElementChild.textContent];
      } else {
        cardData[card.parentElement.id] = [
          card.parentElement.id,
          card.firstChild.textContent,
          card.firstElementChild.nextElementSibling.src,
        ];
      }
      console.log(JSON.stringify(JSON.stringify(cardData)))
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
          document.getElementById(`${cardData[key][0]}`),
          cardData[key][1]
        );
        card.toColumn();
        if (cardData[key][2]) {
          const cardContentImg = document.createElement("img");
          cardContentImg.style.alignSelf = "center";
          cardContentImg.classList.add("card-img");
          cardContentImg.style.filter = "opacity(1)";
          cardContentImg.src = cardData[key][2];
          console.log(card.thisElement.firstChild.nextElementSibling)
          card.thisElement.insertBefore(
            cardContentImg,
            card.thisElement.firstChild.nextElementSibling
          );    
        }

      });
    }
  });
};
export default startCashe;
