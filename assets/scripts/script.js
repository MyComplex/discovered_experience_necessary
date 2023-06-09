var form = document.querySelector('.input-group');

function formSubmit(event) {
  event.preventDefault();

  var inputValue = document.querySelector('.input-group-field').value;
  console.log(inputValue);
  var city = inputValue.substring(0,inputValue.indexOf(','));
  console.log(city);
  var state = inputValue.split(', ')[1];
  console.log(state);

  if (!inputValue) {
    console.error('Entering the city and state is required.');
    return;
  }

  var query = `You have entered ${city} and ${state} for your search request`;
  console.log(query);

//   location.assign(query);
}

form.addEventListener('submit', formSubmit);
