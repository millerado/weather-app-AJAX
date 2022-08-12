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

  const city = $input.val() || 'Denver';

  const promise = $.ajax(`${WEATHER_URL}q=${city}&appid=${API_KEY}`);
  promise.then(
    (data) => {
      console.log('Weather Data: ', data);
      render(data);
    },
    (error) => {
      console.log('Weather Error: ', error);
    }
  );
}

// function getCityCoord(event) {
//   const promise = $.ajax(`${GEOCODING_URL}q=${city}&appid=${API_KEY}`);
//   promise.then(
//     (data) => {
//       console.log('City Data: ', data);
//       inputCitylat = data[0].lat;
//       inputCitylon = data[0].lon;
//     },
//     (error) => {
//       console.log('City Error: ', error);
//     }
//   );
// }

function render(weatherData) {
  $main.html(`
  <h3>City: ${weatherData.name}</h3>
  <p>Temp: ${weatherData.main.temp}</p>
  <p>Feels Like: ${weatherData.main.feels_like}</p>
  <p>Weather: ${weatherData.weather[0].description}</p>
  `);
}
