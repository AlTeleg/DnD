import plus from "../img/plus.png";
import menu from "../img/menu.png";
import Card from "./card";
import menuAdd from "../img/menu.png";
import closeCross from "../img/close_cross.png";

export default class Column {
  constructor(title) {
    this.title = title;
  }

  addToDesk() {
    const column = document.createElement("DIV");
    this.column = column;
    const title = document.createElement("P");
    const menuImg = document.createElement("img");
    const header = document.createElement("div");
    const addDiv = document.createElement("div");
    const addCardDiv = document.createElement("div");
    const addCardInput = document.createElement("textarea");
    const addCardButton = document.createElement("button");
    const addCardCross = document.createElement("img");
    const addCardMenu = document.createElement("img");
    const plusImg = document.createElement("img");
    const plusText = document.createElement("p");
    addCardDiv.appendChild(addCardInput);
    addCardDiv.appendChild(addCardButton);
    addCardDiv.appendChild(addCardCross);
    addCardDiv.appendChild(addCardMenu);
    menuImg.classList.add("menu-img");
    addCardButton.classList.add("add-card_buton");
    addCardInput.classList.add("add-card_input");
    addCardMenu.classList.add("add-card_menu");
    addCardCross.classList.add("add-card_cross");
    addCardInput.placeholder = "Enter a title for this card...";

    addCardButton.textContent = "Add card";
    addCardCross.src = closeCross;
    addCardMenu.src = menuAdd;
    addCardDiv.classList.add("add-card");
    const desk = document.querySelector(".desk");
    plusText.textContent = "Add another card";
    column.classList.add("column");
    title.textContent = this.title;
    title.classList.add("header-title");

    addDiv.appendChild(plusImg);
    addDiv.appendChild(plusText);
    addDiv.classList.add("add-div");
    plusImg.src = plus;
    header.classList.add("header");
    header.appendChild(title);
    menuImg.src = menu;
    header.appendChild(menuImg);
    column.appendChild(header);
    column.appendChild(addDiv);
    column.appendChild(addCardDiv);
    desk.appendChild(column);

    plusImg.addEventListener("mouseover", () => {
      plusText.style.textDecoration = "underline";
      plusText.style.cursor = "pointer";
      plusImg.style.cursor = "pointer";
    });

    plusImg.addEventListener("mouseout", () => {
      plusText.style.textDecoration = "none";
    });

    plusText.addEventListener("mouseover", () => {
      plusText.style.textDecoration = "underline";
      plusText.style.cursor = "pointer";
      plusImg.style.cursor = "pointer";
    });

    plusText.addEventListener("mouseout", () => {
      plusText.style.textDecoration = "none";
    });

    plusText.addEventListener("click", () => {
      if (window.getComputedStyle(addCardDiv).display == "none") {
        addCardDiv.style.display = "block";
        addDiv.style.visibility = "hidden";
      } else {
        addCardDiv.style.display = "none";
        addDiv.style.visibility = "visible";
      }
    });

    plusImg.addEventListener("click", () => {
      if (window.getComputedStyle(addCardDiv).display == "none") {
        addCardDiv.style.display = "block";
        addDiv.style.visibility = "hidden";
      } else {
        addCardDiv.style.display = "none";
        addDiv.style.visibility = "visible";
      }
    });

    addCardCross.addEventListener("click", () => {
      addCardDiv.style.display = "none";
      addDiv.style.visibility = "visible";
    });

    addCardButton.addEventListener("click", () => {
      const card = new Card(this.column, addCardInput.value);
      card.toColumn();
      addCardInput.value = "";
      addCardDiv.style.display = "none";
      addDiv.style.visibility = "visible";
    });
    addCardInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const card = new Card(this.column, addCardInput.value);
        card.toColumn();
        addCardInput.value = "";
        addCardDiv.style.display = "none";
        addDiv.style.visibility = "visible";
      }
    });
  }
}
