import Controller from "./controller";
import initStorageCards from "./storage";

const controller = new Controller();
controller.toDOM();
controller.addStaticEventListeners();
initStorageCards(controller);
