/* Global variables */
var key = '75647ee159a46bf37c329db8acbd31f1';
var form = document.getElementById('search');
var button = document.getElementById('submit');
var nowContainer = document.getElementById('current');
var nowTitle = document.getElementsByClassName('nowTitle');
var nowTemp = document.getElementsByClassName('nowTemp');
var nowIcon = document.getElementsByClassName('nowIcon');
var nowWind = document.getElementsByClassName('nowWind');
var nowHumidity = document.getElementsByClassName('nowHumidity');
var nowTitleContent;
var nowTempContent;
var nowIconContent;
var nowWindContent;
var nowHumidityContent;
var currentData = [];

/* Submittal */
button.addEventListener('click', function (event) {
    event.preventDefault();
    /* Search field input */
    var city = document.getElementById('input').value;
    /* Handle if search field is blank */
    if (!city) {
        var errorText = 'Entering a city is required!';
        errorModal(errorText);
        return;
    }
    if (city) {
        var current = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=imperial`;
        fetch(current)
            .then(function (reponse) {
                return reponse.json();
            })
            .then(function (data) {
                currentData = data;


            })

        nowContainer.style.display = 'block';
        // var forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${key}&units=imperial`;

        // fetch(latlong)
        //     .then(function (reponse) {
        //         return reponse.json();
        //     })
        //     .then(function (data) {
        //         return queryLatLong = data;
        //     })

        // fetch(forecast)
        //     .then(function (reponse) {
        //         return reponse.json();
        //     })
        //     .then(function (data) {
        //         return weatherForcast = data;
        //     })
    }
    /* Retrieve history from localStorage if it exists */
    var previousCitiesList = localStorage.getItem('searchList');
    var previousCitiesList = JSON.parse(citiesListString);
    if (previousCitiesList === null) {
        previousCitiesList = [];
    }
    /* Push search value to staging array */
    previousCitiesList.push({
        city: city
    });
    /* Push staged array to localStorage */
    var previousCitiesListAsString = JSON.stringify(previousCitiesList);
    localStorage.setItem('searchList', previousCitiesListAsString);
});

nowTitle.textContent = `${currentData.name}`;
// nowTempContent = `${data.main.temp}°F`;
// nowIconContent = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
// nowWindContent = `${data.wind.speed} MPH`;
// nowHumidityContent = `${data.main.humidity}%`;
console.log(nowTitle.textContent);
// console.log(nowTempContent);
// console.log(nowIconContent);
// console.log(nowWindContent);
// console.log(nowHumidityContent);

/* Dynamically populate search history */
var citiesListString = localStorage.getItem('searchList');
var previousCitiesList = JSON.parse(citiesListString);
var searchHolder = document.getElementById('histcont');

if (previousCitiesList) {
    for (var i = 0; i < previousCitiesList.length; i++) {
        var previousCity = previousCitiesList[i];
        var searchListItem = document.createElement('li');
        searchListItem.setAttribute('id', 'sh' + [i]);

        var searchButtonItem = document.createElement('button');
        searchButtonItem.textContent = previousCity.city;

        searchHolder.appendChild(searchListItem);
        searchListItem.appendChild(searchButtonItem);
    }
}


/* Handle search submission */
// form.addEventListener('submit', formSubmit);

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