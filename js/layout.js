let divElm = document.createElement("div");
divElm.id = "root";
divElm.innerHTML = `
    <header>
        <img src="img/Union.svg" alt="menu icon"/>
        <h1 class="details-title" id="index-title">MyMovies</h1>
        <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
        </label>
    </header>
    
    <main>

    </main>

    <footer>
        <button class="icon-bookmark"></button>
        <button class="icon-ticket"></button>
        <button class="icon-save"></button>
    </footer>
`;
document.querySelector("body").append(divElm);