document.addEventListener('DOMContentLoaded', () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmI1OGVmNGRiZTRlN2NiNWEzMDBlZjM5ZGQyM2U5NyIsIm5iZiI6MTc0MDk4NzE1OS41MDcsInN1YiI6IjY3YzU1YjE3Y2NmYzc0OWFmMjkxZjFlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.24PT5gtAOL0SMXRf5hwCBZ8N01KLm4kvHlXz7J6UtSo'
        }
    };
    
        const nowShowing = document.createElement("section");
        const nowShowingTitle = document.createElement("h2");
        nowShowingTitle.textContent = "Now Showing";
        nowShowing.appendChild(nowShowingTitle);
    
        const nowShowingArticleCon = document.createElement("div");
        nowShowingArticleCon.classList.add("now-showing-container");
    
        // Check if data is cached
        const cachedNowShowing = localStorage.getItem('nowShowingData');
        if (cachedNowShowing) {
            const res = JSON.parse(cachedNowShowing);
            renderNowShowingMovies(res);

            //if not, fetch
        } else {
            fetch('https://api.themoviedb.org/3/movie/now_playing', options)
                .then(res => res.json())
                .then(res => {
                    if (res && res.results && res.results.length > 0) {
                        //cache data
                        localStorage.setItem('nowShowingData', JSON.stringify(res));
                        renderNowShowingMovies(res);
                    } else {
                        nowShowing.innerHTML += "<p>No movies available at the moment.</p>";
                    }
                })
                .catch(err => console.error("Error fetching data", err));
        }
    
        function renderNowShowingMovies(res) {
            res.results.forEach(movie => {
                const articleElm = document.createElement("article");
                articleElm.innerHTML = `
                    <a href="details.html?id=${movie.id}">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
                        <h3>${movie.title}</h3>
                    </a>
                `;
                nowShowingArticleCon.appendChild(articleElm);
            });
            nowShowing.appendChild(nowShowingArticleCon);
        }
    
        const popular = document.createElement("section");
        const popularTitle = document.createElement("h2");
        popularTitle.textContent = "Popular";
        popular.appendChild(popularTitle);
    
        const popularArticleCon = document.createElement("div");
        popularArticleCon.classList.add("popular-container");
    
        // Check if data is cached
        const cachedPopular = localStorage.getItem('popularData');
        if (cachedPopular) {
            const res = JSON.parse(cachedPopular);
            renderPopularMovies(res);
            //if not, fetch
        } else {
            fetch('https://api.themoviedb.org/3/movie/popular', options)
                .then(res => res.json())
                .then(res => {
                    if (res && res.results && res.results.length > 0) {
                        //cache data
                        localStorage.setItem('popularData', JSON.stringify(res));
                        renderPopularMovies(res);
                    } else {
                        popular.innerHTML += "<p>No movies available at the moment.</p>";
                    }
                })
                .catch(err => console.error("Error fetching data", err));
        }
    
        function renderPopularMovies(res) {
            res.results.forEach(movie => {
                fetch(`https://api.themoviedb.org/3/movie/${movie.id}`, options)
                    .then(detailRes => detailRes.json())
                    .then(movieDetails => {
                        const popularArticle = document.createElement("article");
                        const runtime = movieDetails.runtime ? movieDetails.runtime : "N/A";
                        const hours = Math.floor(runtime / 60);
                        const minutes = runtime % 60;
                        const runtimeFormatted = runtime !== "N/A" ? `${hours} hr ${minutes} m` : "N/A";
                        const genres = movieDetails.genres.map(genre => genre.name).join(", ");
                        popularArticle.innerHTML = `
                            <a href="details.html?id=${movie.id}">
                                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
                                <h3>${movie.title}</h3>
                                <p class="popular-genre">${genres}</p>
                                <p>${runtimeFormatted}</p>
                            </a>
                        `;
                        popularArticleCon.appendChild(popularArticle);
                    })
                    .catch(err => console.error("Error fetching movie details", err));
            });
            popular.appendChild(popularArticleCon);
        }
    
        popularArticleCon.style.maxHeight = "327px"; 
        popularArticleCon.style.overflowX = "scroll"; 
        nowShowingArticleCon.style.maxWidth = "100%"; 
        nowShowingArticleCon.style.overflowY = "scroll"; 
    
        const mainContainer = document.querySelector("main");
        mainContainer.appendChild(nowShowing);
        mainContainer.appendChild(popular);
    });
    