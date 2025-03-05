let divElm = document.createElement("div");
divElm.id = "root";
divElm.innerHTML = `
    <header>
        <img src="img/Union.svg" alt="menu icon"/>
        <h1 class="index-title">MyMovies</h1>
        <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
        </label>
    </header>
    
    <main>

    </main>

    <footer>Created 2025</footer>
`;
document.querySelector("body").append(divElm);