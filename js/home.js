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
    nowShowingArticleCon.classList.add("movies-container");

    // Fetch now playing movies
    fetch('https://api.themoviedb.org/3/movie/now_playing', options)
        .then(res => res.json())
        .then(res => {
            console.log(res);

            if (res && res.results && res.results.length > 0) {
                res.results.forEach(movie => {
                    const articleElm = document.createElement("article");

                    articleElm.innerHTML = `
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
                        <h3>${movie.title}</h3>
                    `;

                    // Append each movie article to div container
                    nowShowingArticleCon.appendChild(articleElm);
                });
            } else {
                nowShowing.innerHTML += "<p>No movies available at the moment.</p>";
            }
        })

        const popular = document.createElement("section");
        const popularTitle = document.createElement("h2");
        popularTitle.textContent = "Now Showing";
        popular.appendChild(popularTitle);
    
        const popularArticleCon = document.createElement("div");
        popularArticleCon.classList.add("movies-container");
    
        // Fetch now playing movies
        fetch('https://api.themoviedb.org/3/movie/popular', options)
            .then(res => res.json())
            .then(res => {
                console.log(res);
    
                if (res && res.results && res.results.length > 0) {
                    res.results.forEach(movie => {
                        const articleElm = document.createElement("article");
    
                        articleElm.innerHTML = `
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
                            <h3>${movie.title}</h3>
                        `;
    
                        // Append each movie article to div container
                        popularArticleCon.appendChild(articleElm);
                    });
                } else {
                    popular.innerHTML += "<p>No movies available at the moment.</p>";
                }
            })
    
        
    
    
        //append popularArticleCon to popular
        popularArticleCon.style.maxWidth = "100%"; // Set a maximum height for scrolling
        popularArticleCon.style.overflowX = "scroll"; // Enable vertical scroll when content overflows
        popular.appendChild(popularArticleCon);
        // Append the section element to the main container on the page

    


    //append nowShowingArticleCon to nowShowing
    nowShowingArticleCon.style.maxWidth = "100%"; // Set a maximum height for scrolling
    nowShowingArticleCon.style.overflowY = "scroll"; // Enable vertical scroll when content overflows
    nowShowing.appendChild(nowShowingArticleCon);
    // Append the section element to the main container on the page
    document.querySelector("main").append(nowShowing);
    document.querySelector("main").append(popular);


});
