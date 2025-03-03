document.addEventListener('DOMContentLoaded', () => {
    // Get the movie ID from the URL (e.g., details.html?id=123)
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');  // Get the 'id' parameter

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmI1OGVmNGRiZTRlN2NiNWEzMDBlZjM5ZGQyM2U5NyIsIm5iZiI6MTc0MDk4NzE1OS41MDcsInN1YiI6IjY3YzU1YjE3Y2NmYzc0OWFmMjkxZjFlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.24PT5gtAOL0SMXRf5hwCBZ8N01KLm4kvHlXz7J6UtSo'
        }
    };

    function renderMovieDetails(movieDetails){
        const detailsSection = document.createElement("section");
        const title = document.createElement("h2");
        title.textContent = movieDetails.title;
        detailsSection.appendChild(title);

        const genres = movieDetails.genres.map(genre => genre.name).join(", ");
        detailsSection.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movieDetails.poster_path}" alt="${movieDetails.title}" />
            <h3>${movieDetails.title}</h3>
            <p>${genres}</p>
            <h3>Description</h3>
            <p>${movieDetails.overview}</p>
        `;

        return detailsSection;
    }

    const cachedMovieDetails = localStorage.getItem(`movieDetails_${movieId}`);
    const cachedCastData = localStorage.getItem(`movieCast_${movieId}`);

    if (cachedMovieDetails && cachedCastData) {
        const movieDetails = JSON.parse(cachedMovieDetails);
        const castData = JSON.parse(cachedCastData);

        const detailsSection = renderMovieDetails(movieDetails);

        const castSection = document.createElement("section");
        const castTitle = document.createElement("h3");
        castTitle.textContent = "Cast";
        castSection.appendChild(castTitle);

        const castList = document.createElement("ul");
        castData.cast.forEach(actor => {
            const castItem = document.createElement("li");
            const actorImage = actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : 'default-profile.jpg';
            castItem.innerHTML = `
                <img src="${actorImage}" alt="${actor.name}" />
                <strong>${actor.name}</strong> as ${actor.character}
            `;
            castList.appendChild(castItem);
        });

        castSection.appendChild(castList);
        detailsSection.appendChild(castSection);

        document.querySelector("main").appendChild(detailsSection);
    }else{
        fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
        .then(detailRes => detailRes.json())
        .then(movieDetails => {
            console.log(movieDetails);

            // Render the movie details
            const detailsSection = renderMovieDetails(movieDetails);

            // Fetch cast data
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, options)
                .then(castRes => castRes.json())
                .then(castData => {
                    console.log(castData);

                    // Render cast data
                    const castSection = document.createElement("section");
                    const castTitle = document.createElement("h3");
                    castTitle.textContent = "Cast";
                    castSection.appendChild(castTitle);

                    const castList = document.createElement("ul");
                    castData.cast.forEach(actor => {
                        const castItem = document.createElement("li");
                        const actorImage = actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : 'default-profile.jpg';
                        castItem.innerHTML = `
                            <img src="${actorImage}" alt="${actor.name}" />
                            <strong>${actor.name}</strong> as ${actor.character}
                        `;
                        castList.appendChild(castItem);
                    });

                    castSection.appendChild(castList);
                    detailsSection.appendChild(castSection);

                    // Cache the movie details and cast data in localStorage
                    localStorage.setItem(`movieDetails_${movieId}`, JSON.stringify(movieDetails));
                    localStorage.setItem(`movieCast_${movieId}`, JSON.stringify(castData));

                    // Append the details section to the page
                    document.querySelector("main").appendChild(detailsSection);
                })
                .catch(err => console.error("Error fetching cast data:", err));
        })
        .catch(err => {
            console.log("Error fetching movie details:", err);
        });
}
});
