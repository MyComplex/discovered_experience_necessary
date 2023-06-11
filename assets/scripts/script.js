/* Global variables */
var key = '75647ee159a46bf37c329db8acbd31f1';
var form = document.getElementById('search');
// var queryLatLong;
// var weatherNow;
// var weatherForcast;

/* Form submittal */
function formSubmit(event) {

    /* Search field input */
    var city = document.getElementById('input').value;

    /* Handle if search field is blank */
    if (!city) {
        var errorText = 'Entering a city is required!';
        errorModal(errorText);
        return;
    }

    /* Retrieve history from localStorage if it exists */
    var previousCitiesList = localStorage.getItem('searchList');
    var previousCitiesList = JSON.parse(citiesListString);

    if (previousCitiesList === null) {
        previousCitiesList = [];
    }

    /* Trying to check if search already exists in previousCitiesList */
    // for (let i = 0; i < previousCitiesList.length; i++) {
    //     var existingCitySearch = previousCitiesList[i];

    // }

    /* Push search value to staging array */
    previousCitiesList.push({
        city: city
    });

    /* Push staged array to localStorage */
    var previousCitiesListAsString = JSON.stringify(previousCitiesList);
    localStorage.setItem('searchList', previousCitiesListAsString);
};

/* Dynamically populate search history */
var citiesListString = localStorage.getItem('searchList');
var previousCitiesList = JSON.parse(citiesListString);
var searchHolder = document.getElementById('histcont');

if (previousCitiesList) {
    for (var i = 0; i < previousCitiesList.length; i++) {
        var previousCity = previousCitiesList[i];
// if ()
        var searchListItem = document.createElement('li');
        searchListItem.setAttribute('id', 'sh' + [i]);

        var searchButtonItem = document.createElement('button');
        searchButtonItem.textContent = previousCity.city;

        searchHolder.appendChild(searchListItem);
        searchListItem.appendChild(searchButtonItem);
    }
}

/*
    var latlong = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&appid=${key}`;

    var current = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=imperial`;

    var forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${key}&units=imperial`;

    fetch(latlong)
        .then(function (reponse) {
            return reponse.json();
        })
        .then(function (data) {
            return queryLatLong = data;
        })

    fetch(current)
        .then(function (reponse) {
            return reponse.json();
        })
        .then(function (data) {
            return weatherNow = data;
        })

    fetch(forecast)
        .then(function (reponse) {
            return reponse.json();
        })
        .then(function (data) {
            return weatherForcast = data;
        })

    // localStorage.setItem()

}

console.log(queryCount);
console.log(queryLatLong);
console.log(weatherNow);
console.log(weatherForcast);
*/

/* Handle search submission */
form.addEventListener('submit', formSubmit);

/* Handle submission from history */


/* Display date and time */
const datetime = dayjs().format('dddd, MMMM d, YYYY h:mm:ss A');
document.getElementById("time").textContent = datetime;

function refreshTime() {
    const timeDisplay = document.getElementById("time");
    const dateString = dayjs().format('dddd, MMMM D, YYYY h:mm:ss A');
    timeDisplay.textContent = dateString;
}
setInterval(refreshTime, 1000);

const d1 = dayjs().add(1, 'day').format('ddd, MMM D');
const d2 = dayjs().add(2, 'day').format('ddd, MMM D');
const d3 = dayjs().add(3, 'day').format('ddd, MMM D');
const d4 = dayjs().add(4, 'day').format('ddd, MMM D');
const d5 = dayjs().add(5, 'day').format('ddd, MMM D');

/* Modal for error handling */
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function() {
function errorModal(errorText) {
    modal.style.display = "block";
    document.getElementById('errorText').textContent = errorText;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}