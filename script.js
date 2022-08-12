// Constants
const API_KEY = '8dae7ca41db9eb1c69c7ee17d1924999';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const GEOCODING_URL = 'http://api.openweathermap.org/geo/1.0/direct?';

// States
let inputCitylat = 0;
let inputCitylon = 0;

// Cached Element References
const $main = $('main');
const $form = $('form');
const $input = $('input[type="text"]');

// Event Listeners
$form.on('submit', handleSubmit);

// Functions
function handleSubmit(event) {
  event && event.preventDefault();

  getCityCoord(event);

  const promise = $.ajax(
    `${WEATHER_URL}lat=${inputCitylat}&lon=${inputCitylon}&appid=${API_KEY}`
  );

  promise.then(
    (data) => {
      console.log('Weather Data: ', data);
    },
    (error) => {
      console.log('Weather Error: ', error);
    }
  );
}

function getCityCoord(event) {
  const city = $input.val() || 'Denver';
  const promise = $.ajax(`${GEOCODING_URL}q=${city}&appid=${API_KEY}`);
  promise.then(
    (data) => {
      console.log('City Data: ', data);
      inputCitylat = data[0].lat;
      inputCitylon = data[0].lon;
    },
    (error) => {
      console.log('City Error: ', error);
    }
  );
}
