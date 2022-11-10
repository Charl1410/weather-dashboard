weatherAPILink = "https://openweathermap.org/forecast5";
weather_API_Key = "e5a009371796c1daa39e7889609ceaf9";

var searchBtn = document.getElementById("search-btn");
var searchContent = document.getElementById("search-content");
var errorMsg = document.getElementById("error-message");

//function to get the entered value from the input
function getEnterLocation() {
  var searchContentValue = searchContent.value;
  console.log(searchContentValue);

  //if the text is empty append in error similar to right wrong answer in quiz

  if (searchContentValue === "") {
    errorMsg.textContent = "please enter a location"; //need to set timeout for this
  } else {
    //calling function to retreieve the lat/long
    getLatLong(searchContentValue);
  }
}

//function to geocode the location entered using apo
function getLatLong(search) {
  var apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${weather_API_Key}`;
 
  fetch(apiURL)
    .then((response) => response.json())

    .then(data => {

      // saving the first retrieved location 
      const locationOne = data[0];

      console.log(locationOne);
    
      
    //call function to add the location to local storage and append into recent search list 

    //call function to display the weather (when you call this location can pass in the locationOne info)
    });
 


}

//retrieve the lat and long and save into vars

searchBtn.addEventListener("click", getEnterLocation);
searchBtn.addEventListener("click", getLatLong);
