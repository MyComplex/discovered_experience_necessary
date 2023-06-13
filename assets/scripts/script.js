/* Global variables */
var key = '75647ee159a46bf37c329db8acbd31f1';
var button = document.getElementById('submit');
var historyHolder = document.getElementById('history-container');
var historyArray = JSON.parse(localStorage.getItem("searches"));

button.addEventListener("click", cityQuery);

function cityQuery() {
    var searchField = document.getElementById("search");
    var historyArray = JSON.parse(localStorage.getItem("searches")) || [];
    var fieldValue = searchField.value;

    /* Handle if search field is blank */
    if (!fieldValue) {
        var errorText = 'Entering a city is required!';
        errorModal(errorText);
        return;
    }

    historyArray.push({
        city: fieldValue
    });
    localStorage.setItem("searches", JSON.stringify(historyArray));
    getCurrentWeatherData(fieldValue);
    getForecastWeatherData(fieldValue);

    renderHistory();
}

renderHistory();

var historyArray = JSON.parse(localStorage.getItem("searches"));

function getCurrentWeatherData(value) {
    var currentWeatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(value) + '&units=imperial&appid=' + key;

    fetch(currentWeatherApiUrl)
        .then(response => response.json())
        .then(data => {
            renderCurrentWeather(data);
        })
        .catch(error => {
            console.log('Current weather error: ', error);
        });
}

function getForecastWeatherData(value) {
    var forecastWeatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + encodeURIComponent(value) + '&units=imperial&appid=' + key;

    fetch(forecastWeatherApiUrl)
        .then(response => response.json())
        .then(data => {
            renderForecastWeather(data);
        })
        .catch(error => {
            console.log('Forecast query error: ', error);
        });
}

/* Render forecast card for query */
function renderForecastWeather(forecastData) {
    var forecastSection = document.getElementById('forecast-section');
    forecastSection.style.display = 'block';
    var forecastHolder = document.getElementById('forecast-container');
    var forecastDataObject = forecastData.list;
    forecastHolder.innerHTML = '';

    for (let i = 1; i < forecastDataObject.length - 6; i += 8) {
        var forecastIndex = forecastDataObject[i];
        var forecastDay = document.createElement('div');
        forecastDay.setAttribute('id', i);
        var forecastDivDate = document.createElement('div');
        forecastDivDate.textContent = dayjs(forecastIndex.dt_txt).format("M/D/YYYY");
        forecastDay.appendChild(forecastDivDate);
        var forecastDivIcon = document.createElement('div');
        forecastDivIcon.innerHTML = `<img alt="forecast${i} weather icon" src="https://openweathermap.org/img/wn/${forecastIndex.weather[0].icon}.png">`;
        forecastDay.appendChild(forecastDivIcon);
        var forecastDivTemp = document.createElement('div');
        forecastDivTemp.textContent = `TEMP: ${Math.round(forecastIndex.main.temp)}°F`;
        forecastDay.appendChild(forecastDivTemp);
        var forecastDivWind = document.createElement('div');
        forecastDivWind.textContent = `Wind: ${Math.round(forecastIndex.wind.speed)} MPH`;
        forecastDay.appendChild(forecastDivWind);
        var forecastDivHumidity = document.createElement('div');
        forecastDivHumidity.textContent = `Humidity: ${forecastIndex.main.humidity}%`;
        forecastDay.appendChild(forecastDivHumidity);
        forecastHolder.appendChild(forecastDay);
    }
};

/* Render current weather card for query */
function renderCurrentWeather(currentData) {
    var currentSection = document.getElementById('current-section');
    currentSection.style.display = 'block';
    var currentHolder = document.getElementById('current-container');
    var currentDataObject = currentData;
    currentHolder.innerHTML = '';
    var currentHolderTop = document.createElement('div');
    currentHolderTop.setAttribute('id', 'current-top');
    currentHolder.appendChild(currentHolderTop);
    var currentDivIcon = document.createElement('div');
    currentDivIcon.innerHTML = `<img alt="Current weather icon" src="https://openweathermap.org/img/wn/${currentDataObject.weather[0].icon}.png">`;
    currentDivIcon.setAttribute('id', 'current-icon');
    currentHolderTop.appendChild(currentDivIcon);
    var currentDivCity = document.createElement('div');
    currentDivCity.setAttribute('id', 'current-city');
    currentDivCity.textContent = currentDataObject.name;
    currentHolderTop.appendChild(currentDivCity);
    var currentHolderBottom = document.createElement('div');
    currentHolderBottom.setAttribute('id', 'current-bottom');
    currentHolder.appendChild(currentHolderBottom);
    var currentDivTemp = document.createElement('div');
    currentDivTemp.textContent = `TEMP: ${Math.round(currentDataObject.main.temp)}°F`;
    currentHolderBottom.appendChild(currentDivTemp);
    var currentDivWind = document.createElement('div');
    currentDivWind.textContent = `Wind: ${Math.round(currentDataObject.wind.speed)} MPH`;
    currentHolderBottom.appendChild(currentDivWind);
    var currentDivHumidity = document.createElement('div');
    currentDivHumidity.textContent = `Humidity: ${currentDataObject.main.humidity}%`;
    currentHolderBottom.appendChild(currentDivHumidity);
};

/* Render history buttons */
function renderHistory() {
    var historyArray = JSON.parse(localStorage.getItem("searches"));
    var historyHolder = document.getElementById('history-container');
    if (historyArray !== null) {
        if (historyArray.length > 1) {
            historyHolder.innerHTML = '';
            for (var i = 0; i < historyArray.length; i++) {
                var element = historyArray[i];
                var historyButtonItem = document.createElement('button');
                historyButtonItem.setAttribute('id', element.city);
                historyButtonItem.textContent = element.city;
                historyHolder.appendChild(historyButtonItem);
            }
        } else {
            var historyButtonItem = document.createElement('button');
            historyButtonItem.setAttribute('id', historyArray[0].city);
            historyButtonItem.textContent = historyArray[0].city;
            historyHolder.appendChild(historyButtonItem);
        }
    }
};

/* Display date and time */
const datetime = dayjs().format('dddd, MMMM d, YYYY h:mm:ss A');
document.getElementById("time").textContent = datetime;

function refreshTime() {
    const timeDisplay = document.getElementById("time");
    const dateString = dayjs().format('dddd, MMMM D, YYYY h:mm:ss A');
    timeDisplay.textContent = dateString;
};
setInterval(refreshTime, 1000);

/* Monitor history buttons */
var historyDiv = document.getElementById('history-container');

historyDiv.addEventListener('click', historyButtonClick, false);

function historyButtonClick(event) {
    if (event.target !== event.currentTarget) {
        var clickedItem = event.target.id;
        getCurrentWeatherData(clickedItem);
        getForecastWeatherData(clickedItem);
    }
    event.stopPropagation();
}


/* Modal for error handling */
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

function errorModal(errorText) {
    modal.style.display = "block";
    document.getElementById('errorText').textContent = errorText;
};

span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
