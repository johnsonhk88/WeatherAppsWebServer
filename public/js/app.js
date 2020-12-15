const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
    // const messageOne = document.querySelector('#message-1')
    // const messageTwo = document.querySelector('#message-2')
const msgCurrentTemp = document.querySelector('.current-temp')
const msgLocName = document.querySelector(".location")
const msgCurrentSummary = document.querySelector(".current-summary")
const iconCurrentCond = document.querySelector(".current-cond-icon")
const msgCurrentUVIndex = document.querySelector(".current-uv-index-val")
const msgCurrentHumdity = document.querySelector(".current-humdity-val")


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
                msgLocName.innerHTML = "Current Weather: &nbsp   &nbsp   &nbsp  " + data.location;
                msgCurrentTemp.innerHTML = Math.round(data.currently.temperature * 10) / 10 + "&#176";
                msgCurrentSummary.innerHTML = data.currently.summary;
                iconCurrentCond.src = "/img/" + data.currently.icon + ".png";
                msgCurrentUVIndex.innerHTML = data.currently.uvIndex;
                msgCurrentHumdity.innerHTML = data.currently.humidity * 100 + "%";

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
                msgLocName.innerHTML = "Current Weather   &nbsp &nbsp &nbsp" + data.location + "&nbsp &nbsp &nbsp &nbsp Time: " + getTimeNow();
                msgCurrentTemp.innerHTML = Math.round(data.currently.temperature * 10) / 10 + "&#176";
                iconCurrentCond.src = "/img/" + data.currently.icon + ".png";
                msgCurrentUVIndex.innerHTML = data.currently.uvIndex;
                msgCurrentHumdity.innerHTML = data.currently.humidity * 100 + "%";

            }







        })



    })

    function timeCovert(t) {
        var datetime = new Date();
        datetime.setTime(t);
        var year = datetime.getFullYear();
        var month = datetime.getMonth();
        var date = datetime.getDate();
        var hr = datetime.getHours();
        var mm = datetime.getMinutes();
        var ss = datetime.getSeconds();
        return year + "-" + month + "-" + date + " " + hour + ":" + mm + ":" + ss;

    }

    function getTimeNow() {
        var today = new Date();
        var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return date + " " + time;
    }









}











getLocation();