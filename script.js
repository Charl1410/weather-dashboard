weatherAPILink = "https://openweathermap.org/forecast5";
weather_API_Key = "d91f911bcf2c0f925fb6535547a5ddc9";
fiveDayForecast = 5;

var searchBtn = document.getElementById("search-btn");
var searchContent = document.getElementById("search-content");
var errorMsg = document.getElementById("error-message");
var appendLocation = document.getElementById("append-location");
var country = document.getElementById("coutry");
var dailyWeatherContainer = document.getElementById("daily-weather-container");

loadSavedLocations();

//function to get the entered value from the input

function getEnterLocation() {
  var searchContentValue = searchContent.value;
  console.log(searchContentValue);

  //if the text is empty append in error similar to right wrong answer in quiz
  if (searchContentValue === "") {
    errorMsg.textContent = "please enter a location"; //set time out
    setTimeout(function () {
      errorMsg.textContent = ""; //set time out
    }, 1000);
  } else {
    lookUp(searchContentValue);

    appendLiLocation();

    localStorageSave();
    
  }
}

//retrieves the value of the input and append a li into the HTML
function appendLiLocation() {
  const enteredLocation = searchContent.value;
  const appendLocation = document.getElementById("location-append");

  const li = document.createElement("li");
  li.classList.add("list-style");
  li.textContent = enteredLocation;
  li.addEventListener("click", lookUp); //this doesnt work yet
  appendLocation.appendChild(li);
}

function localStorageSave() {
  var savedLocation = document.getElementById("search-content").value;

  if (localStorage.getItem("cities") == null) {
    var localStore = localStorage.setItem( "cities",'[]');
  }

  var storedData = JSON.parse(localStorage.getItem("cities"));
  storedData.push(savedLocation);

  localStorage.setItem("cities", JSON.stringify(storedData));
}


function loadSavedLocations() { 
  if (localStorage.getItem("cities") !== null) {
    var savedCities = JSON.parse(localStorage.getItem("cities"));
  }
  
  appendLocation = document.getElementById('location-append');
  savedCities.forEach(function (city){
    var li = document.createElement('li');
    li.classList.add("list-style");
    li.textContent = city;

    appendLocation.appendChild(li);


  })
}



//function to geocode the location entered using apo
function lookUp(search) {
  var apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${weather_API_Key}`;

  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const inputLocation = data[0];

      appendLocation.textContent = data[0].name;

      displayWeatherInfo(inputLocation);

      //call function to add the location to local storage and append into recent search list

      //call function to display the weather (when you call this location can pass in the locationOne info)
    });
}

//displays current data at top
function showCurrentWeather(APIdata) {
  const currentWeather = APIdata.current;

  document.getElementById(
    "temperature"
  ).textContent = `Temperature: ${currentWeather.temp}°F`;
  document.getElementById(
    "wind-speed"
  ).textContent = `Wind speed: ${currentWeather.wind_speed} Mph`;
  document.getElementById(
    "humidity"
  ).textContent = `Humidity: ${currentWeather.humidity}`;
  document.getElementById(
    "UV-index"
  ).textContent = `UV Index: ${currentWeather.uvi}`;
}

//clear previous searches then displays daily weather information for future 5 days
function displayFuture5days(APIdata) {
  dailyWeatherContainer.innerHTML = "";

  var dailyData = APIdata.daily;

  for (i = 0; i < fiveDayForecast; i++) {
    var dailyWeather = dailyData[i];
    var temp = dailyData[i].temp.day;
    var icon = dailyData[i].weather[0].icon;
    var humidity = dailyData[i].humidity;
    var day = new Date(dailyData[i].dt * 1000).toLocaleDateString("en-GB", {
      weekday: "long",
    });

    var weatherBox = document.createElement("div");
    weatherBox.classList.add("weather-day");

    weatherBox.innerHTML = `
    <div> ${day} </div>
    <div> ${
      "<img src=http://openweathermap.org/img/wn/" + icon + ".png>"
    } </div>
    <div> Temperature: </div>
    <div> ${temp}°F </div>
  
    `;
    dailyWeatherContainer.appendChild(weatherBox);
  }
}

//function to get the weather passing in the lat lon from the first API call
function retrieveWeather(lat, lon) {
  var API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weather_API_Key}`;

  fetch(API_URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      showCurrentWeather(data);

      displayFuture5days(data);
    });
}

function displayWeatherInfo(weatherInfo) {
  //console.log(weatherInfo) //this is the latlong data from the first api call just renamed and passed into this funct

  retrieveWeather(weatherInfo.lat, weatherInfo.lon);
}

//retrieve the lat and long and save into vars

searchBtn.addEventListener("click", getEnterLocation);
searchBtn.addEventListener("click", lookUp);
