const apiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const pathIMG = "https://image.tmdb.org/t/p/w1280";
const searchUrl = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=`

const resultado = document.getElementById('resultado');
const formulario = document.querySelector('#formulario');
const peli = document.querySelector('#peli');




getMovies(apiUrl);


async function getMovies(url) {

    const resp = await fetch(url);
    const respData = await resp.json();

    showMovies(respData.results);
}


function showMovies(movies) {

    resultado.innerHTML = "";

    console.log(movies);

    movies.forEach(movie => {

        const { title, poster_path, overview, release_date, popularity, vote_average } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <div><h4>${title}</h4></div>
            <div class="imagen"><img
                src="${pathIMG + poster_path}"
                alt="${title}" /></div>
            <div class ="vote"><span>${release_date}</span>
            <span>${popularity}</span> 
            <span class="${getClassRate(vote_average)}">${vote_average}</span>
            </div>
        `;

        resultado.appendChild(movieEl);
    });



}


function getClassRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}




formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const buscarPeli = peli.value;

    if (buscarPeli) {
        getMovies(searchUrl + buscarPeli);
    }

    peli.value = "";
})