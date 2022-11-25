weatherAPILink = "https://openweathermap.org/forecast5";
weather_API_Key = "d91f911bcf2c0f925fb6535547a5ddc9";
fiveDayForecast = 6;

var searchBtn = document.getElementById("search-btn");
var searchContent = document.getElementById("search-content");
var errorMsg = document.getElementById("error-message");
var displayLocation = document.getElementById("append-location");
var country = document.getElementById("coutry");
var dailyWeatherContainer = document.getElementById("daily-weather-container");

//loads in saved locations from local storage and append them as buttons
loadSavedLocations();

//takes the content from saved buttons and searches the locations once clicked 
var liButton = document.querySelectorAll('#city-name');
  liButton.forEach(function(item) {
    item.onclick = function(e) {
     console.log(this.innerText); // this returns clicked li's value
     lookUp(this.innerText)
  }
});

//function to get the entered value from the input

function getEnterLocation() { 
  console.log('getEnterLocation runs')
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
    localStorageSave();
  }
}
//takes content from search to save to local storage 
function localStorageSave() {
  var savedLocation = document.getElementById("search-content").value;
//checks if there is existing local storage, if not then creates an empty string 
  if (localStorage.getItem("cities") == null) {
      localStorage.setItem( "cities",'[]');
  }
  
  var storedData = JSON.parse(localStorage.getItem("cities"));
  //we need to add saved lcoation if stored data is empty 
  if (storedData.length === 0) {
    storedData.push(savedLocation)
  }
  //else we need to check whether the location entered is already in local storage 
  else {
    var isCityInStore = false;
    //looping through stored data to see if savedLocation is anywhere in that list (storedData)
    storedData.forEach(function(city) {
      if (city === savedLocation) {
        isCityInStore = true;
      }
    })
    //if the saved location was found in storedData do nothing, if false so not in storedData then pushing onto storedData 
    if (isCityInStore === false) {
      storedData.push(savedLocation)
    }
  }
 
  localStorage.setItem("cities", JSON.stringify(storedData));
  console.log('pre --loadSavedLocation--')
  loadSavedLocations()
}

//loads in previously searched locations by creating li for each location in local storage 
function loadSavedLocations() { 
  var savedCities = []
  if (localStorage.getItem("cities") !== null) {
    savedCities = JSON.parse(localStorage.getItem("cities"));
  }
  appendLocation = document.getElementById('location-append'); 
  appendLocation.innerHTML = '';
  savedCities.forEach(function (city){
    var li = document.createElement('li');
    li.classList.add("list-style");
    li.setAttribute('id', 'city-name')
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
      displayLocation.textContent = data[0].name; //TODO fix variable naming 
      displayWeatherInfo(inputLocation);

    });
}

//displays current data at top
function showCurrentWeather(APIdata) {
  const currentWeather = APIdata.current;

  document.getElementById("temperature").textContent = `Temperature: ${currentWeather.temp}°F`;
  document.getElementById("wind-speed").textContent = `Wind speed: ${currentWeather.wind_speed} Mph`;
  document.getElementById("humidity").textContent = `Humidity: ${currentWeather.humidity}`;
  document.getElementById("UV-index").textContent = `UV Index: ${currentWeather.uvi}`;
}

//clear previous searches then displays daily weather information for future 5 days
function displayFuture5days(APIdata) {
  dailyWeatherContainer.innerHTML = "";

  var dailyData = APIdata.daily;

  for (i = 1; i < fiveDayForecast; i++) {
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
//passes in lat and long to from the api call to display weather
function displayWeatherInfo(weatherInfo) {

  retrieveWeather(weatherInfo.lat, weatherInfo.lon);
}

searchBtn.addEventListener("click", getEnterLocation);
searchBtn.addEventListener("click", lookUp);


