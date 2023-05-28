import Desk from "./desk";
import Column from "./column";
import Card from "./card";

export default class Controller {
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

  onColumnPlusImgMouseover = (e) => {
    e.target.nextElementSibling.style.textDecoration = "underline";
    e.target.nextElementSibling.style.cursor = "pointer";
    e.target.style.cursor = "pointer";
  };

  onColumnPlusImgMouseout = (e) => {
    e.target.nextElementSibling.style.textDecoration = "none";
  };

  onColumnPlusImgClick = (e) => {
    if (
      window.getComputedStyle(
        e.target.parentElement.parentElement.querySelector(".add-card")
      ).display === "none"
    ) {
      e.target.parentElement.parentElement.querySelector(
        ".add-card"
      ).style.display = "block";
      e.target.closest(".add-div").style.visibility = "hidden";
    } else {
      e.target.parentElement.parentElement.querySelector(
        ".add-card"
      ).style.display = "none";
      e.target.closest(".add-div").style.visibility = "visible";
    }
  };

  onColumnPlusTextMouseover = (e) => {
    e.target.style.textDecoration = "underline";
    e.target.style.cursor = "pointer";
    e.target.previousElementSibling.style.cursor = "pointer";
  };

  onColumnPlusTextMouseout = (e) => {
    e.target.style.textDecoration = "none";
  };

  onColumnPlusTextClick = (e) => {
    if (
      window.getComputedStyle(
        e.target.parentElement.parentElement.querySelector(".add-card")
      ).display === "none"
    ) {
      e.target.parentElement.parentElement.querySelector(
        ".add-card"
      ).style.display = "block";
      e.target.closest(".add-div").style.visibility = "hidden";
    } else {
      e.target.parentElement.parentElement.querySelector(
        ".add-card"
      ).style.display = "none";
      e.target.closest(".add-div").style.visibility = "visible";
    }
  };

  onColumnAddCardCrossClick = (e) => {
    e.target.closest(".add-card").style.display = "none";
    e.target.parentElement.parentElement.querySelector(
      ".add-div"
    ).style.visibility = "visible";
  };

  onColumnAddCardButtonClick = (e) => {
    const card = new Card();
    card.createElement(e.target.previousElementSibling.value);
    card.toColumn(e.target.closest(".column"));
    this.addCardEvenlisteners(card);
    e.target.previousElementSibling.value = "";
    e.target.closest(".add-card").style.display = "none";
    e.target.parentElement.parentElement.querySelector(
      ".add-div"
    ).style.visibility = "visible";
  };

  onColumnAddCardInputKeydown = (e) => {
    if (e.key === "Enter") {
      const card = new Card();
      card.cardElement(e.target.value);
      card.toColumn(e.target.closest(".column"));
      this.addCardEvenlisteners(card);
      e.target.value = "";
      e.target.closest(".add-card").style.display = "none";
      e.target.parentElement.parentElement.querySelector(
        ".add-div"
      ).style.visibility = "visible";
    }
  };

  onCardElementMouseover = (e) => {
    e.target.style.cursor = "grab";
    e.target.parentElement.querySelector(".close-cross").style.visibility =
      "visible";
    e.target.parentElement.querySelector(".close-cross").style.cursor =
      "pointer";
    e.target.parentElement.querySelector(".card-icon").style.cursor = "pointer";
  };

  onCardElementMouseout = (e) => {
    e.target.parentElement.querySelector(".close-cross").style.visibility =
      "hidden";
  };

  onCardCloseCrossElementClick = (e) => {
    e.target.closest(".card").remove();
  };

  onDocMouseDown = (e) => {
    if (
      e.target.classList.contains("card") ||
      e.target.classList.contains("card-img")
    ) {
      e.target.classList.contains("card")
        ? (this.dragEl = e.target)
        : (this.dragEl = e.target.closest(".card"));
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

      const onDocMouseMove = (e) => {
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

          const { y, height } = target.getBoundingClientRect();
          const appendPosition =
            y + height / 2 > e.clientY ? "beforebegin" : "afterend";
          if (document.querySelector(".shade")) {
            document.querySelector(".shade").remove();
          }
          target.insertAdjacentElement(appendPosition, shade);
        }
      };

      const onDocMouseUp = (e) => {
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
    card.closeCrossElement.addEventListener(
      "click",
      this.onCardCloseCrossElementClick
    );
  }

  addStaticEventListeners() {
    this.columnsArr.forEach((column) => {
      column.plusImg.addEventListener(
        "mouseover",
        this.onColumnPlusImgMouseover
      );
      column.plusImg.addEventListener("mouseout", this.onColumnPlusImgMouseout);
      column.plusImg.addEventListener("click", this.onColumnPlusImgClick);
      column.plusText.addEventListener(
        "mouseover",
        this.onColumnPlusTextMouseover
      );
      column.plusText.addEventListener(
        "mouseout",
        this.onColumnPlusTextMouseout
      );
      column.plusText.addEventListener("click", this.onColumnPlusTextClick);
      column.addCardCross.addEventListener(
        "click",
        this.onColumnAddCardCrossClick
      );
      column.addCardButton.addEventListener(
        "click",
        this.onColumnAddCardButtonClick
      );
      column.addCardInput.addEventListener(
        "keydown",
        this.onColumnAddCardInputKeydown
      );
    });

    document.addEventListener("mousedown", this.onDocMouseDown);

    document.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    document.addEventListener("dragstart", (e) => {
      e.preventDefault();
    });

    document.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (
        e.target.classList.contains("card") ||
        e.target.classList.contains("card-title") ||
        e.target.classList.contains("card-icon")
      ) {
        if (
          e.target.closest(".card").querySelector(".card-title").textContent ==
          ""
        ) {
          e.target.closest(".card").querySelector(".card-title").textContent =
            e.dataTransfer.files[0].name;
        }
        const cardElementContentImg = document.createElement("img");
        e.target
          .closest(".card")
          .insertBefore(
            cardElementContentImg,
            e.target.closest(".card").firstChild.nextElementSibling
          );
        cardElementContentImg.style.alignSelf = "center";
        cardElementContentImg.classList.add("card-img");
        cardElementContentImg.style.filter = "opacity(1)";
        cardElementContentImg.src = URL.createObjectURL(
          e.dataTransfer.files && e.dataTransfer.files[0]
        );
      }
    });
  }
}
