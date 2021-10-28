const API_KEY = "api_key=6dd4ac955e22ceabe426094b83c43634";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const movies = document.getElementById("movies");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Generate color from rating
function getColor(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 4) {
    return "yellow";
  } else if (vote > 0) {
    return "red";
  } else {
    return "white";
  }
}

function showMovies(data) {
  // Clone Movie template and add cloned template
  let itemCopy = document.getElementsByClassName("movie")[0].cloneNode(true);
  let tempHTML = "";
  var id = 0;
  data.forEach((movie) => {
    const release_year = movie.release_date.substring(0, 4);
    itemCopy.getElementsByClassName("image")[0].src =
      IMG_URL + movie.poster_path;
    itemCopy.getElementsByClassName("title")[0].innerHTML =
      movie.original_title + " (" + release_year + ")";
    itemCopy.getElementsByClassName("rating")[0].innerHTML = movie.vote_average;
    itemCopy.getElementsByClassName("id")[0].innerHTML = id;
    tempHTML += "\n" + itemCopy.outerHTML;
    id++;
  });
  document.getElementById("movies").innerHTML = tempHTML;
}

// Get movie from API and show Movies
function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    });
}

getMovies(API_URL);

// Filter search bar
function searchBar() {
  let input, filter, movieLists, movie, title, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  movieLists = document.getElementById("movies");
  movie = movieLists.getElementsByClassName("movie");

  for (i = 0; i < movie.length; i++) {
    title = movie[i].getElementsByClassName("title")[0];
    txtValue = title.textContent || title.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      movie[i].style.display = "";
    } else {
      movie[i].style.display = "none";
    }
  }
}

// Open modal
function openModal(context, modal) {
  // updates and opens the modal
  let itemNum = context.getElementsByClassName("id")[0].innerHTML;
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      renderModal(itemNum, data.results);
    });
  modal.style.display = "block";
}

// Render modal depends on movie
function renderModal(number, json) {
  let movieData = json[number];
  const release_year = movieData.release_date.substring(0, 4);
  document.getElementById("movieDescTitle").innerHTML =
    movieData.original_title + ` (${release_year})`;
  document.getElementById("movieDescRating").className =
    "span " + getColor(movieData.vote_average);
  document.getElementById("movieDescRating").innerHTML = movieData.vote_average;
  document.getElementsByClassName("movieDesc")[0].innerHTML =
    movieData.overview;
}

// Close modal when  outside modal is clicked
window.onclick = function (event) {
  if (event.target == movieModal) {
    movieModal.style.display = "none";
  }
};
