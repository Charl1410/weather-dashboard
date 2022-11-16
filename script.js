weatherAPILink = "https://openweathermap.org/forecast5";
weather_API_Key = "e5a009371796c1daa39e7889609ceaf9";

var searchBtn = document.getElementById("search-btn");
var searchContent = document.getElementById("search-content");
var errorMsg = document.getElementById("error-message");
var appendLocation = document.getElementById("append-location");

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
    let inputLocation = data[0];
    console.log(inputLocation);

  appendLocation.textContent = data[0].name;

      //call function to add the location to local storage and append into recent search list
    
      //call function to display the weather (when you call this location can pass in the locationOne info)
    
    });
}



function getLatLong() {

}

//function to get the weather using lat lon 
function retrieveWeather(lat, lon) {
var API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weather_API_Key}`

console.log(API_URL);

fetch(API_URL)
.then(function(response){
  return response.json();
})


}

//retrieve the lat and long and save into vars

searchBtn.addEventListener("click", getEnterLocation);
searchBtn.addEventListener("click", getLatLong);
