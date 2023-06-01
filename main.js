/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/desk.js
class Desk {
  createElement() {
    this.deskElement = document.createElement("DIV");
    this.deskElement.classList.add("desk");
  }
  toBody() {
    document.body.appendChild(this.deskElement);
  }
}
;// CONCATENATED MODULE: ./src/img/plus.png
const plus_namespaceObject = __webpack_require__.p + "d7daf129d7d4833b7d74.png";
;// CONCATENATED MODULE: ./src/img/menu.png
const menu_namespaceObject = __webpack_require__.p + "7801ab69033e916caf66.png";
;// CONCATENATED MODULE: ./src/img/close_cross.png
const close_cross_namespaceObject = __webpack_require__.p + "470606d0b271eafa732a.png";
;// CONCATENATED MODULE: ./src/js/column.js




class Column {
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
    this.addCardCross.src = close_cross_namespaceObject;
    this.addCardMenu.src = menu_namespaceObject;
    this.addCardDiv.classList.add("add-card");
    this.plusText.textContent = "Add another card";
    this.columnElement.classList.add("column");
    this.titleElement.textContent = this.title;
    this.titleElement.classList.add("header-title");
    this.addDiv.appendChild(this.plusImg);
    this.addDiv.appendChild(this.plusText);
    this.addDiv.classList.add("add-div");
    this.plusImg.src = plus_namespaceObject;
    this.header.classList.add("header");
    this.header.appendChild(this.titleElement);
    this.menuImg.src = menu_namespaceObject;
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
;// CONCATENATED MODULE: ./src/img/menu_post.png
const menu_post_namespaceObject = __webpack_require__.p + "9c2c5f5b58ce459251d1.png";
;// CONCATENATED MODULE: ./src/js/card.js


class Card {
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
    this.closeCrossElement.src = close_cross_namespaceObject;
    this.menuElement.src = menu_post_namespaceObject;
  }
  toColumn(column) {
    column.insertBefore(this.cardElement, column.lastElementChild.previousElementSibling);
  }
  deleteElement() {
    this.cardElement.remove();
  }
}
;// CONCATENATED MODULE: ./src/js/controller.js



