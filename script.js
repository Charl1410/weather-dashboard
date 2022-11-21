weatherAPILink = "https://openweathermap.org/forecast5";
weather_API_Key = "d91f911bcf2c0f925fb6535547a5ddc9";
fiveDayForecast = 5;

var searchBtn = document.getElementById("search-btn");
var searchContent = document.getElementById("search-content");
var errorMsg = document.getElementById("error-message");
var appendLocation = document.getElementById("append-location");
var country = document.getElementById('coutry');
var dailyWeatherContainer = document.getElementById('daily-weather-container')

//function to get the entered value from the input
function getEnterLocation() {
  var searchContentValue = searchContent.value;
  console.log(searchContentValue);

  //if the text is empty append in error similar to right wrong answer in quiz

  if (searchContentValue === "") {
    errorMsg.textContent = "please enter a location"; //need to set timeout for this
  } else {
    //calling function to retreieve the lat/long
   
    //getLatLong(searchContentValue);

    lookUp(searchContentValue)



  }
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
    //console.log(inputLocation);

  appendLocation.textContent = data[0].name;

    displayWeatherInfo(inputLocation);

      //call function to add the location to local storage and append into recent search list
    
      //call function to display the weather (when you call this location can pass in the locationOne info)
    
    });

}

function showCurrentWeather(APIdata) {
  
  const currentWeather = APIdata.current;
  //console.log(currentWeather)
  
  //const jsonWeather =JSON.stringify(APIdata);
  //console.log(jsonWeather)

  document.getElementById('temperature').textContent = `Temperature: ${currentWeather.temp}°F`; //this doesn't work bcs something wrong with passing in the api data
  document.getElementById('wind-speed').textContent = `Wind speed: ${currentWeather.wind_speed}`;
  document.getElementById('humidity').textContent = `Humidity: ${currentWeather.humidity}`;
  document.getElementById('UV-index').textContent = `UV Index: ${currentWeather.uvi}`;

}

function displayFuture5days(APIdata) {
  
  var dailyData = APIdata.daily //this works 

  for(i=0; i < fiveDayForecast.length; i++) {
    var dailyWeather = dailyData[i];
    var temp = dailyWeather.temp.day;
    var icon = dailyWeather.icon;
    console.log(temp) 

    var weatherBox = document.createElement('div');
    weatherBox.classList.add('weather-day');
  
    weatherBox.innerHTML =
    `
    <div> ${temp} </div>
    
    `
    dailyWeatherContainer.appendChild(weatherBox);

  }
}






//function to get the weather passing in the lat lon from the first API call 
function retrieveWeather(lat, lon) {
  var API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weather_API_Key}`;

  fetch(API_URL)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    //console.log(data)

    showCurrentWeather(data);

    displayFuture5days(data);
     //this shows the weather data 
  })

 
}

function displayWeatherInfo(weatherInfo) {
  //console.log(weatherInfo) //this is the latlong data from the first api call just renamed and passed into this funct

  retrieveWeather(weatherInfo.lat, weatherInfo.lon) 
}

//retrieve the lat and long and save into vars

searchBtn.addEventListener("click", getEnterLocation);
searchBtn.addEventListener("click", lookUp);



