document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmI1OGVmNGRiZTRlN2NiNWEzMDBlZjM5ZGQyM2U5NyIsIm5iZiI6MTc0MDk4NzE1OS41MDcsInN1YiI6IjY3YzU1YjE3Y2NmYzc0OWFmMjkxZjFlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.24PT5gtAOL0SMXRf5hwCBZ8N01KLm4kvHlXz7J6UtSo'
        }
    };

    function renderMovieDetails(movieDetails) {
        const detailsSection = document.createElement("section");
        const movieCoverCon = document.createElement("div");
        
        const movieCover = document.createElement("img");
        movieCover.src = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`; 
        movieCover.alt = `${movieDetails.title} Cover`;

        movieCover.classList.add("detailMovie-img");

        movieCoverCon.classList.add("detailMovie-img-con");

        detailsSection.appendChild(movieCover);
        movieCoverCon.appendChild(movieCover);
        detailsSection.appendChild(movieCoverCon);


        const genresContainer = document.createElement("div");
        genresContainer.classList.add("popular-genre");

        movieDetails.genres.forEach(genre => {
            const genreSpan = document.createElement("a");
            genreSpan.classList.add("genre");
            genreSpan.textContent = genre.name;
            genresContainer.appendChild(genreSpan);
        });
        detailsSection.appendChild(genresContainer);

        const detailsContainer = document.createElement("div");
        detailsContainer.classList.add("details-con");

        const detailsTitle = document.createElement("h3");
        detailsTitle.classList.add("details-title");
        detailsTitle.textContent = movieDetails.title;
        detailsContainer.appendChild(detailsTitle);

        const runtime = movieDetails.runtime ? movieDetails.runtime : "N/A";
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        const runtimeFormatted = runtime !== "N/A" ? `${hours} hr ${minutes} m` : "N/A";

        const infoContainer = document.createElement("div");
        infoContainer.classList.add("details-info-container");

        const runtimeDiv = document.createElement("div");
        const runtimeTitle = document.createElement("p");
        runtimeTitle.classList.add("details-info-title");
        runtimeTitle.textContent = "Length";
        const runtimeValue = document.createElement("p");
        runtimeValue.textContent = runtimeFormatted;
        runtimeDiv.appendChild(runtimeTitle);
        runtimeDiv.appendChild(runtimeValue);
        detailsContainer.appendChild(runtimeDiv);

        const languageDiv = document.createElement("div");
        const languageTitle = document.createElement("p");
        languageTitle.classList.add("details-info-title");
        languageTitle.textContent = "Language";
        const languageValue = document.createElement("p");
        languageValue.textContent = getLanguageName(movieDetails.original_language);
        languageDiv.appendChild(languageTitle);
        languageDiv.appendChild(languageValue);
        detailsContainer.appendChild(languageDiv);

        const ratingDiv = document.createElement("div");
        const ratingTitle = document.createElement("p");
        ratingTitle.classList.add("details-info-title");
        ratingTitle.textContent = "Rating";
        ratingDiv.appendChild(ratingTitle);


        infoContainer.appendChild(runtimeDiv);
        infoContainer.appendChild(languageDiv);
        infoContainer.appendChild(ratingDiv);

        detailsContainer.appendChild(infoContainer);

        const descriptionTitle = document.createElement("h3");
        descriptionTitle.classList.add("details-title");
        descriptionTitle.textContent = "Description";
        const descriptionPara = document.createElement("p");
        descriptionPara.classList.add("details-overview");
        descriptionPara.textContent = movieDetails.overview;
        detailsContainer.appendChild(descriptionTitle);
        detailsContainer.appendChild(descriptionPara);

        detailsSection.appendChild(detailsContainer);

        return detailsSection;
    }

    function getLanguageName(languageCode) {
        const languageMap = {
            'en': 'English',
            'es': 'Spanish',
            'fr': 'French',
            'de': 'German',
            'it': 'Italian',
            'ja': 'Japanese',
            'ko': 'Korean',
            'pt': 'Portuguese',
            'ru': 'Russian',
            'zh': 'Chinese',
        };
        return languageMap[languageCode] || languageCode.toUpperCase();
    }

    const cachedMovieDetails = localStorage.getItem(`movieDetails_${movieId}`);
    const cachedCastData = localStorage.getItem(`movieCast_${movieId}`);

    if (cachedMovieDetails && cachedCastData) {
        const movieDetails = JSON.parse(cachedMovieDetails);
        const castData = JSON.parse(cachedCastData);

        const detailsSection = renderMovieDetails(movieDetails);

        const castSection = document.createElement("section");
        const castTitle = document.createElement("h3");
        castTitle.classList.add("details-title");
        castTitle.textContent = "Cast";
        castSection.appendChild(castTitle);

        const castList = document.createElement("ul");
        castList.classList.add("cast-list");
        castData.cast.forEach(actor => {
            const castItem = document.createElement("li");
            const actorImage = actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : 'default-profile.jpg';
            const actorImageElement = document.createElement("img");
            actorImageElement.src = actorImage;
            actorImageElement.alt = actor.name;
            actorImageElement.classList.add("actor-img");

            const actorName = document.createElement("strong");
            actorName.textContent = actor.name;

            castItem.appendChild(actorImageElement);
            castItem.appendChild(actorName);
            castList.appendChild(castItem);
        });

        castSection.appendChild(castList);
        detailsSection.appendChild(castSection);

        document.querySelector("main").appendChild(detailsSection);
    } else {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
            .then(detailRes => detailRes.json())
            .then(movieDetails => {
                console.log(movieDetails);
                const detailsSection = renderMovieDetails(movieDetails);

                fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, options)
                    .then(castRes => castRes.json())
                    .then(castData => {
                        console.log(castData);

                        const castSection = document.createElement("section");
                        const castTitle = document.createElement("h3");
                        castTitle.classList.add("details-title");
                        castTitle.textContent = "Cast";
                        castSection.appendChild(castTitle);

                        const castList = document.createElement("ul");
                        castData.cast.forEach(actor => {
                            const castItem = document.createElement("li");
                            const actorImage = actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : 'default-profile.jpg';
                            const actorImageElement = document.createElement("img");
                            actorImageElement.src = actorImage;
                            actorImageElement.alt = actor.name;
                            actorImageElement.classList.add("actor-img");

                            const actorName = document.createElement("strong");
                            actorName.textContent = actor.name;

                            castItem.appendChild(actorImageElement);
                            castItem.appendChild(actorName);
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