class Controller {
  constructor() {
    this.Desk = new Desk();
    this.toDoColumn = new Column("todo");
    this.inProgressColumn = new Column("in progress");
    this.doneColumn = new Column("done");
  }
  toDOM() {
    this.Desk.createElement();
    this.Desk.toBody();
    this.toDoColumn.createElement();
    this.inProgressColumn.createElement();
    this.doneColumn.createElement();
    this.toDoColumn.toDesk(this.Desk.deskElement);
    this.inProgressColumn.toDesk(this.Desk.deskElement);
    this.doneColumn.toDesk(this.Desk.deskElement);
    this.toDoColumn.columnElement.id = "1";
    this.inProgressColumn.columnElement.id = "2";
    this.doneColumn.columnElement.id = "3";
  }
  get columnsArr() {
    return [this.toDoColumn, this.inProgressColumn, this.doneColumn];
  }
  addNewCard() {
    return new Card();
  }
  onColumnPlusImgMouseover = e => {
    e.target.nextElementSibling.style.textDecoration = "underline";
    e.target.nextElementSibling.style.cursor = "pointer";
    e.target.style.cursor = "pointer";
  };
  onColumnPlusImgMouseout = e => {
    e.target.nextElementSibling.style.textDecoration = "none";
  };
  onColumnPlusImgClick = e => {
    if (window.getComputedStyle(e.target.parentElement.parentElement.querySelector(".add-card")).display === "none") {
      e.target.parentElement.parentElement.querySelector(".add-card").style.display = "block";
      e.target.closest(".add-div").style.visibility = "hidden";
    } else {
      e.target.parentElement.parentElement.querySelector(".add-card").style.display = "none";
      e.target.closest(".add-div").style.visibility = "visible";
    }
  };
  onColumnPlusTextMouseover = e => {
    e.target.style.textDecoration = "underline";
    e.target.style.cursor = "pointer";
    e.target.previousElementSibling.style.cursor = "pointer";
  };
  onColumnPlusTextMouseout = e => {
    e.target.style.textDecoration = "none";
  };
  onColumnPlusTextClick = e => {
    if (window.getComputedStyle(e.target.parentElement.parentElement.querySelector(".add-card")).display === "none") {
      e.target.parentElement.parentElement.querySelector(".add-card").style.display = "block";
      e.target.closest(".add-div").style.visibility = "hidden";
    } else {
      e.target.parentElement.parentElement.querySelector(".add-card").style.display = "none";
      e.target.closest(".add-div").style.visibility = "visible";
    }
  };
  onColumnAddCardCrossClick = e => {
    e.target.closest(".add-card").style.display = "none";
    e.target.parentElement.parentElement.querySelector(".add-div").style.visibility = "visible";
  };
  onColumnAddCardButtonClick = e => {
    const card = new Card();
    card.createElement(e.target.previousElementSibling.value);
    card.toColumn(e.target.closest(".column"));
    this.addCardEvenlisteners(card);
    e.target.previousElementSibling.value = "";
    e.target.closest(".add-card").style.display = "none";
    e.target.parentElement.parentElement.querySelector(".add-div").style.visibility = "visible";
  };
  onColumnAddCardInputKeydown = e => {
    if (e.key === "Enter") {
      const card = new Card();
      card.createElement(e.target.value);
      card.toColumn(e.target.closest(".column"));
      this.addCardEvenlisteners(card);
      e.target.value = "";
      e.target.closest(".add-card").style.display = "none";
      e.target.parentElement.parentElement.querySelector(".add-div").style.visibility = "visible";
    }
  };
  onCardElementMouseover = e => {
    e.target.style.cursor = "grab";
    e.target.parentElement.querySelector(".close-cross").style.visibility = "visible";
    e.target.parentElement.querySelector(".close-cross").style.cursor = "pointer";
    e.target.parentElement.querySelector(".card-icon").style.cursor = "pointer";
  };
  onCardElementMouseout = e => {
    e.target.parentElement.querySelector(".close-cross").style.visibility = "hidden";
  };
  onCardCloseCrossElementClick = e => {
    e.target.closest(".card").remove();
  };
  onDocMouseDown = e => {
    if (e.target.classList.contains("card") || e.target.classList.contains("card-img") || e.target.classList.contains("card-title")) {
      e.target.classList.contains("card") ? this.dragEl = e.target : this.dragEl = e.target.closest(".card");
      document.body.style.cursor = "grabbing";
      this.dragElLeft = this.dragEl.style.left;
      this.dragElTop = this.dragEl.style.top;
      const styles = window.getComputedStyle(this.dragEl);
      this.divHeight = styles.height;
      this.divWidth = styles.width;
      this.shiftX = e.offsetX;
      this.shiftY = e.offsetY;
      this.dragEl.classList.add("dragged");
      this.dragEl.style.top = e.pageY - this.shiftY + "px";
      this.dragEl.style.left = e.pageX - this.shiftX + "px";
      const onDocMouseMove = e => {
        const target = e.target;
        this.dragEl.style.left = e.pageX - this.shiftX + "px";
        this.dragEl.style.top = e.pageY - this.shiftY + "px";
        if (target.classList.contains("column")) {
          const shade = document.createElement("div");
          shade.classList.add("shade");
          shade.style.width = this.divWidth;
          shade.style.height = this.divHeight;
          if (document.querySelector(".shade")) {
            document.querySelector(".shade").remove();
          }
          target.insertBefore(shade, target.firstChild.nextElementSibling);
        }
        if (target.classList.contains("card")) {
          const shade = document.createElement("div");
          shade.classList.add("shade");
          shade.style.width = this.divWidth;
          shade.style.height = this.divHeight;
          const {
            y,
            height
          } = target.getBoundingClientRect();
          const appendPosition = y + height / 2 > e.clientY ? "beforebegin" : "afterend";
          if (document.querySelector(".shade")) {
            document.querySelector(".shade").remove();
          }
          target.insertAdjacentElement(appendPosition, shade);
        }
      };
      const onDocMouseUp = e => {
        const mouseUpItem = e.target;
        document.body.style.cursor = "default";
        if (mouseUpItem.classList.contains("shade")) {
          this.dragEl.style.top = 0 + "px";
          this.dragEl.style.left = 0 + "px";
          this.dragEl.classList.remove("dragged");
          mouseUpItem.replaceWith(this.dragEl);
        } else {
          this.dragEl.classList.remove("dragged");
          this.dragEl.style.top = 0 + "px";
          this.dragEl.style.left = 0 + "px";
          if (document.querySelector(".shade")) {
            document.querySelector(".shade").remove();
          }
        }
        document.removeEventListener("mouseup", onDocMouseUp);
        document.removeEventListener("mousemove", onDocMouseMove);
      };
      document.addEventListener("mouseup", onDocMouseUp);
      document.addEventListener("mousemove", onDocMouseMove);
    }
  };
  addCardEvenlisteners(card) {
    card.cardElement.addEventListener("mouseover", this.onCardElementMouseover);
    card.cardElement.addEventListener("mouseout", this.onCardElementMouseout);
    card.closeCrossElement.addEventListener("click", this.onCardCloseCrossElementClick);
  }
  addStaticEventListeners() {
    this.columnsArr.forEach(column => {
      column.plusImg.addEventListener("mouseover", this.onColumnPlusImgMouseover);
      column.plusImg.addEventListener("mouseout", this.onColumnPlusImgMouseout);
      column.plusImg.addEventListener("click", this.onColumnPlusImgClick);
      column.plusText.addEventListener("mouseover", this.onColumnPlusTextMouseover);
      column.plusText.addEventListener("mouseout", this.onColumnPlusTextMouseout);
      column.plusText.addEventListener("click", this.onColumnPlusTextClick);
      column.addCardCross.addEventListener("click", this.onColumnAddCardCrossClick);
      column.addCardButton.addEventListener("click", this.onColumnAddCardButtonClick);
      column.addCardInput.addEventListener("keydown", this.onColumnAddCardInputKeydown);
    });
    document.addEventListener("mousedown", this.onDocMouseDown);
    document.addEventListener("dragover", e => {
      e.preventDefault();
    });
    document.addEventListener("dragstart", e => {
      e.preventDefault();
    });
    document.addEventListener("drop", e => {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (e.target.classList.contains("card") || e.target.classList.contains("card-title") || e.target.classList.contains("card-icon")) {
        if (e.target.closest(".card").querySelector(".card-title").textContent == "") {
          e.target.closest(".card").querySelector(".card-title").textContent = e.dataTransfer.files[0].name;
        }
        const cardElementContentImg = document.createElement("img");
        e.target.closest(".card").insertBefore(cardElementContentImg, e.target.closest(".card").firstChild.nextElementSibling);
        cardElementContentImg.style.alignSelf = "center";
        cardElementContentImg.classList.add("card-img");
        cardElementContentImg.style.filter = "opacity(1)";
        cardElementContentImg.src = URL.createObjectURL(e.dataTransfer.files && e.dataTransfer.files[0]);
      }
    });
  }
}
;// CONCATENATED MODULE: ./src/js/storage.js
const initStorageCards = controller => {
  window.addEventListener("beforeunload", () => {
    const cardData = {};
    const cardsArray = Array.from(document.querySelectorAll(".card"));
    console.log(cardsArray);
    if (cardsArray.length === 0) {
      localStorage.setItem("cardData", "");
    }
    cardsArray.forEach(card => {
      if (card.firstElementChild.nextElementSibling.classList.contains("close-cross")) {
        cardData[cardsArray.indexOf(card)] = [card.parentElement.id, card.firstElementChild.textContent];
      } else {
        cardData[cardsArray.indexOf(card)] = [card.parentElement.id, card.firstChild.textContent, card.firstElementChild.nextElementSibling.src];
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
      Object.keys(cardData).forEach(key => {
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
          card.cardElement.insertBefore(cardContentImg, card.cardElement.firstChild.nextElementSibling);
        }
      });
    }
  });
};
/* harmony default export */ const storage = (initStorageCards);
;// CONCATENATED MODULE: ./src/js/app.js


const controller = new Controller();
controller.toDOM();
controller.addStaticEventListeners();
storage(controller);
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;