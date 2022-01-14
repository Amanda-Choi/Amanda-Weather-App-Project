// show current Date & Time //
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

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h2.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}`;

///////////////// show 5-day forecast/////////////////
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  console.log(response.data);

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col">
              <div class="Weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>             
              
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@4x.png" alt="Rainy" width="72" />

              <div class="weather-forecast-temperatuares">
                <span class="weather-forecast-max"> ${Math.round(
                  forecastDay.temp.max
                )}°</span>|<span
                  class="weather-forecast-min"
                  >${Math.round(forecastDay.temp.min)}°</span
                >
              </div>
            </div>
         
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

/////////////////////show search city input and temp//////////////////////
function getForecast(coordinates) {
  let apiKey = "9eb999725a805b7110429e48012734fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&&appid=${apiKey}&units=imperial `;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response.data);
  document.querySelector("#current").innerHTML = response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
  );
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "9eb999725a805b7110429e48012734fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#form").value;
  search(city);
}

/////////////////Show F/C conversion////////////////
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusElement = document.querySelector("#temperature");
  //add the active class the fahrenheit
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");

  let celsiusTemperature = (5 / 9) * (fahrenheitTemperature - 32);
  celsiusElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  fahrenheit.classList.add("active");
  celsius.classList.remove("active");

  let fahrenheitElement = document.querySelector("#temperature");
  fahrenheitElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsiusTemperature);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);
search("Seattle");
