let divElm = document.createElement("div");
divElm.id = "root";

const header = document.createElement("header");

const menuButton = document.createElement("button");
menuButton.classList.add("icon-menu");

const title = document.createElement("h1");
title.id = "index-title";
title.textContent = "MyMovies";

const darkModeLabel = document.createElement("label");
darkModeLabel.classList.add("switch");

const darkModeInput = document.createElement("input");
darkModeInput.type = "checkbox";
darkModeInput.onclick = () => darkMode();

const darkModeSlider = document.createElement("span");
darkModeSlider.classList.add("slider", "round");

darkModeLabel.appendChild(darkModeInput);
darkModeLabel.appendChild(darkModeSlider);
header.appendChild(menuButton);
header.appendChild(title);
header.appendChild(darkModeLabel);

const main = document.createElement("main");

const footer = document.createElement("footer");

const bookmarkButton = document.createElement("button");
bookmarkButton.classList.add("icon-bookmark");

const ticketButton = document.createElement("button");
ticketButton.classList.add("icon-ticket");

const saveButton = document.createElement("button");
saveButton.classList.add("icon-save");

footer.appendChild(bookmarkButton);
footer.appendChild(ticketButton);
footer.appendChild(saveButton);

divElm.appendChild(header);
divElm.appendChild(main);
divElm.appendChild(footer);

document.querySelector("body").appendChild(divElm);
