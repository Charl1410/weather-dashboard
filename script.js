var searchBtn = document.getElementById('search-btn')
var searchContent = document.getElementById('search-content')


function getLocation() {
    //get the location that user has entered
    var locationInput = searchContent.value;
//console.log(locationInput)

    //check if it is a valid location
    //if empty display error 

    if (locationInput === '') {
        alert('please enter a valid location') //can make this a message on page 
    }
    //if not look up location API call
    else {
        lookUpLocation()


}

function loopUpLocation() {
    
}




searchBtn.addEventListener('click', getLocation)