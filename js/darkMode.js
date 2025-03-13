function darkMode() {
    var bodyElm = document.querySelector("body");
    bodyElm.classList.toggle("dark-mode");

    var isDarkMode = bodyElm.classList.contains("dark-mode");

    localStorage.setItem("darkMode", isDarkMode.toString());
}

function applyDarkMode() {
    var bodyElm = document.querySelector("body");
    var savedDarkMode = localStorage.getItem("darkMode") === "true";

    if (savedDarkMode) {
        bodyElm.classList.add("dark-mode");
    }
    var sectionElm = document.querySelectorAll('body');
    sectionElm.forEach(function(section){
        section.classList.add("dark-mode");
    });

}

document.addEventListener("DOMContentLoaded", applyDarkMode);
