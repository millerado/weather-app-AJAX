// Constants
const API_KEY = '8dae7ca41db9eb1c69c7ee17d1924999';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';


// States

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

  const promise = $.ajax(
    `${WEATHER_URL}q=${city}&units=imperial&appid=${API_KEY}`
  );
  promise.then(
    (data) => {
      console.log('Weather Data: ', data);
      render(data);
    },
    (error) => {
      console.log('Weather Error: ', error);
    }
  );

function render(weatherData) {
  $main.html(`
  <h3>City: ${weatherData.name}</h3>
  <p>Temp: ${weatherData.main.temp}&#x2109</p>
  <p>Feels Like: ${weatherData.main.feels_like}&#x2109</p>
  <p>Weather: ${weatherData.weather[0].description}</p>
  `);
}
