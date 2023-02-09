let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[currentTime.getDay()];
let hour = currentTime.getHours();
let minute = currentTime.getMinutes();
if (minute <= 9 && hour <= 9) {
  clock = `0${currentTime.getHours()}:0${currentTime.getMinutes()}`;
}
if (minute <= 9 && hour >= 10) {
  clock = `${currentTime.getHours()}:0${currentTime.getMinutes()}`;
}
if (minute >= 10 && hour <= 9) {
  clock = `0${currentTime.getHours()}:${currentTime.getMinutes()}`;
}
if (minute >= 10 && hour >= 10) {
  clock = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
}

let time = document.querySelector("#currentTime");
time.innerHTML = `${currentDay} ${clock}`;

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let weather = response.data.weather[0].description;
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let h1 = document.querySelector("#deg");
  h1.innerHTML = `${temperature}`;
  let sky = document.querySelector("#sky");
  sky.innerHTML = weather;
  let wind1 = document.querySelector("#wind");
  wind1.innerHTML = wind;
  let humidity1 = document.querySelector("#humidity");
  humidity1.innerHTML = humidity;
  let iconElement = document.querySelector(".icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].icon);

  getForecast(response.data.coord);
}

function WeatherNews(event) {
  event.preventDefault();
  city = document.querySelector("#inputCity");
  city = city.value.toLowerCase();
  heading = document.querySelector("#city");
  heading.innerHTML = `${city}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e20e205e3f166da34e02121073321d9a&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showPosition(position) {
  console.log(`Latitude is ${position.coords.latitude}`);
  console.log(`Longitude is ${position.coords.longitude}`);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=e20e205e3f166da34e02121073321d9a&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature2);
}
function currentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showTemperature2(response) {
  console.log(response.data);
  let cityName = response.data.name;
  let cName = document.querySelector("#city");
  cName.innerHTML = `${cityName}`;
  let temperature = Math.round(response.data.main.temp);
  let weather = response.data.weather[0].description;
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let h1 = document.querySelector("#deg");
  h1.innerHTML = `${temperature}`;
  let sky = document.querySelector("#sky");
  sky.innerHTML = weather;
  let wind1 = document.querySelector("#wind");
  wind1.innerHTML = wind;
  let humidity1 = document.querySelector("#humidity");
  humidity1.innerHTML = humidity;
  let iconElement = document.querySelector(".icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].icon);

  getForecast(response.data.coord);
}

function displayCelsiusTemperature1(event) {
  event.preventDefault();
  const city = document.getElementById("city").innerText;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e20e205e3f166da34e02121073321d9a&units=metric`;
  axios.get(apiUrl).then(displayCelsiusTemperature2);
}

function displayCelsiusTemperature2(response) {
  console.log(response.data);
  let cityName = response.data.name;
  let cName = document.querySelector("#city");
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#deg");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  h1.innerHTML = temperature;
}

function displayFahrenheitTemperature1(event) {
  event.preventDefault();
  const city = document.getElementById("city").innerText;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e20e205e3f166da34e02121073321d9a&units=metric`;
  axios.get(apiUrl).then(displayFahrenheitTemperature2);
}

function displayFahrenheitTemperature2(response) {
  console.log(response.data);
  let cityName = response.data.name;
  let cName = document.querySelector("#city");
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#deg");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = Math.round((temperature * 9) / 5 + 32);
  h1.innerHTML = `${fahrenheiTemperature}`;
}

function nightMode() {
  document.getElementById("ContainAll").style.backgroundImage =
    "url(https://s3.amazonaws.com/shecodesio-production/uploads/files/000/065/092/original/3d-render-tree-landscape-against-night-sky.jpg?1675084570)";
  document.getElementById("ContainAll").style.color = "white";
  document.getElementById("celsius-link").style.color = "#D5E5FC";
  document.getElementById("fahrenheit-link").style.color = "#D5E5FC";
  document.getElementById("sourceCode").style.color = "#62a0f3";
  document.body.style.background = "#04285C";
  document.body.style.color = "white";
}

if (17 < hour || hour < 5) {
  nightMode();
}

let current = document.querySelector(".secondButton");
current.addEventListener("click", currentPosition);

let searchCity = document.querySelector(".firstButton");
searchCity.addEventListener("click", WeatherNews);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature1);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature1);

window.onload = currentPosition;
