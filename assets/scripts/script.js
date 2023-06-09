var key = '20725f67b8ffb04ef043c4fc06daecdd';
var form = document.querySelector('.input-group');

function formSubmit(event) {
    event.preventDefault();

    var city = document.querySelector('.input-group-field').value;

    if (!city) {
        console.error('Entering the city is required.');
        return;
    }

    var query = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}`;
    console.log(query);

    //   location.assign(query);
}

form.addEventListener('submit', formSubmit);
