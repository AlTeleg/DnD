import Desk from "./desk";

const desk = new Desk();
desk.toDom();

const addDiv = document.querySelector('.add-div');

addDiv.addEventListener('hover', () => {
    Array.from(addDiv.children).forEach(child => child.style.textDecoration = 'underline');
    addDiv.style.cursor = 'pointer';
})