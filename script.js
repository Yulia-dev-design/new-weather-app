let now = new Date();
let h2 = document.querySelector("h2");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

h2.innerHTML = `Now: ${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  showTemperatureForCity(cityInput.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 32;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 0;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

const API_KEY = "83f221ac387e19170ecde933ccac4e98";

function showTemperatureForLatLong(position) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`;
  showTemperatureFromUrl(url);
}

function showTemperatureForCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  showTemperatureFromUrl(url);
}

function showTemperatureFromUrl(url) {
  let h1 = document.querySelector("h1");
  console.log(url);
  axios({
    method: "get",
    url: url,
  }).then(function (response) {
    h1.innerHTML = `You are in ${response.data.name}`;
    let temperature = Math.round(response.data.main.temp);
    let windSpeed = response.data.wind.speed;
    let icon = response.data.weather[0].icon;
    let description = response.data.weather[0].description;
    let precipitation;
    if (response.data.precipitation) {
      precipitation = response.data.precipitation.value;
    }
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${temperature} â„ƒ`;

    console.log(response);
  });
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showTemperatureForLatLong);
}
