let h5 = document.querySelector("h5");
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let currentMonth = months[now.getMonth()];
let currentDate = now.getDate();
let currentHours = now.getHours();
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
h5.innerHTML = `${currentDay} ${currentDate} ${currentMonth}, ${currentHours}:${currentMinutes}`;

function search(city) {
let apiKeys = "fca4e608c9e04226400ad543ae6cd5ca";
let apiUrls = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKeys}`;
 axios.get(apiUrls).then(displaySearchWeather);
}

function displayForecast(){
    let forcastElement = document.querySelector("#forecast");

   let forecastHTML = `<div class="row">`;
   let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
   days.forEach(function (day) {
 forecastHTML = forecastHTML + 
 `
   <div class="col-2">

    <div class="forecast-day" style="color:#fbbedf; font-family: arial, helvetica, sans-serif;"><span style="font-size:18px;">${day}</span></div>
    <img
    src="http://openweathermap.org/img/wn/50d.png"
    alt=""
    width="42"
    />
    <div class="forecast-temps">
    <span style="color:#2adaee;" class="forecast-temp-high">18° / </span>
    <span style="color:#2adaee;" class="forecast-temp-low">12°</span>
    </div>
    </div>
    `;
   });
       

    forecastHTML = forecastHTML + `</div>`;
    forcastElement.innerHTML = forecastHTML;
}


function displaySearchWeather(response) {
    celciusTemperature = response.data.main.temp;
  
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#todays-temp").innerHTML = Math.round(
   celciusTemperature);
  document.querySelector("h4").innerHTML = response.data.weather[0].description;
  document.querySelector("#todays-high").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#todays-low").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#todays-humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#todays-wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#current-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#current-icon").setAttribute("alt", response.data.weather[0].description);
 
}

function handleSumbit(event) {
  event.preventDefault();
  let city = document.querySelector("#text-search-input").value;
  search(city); 
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", handleSumbit);

function displayLocationTwo(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#todays-temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#todays-high").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#todays-low").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#todays-humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#todays-wind").innerHTML = Math.round(response.data.wind.speed);
}

function showPosition(position) {
  let apiKey = "fca4e608c9e04226400ad543ae6cd5ca";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayLocationTwo);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

function convertToF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todays-temp");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToF);

function convertToC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todays-temp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature - 32) * (5 / 9));
}
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToC);

let celciusTemperature = null;

displayForecast();

search("Melbourne");
