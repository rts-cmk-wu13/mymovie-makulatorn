document.addEventListener('DOMContentLoaded', () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmI1OGVmNGRiZTRlN2NiNWEzMDBlZjM5ZGQyM2U5NyIsIm5iZiI6MTc0MDk4NzE1OS41MDcsInN1YiI6IjY3YzU1YjE3Y2NmYzc0OWFmMjkxZjFlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.24PT5gtAOL0SMXRf5hwCBZ8N01KLm4kvHlXz7J6UtSo'
        }
    };


    const mainContainer = document.querySelector("main");

    // Create sections for Now Showing and Popular
    const nowShowing = createSection("Now Showing", "now-showing-container", 'nowShowingData', renderNowShowingMovies);
    const popular = createSection("Popular", "popular-container", 'popularData', renderPopularMovies);

    mainContainer.appendChild(nowShowing);
    mainContainer.appendChild(popular);

    // Function to create a section and handle data fetching and rendering
    function createSection(title, containerClass, localStorageKey, renderFunction) {
        const section = document.createElement("section");

        const titleElement = document.createElement("h2");
        titleElement.textContent = title;
        titleElement.classList.add("details-title");
        section.appendChild(titleElement);

        const container = document.createElement("div");
        container.classList.add(containerClass);

        // Check if data is cached
        const cachedData = localStorage.getItem(localStorageKey);
        if (cachedData) {
            const res = JSON.parse(cachedData);
            renderFunction(res, container);
        } else {
            fetchDataAndRender(container, renderFunction, localStorageKey);
        }

        section.appendChild(container);
        return section;
    }

    // Function to fetch data and render
    function fetchDataAndRender(container, renderFunction, localStorageKey) {
        fetch(`https://api.themoviedb.org/3/movie/${container.classList[0]}`, options)
            .then(res => res.json())
            .then(res => {
                if (res && res.results && res.results.length > 0) {
                    // Cache data
                    localStorage.setItem(localStorageKey, JSON.stringify(res));
                    renderFunction(res, container);
                } else {
                    const noMoviesMessage = document.createElement("p");
                    noMoviesMessage.textContent = "No movies available at the moment.";
                    container.appendChild(noMoviesMessage);
                }
            })
            .catch(err => console.error("Error fetching data", err));
    }

    // Function to render Now Showing movies
    function renderNowShowingMovies(res, container) {
        res.results.forEach(movie => {
            const article = createMovieArticle(movie);
            container.appendChild(article);
        });
    }

    // Function to render Popular movies
    function renderPopularMovies(res, container) {
        res.results.forEach(movie => {
            fetch(`https://api.themoviedb.org/3/movie/${movie.id}`, options)
                .then(detailRes => detailRes.json())
                .then(movieDetails => {
                    const article = createPopularArticle(movie, movieDetails);
                    container.appendChild(article);
                })
                .catch(err => console.error("Error fetching movie details", err));
        });
    }

    // Function to create a movie article for Now Showing
    function createMovieArticle(movie) {
        const articleElm = document.createElement("article");

        const link = document.createElement("a");
        link.href = `details.html?id=${movie.id}`;

        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.alt = `${movie.title}`;

        const h3 = document.createElement("h3");
        h3.classList.add("details-title");
        h3.textContent = movie.title;

        const p = document.createElement("p");
        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
        p.textContent = `${rating}/10 IMDb`;

        link.appendChild(img);
        link.appendChild(h3);
        link.appendChild(p);
        articleElm.appendChild(link);

        return articleElm;
    }

    // Function to create a movie article for Popular
    function createPopularArticle(movie, movieDetails) {
        const popularArticle = document.createElement("article");
        popularArticle.classList.add("movie-article");


        const divContainer = document.createElement("div");
        divContainer.style.display = "flex";

        const link = document.createElement("a");
        link.href = `details.html?id=${movie.id}`;
        link.classList.add("popular-list");

        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.alt = `${movie.title}`;

        link.appendChild(img);


        const detailsDiv = document.createElement("div");
        detailsDiv.classList.add("home-movie-details");

        const h3 = document.createElement("h3");
        h3.classList.add("details-title");
        h3.textContent = movie.title;

        const pRating = document.createElement("p");
        const rating = movieDetails.vote_average ? movieDetails.vote_average.toFixed(1) : "N/A";
        pRating.textContent = `${rating}/10 IMDb`;

        const pGenres = document.createElement("div");
        movieDetails.genres.forEach(genre => {
            const genreLink = document.createElement("a");
            genreLink.classList.add("genre");
            genreLink.textContent = genre.name;
            pGenres.appendChild(genreLink);
        });

        const pRuntime = document.createElement("p");
        const runtime = movieDetails.runtime ? movieDetails.runtime : "N/A";
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        const runtimeFormatted = runtime !== "N/A" ? `${hours} hr ${minutes} m` : "N/A";
        pRuntime.textContent = runtimeFormatted;

        detailsDiv.appendChild(h3);
        detailsDiv.appendChild(pRating);
        detailsDiv.appendChild(pGenres);
        detailsDiv.appendChild(pRuntime);

        divContainer.appendChild(link);
        divContainer.appendChild(detailsDiv);
        popularArticle.appendChild(divContainer);

        return popularArticle;
    }


    const mikkel = make(["div", { className: "hog" }, "mmyellow"]);
    document.body.appendChild(mikkel)

});


