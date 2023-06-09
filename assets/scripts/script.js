var key = 'ba3996b4071011eebe560242ac120002';
var form = document.getElementById('search');

function formSubmit(event) {
    event.preventDefault();

    var city = document.getElementById('input').value;

    if (!city) {
        console.error('Entering the city is required.');
        return;
    }

    var query = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}`;
    console.log(query);

    //   location.assign(query);
}

form.addEventListener('submit', formSubmit);

var datetime = dayjs().format('dddd, MMMM d, YYYY h:mm:ss A');
console.log(datetime);
document.getElementById("time").textContent = datetime;

function refreshTime() {
    const timeDisplay = document.getElementById("time");
    const dateString = dayjs().format('dddd, MMMM d, YYYY h:mm:ss A');
    timeDisplay.textContent = dateString;
}
setInterval(refreshTime, 1000);
