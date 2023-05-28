import plus from "../img/plus.png";
import menu from "../img/menu.png";
import menuAdd from "../img/menu.png";
import closeCross from "../img/close_cross.png";

export default class Column {
  constructor(title) {
    this.title = title;
  }

  createElement() {
    this.columnElement = document.createElement("DIV");
    this.titleElement = document.createElement("P");
    this.menuImg = document.createElement("img");
    this.header = document.createElement("div");
    this.addDiv = document.createElement("div");
    this.addCardDiv = document.createElement("div");
    this.addCardInput = document.createElement("textarea");
    this.addCardButton = document.createElement("button");
    this.addCardCross = document.createElement("img");
    this.addCardMenu = document.createElement("img");
    this.plusImg = document.createElement("img");
    this.plusText = document.createElement("p");
    this.addCardDiv.appendChild(this.addCardInput);
    this.addCardDiv.appendChild(this.addCardButton);
    this.addCardDiv.appendChild(this.addCardCross);
    this.addCardDiv.appendChild(this.addCardMenu);
    this.menuImg.classList.add("menu-img");
    this.addCardButton.classList.add("add-card_buton");
    this.addCardInput.classList.add("add-card_input");
    this.addCardMenu.classList.add("add-card_menu");
    this.addCardCross.classList.add("add-card_cross");
    this.addCardInput.placeholder = "Enter a title for this card...";
    this.addCardButton.textContent = "Add card";
    this.addCardCross.src = closeCross;
    this.addCardMenu.src = menuAdd;
    this.addCardDiv.classList.add("add-card");
    this.plusText.textContent = "Add another card";
    this.columnElement.classList.add("column");
    this.titleElement.textContent = this.title;
    this.titleElement.classList.add("header-title");
    this.addDiv.appendChild(this.plusImg);
    this.addDiv.appendChild(this.plusText);
    this.addDiv.classList.add("add-div");
    this.plusImg.src = plus;
    this.header.classList.add("header");
    this.header.appendChild(this.titleElement);
    this.menuImg.src = menu;
    this.header.appendChild(this.menuImg);
    this.columnElement.appendChild(this.header);
    this.columnElement.appendChild(this.addDiv);
    this.columnElement.appendChild(this.addCardDiv);
  }

  deleteElement() {
    this.columnElement.remove();
  }

  toDesk(desk) {
    desk.appendChild(this.columnElement);
  }
}
