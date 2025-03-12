function darkMode() {
    var bodyElm = document.body;
    bodyElm.classList.toggle("dark-mode");

    var isDarkMode = bodyElm.classList.contains("dark-mode");

    localStorage.setItem("darkMode", isDarkMode.toString());
}

function applyDarkMode() {
    var bodyElm = document.body;
    var savedDarkMode = localStorage.getItem("darkMode") === "true";

    if (savedDarkMode) {
        bodyElm.classList.add("dark-mode");
    }
    var sectionElm = document.querySelectorAll('section, article');
    sectionElm.forEach(function(section){
        section.classList.add("dark-mode");
    });

}

document.addEventListener("DOMContentLoaded", applyDarkMode);
