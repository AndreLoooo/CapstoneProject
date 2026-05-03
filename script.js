const movieInput = document.getElementById('movieInput');
const searchBtn = document.getElementById('searchBtn');
const movieResult = document.getElementById('movieResult');
searchBtn.addEventListener("click", getMovies);

movieInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        getMovies();
    }
});

function getMovies() {
    const movieName = movieInput.value.trim();
    if (movieName === "") {
        movieResult.innerHTML = "<p>Please enter a movie name.</p>";
        return;
    }

    movieResult.innerHTML = "<p>Give It a Sec...</p>";

    const apiKey = "13737c9f";
    const url = `https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.Response === "False") {
            movieResult.innerHTML = "<p>Movie not found. Please try again.</p>";
            return;
        }

        movieResult.innerHTML = `
        <div class="movie-card">
        <h2>${data.Title}</h2>
        <img src="${data.Poster}" alt="${data.Title} Poster">
        <p><strong>Year:</strong> ${data.Year}</p>
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        </div>
        `;
    })
    .catch(() => {
        movieResult.innerHTML = "<p>Error Fetching movie infromation.</p>";
    });
}



