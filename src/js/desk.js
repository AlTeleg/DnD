export default class Desk {
  createElement() {
    this.deskElement = document.createElement("DIV");
    this.deskElement.classList.add("desk");
  }

  toBody() {
    document.body.appendChild(this.deskElement);
  }
}
