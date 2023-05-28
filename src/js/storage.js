const initStorageCards = (controller) => {
  
  window.addEventListener("beforeunload", () => {

    const cardData = {};
    const cardsArray = Array.from(document.querySelectorAll(".card"));
    console.log(cardsArray)
    if (cardsArray.length === 0) {
      localStorage.setItem("cardData", '')
    }
    cardsArray.forEach((card) => {
      if (
        card.firstElementChild.nextElementSibling.classList.contains(
          "close-cross"
        )
      ) {
        cardData[cardsArray.indexOf(card)] = [
          card.parentElement.id,
          card.firstElementChild.textContent,
        ];
      } else {
        cardData[cardsArray.indexOf(card)] = [
          card.parentElement.id,
          card.firstChild.textContent,
          card.firstElementChild.nextElementSibling.src,
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
        const card = controller.addNewCard();
        card.createElement(cardData[key][1]);
        card.toColumn(document.getElementById(cardData[key][0]));
        controller.addCardEvenlisteners(card);
        if (cardData[key][2]) {
          const cardContentImg = document.createElement("img");
          cardContentImg.style.alignSelf = "center";
          cardContentImg.classList.add("card-img");
          cardContentImg.style.filter = "opacity(1)";
          cardContentImg.src = cardData[key][2];
          card.cardElement.insertBefore(
            cardContentImg,
            card.cardElement.firstChild.nextElementSibling
          );
        }
      });
    }
  });
};
export default initStorageCards;
