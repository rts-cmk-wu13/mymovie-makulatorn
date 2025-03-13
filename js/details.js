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
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=details,credits`, options)
        .then(response => response.json())  // Parse the JSON response
        .then(data => {  // Use 'data' to store the response (parsed JSON)
            console.log(data);  // Log the entire response to see its structure (optional)


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
                const ratingValue = movieDetails.vote_average ? movieDetails.vote_average.toFixed(1) : "N/A";
                const ratingValueElm = document.createElement("p");
                ratingValueElm.textContent = ratingValue + " IMDb";
                ratingDiv.appendChild(ratingTitle);
                ratingDiv.appendChild(ratingValueElm);

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
                    'ta': 'Tamil'
                };
                return languageMap[languageCode] || languageCode.toUpperCase();
            }

            const movieDetails = data;
            const castData = data.credits.cast;

            const detailsSection = renderMovieDetails(movieDetails);


            const castSection = document.createElement("section");
            const castTitle = document.createElement("h3");
            castTitle.classList.add("details-title");
            castTitle.textContent = "Cast";
            castSection.appendChild(castTitle);

            const castList = document.createElement("div");
            castList.classList.add("cast-list");
            castData.forEach(actor => {
                const castItem = document.createElement("a");
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
        }
        )
})
