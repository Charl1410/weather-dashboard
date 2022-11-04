weatherAPILink = 'https://openweathermap.org/forecast5';
weatherAPIKey = 'e5a009371796c1daa39e7889609ceaf9';



var searchBtn = document.getElementById('search-btn');
var searchContent = document.getElementById('search-content');


async function getLocation() {
    //get the location that user has entered
    var locationInput = searchContent.value;
//console.log(locationInput)

    //check if it is a valid location

    //if empty display error 

    if (locationInput === '') {
        alert('please enter a valid location'); //can make this a message on page 
    }
    //if not look up location API call
    else {
       var memes = await lookUpLocation(locationInput); 
    
       console.log(memes)


}
}


//
async function lookUpLocation(cityName) {
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&limit=5&appid=${weatherAPIKey}`; //sort this bit 
    var response = await fetch(apiURL)
    var data = await response.json()
    return data
}




searchBtn.addEventListener('click', getLocation);