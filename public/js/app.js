const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
    // const messageOne = document.querySelector('#message-1')
    // const messageTwo = document.querySelector('#message-2')
const msgCurrentTemp = document.querySelector('.current-temp')
const msgLocName = document.querySelector(".location")
const msgCurrentBrief = document.querySelector(".current-brief")


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
        // form input value
    const location = search.value

    // messageOne.textContent = 'Loading...' // clear output message
    // messageTwo.textContent = '' // clear output message

    fetch('/weather?address=' + location).then((response) => {


        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                // messageOne.textContent = data.location
                // messageTwo.textContent = data.forecast
                msgLocName.innerHTML = data.location;
                msgCurrentTemp.innerHTML = data.currently.temperature + "&#176";
                msgCurrentBrief.innerHTML = data.currently.summary;

            }

        })
    })
})

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPostion);

    } else {
        console.log("Geolocation is not supported by this browser.");
    }

}


function showPostion(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    console.log("Latitue: " + latitude + " longitude: " + longitude);
    // Display local weather 

    fetch('/weatherGeolocateAll?latitude=' + latitude + '&longitude=' + longitude).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                // messageOne.textContent = data.location;
                // messageTwo.textContent = data.currently.summary;
                msgLocName.innerHTML = data.location;
                msgCurrentTemp.innerHTML = data.currently.temperature + "&#176";
                msgCurrentBrief.innerHTML = data.currently.summary;
            }







        })



    })











}











getLocation();