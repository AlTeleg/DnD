import Column from "./column";

export default class Desk {
  constructor() {
    this.toDoColumn = new Column("todo");
    this.inProgressColumn = new Column("in progress");
    this.doneColumn = new Column("done");
  }

  toDom() {
    const div = document.createElement("DIV");
    div.classList.add("desk");
    document.body.appendChild(div);
    this.toDoColumn.addToDesk();
    this.inProgressColumn.addToDesk();
    this.doneColumn.addToDesk();
  }
}
