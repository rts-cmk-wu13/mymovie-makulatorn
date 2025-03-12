let divElm = document.createElement("div");
divElm.id = "root";

// Create Header
const header = document.createElement("header");

// Create Menu Button
const menuButton = document.createElement("button");
menuButton.classList.add("icon-menu");

// Create Title
const title = document.createElement("h1");
title.id = "index-title";
title.textContent = "MyMovies";

// Create Dark Mode Switch
const darkModeLabel = document.createElement("label");
darkModeLabel.classList.add("switch");

const darkModeInput = document.createElement("input");
darkModeInput.type = "checkbox";
darkModeInput.onclick = () => darkMode(); // Assuming darkMode() is a predefined function

const darkModeSlider = document.createElement("span");
darkModeSlider.classList.add("slider", "round");

// Append elements to the header
darkModeLabel.appendChild(darkModeInput);
darkModeLabel.appendChild(darkModeSlider);
header.appendChild(menuButton);
header.appendChild(title);
header.appendChild(darkModeLabel);

// Create Main
const main = document.createElement("main");

// Create Footer
const footer = document.createElement("footer");

// Create Footer Buttons
const bookmarkButton = document.createElement("button");
bookmarkButton.classList.add("icon-bookmark");

const ticketButton = document.createElement("button");
ticketButton.classList.add("icon-ticket");

const saveButton = document.createElement("button");
saveButton.classList.add("icon-save");

// Append footer buttons
footer.appendChild(bookmarkButton);
footer.appendChild(ticketButton);
footer.appendChild(saveButton);

// Append header, main, and footer to divElm
divElm.appendChild(header);
divElm.appendChild(main);
divElm.appendChild(footer);

// Append the divElm to the body
document.querySelector("body").appendChild(divElm);
