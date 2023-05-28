import menuPost from "../img/menu_post.png";
import closeCross from "../img/close_cross.png";

export default class Card {
  createElement(title) {
    this.cardElement = document.createElement("div");
    this.closeCrossElement = document.createElement("img");
    this.menuElement = document.createElement("img");
    this.cardElementContentTitle = document.createElement("div");
    this.cardElement.classList.add("card");
    this.cardElement.appendChild(this.cardElementContentTitle);
    this.cardElementContentTitle.textContent = title;
    this.cardElementContentTitle.classList.add("card-title");
    this.cardElement.appendChild(this.closeCrossElement);
    this.closeCrossElement.classList.add("close-cross");
    this.cardElement.appendChild(this.menuElement);
    this.menuElement.classList.add("card-icon");
    this.closeCrossElement.src = closeCross;
    this.menuElement.src = menuPost;
  }

  toColumn(column) {
    column.insertBefore(
      this.cardElement,
      column.lastElementChild.previousElementSibling
    );
  }
}
