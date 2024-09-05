function showWeatherDetails(response) {
  //  function displays weather data onto screen

  // display searched city
  let currentCityElement = document.querySelector("#current-city");
  currentCityElement.innerHTML = `${response.data.city}`;

  // diplay temperature level
  let currentTemp = document.querySelector("#current-temperature-value");
  let tempLevel = Math.round(response.data.temperature.current);
  currentTemp.innerHTML = tempLevel;

  // display date
  let currentDateELement = document.querySelector("#current-date");
  let cityDate = new Date(response.data.time * 1000);
  currentDateELement.innerHTML = formatDate(cityDate);

  //display weather description
  let weatherDescription = response.data.condition.description;
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  weatherDescriptionElement.innerHTML = `${weatherDescription}`;

  //display humidity and wind speed
  let humidityLabel = document.querySelector("#humidity");
  let windSpeedLabel = document.querySelector("#wind-speed");
  humidityLabel.innerHTML = response.data.temperature.humidity;
  windSpeedLabel.innerHTML = response.data.wind.speed;

  // change weather icon
  let weatherIcon = document.querySelector("#weather-icon");
  let iconImage = `<img src="${response.data.condition.icon_url}" alt="weather icon">`;
  weatherIcon.innerHTML = iconImage;
}

function searchCity(event) {
  // function that obtains data about searched city

  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");

  let city = searchInputElement.value;
  let units = "metric";
  let apiKey = "fd0bc378da5bt009ca78cd94a3b94doa";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherDetails);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function showParisDetails() {
  let city = "paris";
  let units = "metric";
  let apiKey = "fd0bc378da5bt009ca78cd94a3b94doa";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherDetails);
}

// show details of Paris when weather app is loaded
showParisDetails();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);