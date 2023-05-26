import menuPost from "../img/menu_post.png";
import closeCross from "../img/close_cross.png";

export default class Card {
  constructor(columnElement, title) {
    this.column = columnElement;
    this.title = title;
  }

  toColumn() {
    const div = document.createElement("div");
    const closeCrossElement = document.createElement("img");
    const menuElement = document.createElement("img");
    const cardContentTitle = document.createElement("div");

    div.classList.add("card");
    div.appendChild(cardContentTitle);
    cardContentTitle.textContent = this.title;
    cardContentTitle.classList.add("card-title");
    div.appendChild(closeCrossElement);
    closeCrossElement.classList.add("close-cross");
    div.appendChild(menuElement);
    menuElement.classList.add("card-icon");
    closeCrossElement.src = closeCross;
    menuElement.src = menuPost;
    this.column.insertBefore(
      div,
      this.column.lastElementChild.previousElementSibling
    );

    div.addEventListener("mouseover", () => {
      div.style.cursor = "grab";
      closeCrossElement.style.visibility = "visible";
    });

    closeCrossElement.addEventListener("mouseover", () => {
      closeCrossElement.style.cursor = "pointer";
    });

    div.addEventListener("mouseout", () => {
      closeCrossElement.style.visibility = "hidden";
    });

    closeCrossElement.addEventListener("click", () => {
      closeCrossElement.closest(".card").remove();
    });

    const onMouseDown = (e) => {
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

        const onMouseMove = (e) => {
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

        const onMouseUp = (e) => {
          const mouseUpItem = e.target;
          document.body.style.cursor = "default";
          if (mouseUpItem.classList.contains("shade")) {
            this.dragEl.style.top = 0 + "px";
            this.dragEl.style.left = 0 + "px";
            this.dragEl.classList.remove("dragged");
            mouseUpItem.replaceWith(this.dragEl);
          } else {
            console.log(this.dragEl);
            this.dragEl.classList.remove("dragged");
            this.dragEl.style.top = 0 + "px";
            this.dragEl.style.left = 0 + "px";
            if (document.querySelector(".shade")) {
              document.querySelector(".shade").remove();
            }
          }

          document.removeEventListener("mouseup", onMouseUp);
          document.removeEventListener("mousemove", onMouseMove);
        };

        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mousemove", onMouseMove);
      }
    };

    document.addEventListener("mousedown", onMouseDown);

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
        const cardContentImg = document.createElement("img");
        e.target
          .closest(".card")
          .insertBefore(
            cardContentImg,
            e.target.closest(".card").firstChild.nextElementSibling
          );
        cardContentImg.style.alignSelf = "center";
        cardContentImg.classList.add("card-img");
        cardContentImg.style.filter = "opacity(1)";
        cardContentImg.src = URL.createObjectURL(
          e.dataTransfer.files && e.dataTransfer.files[0]
        );
      }
    });

    window.addEventListener('beforeunload', () => {
      const cardData = {};
      const cardsArray = Array.from(document.querySelectorAll('.card'));
      cardsArray.forEach(card => {
        if (card.firstElementChild.nextElementSibling.classList.contains('close-cross')) {
          cardData[card.parentElement.name] = card.firstChild.value;
        } else {
          cardData[card.parentElement.name] = [card.firstChild.value, card.firstElementChild.nextElementSibling.value];
        }
        localStorage.setItem('cardData', cardData)
      })
    })

    document.addEventListener('DOMContentLoaded', () => {
      const json = localStorage.getItem('cardData');
      console.log(1);
      let cardData;

      try {
        cardData = JSON.parse(json)
      } catch (error) {
        console.log(error)
      }
      console.log(cardData)
      if (cardData) {
        Object.keys(cardData).forEach(key => {
          const card = new Card(document.querySelector(`[name=${key}]`), cardData[key])
          card.toColumn();
        })

      }
    })
  }
}
